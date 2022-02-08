const { use } = require('bcrypt/promises')
const Router = require('express')
const { user } = require('pg/lib/defaults')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()



router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/', userController.create)
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.put('/', userController.update)
router.delete('/:id', userController.delete)
router.get('/auth', authMiddleware, userController.check)


module.exports = router