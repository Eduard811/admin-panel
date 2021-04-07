const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const { check } = require('express-validator')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/registration', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Слишком маленький или большой пароль').isLength({min: 4, max: 12})
], authController.registration)
router.post('/login', authController.login)
router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers)

module.exports = router 