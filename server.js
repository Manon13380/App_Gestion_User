const express = require('express')
const session = require ('express-session')
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter');

const app = express()
require('dotenv').config();
//pour le server puisse transformer les données du client en json
app.use(express.json())
//pour le server puisse récupérer les données du client
app.use(express.urlencoded({extended : true}))
// utilisation d'express session pour mettre en session l'utilisateur
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
//pour que le server accède au router
app.use(userRouter)
app.use(express.static("./asset"))
//connexion au port
app.listen(process.env.PORT, (err)=> {
    if(!err){
        console.log('Connexion au port réussi')
    }
    else {
        console.log(err)
    }
})

// connexion à la BDD
mongoose.connect(process.env.URIBDD).then(() => {
    console.log("Connexion à la DataBase réussi");
}).catch((err) => {
    console.log(err);
})

