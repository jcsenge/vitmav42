const Schema = require("mongoose").Schema;
const db = require("../config/db");

const Poem = db.model("Poem", {
  title: String,
  text: String,
  picturelink: String,
  _poet: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = Poem;
