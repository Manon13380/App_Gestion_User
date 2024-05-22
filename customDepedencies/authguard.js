// fichier authguard qui permet de voir si un utilisateur est en session sinon renvoie à la page de conenxtion
const userModel = require('../models/userModel')
const session = require('express-session')

const authguard = async (req, res, next) => {
    try {
        if (req.session.user) {
            let user = await userModel.findOne({ _id: req.session.user });
            if (user) {
                return next()
            }
        }
        throw new Error("utilisateur non connecté");
    } catch (error) {
        res.status(401).render('connexion/index.html.twig', {
            errorAuth: error.message
        })
    }
}

module.exports = authguard