import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://app-restaurante-italiano.vercel.app/',
  withCredentials: true
})
