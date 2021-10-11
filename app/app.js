//MVC: DETECT USER INPUT HERE IN THE CONTROLLER
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

function initListeners() {
    //run the route function when the URL after the '#' changes
    $(window).on("hashchange", route);

    //run the route function one time when the page is initially opened
    route();
}

$(document).ready(function() {
    initListeners();
});