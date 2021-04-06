const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000

const app = express()

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://eduard:eduard@cluster0.fwlvw.mongodb.net/quins?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start()