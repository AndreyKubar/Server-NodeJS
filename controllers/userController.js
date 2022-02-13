const bcrypt = require('bcrypt');

const { User } = require('../models');


class UserController {
  static async createUser(req, res) {
    try {
      const { fullname, email, password, dob } = req.body

      const salt = bcrypt.genSaltSync(10);

      const user = await User.create({
        fullname: fullname,
        email: email,
        password: bcrypt.hashSync(password, salt),
        salt: salt,
        dob: dob,
      })

      res.json(user);
    } catch (e) {
      return e;
    }
  };

  static async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (e) {
      return e;
    }
  };

  static async getOneUser(req, res) {
    try {
      const user = await User.findOne({ id: req.body.id });
      res.json(user);
    } catch (e) {
      return e;
    }
  };

  static async updateUser(req, res) {
    try {
      const { fullname, email, dob } = req.body

      const user = await User.update({
        fullname: fullname,
        email: email,
        dob: dob,
      },
        {
          where: {
            id: req.params.id
          }
        }
      );

      res.json(user)
    } catch (e) {
      return e;
    }
  };

  static async deleteUser(req, res) {
    try {
      const deletedUser = await User.destroy({
        where: {
          id: req.params.id
        }
      })
      res.json(deletedUser);
    } catch (e) {
      return e;
    }
  };
};

module.exports = {
  UserController,
};