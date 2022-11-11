const { Router } = require('express')
const userRouter = Router()
const {User,Show} = require('../models/index')
const getUser = require('../middleware/getUser')
const getShow = require('../middleware/getShow')

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
userRouter.get('/:userId', getUser, async(req,res)=>{
    res.status(200).send(req.user)
})
//return the shows a user has watched
userRouter.get('/:userId/shows', async(req,res)=>{
    const shows = await Show.findAll({where: {userId: req.params.userId}})
    res.status(200).send({shows})
})

//add a show to a user if they've watched it
userRouter.put('/:userId/shows/:showId',getUser, getShow, async(req,res)=>{
    req.show.update({userId: req.params.userId})
    res.status(200).send(`${req.user.username} has now watched ${req.show.title}`)
})

module.exports = userRouter;