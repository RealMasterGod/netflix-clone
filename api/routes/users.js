const router = require('express').Router()
const User = require('../models/User')
const { verifyToken } = require('../verifyToken')
const bcrypt = require('bcrypt')


//UPDATE

router.put("/:id", verifyToken ,async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        try {
            if(req.body.password) {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{new: true})
            res.status(200).json(updatedUser)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you can only update your account!")
    }
})

//DELETE

router.delete("/:id", verifyToken ,async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user has been deleted successfully!")
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you can only delete your account!")
    }
})

//GET

router.get("/find/:id", async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            const {password, ...others} = user._doc
            res.status(200).json(others)
        } catch (err) {
            res.status(500).json(err)
        }
})

//GET ALL

router.get("/", verifyToken, async (req, res) => {
    const query = req.query.new
    if(req.user.isAdmin) {
        try {
            const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find()
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you are not allowed to see all users!")
    }
})

//GET USER STATS

router.get("/stats", verifyToken, async (req, res) => {
    if(req.user.isAdmin) {
        const today = new Date()
        const lastYear = new Date (today.setFullYear(today.getFullYear() - 1))
        // const monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        try {
            const data = await User.aggregate([
                {
                    $match: {createdAt: {$gte: lastYear} }
                },
                {
                    $project: {
                        month: {$month: "$createdAt"}
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: {$sum: 1},
                    }
                }
            ])

            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("only admins can access this data!")
    }
})

module.exports = router