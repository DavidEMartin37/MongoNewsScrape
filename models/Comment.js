var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
  articleId: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },
  body: String
});

var Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
