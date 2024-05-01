require("dotenv").config();
const API_KEY = process.env.API_KEY;

const svgHash = {
  "pc": "windows.svg",
  "playstation": "ps4.svg",
  "xbox": "xbox.svg",
  "linux": "linux.svg",
  "nintendo": "switch.svg",
  "mobile": "mobile.svg",
  "mac": "windows.svg",
  "android": "mobile.svg",
  "web": "windows.svg"
}

const PageList = (argument = '') => {
  const preparePage = () => { // function that will prepare the page 
    const cleanedArgument = argument.trim().replace(/\s+/g, '-'); // take the search parameter

    const displayResults = (articles) => { // this one creates a card game for each game
      const resultsContent = articles.map((article, index) => (
        `<article class="cardGame ${index<9 ? "": "display_off"}">
          <div class="cardGame__imgWrapper">
            <img src="${article.background_image}" class="cardGame__imgWrapper__img">
            <p class="cardGame__imgWrapper__text"> ${article.name} </p>
          </div>
          <h2 class="cardGame__title">${article.name}</h2>
          <div class="cardGame__platforms">
            ${article.parent_platforms.map(platform => `<img class="cardGame__platforms__logo" src="${svgHash[platform.platform.slug]}" alt="">`).join('')}
          </div>
          <a href="#pagedetail/${article.id}">${article.id}</a>
        </article>`
      ));

      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results)
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
    <section class="welcome-container">
      <h1>Welcome,</h1>
      <p>The Hyper Progame is the world's premier event for computer and video games and related products. At The Hyper Progame, the video game industry's top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest, and most innovative in the interactive entertainement industry. For three exciting days, leading-edge companies, groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposture</p>
    </section>
    <section class="page-list">
      <div class="filter">
        <button class="filter-menu">Platform : any </button>
      </div>
      <div class="articles">Loading...</div>
      <div class="show-more">
        <button class="show-more__btn">
          <h2> Show more </h2>
          </button>
      </div>
    </section>
    `;

    preparePage();
  };

  render();

  const showMoreBtn = document.querySelector('.show-more__btn')
  showMoreBtn.addEventListener('click', showMoreArticle)
};

const showMoreArticle = () => {
  // Select all elements with both classes .cardGame and .display_off
  const allHiddenCards = document.querySelectorAll('.cardGame.display_off');

  // Loop through the selected elements and remove the display_off class from the first 9 elements
  allHiddenCards.forEach((card, index) => {
    if (index < 9) {
      card.classList.remove('display_off');
    }
  });
}
  

export {PageList}