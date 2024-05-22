const userRouter = require('express').Router()
const userController = require('../controllers/userController')

userRouter.post('/user', userController.postUser)
userRouter.get('/user/:userId', userController.getUserById)
userRouter.put('/updateUser/:userId', userController.updateUser)
userRouter.delete('/deleteUser/:userId', userController.deleteUser)



module.exports = userRouter