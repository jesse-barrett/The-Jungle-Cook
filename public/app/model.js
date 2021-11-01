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
  //make MODEL function accessible by the CONTROLLER
  return {
    navToPage: _navToPage,
  };
})();
