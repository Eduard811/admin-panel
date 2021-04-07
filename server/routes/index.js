const Router = require('express')
const router = new Router()
const authRoute = require('./authRoute')
const teammateRoute = require('./teammateRoute')

router.use('/auth', authRoute)
router.use('/teammate', teammateRoute)


module.exports = router