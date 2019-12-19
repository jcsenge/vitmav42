const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ko6mg0", { useNewUrlParser: true });

module.exports = mongoose;
