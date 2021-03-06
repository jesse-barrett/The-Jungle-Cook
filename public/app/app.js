//MVC: DETECT USER INPUT HERE IN THE CONTROLLER

//function that monitors change in the login status
function initFirebase() {
  //listens for any auth state change
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //the user signed in
      console.log("connected");

      //display the logout button
      $("#logoutNav").css("display", "block");

      //hide the login button
      $("#loginNav").css("display", "none");

      //display "Your Recipes" in the nav
      $("#yourRecipes").css("display", "block");
    } else {
      //the user signed out
      console.log("user is not there");

      //display the login button
      $("#loginNav").css("display", "block");

      //hide the logout button
      $("#logoutNav").css("display", "none");

      //remove "Your Recipes" in the nav
      $("#yourRecipes").css("display", "none");
    }
  });
}

function loadPublicRecipes() {
  //empty the previous contents of the container
  $(".recipes__container").empty();
  //load the JSON data from data.json
  $.getJSON("data/data.json", function (recipes) {
    //for each object in the private recipe array
    $.each(recipes.private, (index, recipe) => {
      //display a card with a recipe's information on it
      MODEL.showRecipe(
        "private",
        index,
        recipe.img,
        recipe.name,
        recipe.description,
        recipe.time,
        recipe.servings,
        ".recipes__container"
      );
    });
    //for each object in the public recipe array
    $.each(recipes.public, (index, recipe) => {
      //display a card with a recipe's information on it
      MODEL.showRecipe(
        "public",
        index,
        recipe.img,
        recipe.name,
        recipe.description,
        recipe.time,
        recipe.servings,
        ".recipes__container",
        initRecipeCards
      );
    });
  });
}

function loadPrivateRecipes() {
  //empty the previous contents of the container
  $(".your-recipes__container").empty();
  //load the JSON data from data.json
  $.getJSON("data/data.json", function (recipe) {
    //for each object in the public recipe array
    $.each(recipe.private, (index, recipe) => {
      //display a card with a recipe's information on it
      MODEL.showRecipe(
        "private",
        index,
        recipe.img,
        recipe.name,
        recipe.description,
        recipe.time,
        recipe.servings,
        ".your-recipes__container"
      );
    });
  });
}

function initRecipeCards() {
  //adds the click listener to every recipe card
  $(".recipes__container__card").on("click", viewPublicRecipe);
}

function viewPublicRecipe(event) {
  //hopefully this will stop the bubbling of my onClick event
  event.stopPropagation();
  event.stopImmediatePropagation();

  //store which recipe was clicked on
  let index = parseInt(event.target.dataset.index);
  let owner = event.target.dataset.owner;

  //change the URL to the appropriate page
  //for some reason a tiny timeout was the only way I could get this to work
  MODEL.navToPage(
    "view-recipe",
    setTimeout(() => setViewedRecipe(index, owner), 10)
  );
}

function setViewedRecipe(index, owner) {
  //distinguish between the public and private arrays
  if (owner === "public") {
    //load the JSON data from data.json
    $.getJSON("data/data.json", function (recipe) {
      let thisRecipe = recipe.public[index];
      $("#name").html(thisRecipe.name);
      $(".view-recipe__main__image").css(
        "background-image",
        `url(../img/${thisRecipe.img}.jpg)`
      );
      $("#description").html(thisRecipe.description);
      $("#time").html(thisRecipe.time);
      $("#servings").html(thisRecipe.servings);
      $("#ingredients").html(thisRecipe.ingredients);
      $("#instructions").html(thisRecipe.instructions);
    });
  } else {
    //load the JSON data from data.json
    $.getJSON("data/data.json", function (recipe) {
      let thisRecipe = recipe.private[index];
      $("#name").html(thisRecipe.name);
      $(".view-recipe__main__image").css(
        "background-image",
        `url(../img/${thisRecipe.img}.jpg)`
      );
      $("#description").html(thisRecipe.description);
      $("#time").html(thisRecipe.time);
      $("#servings").html(thisRecipe.servings);
      $("#ingredients").html(thisRecipe.ingredients);
      $("#instructions").html(thisRecipe.instructions);
    });
  }
}

//function that routes to a new page
function route() {
  //retrieve the desired page destination from the URL
  let hashTag = window.location.hash;
  let pageId = hashTag.replace("#/", "");

  //let the MODEL change the page content
  if (pageId == "") {
    //display home if there is no pageId
    MODEL.navToPage("home");
  } else {
    //display the page based on the pageId
    MODEL.navToPage(pageId, initAccounts);

    //if the page is "recipes"
    if (pageId == "recipes") {
      //load the public recipes
      loadPublicRecipes();
    }
    //if the page is "your-recipes"
    else if (pageId == "your-recipes") {
      //load the private recipes
      loadPrivateRecipes();
    }
  }
}

//function that underlines the active page link in the nav
function underlineLink(event) {
  //remove the underline from all links
  $(".nav__links__link").css("border", "none");

  //if the link clicked was the login button, don't underline it
  if (event.target.classList.contains("site-button")) {
    return;
  } else {
    //otherwise, underline it when it is clicked
    $(event.target).css("border-bottom", "3px solid black");
  }
}

//function that displays the nav when in tablet or phone size
function showNav() {
  $(".mobile-nav").css("display", "flex");
  $(".mobile-nav").css("animation", "navIn 0.7s ease");
}

//function that hides the mobie nav when the background is clicked on
function hideNav() {
  $(".mobile-nav").css("animation", "navOut 0.7s ease");
  setTimeout(() => {
    $(".mobile-nav").css("display", "none");
  }, 700);
}

//creates a new user in the firebase
function createUser() {
  console.log("click");
  let firstName = $("#signupFirstName").val();
  let lastName = $("#signupLastName").val();
  let email = $("#signupEmail").val();
  let password = $("#signupPassword").val();

  firebase
    .auth() //authorize
    .createUserWithEmailAndPassword(email, password) //create a new user with an email and password
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(userCredential.user);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}

//logs an existing user on the firebase into the site
function login() {
  let email = $("#loginEmail").val();
  let password = $("#loginPassword").val();
  // let email = "jesselb1123@gmail.com";
  // let password = "password";

  firebase
    .auth() //authorize
    .signInWithEmailAndPassword(email, password) //sign in the existing user
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // console.log("signed in");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });

  //return to the home page
  route("home");
}

//function that signs a user out
function signout() {
  firebase
    .auth() //authorize
    .signOut() //sign a user out
    .then(() => {
      // Sign-out successful.
      // console.log("signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

//account-related listeners
function initAccounts() {
  //listen for the login button to be clicked
  $("#login").on("click", login);

  //listen for the sign up button to be clicked
  $("#signup").on("click", createUser);

  //listen for the logout button in the navbar to be clicked
  $("#logoutNav").on("click", signout);
}

//function that initializes listeners for clicks and other changes
function initListeners() {
  //run the route function one time when the page is initially opened
  route();

  //run the route function when the URL after the '#' changes
  $(window).on("hashchange", route);

  //listen for a link to be clicked
  $(".nav__links__link").on("click", underlineLink);

  //listen for the hamburger menu to be clicked on
  $(".nav__hamburger").on("click", showNav);

  //listen for the background of the mobile nav to be clicked on
  $(".mobile-nav").on("click", hideNav);
}

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    initListeners();
  } catch {
    //display an error if the document.ready failed
    console.error("error");
  }
});
