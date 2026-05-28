const express = require('express')

const router = express.Router()

const verifyToken = require('../middlewares/authMiddleware')

const checkRole = require('../middlewares/roleMiddleware')

const {
  adminDashboard,
  empresaDashboard,
  clienteDashboard
} = require('../controllers/dashboardController')

router.get(
  '/admin',
  verifyToken,
  checkRole('ADMIN'),
  adminDashboard
)

router.get(
  '/empresa',
  verifyToken,
  checkRole('EMPRESA'),
  empresaDashboard
)

router.get(
  '/cliente',
  verifyToken,
  checkRole('CLIENTE'),
  clienteDashboard
)

module.exports = router