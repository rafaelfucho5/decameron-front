import axios from 'axios'

const hotelsApi = axios.create({
    baseURL: 'http://3.227.8.199/api/'
})

export const getHotels = async () => {
    const res = await hotelsApi.get('hotels')
    return res.data
}

export const createHotel = (hotel) => hotelsApi.post('hotels', hotel)

export const showHotel = async (id) => {
    const res = await hotelsApi.get(`hotels/${id}`)
    return res.data
}

export const updateHotel = (hotel) => hotelsApi.put(`hotels/${hotel.id}`, hotel)

export const deleteHotel = id => hotelsApi.delete(`hotels/${id}`)