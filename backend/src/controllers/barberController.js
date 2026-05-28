const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createBarber = async (req, res) => {
  try {
    const { name, photo, specialty, barberShopId } = req.body

    const totalBarbers = await prisma.barber.count({
      where: { barberShopId }
    })

    if (totalBarbers >= 5) {
      return res.status(400).json({
        message: 'Plan máximo alcanzado. Debes pagar adicional.'
      })
    }

    const barber = await prisma.barber.create({
      data: { name, photo, specialty, barberShopId }
    })

    res.status(201).json({
      message: 'Barbero creado correctamente',
      barber
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creando barbero', error: error.message })
  }
}

const getBarbers = async (req, res) => {
  try {
    const { barberShopId } = req.params
    const barbers = await prisma.barber.findMany({
      where: { barberShopId: Number(barberShopId) }
    })

    res.json(barbers)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error obteniendo barberos', error: error.message })
  }
}

module.exports = { createBarber, getBarbers }
