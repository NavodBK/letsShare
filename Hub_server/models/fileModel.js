const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    downloads: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    groups: {
        type: [String],
        required: true
    }

})


const file = mongoose.model('file', fileSchema);

module.exports = file;