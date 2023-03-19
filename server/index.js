console.log("Hello World!");

// Import
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.js');
const DB = "DATABASE API";

//INIT
const app = express();
const PORT = 3000;
 
//middle ware
app.use(express.json()); 
app.use(authRouter);

mongoose.connect(DB).then(()=>{
    console.log('connection succesful');
}).catch((e)=>{
    console.log(e);
});

//GET req

app.get("/",(req,res)=>{
    res.json({greet:"Hello World!"});
});


app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Connected at Port : ${PORT}`);
});
