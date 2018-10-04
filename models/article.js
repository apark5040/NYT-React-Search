const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String },
  date: { type: String , require: true},
  url: {type: String, require: true}
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
