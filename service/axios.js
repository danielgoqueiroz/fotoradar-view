import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    crossorigin: 'true',
  },
})

export default axios
