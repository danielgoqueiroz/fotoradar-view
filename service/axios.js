import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.apiUrl,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    crossorigin: 'true',
  },
})

export default axios
