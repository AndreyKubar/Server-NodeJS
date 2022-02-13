const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const { UserController } = require('../controllers/userController');
const { AuthController } = require('../controllers/auth');
const {
  signUpSchema,
  signInSchema,
  createUserSchema,
  updateUserSchema,
} = require('../validation/index');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/user', authMiddleware, validator.body(createUserSchema), UserController.createUser);
router.get('/user', authMiddleware, UserController.getUsers);
router.get('/user/:id', authMiddleware, UserController.getOneUser);
router.put('/user/:id', authMiddleware, validator.body(updateUserSchema), UserController.updateUser);
router.delete('/user/:id', authMiddleware, UserController.deleteUser);

router.post('/signUp', validator.body(signUpSchema), AuthController.signUp);
router.post('/signIn', validator.body(signInSchema), AuthController.signIn);

module.exports = router;