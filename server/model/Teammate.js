const { Schema, model } = require('mongoose')

const Teammate = new Schema({
    name: {type: String, required: true},
    profession: {type: String, required: true},
    picture: {type: String}
})

module.exports = model('Teammate', Teammate)