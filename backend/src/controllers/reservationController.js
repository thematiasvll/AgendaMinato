const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createReservation = async (req, res) => {

  try {

    const {
      barberId,
      date
    } = req.body

    const reservationDate = new Date(date)

    const now = new Date()

    if (reservationDate < now) {

      return res.status(400).json({

        message: 'No puedes reservar fechas pasadas'

      })

    }

    const existingReservation = await prisma.reservation.findFirst({

      where: {

        barberId: Number(barberId),

        date: reservationDate,

        status: {

          not: 'CANCELADA'

        }

      }

    })

    if (existingReservation) {

      return res.status(400).json({

        message: 'Esta hora ya está reservada'

      })

    }

    const reservation = await prisma.reservation.create({

      data: {

        userId: req.user.id,

        barberId: Number(barberId),

        date: reservationDate

      }

    })

    res.status(201).json({

      message: 'Reserva creada correctamente',

      reservation

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: 'Error al crear reserva'

    })

  }

}

const getReservations = async (req, res) => {

  try {

    const reservations = await prisma.reservation.findMany({

      include: {

        user: true,

        barber: true

      },

      orderBy: {

        date: 'asc'

      }

    })

    res.json(reservations)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: 'Error obteniendo reservas'

    })

  }

}

const getAvailableHours = async (req, res) => {

  try {

    const { barberId } = req.params

    const { date } = req.query

    if (!date) {

      return res.status(400).json({

        message: 'Debes enviar una fecha'

      })

    }

    const startDate = new Date(date)

    startDate.setHours(0, 0, 0, 0)

    const endDate = new Date(date)

    endDate.setHours(23, 59, 59, 999)

    const reservations = await prisma.reservation.findMany({

      where: {

        barberId: Number(barberId),

        date: {

          gte: startDate,

          lte: endDate

        },

        status: {

          not: 'CANCELADA'

        }

      }

    })

    const allHours = [

      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00'

    ]

    const reservedHours = reservations.map((reservation) => {

      return reservation.date.toISOString().substring(11, 16)

    })

    const availableHours = allHours.filter((hour) => {

      return !reservedHours.includes(hour)

    })

    res.json({

      barberId,

      date,

      availableHours

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: 'Error obteniendo horas disponibles'

    })

  }

}

const cancelReservation = async (req, res) => {

  try {

    const { id } = req.params

    const reservation = await prisma.reservation.update({

      where: {

        id: Number(id)

      },

      data: {

        status: 'CANCELADA'

      }

    })

    res.json({

      message: 'Reserva cancelada correctamente',

      reservation

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: 'Error cancelando reserva'

    })

  }

}

module.exports = {

  createReservation,

  getReservations,

  getAvailableHours,

  cancelReservation

}