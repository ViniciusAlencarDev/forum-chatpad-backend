const router = require('express').Router()

const UserController = require('./controllers/UserController')

router.post('/user/create', UserController.create)

module.exports = router
