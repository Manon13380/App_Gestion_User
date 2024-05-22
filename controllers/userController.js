// fichier qui contient tous le code back de l'appli

const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')


// render de la page inscription
exports.getSubscribe = (req, res) => {
    try {
        res.render("subscribe/index.html.twig", {
            uri: req.path,
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
// render de la page connexion
exports.getConnexion = (req, res) => {
    try {
        res.render("connexion/index.html.twig", {
            uri: req.path,
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

//render page profil
exports.getProfile = (req, res) => {
    try {
        res.render("profile/index.html.twig", {
            uri: req.path,
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


exports.postLogin = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email })
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                req.session.user = user._id
                res.redirect("/userprofile")
            }
            else {
                throw { password: "Mauvais mot de passe" }
            }
        }
        else {
            throw { email: "Cet utilisateur n'est pas enregistré" }
        }
    } catch (error) {
        console.log(error)
        res.render('connexion/index.html.twig', {
            error: error,
            uri: req.path,
        })
    }
}
// fonction pour la création d'un utilisateur
exports.postUser = async (req, res) => {
    try {
        let newUser = new userModel(req.body)
        newUser.validateSync();
        await newUser.save();
        res.redirect('/connexion')
    } catch (error) {
        console.log(error)
        res.render("subscribe/index.html.twig", {
            errors: error.errors,
            uri: req.path,
        })
    }
}

//fonction pour trouver un utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        let user = await userModel.findById({ _id: req.params.userId })
        res.json(user)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

//fonction pour modifié un utilisateur
exports.updateUser = async (req, res) => {
    try {
        let updatedUser = await userModel.updateOne({ _id: req.params.userId }, req.body)
        res.json(updatedUser)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

// fonction pour supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        await userModel.deleteOne({ _id: req.params.userId })
        res.json("L'utilisateur à bien été supprimé")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}