const express = require('express')

const router = express.Router()

const verifyToken = require('../middlewares/authMiddleware')

const checkRole = require('../middlewares/roleMiddleware')

const {

  createBarber,
  getBarbers

} = require('../controllers/barberController')

router.post(
  '/',
  verifyToken,
  checkRole('EMPRESA'),
  createBarber
)

router.get(
  '/:barberShopId',
  verifyToken,
  checkRole('EMPRESA'),
  getBarbers
)

module.exports = router