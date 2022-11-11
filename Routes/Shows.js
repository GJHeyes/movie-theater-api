const { Router } = require('express')
const showsRouter = Router()
const {Show} = require('../models/index')
const checkErrors = require('../middleware/checkErrors')
const getShow = require('../middleware/getShow')
const checkGenre = require('../middleware/checkGenre')
const {param} = require('express-validator')

//find all shows
showsRouter.get('/', async(req,res)=>{
    const shows = await Show.findAll()
    res.status(200).send({shows})
})

//find one show
showsRouter.get('/:showId', getShow, async(req,res)=>{
    res.status(200).send(req.show)
})

//return all shows with a certain genre
showsRouter.get('/genres/:genre',
    checkGenre,
    async(req,res)=>{
    res.status(200).send({show})
})

//update show to watched
showsRouter.put('/:showId/watched', getShow, async(req,res)=>{
    await req.show.update({status: "watched"})
    res.status(200).send(`${req.show.title} has now been ${req.show.status}`)
})

//change rating
showsRouter.put(
    '/:showId/:rating', 
    param('rating').notEmpty().isNumeric(),
    checkErrors,
    getShow, 
    async(req,res)=>{
    await req.show.update({rating: req.params.rating})
    res.status(200).send(`${req.show.title} has now been updated to a ${req.show.rating} rating`)
})

//update show to ongoing or cancelled
showsRouter.put(
    '/:showId/updates/:update',
    param('update').isLength({min: 5, max: 25}).notEmpty().isAlpha(undefined,{ignore:'-'}),
    checkErrors,
    getShow,
    async(req,res)=>{
        if(req.show.status === req.params.update){
            return res.status(400).send(`${req.show.title} is already ${req.params.update}`)
        }
    await req.show.update({status: req.params.update.toLowerCase()})
    res.status(200).send(`${req.show.title} is now ${req.show.status}`)
})

//delete a show
showsRouter.delete('/:showId', getShow, async(req,res)=>{
    await req.show.destroy()
    res.status(200).send(`${req.show.title} has been removed`)
})

module.exports = showsRouter;