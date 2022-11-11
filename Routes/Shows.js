const { Router } = require('express')
const showsRouter = Router()
const {Show} = require('../models/index')
const checkErrors = require('../middleware/checkErrors')
const getShow = require('../middleware/getShow')
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
showsRouter.get('/genres/:genre', async(req,res)=>{
    const show = await Show.findAll({where: {genre: req.params.genre}})
    res.status(200).send({show})
})

//update show to watched
showsRouter.put('/:showId/watched', getShow, async(req,res)=>{
    req.show.set({status: "watched"})
    await req.show.save()
    res.status(200).send(`${req.show.title} has now been ${req.show.status}`)
})

//change rating
showsRouter.put(
    '/:showId/:rating', 
    param('rating').not().isEmpty(),
    param('rating').isNumeric(),
    checkErrors,
    getShow, 
    async(req,res)=>{
    req.show.set({rating: req.params.rating})
    await req.show.save()
    res.status(200).send(`${req.show.title} has now been updated to a ${req.show.rating} rating`)
})

//update show to ongoing or cancelled
showsRouter.put(
    '/:showId/updates/:update',
    param('update').isLength({min: 5, max: 25}),
    param('update').not().isEmpty(),
    param('update').isAlpha(),
    checkErrors,
    getShow,
    async(req,res)=>{
    req.show.set({status: req.params.update.toLowerCase()})
    req.show.save()
    res.status(200).send(`${req.show.title} is now ${req.show.status}`)
})

//delete a show
showsRouter.delete('/:showId', getShow, async(req,res)=>{
    req.show.destroy()
    res.status(200).send(`${req.show.title} has been removed`)
})

module.exports = showsRouter;