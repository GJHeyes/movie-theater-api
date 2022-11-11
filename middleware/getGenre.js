const {Show} = require('../models/index')

async function getGenre(req,res,next){
    req.genre = await Show.findAll({where: {genre: req.params.genre}})
    if(!req.genre){
        return res.status(400).send(`${req.params.genre} does not match any genres`)
    }
    next()
}

module.exports = getGenre





/*const genres = (await Show.findAll({attributes: ['genre']}))
genres.forEach(genre => {
    console.log(genre.dataValues.genre)
    if(genre.dataValues.genre === req.params.genre){
        console.log("match")
        next()
    }
});
// return res.status(400).send(`${req.params.genre} does not match any genres`)*/