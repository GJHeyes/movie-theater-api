const { Router } = require('express')
const showsRouter = Router()
const Show = require('../models/Show')
const checkUpdate = require('../middleware/checkUpdate')
const {param} = require('express-validator')

showsRouter.post('/', async(req,res)=>{
    const show = await Show.create(req.body)
    res.status(200).send({show})
})

//find all shows
showsRouter.get('/', async(req,res)=>{
    const shows = await Show.findAll()
    res.status(200).send({shows})
})

//find one show
showsRouter.get('/:id', async(req,res)=>{
    const show = await Show.findByPk(id)
    res.status(200).send({show})
})

//return all shows with a certain genre
showsRouter.get('/genres/:genre', async(req,res)=>{
    const show = await Show.findAll(genre)
    res.status(200).send({show})
})

//update show to watched
showsRouter.put('/:id/watched', async(req,res)=>{
    const show = await Show.findByPk(id)
    res.status(200).send({show})
})

//update show to ongoing or cancelled
showsRouter.put(
    '/:id/updates/:update',
    param('update').isLength({min: 5, max: 25}),
    checkUpdate,
    async(req,res)=>{
    const show = await Show.findByPk(id)
    res.status(200).send({show})
})

//delete a show
showsRouter.delete('/:id', async(req,res)=>{
    const show = await Show.findByPk(id)
    res.status(200).send({show})
})

module.exports = showsRouter;