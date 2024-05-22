// fichier pour la création des routes de l'app
const userRouter = require('express').Router()
const authguard = require('../customDepedencies/authguard')
const userController = require('../controllers/userController')

userRouter.get('/', userController.getSubscribe )
userRouter.get('/connexion', userController.getConnexion)
userRouter.get('/userProfile',authguard, userController.getProfile)
userRouter.post('/userProfile',userController.postLogin)
userRouter.post('/postUser', userController.postUser)

userRouter.get('/user/:userId', userController.getUserById)
userRouter.put('/updateUser/:userId', userController.updateUser)
userRouter.delete('/deleteUser/:userId', userController.deleteUser)



module.exports = userRouter