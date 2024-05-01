const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Contact= new Schema(
    {
        email :{ type: String, required: true },
        feedback:{ type: String, required: true },
        

    },
    { timestamps: true },
)

module.exports = mongoose.model('contacts', Contact)