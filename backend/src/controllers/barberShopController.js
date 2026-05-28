const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createBarberShop = async (req, res) => {

  try {

    const {
      name,
      description,
      address,
      phone,
      logo
    } = req.body

    const existingShop = await prisma.barberShop.findUnique({

      where: {
        ownerId: req.user.id
      }

    })

    if (existingShop) {

      return res.status(400).json({

        message: 'Ya tienes una barbería creada'

      })

    }

    const barberShop = await prisma.barberShop.create({

      data: {

        name,
        description,
        address,
        phone,
        logo,

        ownerId: req.user.id

      }

    })

    res.status(201).json({

      message: 'Barbería creada correctamente',

      barberShop

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: 'Error creando barbería'

    })

  }

}

const getBarberShop = async (req, res) => {

  try {

    const barberShop = await prisma.barberShop.findUnique({

      where: {
        id: Number(req.params.id)
      },

      include: {
        barbers: true
      }

    })

    if (!barberShop) {

      return res.status(404).json({

        message: 'Barbería no encontrada'

      })

    }

    res.json(barberShop)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: 'Error obteniendo barbería'

    })

  }

}

module.exports = {

  createBarberShop,
  getBarberShop

}