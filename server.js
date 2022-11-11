const express = require('express');
const showsRouter = require('./Routes/Shows');
const app = express()
const userRouter = require("./Routes/Users");

app.use("/users", userRouter);
app.use("/shows", showsRouter);

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})