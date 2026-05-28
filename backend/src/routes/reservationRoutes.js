const express = require('express')

const router = express.Router()

const {

  createReservation,
  getReservations,
  getAvailableHours,
  cancelReservation

} = require('../controllers/reservationController')

const verifyToken = require('../middlewares/authMiddleware')

const roleMiddleware = require('../middlewares/roleMiddleware')

router.post(
  '/',
  verifyToken,
  roleMiddleware(['CLIENTE']),
  createReservation
)

router.get(
  '/',
  verifyToken,
  getReservations
)

router.get(
  '/available/:barberId',
  getAvailableHours
)

router.put(
  '/cancel/:id',
  verifyToken,
  cancelReservation
)

module.exports = router