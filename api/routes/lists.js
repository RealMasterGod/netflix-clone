const router = require('express').Router()
const List = require('../models/List')
const { verifyToken } = require('../verifyToken')


//CREATE

router.post("/", verifyToken ,async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const newList = new List(req.body)
            const savedList = await newList.save()
            res.status(201).json(savedList)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you are not allowed to perform this action!")
    }
})

//DELETE

router.delete("/:id", verifyToken ,async (req, res) => {
    if(req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id)
            res.status(201).json("list has been deleted!")
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you are not allowed to perform this action!")
    }
})

//GET

router.get("/", verifyToken, async (req,res) => {
    const typeQuery = req.query.type
    const genreQuery = req.query.genre;
    let list = []
    try {
        if(typeQuery) {
            if(genreQuery) {
                list = await List.aggregate([
                    {$match: {type: typeQuery, genre: {$regex: genreQuery, $options: "i"}}},
                    {$sample: {size: 10}},
                ])
            } else {
                list = await List.aggregate([
                        {$match: {type: typeQuery}},
                        {$sample: {size: 10}}
                ])
            }
        } else {
            list = await List.aggregate([
                {
                    $sample: {size: 10},
                },
            ])
        }
        res.status(200).json(list)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL LISTS

router.get("/all", verifyToken, async (req,res) => {
    if(req.user.isAdmin) {
        try {
            const lists = await List.find({})
            res.status(200).json(lists)
        } catch (err) {
            res.status(500).json(err)
        }
    }
})

module.exports = router