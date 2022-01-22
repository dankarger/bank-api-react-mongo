const User = require('./../models/user.model')

const checkUserCredit = async (passId, amount) => {
     const user = await User.findOne({passId : passId});
     return (user.credit +user.cash > amount)
     // if(user.cash - amount > user.credit)

}


module.exports = {
    checkUserCredit
}