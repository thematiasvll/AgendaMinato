const express = require('express')

const router = express.Router()

const {

  createBarber,
  getBarbers

} = require('../controllers/barberController')

const verifyToken = require('../middlewares/authMiddleware')

router.post(
  '/',
  verifyToken,
  createBarber
)

router.get(
  '/:barberShopId',
  verifyToken,
  getBarbers
)

module.exports = router