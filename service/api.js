import Axios from 'axios'

const vm = this
const axios = Axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    crossorigin: 'true',
  },
})

class Api {
  async login(username, password) {
    return await axios
      .post(
        'login',
        new URLSearchParams({
          username, // 'daniel'
          password, // 'senha123'
        })
      )
      .then((res, err) => {
        this.token = res.data.access_token
        localStorage.setItem('token', res.data.access_token)
        return res
      })
      .catch(() => {
        vm.$router.push('/login')
      })
  }

  async loagImages() {
    const token = localStorage.getItem('token')
    return await axios
      .get('image', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data
      })
      .catch(() => {
        vm.$router.push('/login')
      })
  }

  async loadNotices() {
    const token = localStorage.getItem('token')
    return await axios
      .get('notice', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data
      })
      .catch(() => {
        vm.$router.push('/login')
      })
  }
}

export default new Api()
