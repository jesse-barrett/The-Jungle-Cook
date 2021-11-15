var MODEL = (function () {
  //function that updates the page content
  function _navToPage(pageName, callback) {
    $.get(`pages/${pageName}/${pageName}.html`, function (data) {
      $("#app").html(data);
      if (callback) {
        callback();
      }
    });
  }

  //function that creates a recipe card
  function _showRecipe(name, description, time, servings) {
    let card = `
    <div class="recipes__container__card">
            <div class="recipes__container__card__image"></div>
            <div class="recipes__container__card__details">
                <h1 class="recipes__container__card__details__name">${name}</h1>
                <p class="recipes__container__card__details__description">${description}</p>
                <div class="recipes__container__card__details__block">
                    <img src="img/time.svg" alt="clock">
                    <p>${time}</p>
                </div>
                <div class="recipes__container__card__details__block">
                    <img src="img/servings.svg" alt="clock">
                    <p>${servings}</p>
                </div>
            </div>
        </div>`;
    $(".recipes__container").append(card);
  }

  //make MODEL function accessible by the CONTROLLER
  return {
    navToPage: _navToPage,
    showRecipe: _showRecipe,
  };
})();
