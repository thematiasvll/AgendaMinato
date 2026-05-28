import { useEffect, useState } from 'react'

import {

  getAvailableHours,

  createReservation

} from '../services/reservationService'

const ReservationModal = ({ barber }) => {

  const [hours, setHours] = useState([])

  const [selectedHour, setSelectedHour] = useState('')

  useEffect(() => {

    loadHours()

  }, [])

  const loadHours = async () => {

    try {

      const data = await getAvailableHours(barber.id)

      setHours(data.availableHours)

    } catch (error) {

      console.log(error)

    }

  }

  const handleReservation = async () => {

    if (!selectedHour) {

      return alert('Selecciona una hora')

    }

    try {

      const today = new Date().toISOString().split('T')[0]

      const fullDate = `${today}T${selectedHour}:00`

      await createReservation({

        barberId: barber.id,

        date: fullDate

      })

      alert('Reserva creada 💈')

      loadHours()

    } catch (error) {

      alert(

        error.response?.data?.message ||

        'Error reservando'

      )

    }

  }

  return (

    <div className="reservation-box">

      <h3>

        Reservar con {barber.name}

      </h3>

      <select

        value={selectedHour}

        onChange={(e) => setSelectedHour(e.target.value)}

      >

        <option value="">

          Selecciona una hora

        </option>

        {

          hours.map((hour) => (

            <option

              key={hour}

              value={hour}

            >

              {hour}

            </option>

          ))

        }

      </select>

      <button onClick={handleReservation}>

        Reservar

      </button>

    </div>

  )

}

export default ReservationModal