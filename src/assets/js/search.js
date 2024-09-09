// Import algoliasearch, instantsearch, instantsearch.css, and stylesheet
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import instantsearch from "instantsearch.js";
import Alpine from 'alpinejs';
import "instantsearch.css/themes/satellite.css";
import "../css/style.css";

// Import instantsearch widgets
import {
  searchBox,
  hits,
  configure,
  pagination,
  refinementList,
  hitsPerPage,
  // currentRefinements,
} from "instantsearch.js/es/widgets";

// Create variables
const APP_ID = "latency";
const SEARCH_ONLY_API_KEY = "6be0576ff61c053d5f9a3225e2a90f76";
const INDEX_NAME = "instant_search";
const algoliaClient = algoliasearch(APP_ID, SEARCH_ONLY_API_KEY); 

const searchClient = {
  ...algoliaClient,
  search(requests) {
    if (requests.every(({params}) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
          hitsPerPage: 0,
          exhaustiveNbHits: false,
          query: '',
          params: '',
        })),
      });
    }

    return algoliaClient.search(requests);
  },
}

// Create the instantsearch instance
const search = instantsearch({
  indexName: INDEX_NAME,
  searchClient,
});

// Add widgets to the instantsearch instance
search.addWidgets([
  searchBox({
    container: "#searchbox",
    placeholder: "Search 12-step literature",
    searchAsYouType: false,
    autofocus: true
  }),
  hits({
    container: "#hits",
    templates: {
      item: (hit, { html, components }) => html`
        <article>
          <h1>${components.Highlight({ hit, attribute: "name" })}</h1>
          <p>${components.Highlight({ hit, attribute: "description" })}</p>
        </article>
      `,
    },
  }),
  configure({
    hitsPerPage: 10,
  }),
  pagination({
    container: "#pagination",
  }),
  refinementList({
    container: "#refinement-list",
    attribute: "brand",
  })
]);

// Start the Alpinejs instance
try {
  Alpine.start();
} catch (error) {
  console.error('Alpinejs start error', error);
}

// Start the instantsearch instance
try {
  search.start();
} catch (error) {
  console.error('Algolia search boot error', error);
}