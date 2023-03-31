import axios from 'axios'

const hotelsApi = axios.create({
    baseURL: 'http://3.238.147.160/api/'
})

export const getRooms = async (hotelId) => {
    const res = await hotelsApi.get(`hotels/${hotelId}/rooms`)
    return res.data
}
export const createRoom = (room) => hotelsApi.post(`hotels/${room.hotel_id}/rooms`, room)

export const showRoom = async (hotelId,roomId) => {
    const res = await hotelsApi.get(`hotels/${hotelId}/rooms/${roomId}`)
    return res.data
}

export const updateRoom = (room) => hotelsApi.put(`hotels/${room.hotel_id}/rooms/${room.id}`, room)

export const deleteRoom = (room) => hotelsApi.delete(`hotels/${room.hotel_id}/rooms/${room.id}`)