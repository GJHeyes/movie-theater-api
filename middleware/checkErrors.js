const {validationResult} = require('express-validator')
function checkErrors(req,res,next){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()})
    }
    next()
}

module.exports = {checkErrors}