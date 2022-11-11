const { Router } = require('express')
const userRouter = Router()
const {User,Show} = require('../models/index')
const getUser = require('../middleware/getUser')

userRouter.post('/', async(req,res)=>{
    const user = await User.create(req.body)
    res.status(200).send({user})
})

//find all users
userRouter.get('/', async(req,res)=>{
    const users = await User.findAll()
    res.status(200).send({users})
})

//find one user
userRouter.get('/:id', async(req,res)=>{
    const user = await User.findByPk(id)
    res.status(200).send({user})
})
//return the shows a user has watched
userRouter.get('/:userId/shows', async(req,res)=>{
    const userMovies = await User.findByPk(id)
    res.status(200).send({userMovies})
})

//add a show to a user if they've watched it
userRouter.put('/:userId/shows/:showsId', async(req,res)=>{
    const userMovies = await User.findByPk(id)
    res.status(200).send({userMovies})
})

module.exports = userRouter;