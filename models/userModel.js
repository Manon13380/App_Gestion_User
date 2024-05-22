const mongoose = require('mongoose')

//création d'un schéma pour la base de donnée avec tous les champs requis et des reggex afin de l'utilisateur rentre des données correcte aux attentes
const userSchema = new mongoose.Schema ({
   name : {
       type : String,
       required : [true, "Le nom de l'utilisateur est requis"],
       validate: {
         validator: function (v) {
             return /^[^\>\<]+$/.test(v)
         }, message: "Entrez un nom valide"
     }
   },
   email: {
       type : String,
       required : [true, "L'adresse mail de l'utilisateur est requis"],
       validate: {
         validator: function (v) {
             return /^[a-zA-Z0-9_%+-][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
         }, message: "Entrez un mail valide"
     }
   },
   password: {
       type: String,
       required : [true, "Le mot de passe de l'utilisateur est requis"],
       validate: {
         validator: function (v) {
             return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/]).{8,}$/.test(v)
         }, message: "Entrez un mot de passe valide :<br> il faut min 8 caractère, une majuscule,<br> une minuscule et un caractère spécial sauf < ou >"
     }
   }
})

//Création d'un modèle avec export pour utilisation dans le controller
const userModel = mongoose.model('users', userSchema)
module.exports = userModel