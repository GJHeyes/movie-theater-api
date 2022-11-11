const e = require('express');
const express = require('express');
const app = express()
const showsRouter = require('./Routes/Shows');
const userRouter = require("./Routes/Users");
const seed = require('./seed');

app.use(express.json())
app.use("/users", userRouter);
app.use("/shows", showsRouter);

const port = 3000//Math.floor(Math.random() * 3000 + 3000)

app.listen(port, async ()=>{
    await seed()
    console.log(`Listening on port ${port}`)
})