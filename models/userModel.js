const mongoose = require('mongoose')

//création d'un schéma pour la base de donnée avec tous les champs requis
const userSchema = new mongoose.Schema ({
   name : {
       type : String,
       required : [true, "Le nom de l'utilisateur est requis"]
   },
   email: {
       type : String,
       required : [true, "L'adresse mail de l'utilisateur est requis"]
   },
   password: {
       type: String,
       required : [true, "Le mot de passe de l'utilisateur est requis"]
   }
})

//Création d'un modèle avec export pour utilisation dans le controller
const userModel = mongoose.model('users', userSchema)
module.exports = userModel