const User = require('./../models/user.model')

const checkUserCredit = async (passId, amount) => {
    const user = await User.findOne({passId : passId});
    console.log('user-check credit',user)
     // if(user.cash - amount > user.credit)
     return true
}


module.exports = {
    checkUserCredit
}