//MVC: DETECT USER INPUT HERE IN THE CONTROLLER
//function that routes to a new page
function route() {
    //retrieve the desired page destination from the URL
    let hashTag = window.location.hash;
    let pageId = hashTag.replace("#/", "");

    //let the MODEL change the page content
    if(pageId == "") { //display home if there is no pageId
        MODEL.navToPage("home");
    }else { //display the page based on the pageId
        MODEL.navToPage(pageId);
    }
}

//function that underlines the active page link in the nav
function underlineLink(event) {
    //remove the underline from all links
    $(".nav__links__link").css("border", "none");

    //if the link clicked was the login button, don't underline it
    if(event.target.classList.contains("site-button")) {
        return;
    }else {
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
    $(".mobile-nav").on("click", hideNav)
}

$(document).ready(function() {
    initListeners();
});