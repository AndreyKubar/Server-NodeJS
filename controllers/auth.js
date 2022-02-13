const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');


const generateToken = (id) => {
    const payload = { id };
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
  }

class AuthController {
  static async signUp(req, res) {
    try {
      const candidate = await User.findOne({ where: { email: req.body.email } });

      if (candidate) {
        res.status(409).json({
          message: "This email is exist."
        });
      } else {
        const salt = bcrypt.genSaltSync(3)
        const password = req.body.password

        const user = new User({
          fullname: req.body.fullname,
          email: req.body.email,
          password: bcrypt.hashSync(password, salt),
          salt: salt,
          dob: req.body.dob,
        })

        const token = generateToken(user._id);

        await user.save();
        res.status(201).json({ token });
      }

    } catch (e) {
      return e;
    }
  }


  static async signIn(req, res) {
    try {
      const candidate = await User.findOne({ email: req.body.email });

      if (candidate) {
        const hashPassword = bcrypt.hashSync(req.body.password, candidate.salt);
        const passwordResult = hashPassword === candidate.password

        if (passwordResult) {
          const token = generateToken(candidate._id);
          return res.json({ token });

        } else {
          res.status(401).json({
            message: "Passwords do not match"
          });
        }
      } else {
        res.status(404).json({
          message: "User not found"
        });
      }
    } catch (e) {
      return e;
    }
  }
};


module.exports = {
  AuthController,
};