const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/nytreact"
);

const articleSeed = [
  {
    title: "Ali Sells Jersey House And Moves to Chicago",
    date: "1974-07-18T00:00:00Z",
    url: "http://query.nytimes.com/gst/abstract.html?res=9A0DE5D8173FEF34BC4052DFB166838F669EDE"
  },
  {
    title: "What Went Wrong With Indonesia's Tsunami Early Warning System ",
    date: "2018-10-02",
    url: "https://www.nytimes.com/interactive/2018/10/02/world/asia/indonesia-tsunami-early-warning-system.html?rref=collection%2Fsectioncollection%2Fworld&action=click&contentCollection=world&region=rank&module=package&version=highlights&contentPlacement=1&pgtype=sectionfront"
  }
];

db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
