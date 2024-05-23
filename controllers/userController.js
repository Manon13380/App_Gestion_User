// File to manage requests and responses

const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')


// display subscribe page
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
// display connexion page
exports.getConnexion = (req, res) => {
    try {
        req.session.destroy();
        res.render("connexion/index.html.twig", {
            uri: req.path,
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

//display profile page
exports.getProfile = async (req, res) => {
    try {
        let user = await userModel.findOne({_id : req.session.user})
        res.render("profile/index.html.twig", {
            uri: req.path,
            user : user
        })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

//function user login
exports.postLogin = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email })
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                req.session.user = user._id
                res.redirect("/userProfile")
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

// function create user
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


//function update user
exports.updateUser = async (req, res) => {
    try {
        await userModel.updateOne({ _id: req.session.user }, req.body)
        res.redirect("/userProfile")
    } catch (error) {
        res.render('profile/index.html.twig', {
            errorUpdate: 'un problème est survenue pendant la modification',
        })
    }
}

// function delete user
exports.deleteUser = async (req, res) => {
    try {
        await userModel.deleteOne({ _id: req.params.userId })
        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}