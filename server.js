const express = require('express');
const app = express()
const showsRouter = require('./Routes/Shows');
const userRouter = require("./Routes/Users");
const seed = require('./seed');

app.use(express.json())
app.use("/users", userRouter);
app.use("/shows", showsRouter);

app.listen(3000, async ()=>{
    await seed()
    console.log("Listening on port 3000")
})