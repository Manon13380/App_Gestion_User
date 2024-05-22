const express = require('express')
const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter');

const app = express()
require('dotenv').config();
//pour le server puisse récupérer les données du client
app.use(express.json())
//pour que le server accède au router
app.use(userRouter)
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

