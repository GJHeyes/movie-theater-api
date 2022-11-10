const { Router } = require('express')
const showsRouter = Router()
const Show = require('../models/Show')

showsRouter.post('/', async(req,res)=>{
    const show = await Show.create(req.body)
    res.status(200).send({show})
})