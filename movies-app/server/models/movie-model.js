const mongoose = require("mongoose");
//variable reference to the mongoose schema
const Schema = mongoose.Schema;

//then we create a schema
const Movie = new Schema(
  {
    title: { type: String, required: true },
    time: { type: [String], required: true },
    rating: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

//we create an instance of the schema called Model
module.exports = mongoose.model("movies", Movie);
