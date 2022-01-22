const mongoose = require("mongoose");
const validator = require('validator')

const userSchema = new mongoose.Schema({

    passId: {
        type: Number,
        require:true,
        unique:[true, ' Passport Id must be unique']
    },

    name: {
        type: String,
        require:true,
    },

    cash: {
        type: Number,
        require:true,
        min:[0, 'Amount cant be beow 0'],
        validate(amount) {
            if (amount < 0) throw Error( 'amount must be positive' )
        }
    },

    isActive: {
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