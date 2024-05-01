require("dotenv").config();

const API_KEY = process.env.API_KEY;

const PageDetail = (argument) => {
    const preparePage = () => {
      const cleanedArgument = argument.trim().replace(/\s+/g, "-");
  
      const displayGame = (gameData) => {
        console.log(gameData);
        const { name, rating, ratings_count, background_image, website, description, released, developers, platforms, publishers, genres, tags, stores} = gameData;

        const articleDOM = document.querySelector(".page-detail");
        articleDOM.querySelector(".game-hero__backgroundImg").src = background_image;
        articleDOM.querySelector(".game-hero__websiteBtn").href = website;

        articleDOM.querySelector(".game-detail__header__title").innerHTML = name + ",";
        articleDOM.querySelector(".game-detail__header__ratings").innerHTML = rating + "/5 - " + ratings_count + " votes";

        articleDOM.querySelector(".game-detail__content").innerHTML = description;

        // release date
        articleDOM.querySelector(".game-detail__release__date p").innerHTML = released;
        // developers
        articleDOM.querySelector(".game-detail__release__developers p").innerHTML = developers.map((developer) => (developer.name)).join(', ');
        // platforms
        articleDOM.querySelector(".game-detail__release__platforms p").innerHTML = platforms.map((platform) => (platform.platform.name)).join(', ');
        // publishers
        articleDOM.querySelector(".game-detail__release__publishers p").innerHTML = publishers.map((publisher) => (publisher.name)).join(', ');

        // genre
        articleDOM.querySelector(".game-detail__classification__genre p").innerHTML = genres.map((genre) => (genre.name)).join(', ');
        // tags
        articleDOM.querySelector(".game-detail__classification__tags p").innerHTML = tags.map((tag) => (tag.name)).join(', ');

        // stores
        const storeSection = articleDOM.querySelector(".game-buy__stores");

        storeSection.innerHTML = stores.map(element => (
            `
            <div class="game-buy__stores__store">
              <a href="${element.store.domain}">${element.store.name}</a>
              <img src="search.svg">
            </div>
            `
          )
        ).join(' ');

        const displayTrailer = (trailerData) => {
          console.log(trailerData)
        
          if (trailerData.length !== 0) {
            const previewLink = trailerData[0].data.max;
            const video = articleDOM.querySelector(".game-trailer__video");
            video.src = previewLink;
          }

          else {
            const trailerContainer = articleDOM.querySelector(".game-trailer");
            trailerContainer.classList.add('display-off')
          }
        }

        const fetchTrailer = (url, argument) => {
          fetch(`${url}${argument}/movies?key=${API_KEY}`)
            .then((response) => response.json())
            .then((responseTrailer) => {
              displayTrailer(responseTrailer.results);
            });
        }
        
        fetchTrailer('https://api.rawg.io/api/games/', cleanedArgument);
        
        const displayScreenshots = (screenshotsData) => {
          const {results} = screenshotsData;
          
          if (results.length !== 0) {
            const screenshotsContainer = articleDOM.querySelector(".game-screenshots__pictures")
            screenshotsContainer.innerHTML = results.map((screenshot) => `<img src=${screenshot.image}>`).join(" ")
          }

          else {
            const screenshotContainer = articleDOM.querySelector(".game-screenshots");
            screenshotContainer.classList.add('display-off')
          }
        }

        const fetchScreenshots = (url, argument) => {
          fetch(`${url}${argument}/screenshots?key=${API_KEY}`)
            .then((response) => response.json())
            .then((responseScreenshots) => {
              displayScreenshots(responseScreenshots);
            });
        }
        
        fetchScreenshots('https://api.rawg.io/api/games/', cleanedArgument);

        // const displayYoutube = (youtubeData) => {
        //   const {results} = youtubeData;
        //   const youtubeContainer = articleDOM.querySelector(".youtube__videos")
        //   youtubeContainer.innerHTML = results.map((video) => `<img src=${screenshot}>`).join(" ")

        // }

        // const fetchYoutube = (url, argument) => {
        //   fetch(`${url}${argument}/youtube?key=${API_KEY}`)
        //     .then((response) => response.json())
        //     .then((responseYoutube) => {
        //       displayYoutube(responseYoutube);
        //     });
        // }
        
        // We don't have a professional API key to query this data 
        // fetchYoutube('https://api.rawg.io/api/games/', cleanedArgument);

      };
  
      const fetchGame = (url, argument) => {
        fetch(`${url}/${argument}?key=${API_KEY}`)
          .then((response) => response.json())
          .then((responseData) => {
            displayGame(responseData);
          });
      };
  
      fetchGame('https://api.rawg.io/api/games', cleanedArgument);

    };

  
    const render = () => {
      pageContent.innerHTML = `
        <section class="page-detail">
          <div class="game-hero">
            <img class="game-hero__backgroundImg" src="">

            <a class="game-hero__websiteBtn" href="" target="_blank">
             <p> Check Website </p>
             <i class="fa-solid fa-play"></i>
            </a>
          </div>

          <div class="game-detail">

            <div class="game-detail__header">
              <h1 class="game-detail__header__title"> </h1>
              <h2 class="game-detail__header__ratings"> </h2>

            </div>
              <div class="game-detail__content">
            </div>

            <div class="game-detail__release">
              <div class="game-detail__release__date">
                <h4> Release Date </h4>
                <p> </p>
              </div>
              <div class="game-detail__release__developers">
                <h4> Developer </h4>
                <p> </p>
              </div>
              <div class="game-detail__release__platforms">
                <h4> Platforms </h4>
                <p> </p>
              </div>
              <div class="game-detail__release__publishers">
                <h4> Publisher </h4>
                <p> </p>
              </div>
            </div>

            <div class="game-detail__classification">
              <div class="game-detail__classification__genre">
                <h4> Genre </h4>
                <p> </p>
              </div>
              <div class="game-detail__classification__tags">
                <h4> Tags </h4>
                <p> </p>
              </div>
            </div>

          </div>

          <div class="game-buy">
            <h1>BUY</h1>
            <div class="game-buy__stores"> </div>
          </div>

          <div class="game-trailer">
            <h1> TRAILER </h1>
            <video controls class="game-trailer__video"></video>
          </div>

          <div class="game-screenshots">
            <h1> SCREENSHOTS </h1>
            <div class="game-screenshots__pictures">
            </div>
          </div>

          <!-- <div class="youtube">
            <h1> YOUTUBE </h1>
            <div class="youtube__videos"> </div>
          </div>-->

          <!-- <div class="similar-games">
            <h1> SIMILAR GAMES </h1>
          </div> -->

        </section>
      `;
  
      preparePage();
    };
  
    render();
  };

  export {PageDetail};