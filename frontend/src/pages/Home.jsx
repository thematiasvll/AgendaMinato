import { Link } from 'react-router-dom'
import '../styles/home.css'

const Home = () => {

  return (

    <div className="home-container">

      <nav className="navbar">

        <h1 className="logo">
          AgendaMinato 💈
        </h1>

        <div className="nav-links">

          <Link to="/login">
            Iniciar sesión
          </Link>

          <Link
            to="/register"
            className="register-btn"
          >
            Registrarse
          </Link>

        </div>

      </nav>

      <section className="hero-section">

        <div className="hero-content">

          <h2>
            Reserva tu barbería
            <span>
              fácil y rápido
            </span>
          </h2>

          <p>

            Agenda citas, administra barberos
            y organiza reservas en tiempo real.

          </p>

          <div className="hero-buttons">

            <Link
              to="/register"
              className="start-btn"
            >
              Comenzar
            </Link>

            <Link
              to="/login"
              className="login-btn"
            >
              Ya tengo cuenta
            </Link>

          </div>

        </div>

      </section>

    </div>

  )

}

export default Home