$(document).ready(function() {
  $(document).on("click", ".scrape-new", function() {
    // event.preventDefault();
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/api/scrape"
    }).then(function(articles) {
      console.log(articles);  
      return articles;
      })
  });
});
