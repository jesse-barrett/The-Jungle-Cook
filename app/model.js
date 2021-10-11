var MODEL = (function() {
    //function that updates the page content
    function _navToPage(pageName) {
        $.get(`pages/${pageName}/${pageName}.html`, function(data) {
            $("#app").html(data);
        });
    }
    //make MODEL function accessible by the CONTROLLER
    return {
        navToPage: _navToPage
    }
})();