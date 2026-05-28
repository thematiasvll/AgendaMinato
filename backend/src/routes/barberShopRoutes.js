const express = require('express')

const router = express.Router()

const {

  createBarberShop,
  getBarberShop

} = require('../controllers/barberShopController')

const verifyToken = require('../middlewares/authMiddleware')

router.post(
  '/',
  verifyToken,
  createBarberShop
)

router.get(
  '/:id',
  getBarberShop
)

module.exports = router