const router = require("express").Router();
const Movie = require("../models/Movie");
const verifyToken = require("../verifyToken");

//CREATE
router.post("/", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const saveMovie = await newMovie.save();
            res.status(200).json(saveMovie);
        } catch(err) {
            res.status(403).json(err);
        }
    } else {
        res.status(401).json("you're not allowed to do that");
    }
});

//UPDATE
router.put("/find/:id", verifyToken, async (req, res) => {
    if(req.user.isAdmin) {
        try{
            const updateMovie = await Movie.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
            {
                new: true
            });
            res.status(200).json(updateMovie);
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("you're not allow to do that")
    }
});

//DELETE
router.delete("/delete/:id", verifyToken, async (req, res) => {
    if(req.user.isAdmin) {
        try{
            const deleteMovie = await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json(deleteMovie);
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("you're not allow to do that")
    }
});

//GET ONE
router.get("/find/:id", async (req, res) => {
    try{
        const oneMovie = await Movie.findById(req.params.id);
        res.status(200).json(oneMovie);
    } catch(err) {
        res.status(500).json(err);
    }
});


//GET RANDOM
router.get("/random", async (req, res) => {
    const type = req.query.type;
    let movie;
        try{
            if(type === "series") {
                movie = await Movie.aggregate([
                    {$match: {isSeries: true}},
                    {$sample: {size: 1}}
                ])
            } else {
                movie = await Movie.aggregate([
                    {$match: {isSeries: false}},
                    {$sample: {size: 1}}
                ])
            }
            res.status(200).json(movie);
        } catch(err) {
            res.status(500).json(err);
        }
});

//GET ALL
router.get("/find", verifyToken, async (req, res) => {
    const query = req.query.new;
    if(req.user.isAdmin) {
        try{
            const allMovie = query ? await Movie.find().sort({_id: -1}).limit(5) : await Movie.find();
            res.status(200).json(allMovie);
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("you're not allow to do that");
    }
});

module.exports = router;