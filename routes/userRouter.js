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

router.post('/user', authMiddleware, validator.body(createUserSchema), (req, res) => UserController.createUser(req, res));
router.get('/user', authMiddleware, (req, res) => UserController.getUsers(req, res));
router.get('/user/:id', authMiddleware, (req, res) => UserController.getOneUser(req, res));
router.put('/user/:id', authMiddleware, validator.body(updateUserSchema), (req, res) => UserController.updateUser(req, res));
router.delete('/user/:id', authMiddleware, (req, res) => UserController.deleteUser(req, res));

router.post('/signUp', validator.body(signUpSchema), (req, res) => AuthController.signUp(req, res));
router.post('/signIn', validator.body(signInSchema), (req, res) => AuthController.signIn(req, res));

module.exports = router;