const User = require('../models/User')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//REGISTER

router.post("/register", async (req,res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
        username:  req.body.username,
        email: req.body.email,
        password: hashedPassword,
    })

    const user = await newUser.save()
    res.status(201).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
    
})

//LOGIN

router.post('/login', async (req,res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) {
            return res.status(401).json("Wrong credentials")
        }

        const validated = await bcrypt.compare(req.body.password, user.password)
        if(!validated) {
            return res.status(401).json("Wrong credentials baka")
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            {expiresIn: "5d"}
        )
        const {password, ...others} = user._doc
        res.status(200).json({...others, accessToken})
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router