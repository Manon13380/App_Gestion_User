// fichier pour la création des routes de l'app
const userRouter = require('express').Router()
const userController = require('../controllers/userController')

userRouter.get('/', userController.getSubscribe )
userRouter.post('/postUser', userController.postUser)
userRouter.get('/user/:userId', userController.getUserById)
userRouter.put('/updateUser/:userId', userController.updateUser)
userRouter.delete('/deleteUser/:userId', userController.deleteUser)



module.exports = userRouter