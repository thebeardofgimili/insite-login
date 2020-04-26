const mongoose = require('mongoose');

const GoogleUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    googleId:{
        type: String,
        required: true
    },
});

const GoogleUser = mongoose.model('GoogleUser', GoogleUserSchema);

module.exports = GoogleUser;