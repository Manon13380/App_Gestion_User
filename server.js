// file to start and configure an HTTP server
const express = require('express')
const session = require ('express-session')
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter');

const app = express()
//used to load and configure the dotenv module to create and access environment variables
require('dotenv').config();
// method to parse URL-encoded data sent by the client and transform it into a JavaScript object
app.use(express.urlencoded({extended : true}))
// method to use express session to log the user into session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
//method to access the router
app.use(userRouter)
app.use(express.static("./assets"))
//method to connect to the port
app.listen(process.env.PORT, (err)=> {
    if(!err){
        console.log('Connexion au port réussi')
    }
    else {
        console.log(err)
    }
})

// method to connect to the database
mongoose.connect(process.env.URIBDD).then(() => {
    console.log("Connexion à la DataBase réussi");
}).catch((err) => {
    console.log(err);
})

