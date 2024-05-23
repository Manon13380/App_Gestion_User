// file create app routes
const userRouter = require('express').Router()
const authguard = require('../customDepedencies/authguard')
const userController = require('../controllers/userController')

userRouter.get('/', userController.getSubscribe )
userRouter.get('/connexion', userController.getConnexion)
userRouter.get('/userProfile',authguard, userController.getProfile)
userRouter.get('/deleteUser/:userId', userController.deleteUser)
userRouter.post('/postLogin',userController.postLogin)
userRouter.post('/postUser', userController.postUser)
userRouter.post('/updateUser', userController.updateUser)



module.exports = userRouter