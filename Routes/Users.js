const { Router } = require('express')
const userRouter = Router()
const User = require('../models/User')

userRouter.post('/', async(req,res)=>{
    const user = await User.create(req.body)
    res.status(200).send({user})
})