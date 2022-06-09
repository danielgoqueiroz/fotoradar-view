import Axios from 'axios'

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
      })
      .catch((erro) => {
        throw erro
      })
  }

  async saveImage(name, link) {
    const image = {
      name,
      link,
    }
    const token = localStorage.getItem('token')
    return await axios
      .post('image', JSON.stringify(image), {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data)
        return res.data
      })
      .catch((err) => {
        const error = err.response
        const message = error.data.message
        throw message
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
        console.log('Login inválido')
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
        console.log('Login inválido')
      })
  }

  async loadImages() {
    const token = localStorage.getItem('token')
    return await axios
      .get('image', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data
      })
      .catch(() => {
        console.log('Login inválido')
      })
  }

  async setImageToNotice(idNotice, idImage) {
    console.log(idNotice)
    console.log(idImage)
    const token = localStorage.getItem('token')
    return await axios
      .post('/notice/add-image-on-notice', null, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          idNotice,
          idImage,
        },
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        throw err
      })
  }
}

export default new Api()
