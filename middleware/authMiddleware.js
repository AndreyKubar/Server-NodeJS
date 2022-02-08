const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function (req, res, next) {

        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.autorization.split()[1]
            if (!token) {
                return res.status(401).json({message: "Пользователь не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (!decoded.id) {
               return res.status(404).json({message: "Пользователя нет в базе"})
            }
            if (decoded.role !== role) {
                return res.status(403).json({message: "Доступ запрещен"})
    
            }
            req.user = decoded
            next()
    
        } catch (e) {
            res.status(401).json({message: "Пользователь не авторизован"})
        }
    }
}






