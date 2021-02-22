const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    publicStat: {
        type: Boolean,
        required: true,
        default: true
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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
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