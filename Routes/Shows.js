const { Router } = require('express')
const showsRouter = Router()
const {Show} = require('../models/index')
const checkUpdate = require('../middleware/checkUpdate')
const getShow = require('../middleware/getShow')
const {param} = require('express-validator')

//find all shows
showsRouter.get('/', async(req,res)=>{
    const shows = await Show.findAll()
    res.status(200).send({shows})
})

//find one show
showsRouter.get('/:id', async(req,res)=>{
    const show = await Show.findByPk(req.params.id)
    res.status(200).send({show})
})

//return all shows with a certain genre
showsRouter.get('/genres/:genre', async(req,res)=>{
    const show = await Show.findAll({where: {genre: req.params.genre}})
    res.status(200).send({show})
})

//update show to watched
showsRouter.put('/:id/watched', getShow, async(req,res)=>{
    req.show.set({status: "watched"})
    await show.save()
    res.status(200).send(`${show.title} has now been ${show.status}`)
})

//update show to ongoing or cancelled
showsRouter.put(
    '/:id/updates/:update',
    param('update').isLength({min: 5, max: 25}),
    checkUpdate,
    getShow,
    async(req,res)=>{
    req.show.set({status: req.params.update})
    res.status(200).send(`${show.title} is now ${show.status}`)
})

//delete a show
showsRouter.delete('/:id', getShow, async(req,res)=>{
    req.show.destroy()
    res.status(200).send(`${show.title} has been removed`)
})

module.exports = showsRouter;