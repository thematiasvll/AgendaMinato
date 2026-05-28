import axios from 'axios'

const API_URL = 'http://localhost:5000/api/reservations'

const getToken = () => {

  return localStorage.getItem('token')

}

export const getAvailableHours = async (barberId) => {

  const response = await axios.get(

    `${API_URL}/available/${barberId}`,

    {

      headers: {

        Authorization: `Bearer ${getToken()}`

      }

    }

  )

  return response.data

}

export const createReservation = async (data) => {

  const response = await axios.post(

    API_URL,

    data,

    {

      headers: {

        Authorization: `Bearer ${getToken()}`

      }

    }

  )

  return response.data

}