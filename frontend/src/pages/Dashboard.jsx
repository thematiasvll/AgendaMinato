import { useEffect, useState } from 'react'

import { getBarbers } from '../services/barberService'

import ReservationModal from '../components/ReservationModal'

import '../styles/dashboard.css'

const Dashboard = () => {

  const [barbers, setBarbers] = useState([])

  const [selectedBarber, setSelectedBarber] = useState(null)

  useEffect(() => {

    loadBarbers()

  }, [])

  const loadBarbers = async () => {

    try {

      const data = await getBarbers(1)

      setBarbers(data)

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div className="dashboard-container">

      <h1 className="dashboard-title">

        Agenda tu corte 💈

      </h1>

      <div className="barbers-grid">

        {

          barbers.map((barber) => (

            <div

              className="barber-card"

              key={barber.id}

            >

              <img

                src={

                  barber.photo ||

                  'https://i.imgur.com/1X4hK9I.png'

                }

                alt={barber.name}

              />

              <h2>{barber.name}</h2>

              <p>{barber.specialty}</p>

              <button

                onClick={() => setSelectedBarber(barber)}

              >

                Reservar

              </button>

            </div>

          ))

        }

      </div>

      {

        selectedBarber && (

          <ReservationModal barber={selectedBarber} />

        )

      }

    </div>

  )

}

export default Dashboard