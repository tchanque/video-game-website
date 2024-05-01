import { routes } from "./routes";

const callRoute = () => {
    const { hash } = window.location;
    const pathParts = hash.substring(1).split('/');
  
    const pageName = pathParts[0];
    const pageArgument = pathParts[1] || '';
    const pageFunction = routes[pageName];
  
    if (pageFunction !== undefined) {
      pageFunction(pageArgument);
    }
  };

const searchInput = document.querySelector('.search-input');

searchInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();

  const searchText = searchInput.value;

  const newUrl = "#pagelist/" + searchText;
  history.pushState({ path: newUrl }, "", newUrl);

  // Reload the page
  window.location.reload();
  }

});

window.addEventListener('hashchange', () => callRoute());
window.addEventListener('DOMContentLoaded', () => callRoute());

