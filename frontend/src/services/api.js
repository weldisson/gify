import axios from 'axios';

const api = axios.create({
    baseURL: process.env.BASE_URL || 'http://144.202.59.125:3333'
})

export default api;