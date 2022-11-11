const {User} = require('../models/index')

async function getUser(req,res,next){
    req.user = await User.findByPk(req.params.userId)
    if(!req.user){
        return res.status(400).send(`${req.params.userId} does not match any users`)
    }
    next()
}

module.exports = getUser