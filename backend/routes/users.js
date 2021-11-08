const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const verifyToken = require("../verifyToken");

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        if(req.body.password) {
            req.body.password = CryptoJS.AES.decrypt(req.body.password, process.env.SECERT).toString();
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
        //this will make postman send updated data instead of old one
        {
            new: true
        });
        res.status(200).json(updatedUser);
    } catch(err) {
        res.status(403).json(err);
    }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        try {
            const deletedUser = await User.findByIdAndRemove({_id: req.params.id});
            res.status(200).json("user has been delected");
        } catch(err) {
            res.status(403).json(err);
        }
    } else {
        res.status(401).json("you can only delete your account");
    }

});

//GET ONE
router.get("/find/:id", verifyToken, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        try{
            const user = await User.findById({_id: req.params.id});
            res.status(200).json(user);
        } catch(err) {
            res.status(403).json(err);
        }
    } else {
        res.status(401).json("you can only see your account")
    }

});

//GET ALL
router.get("/", verifyToken, async (req, res) => {
    const query = req.query.new;
    if(req.user.isAdmin) {
        try{
            const user = query ? await User.find().sort({_id: -1}).limit(5) :
            await User.find();
            res.status(200).json(user);
        } catch(err) {
            res.status(403).json(err);
        }
    } else {
        res.status(401).json("you don't allow to do that")
    }
});

//GET STAT
router.get("/stat", async(req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() -1);
    
    try{
        const userStat = await User.aggregate([
            // {
            //     $match: {
            //         createdAt: {$gte: lastYear}
            //     }
            // },
            {
                $project: {
                    month: {$month: "$createdAt"},
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ]);
        res.status(200).json(userStat);
    } catch(err) {
        res.status(401).json(err);
    }
});

module.exports = router;