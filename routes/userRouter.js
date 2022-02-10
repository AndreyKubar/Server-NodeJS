
const Router = require('express')

const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()



router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/', userController.create)
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)
router.get('/auth', authMiddleware, userController.check)


module.exports = router