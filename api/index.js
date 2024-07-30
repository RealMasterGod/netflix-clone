const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const movieRoute = require('./routes/movies')
const listRoute = require('./routes/lists')
require('dotenv').config()

main().then(() => console.log('Database Connected')).catch(err => console.log(err))

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
}

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/users',userRoute)
app.use('/api/movies',movieRoute)
app.use('/api/lists',listRoute)


app.listen(8800, () => {
    console.log('Server running on port 8800...')
})