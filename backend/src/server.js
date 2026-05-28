require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

const authRoutes = require('./routes/authRoutes')
const barberShopRoutes = require('./routes/barberShopRoutes')
const barberRoutes = require('./routes/barberRoutes')
const reservationRoutes = require('./routes/reservationRoutes')

app.use(cors())

app.use(express.json())

app.use('/api/auth', authRoutes)

app.use('/api/barbershops', barberShopRoutes)

app.use('/api/barbers', barberRoutes)

app.use('/api/reservations', reservationRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {

  console.log(`Servidor corriendo en puerto ${PORT}`)

})