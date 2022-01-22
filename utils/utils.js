const User = require('./../models/user.model')

const checkUserCredit = async (passId, cashToWithdraw) => {
    const user = await User.findOne({passId : passId})
    return (user.cash - cashToWithdraw > -user.credit)
}


module.exports = {
    checkUserCredit
}