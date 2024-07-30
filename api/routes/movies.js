const router = require('express').Router()
const Movie = require('../models/Movie')
const { verifyToken } = require('../verifyToken')


//CREATE

router.post("/", verifyToken ,async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const newMovie = new Movie(req.body)
            const savedMovie = await newMovie.save()
            res.status(201).json(savedMovie)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you are not allowed to perform this action")
    }
})

//UPDATE

router.put("/:id", verifyToken ,async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{new: true})
            res.status(200).json(updatedMovie)
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
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json("movie has been removed successfully!")
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you are not allowed to perform this action!")
    }
})

//GET

router.get("/find/:id", verifyToken,async (req, res) => {
        try {
            const movie = await Movie.findById(req.params.id)
            res.status(200).json(movie)
        } catch (err) {
            res.status(500).json(err)
        }
})

//GET RANDOM

router.get("/random", verifyToken,async (req, res) => {
    const type = req.query.type
    let movie
    try {
        if(type === "series") {
            movie = await Movie.aggregate([
                {$match: {isSeries: true}},
                {$sample: {size: 1}},
            ])
        } else if (type === "movie") {
            movie = await Movie.aggregate([
                {$match: {isSeries: false}},
                {$sample: {size: 1}},
            ])
        } else {
            movie = await Movie.aggregate([
                {$sample: {size: 1}},
            ])
        }
        res.status(200).json(movie)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL

router.get("/", verifyToken,async (req, res) => {

    if(req.user.isAdmin) {
        try {
            const movies = await Movie.find()
            res.status(200).json(movies.reverse())
        } catch (err) {
            res.status(500).json(err)
        }
    }
})


//GET USER STATS


module.exports = router