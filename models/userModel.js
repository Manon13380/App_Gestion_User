//file creation schema and model of the User table
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//creation of a schema for the database with required fields and use of reggex so that the user enters correct data
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
         }, message: "Entrez un mot de passe valide"
     }
   },
   bio : {
      type: String,
   }
})

//unique email verification before creating another user
userSchema.pre("validate", async function (next) {
   try {
       const existingUser = await this.constructor.findOne({ email: this.email });
       if (existingUser) {
           this.invalidate("email", "Cet email est déjà enregistré.")
       }
       next()
   } catch (error) {
       next(error)
   }
})

// password hash at user creation
userSchema.pre("save", function ( next) {
   bcrypt.hash(this.password, 10, (error, hash)=>{
       if(error){
           return next(error);
       }
       this.password = hash;
       next()
   })
})

//Creating a model with export for use in the controller
const userModel = mongoose.model('users', userSchema)
module.exports = userModel