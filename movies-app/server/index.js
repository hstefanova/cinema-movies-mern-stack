const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const app = express();
const PORT = process.NODE_ENV || 3000;
const Movie = require("./models/movie-model");

const movieRouter = require("./routes/movie-router");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

//basic server get reqest
app.get("/", (req, res) => res.send("testing"));

// app.get("/movies", async (req, res) => {
//   await Movie.find({}, (err, movies) => {
//     if (err) {
//       return res.status(400).json({ success: false, error: err });
//     }

//     if (!movies.length) {
//       return res.status(400).json({ success: false, error: "No movies" });
//     }

//     return res.status(200).json({ success: true, data: movies });
//   }).catch((err) => console.log(err));
// });

//middleware
app.use((req, res, next) => {
  console.log("The times is: " + Date.now());
  next();
});
//middleware using routes
app.use("/api", movieRouter);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
