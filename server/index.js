const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoute')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/auth', authRoute)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://eduard:eduard@cluster0.fwlvw.mongodb.net/quins?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start()