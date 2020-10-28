const express = require("express");
const MovieCtrl = require("../controllers/movie-ctrl");
const router = express.Router();

// // create
router.post("/movie", MovieCtrl.createMovie);
router.put("/movies/edit/:id", MovieCtrl.updateMovie);
router.delete("/movie/:id", MovieCtrl.deleteMovie);
router.get("/movies", MovieCtrl.getMovies);
router.get("/movies/:id", MovieCtrl.getMovieById);

module.exports = router;
