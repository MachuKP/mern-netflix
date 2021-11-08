const router = require("express").Router();
const List = require("../models/List");
const verifyToken = require("../verifyToken");

//CREATE
router.post("/", verifyToken, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);
        try {
            const saveList = await newList.save();
            res.status(200).json(saveList);
        } catch(err) {
            res.status(403).json(err);
        }
    } else {
        res.status(401).json("you're not allowed to do that");
    }
});

// DELETE
router.delete("/delete/:id", verifyToken, async (req, res) => {
    if(req.user.isAdmin) {
        try{
            const deleteList = await List.findByIdAndDelete(req.params.id);
            res.status(200).json("List has been deleted");
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("you're not allow to do that")
    }
});


// GET ALL
router.get("/find", async (req, res) => {
    const queryType = req.query.type;
    const queryGenre = req.query.genre;
    let list = [];
    try{
    if (queryType) {
        if(queryGenre) {
            list = await List.aggregate([
                {$sample: {size: 10}},
                {$match: {type: queryType, genre: queryGenre}}
            ]);
        } else {
            list = await List.aggregate([
                {$sample: {size: 10}},
                {$match: {type: queryType}}
            ]);
        }
    } else {
        list = await List.aggregate([
            {$sample: {size: 10}}
        ]);
    }
        res.status(200).json(list);
    } catch(err) {
        res.status(500).json(err);
    }
});


module.exports = router;