import { useState } from 'react'

import {

  useNavigate,

  Link

} from 'react-router-dom'

import { registerUser } from '../services/authService'

import '../styles/auth.css'

const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    name: '',
    email: '',
    password: ''

  })

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      await registerUser(formData)

      alert('Usuario registrado correctamente')

      navigate('/login')

    } catch (error) {

      alert(

        error.response?.data?.message ||

        'Error registro'

      )

    }

  }

  return (

    <div className="auth-container">

      <div className="auth-overlay"></div>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h1>
          Crear cuenta 💈
        </h1>

        <p className="auth-subtitle">

          Registra tu barbería y administra reservas

        </p>

        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />

        <button type="submit">

          Registrarse

        </button>

        <p className="auth-switch">

          ¿Ya tienes cuenta?

          <Link to="/login">

            Login

          </Link>

        </p>

      </form>

    </div>

  )

}

export default Register