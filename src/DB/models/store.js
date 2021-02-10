const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    Store_Name: {
        type: String,
        required: true,
        trim: true
    },
    Contact_Number: {
        type: String,
        required: true,
        trim: true
    },
    Logo_Uploading: {
        type: String,
        required: true,
        trim: true
    },
    Store_Location: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store