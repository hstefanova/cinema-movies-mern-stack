const mongoose = require("mongoose");

//connect mongoDB  with Mongoose
mongoose
  .connect("mongodb://localhost/cinema", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error("Connection error: ", err.message));

const db = mongoose.connection;

module.exports = db;
