const mongoose = require('mongoose')

//Entry schema
const EntrySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    title: {
        type: String,
        required: false,
        minlength: 1,
        maxlength: 255
    },
    content: {
        type: String,
        required: false,
        minlength: 1,
        maxlength: 40
    },
    templateId: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 250
    },
    private: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })


module.exports = Entry = new mongoose.model('Entry', EntrySchema) //named export
