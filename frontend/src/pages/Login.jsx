import { useContext, useState } from 'react'

import {

  useNavigate,

  Link

} from 'react-router-dom'

import { loginUser } from '../services/authService'

import { AuthContext } from '../context/AuthContext'

import '../styles/auth.css'

const Login = () => {

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const [formData, setFormData] = useState({

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

      const data = await loginUser(formData)

      login(data.token, data.user)

      navigate('/dashboard')

    } catch (error) {

      alert(

        error.response?.data?.message ||

        'Error login'

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
          AgendaMinato 💈
        </h1>

        <p className="auth-subtitle">

          Inicia sesión para administrar tus reservas

        </p>

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

          Iniciar sesión

        </button>

        <p className="auth-switch">

          ¿No tienes cuenta?

          <Link to="/register">

            Registrarse

          </Link>

        </p>

      </form>

    </div>

  )

}

export default Login