const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const prisma = require('../config/prisma')

const register = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body

    if (!name || !email || !password) {

      return res.status(400).json({

        message: 'Todos los campos son obligatorios'

      })

    }

    const existingUser = await prisma.user.findUnique({

      where: {
        email
      }

    })

    if (existingUser) {

      return res.status(400).json({

        message: 'El correo ya está registrado'

      })

    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({

      data: {

        name,
        email,
        password: hashedPassword

      }

    })

    res.status(201).json({

      message: 'Usuario registrado correctamente',

      user

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: 'Error registrando usuario'

    })

  }

}

const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body

    const user = await prisma.user.findUnique({

      where: {
        email
      }

    })

    if (!user) {

      return res.status(400).json({

        message: 'Usuario no encontrado'

      })

    }

    const validPassword = await bcrypt.compare(

      password,
      user.password
    )

    if (!validPassword) {

      return res.status(400).json({

        message: 'Contraseña incorrecta'

      })

    }

    const token = jwt.sign(

      {
        id: user.id,
        role: user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn: '7d'
      }

    )

    res.json({

      token,

      user

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message: 'Error login'

    })

  }

}

module.exports = {

  register,
  login

}