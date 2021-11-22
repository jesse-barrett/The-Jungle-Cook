var MODEL = (function () {
  //function that updates the page content
  function _navToPage(pageName, callback) {
    $.get(`pages/${pageName}/${pageName}.html`, function (data) {
      $("#app").html(data);

      //run a callback function (if provided)
      if (callback) {
        callback();
      }
    });
  }

  //function that creates a recipe card
  function _showRecipe(
    owner,
    index,
    image,
    name,
    description,
    time,
    servings,
    location,
    callback
  ) {
    let card;
    if (location === ".recipes__container") {
      card = `
        <div class="recipes__container__card" data-index="${index}" data-owner="${owner}">
            <div class="recipes__container__card__image" style="background-image: url('img/${image}.jpg');" data-index="${index}" data-owner="${owner}"></div>
            <div class="recipes__container__card__details" data-index="${index}" data-owner="${owner}">
                <h1 class="recipes__container__card__details__name" data-index="${index}" data-owner="${owner}">${name}</h1>
                <p class="recipes__container__card__details__description" data-index="${index}" data-owner="${owner}">${description}</p>
                <div class="recipes__container__card__details__block" data-index="${index}" data-owner="${owner}">
                    <img src="img/time.svg" alt="clock" data-index="${index}" data-owner="${owner}">
                    <p data-index="${index}" data-owner="${owner}">${time}</p>
                </div>
                <div class="recipes__container__card__details__block" data-index="${index}" data-owner="${owner}">
                    <img src="img/servings.svg" alt="clock" data-index="${index}" data-owner="${owner}">
                    <p data-index="${index}" data-owner="${owner}">${servings}</p>
                </div>
            </div>
        </div>`;
    } else if (location === ".your-recipes__container") {
      card = `
        <div class="your-recipes__container__card" data-index="${index}" data-owner="${owner}">
            <div class="your-recipes__container__card__image" style="background-image: url('img/${image}.jpg');" data-index="${index}" data-owner="${owner}">
                <button class="site-button your-recipes__container__card__image__btn" data-index="${index}" data-owner="${owner}" onClick="viewPublicRecipe(event)">View</button>
            </div>
            <div class="your-recipes__container__card__details" data-index="${index}" data-owner="${owner}">
                <h1 class="your-recipes__container__card__details__name" data-index="${index}" data-owner="${owner}">${name}</h1>
                <p class="your-recipes__container__card__details__description" data-index="${index}" data-owner="${owner}">${description}</p>
                <div class="your-recipes__container__card__details__block" data-index="${index}" data-owner="${owner}">
                    <img src="img/time.svg" alt="clock" data-index="${index}" data-owner="${owner}">
                    <p data-index="${index}" data-owner="${owner}">${time}</p>
                </div>
                <div class="your-recipes__container__card__details__block" data-index="${index}" data-owner="${owner}">
                    <img src="img/servings.svg" alt="clock" data-index="${index}" data-owner="${owner}">
                    <p data-index="${index}" data-owner="${owner}">${servings}</p>
                </div>
            </div>
            <div class="your-recipes__container__extra-btns">
                <button class="site-button your-recipes__container__extra-btns__btn" data-index="${index}" data-owner="${owner}" href="#/edit-recipe">Edit Recipe</button>
                <button class="site-button your-recipes__container__extra-btns__btn" data-index="${index}" data-owner="${owner}" id="delete">Delete</button>
            </div>
        </div>`;
    }

    $(location).append(card);

    //run a callback function (if provided)
    if (callback) {
      callback();
    }
  }

  //make MODEL function accessible by the CONTROLLER
  return {
    navToPage: _navToPage,
    showRecipe: _showRecipe,
  };
})();
