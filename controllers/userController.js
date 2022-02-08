const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        )
}

class UserController {
    async registration(req, res, next) {
        const {fullname, email, dob, password, role} = req.body
        if (!email ) {
            return next(ApiError.badRequest('Все поля должны быть заполнены'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже зарегистрирован'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({fullname, email, dob, password: hashPassword, role})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})

    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user) {
            return next(ApiError.internal('Пользователь с таким именем не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('ВВеден неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async create(req, res) {
        const {fullname, email, dob, password} = req.body
        const user = await User.create({fullname, email, dob, password: hashPassword})
        return res.json({user})
    }

    async getAll(req, res) {
        const users = await User.findAll()
        return res.json(users)
    }

    async getOne(req, res) {
        const {id} = req.params
        if(!id) {
            return res.status(403).json({message: "Id не указан"})
        }
        const user = await User.findOne(
            {where: {id}}
        )
        res.json(user)
    }



    async update(req, res) {
        const {id} = req.params
        const user = req.body
        // if(!id) {
        //     res.status(400).json({message: "Id не указан"})
        // }
        const updatedUser = await User.update(user, {where: {id: user.id}})
        // const updatedUser = await User.update({where: {id: user.id}})

        return res.json({updatedUser})
    }


    async delete(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json({message: "Id не указан"})
            }
            const destroyUser = await User.destroy(
                {where: {id}}
            )
            res.json(destroyUser)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}


module.exports = new UserController()