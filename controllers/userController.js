const userModel = require('../models/userModel')

// fonction pour la création d'un utilisateur
exports.postUser = async (req, res) => {
    try {
        let newUser = new userModel(req.body)
        newUser.validateSync();
        await newUser.save()
        res.json(newUser)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

exports.getUserById = async (req,res)=>{
    try {
        let user = await userModel.findById({_id : req.params.userId })
        res.json(user)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

exports.updateUser = async (req, res)=>{
    try {
        let updatedUser = await userModel.updateOne({_id: req.params.userId}, req.body)
        res.json(updatedUser)
    } catch (error) {
      console.log(error)
      res.send(error) 
    }
}

exports.deleteUser = async (req, res)=>{
    try {
        await userModel.deleteOne({_id: req.params.userId})
         res.json("L'utilisateur à bien été supprimé")
    } catch (error) { 
        console.log(error)
        res.send(error)
    }
}