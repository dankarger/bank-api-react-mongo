const User = require('./../models/user.model')

const checkUserCredit = async (passId, amount) => {
     const user = await User.findOne({passId : passId});
     return (user.credit +user.cash > amount)
     // if(user.cash - amount > user.credit)

}

const checkBodyRequest=(req)=> {
    if(!req.body.name) throw  new Error('Must enter Name');
    if(!req.body.passId) throw  new Error('Must enter Passport Id');
    if(!req.body.cash) throw  new Error('Must enter Cash amount');
    if(!req.body.credit) throw  new Error('Must enter Credit amount');
}


module.exports = {
    checkUserCredit,
    checkBodyRequest
}