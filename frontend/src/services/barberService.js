import axios from 'axios'

const API_URL = 'http://localhost:5000/api/barbers'

export const getBarbers = async (barberShopId) => {

  const token = localStorage.getItem('token')

  const response = await axios.get(

    `${API_URL}/${barberShopId}`,

    {

      headers: {

        Authorization: `Bearer ${token}`

      }

    }

  )

  return response.data

}