const router = require('express').Router()
const { verifyToken } = require('./modules/jwt')

const UserController = require('./controllers/UserController')

router.post('/user', UserController.create)
router.post('/user/login', UserController.login)
router.patch('/user', verifyToken, UserController.update)
router.delete('/user', verifyToken, UserController.delete)

module.exports = router
