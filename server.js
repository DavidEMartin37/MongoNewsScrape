var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

var app = express();
var db = require("./models");

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// var databaseUrl = "scraper";
// var collections = ["scrapedData"];
// var db = mongojs(databaseUrl, collections);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongonewsscraper";
mongoose.connect(MONGODB_URI);
// mongoose.connect("mongodb://localhost/mongonewsscraper", { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);
app.get("/", (req,res) => {

})
app.get("/api/scrape", (req, res) => {

  axios.get("https://bleacherreport.com/fantasy-football").then(function (response) {

    var $ = cheerio.load(response.data);
    var results = [];
    $("a.articleTitle").each(function (i, element) {

      var title = $(element).children().text();
      var link = $(element).attr("href");
      var description = $(element).parent().text()

      results.push({
        title: title,
        link: link,
        description: description
      });
    });
    db.Article.create(results)
      .then(function(dbArticle) {
        console.log(dbArticle);
      })
      .catch(function(err) {
        console.log(err);
      });
      console.log(results);
  });
});

app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(articles) {
      console.log(articles)
      res.render('index',{Article : articles});
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("articleId")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});