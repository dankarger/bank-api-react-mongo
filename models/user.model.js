const mongoose = require("mongoose");
const validator = require('validator')

const userSchema = new mongoose.Schema({

    passId: {
        type: Number,
        require:true,
        unique:[true, ' Passport Id must be unique'],
        min:0
    },

    name: {
        type: String,
        require:[true, 'Must enter name']
    },

    cash: {
        type: Number,
        require:true,

    },

    active: {
        type:Boolean,
        require:true
    },

    credit: { type: Number,
        require:true,
        min:0,
        validate(amount) {
            if (amount < 0) throw Error( 'amount must be positive' )
        }

    }
});

module.exports = mongoose.model("User", userSchema);