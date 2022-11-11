const {Show} = require('../models/index')

async function getShow(req,res,next){
    req.show = await Show.findByPk(req.params.showId)
    req.shows = await Show.findAll()
    if(!req.show){
        return res.status(400).send(req.shows)
        //return res.status(400).send(`ID ${req.params.showId} does not match any shows`)
    }
    next()
}

module.exports = getShow