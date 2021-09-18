const mongoose = require('mongoose')

//Template schema
const TemplateSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 255
    },
    description: {
        type: String,
        required: false,
        minlength: 1,
        maxlength: 40
    },
}, { timestamps: true })


module.exports = Template = new mongoose.model('Template', TemplateSchema) //named export
