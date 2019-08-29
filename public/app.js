$(".scrape-new").click(function() {
  $.ajax({
    method: "GET",
    url: "/api/scrape"
  }).then(function(articles) {
    console.log(articles);  
    location.reload(true);
    })
});

$(".clear").click(function() {
  $.ajax({
    method: "GET",
    url: "/api/clear"
  }).then(function(articles) {
    console.log(articles);  
    location.reload(true);
    })
});