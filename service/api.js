import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'http://localhost:8080/',
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
        if (err) {
          console.log('ERRO')

          console.error(err)
        }
        console.log('token')
        this.token = res.data.access_token
        localStorage.setItem('token', res.data.access_token)
      })
      .catch((erro) => {
        console.log(erro)
        throw erro
      })
  }

  async getUserData() {
    const token = localStorage.getItem('token')
    return await axios
      .get('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data
        return user
      })
      .catch((e) => {
        throw e
      })
  }

  async saveImage(name, link) {
    const image = {
      name,
      link,
    }
    const token = localStorage.getItem('token')
    return await axios
      .post('/api/image', JSON.stringify(image), {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-Type': 'application/json',
        },
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        const error = err.response
        const message = error.data.message
        throw message
      })
  }

  async deleteImage(image) {
    const id = image.id
    const token = localStorage.getItem('token')
    return await axios
      .delete(`/api/image?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          crossorigin: 'true',
        },
      })
      .then((res) => {
        return res
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
      .get('/api/image', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data
      })
      .catch((e) => {
        throw e
      })
  }

  async saveUser(username, password) {
    const user = {
      username,
      password,
    }
    return await axios
      .post('/api/user/save', user)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        const error = err.response
        const message = error.data.message
        throw message
      })
  }

  async loadNotices() {
    const token = localStorage.getItem('token')
    return await axios
      .get('/api/notice', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const notices = res.data
        return notices
          .map((n) => {
            const paymentsValues = n.payments.map((p) => p.value)
            if (paymentsValues.length > 0) {
              n.total = paymentsValues.reduce((a, b) => a + b)
            }
            n.show = false
            return n
          })
          .sort((a, b) => (a.host > b.host ? 1 : -1))
      })
      .catch((e) => {
        throw e
      })
  }

  async updateNoticeProcess(notice) {
    const token = localStorage.getItem('token')
    return await axios
      .put(
        `/api/notice/process?noticeId=${notice.id}&processNumber=${notice.processNumber}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        const error = err.response
        const message = error.data.message
        throw message
      })
  }

  async updateNotice(notice) {
    const token = localStorage.getItem('token')
    return await axios
      .put('/api/notice', JSON.stringify(notice), {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-Type': 'application/json',
        },
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        const error = err.response
        const message = error.data.message
        throw message
      })
  }

  async updateUser(user) {
    console.log(user)
    const token = localStorage.getItem('token')
    return await axios
      .put('/api/user', JSON.stringify(user), {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-Type': 'application/json',
        },
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        const error = err.response
        const message = error.data.message
        throw message
      })
  }

  async addPayment(noticeId, payment) {
    const token = localStorage.getItem('token')
    return await axios
      .post(
        `/api/notice/add-payment?idNotice=${noticeId}&value=${payment}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        const error = err.response
        const message = error.data.message
        throw message
      })
  }

  async loadImages() {
    const token = localStorage.getItem('token')
    return await axios
      .get('/api/image', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data
      })
      .catch((e) => {
        throw e
      })
  }

  async addLink(imageId, link) {
    const token = localStorage.getItem('token')
    return await axios
      .post(
        '/api/notice',
        { imageId, links: [link] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        throw err
      })
  }

  async setImageToNotice(idNotice, idImage) {
    const token = localStorage.getItem('token')
    return await axios
      .post('/api/notice/add-image-on-notice', null, {
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

  async getCompanies() {
    const token = localStorage.getItem('token')
    return await axios
      .get('/api/company', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const companies = res.data
        return companies
      })
      .catch((e) => {
        throw e
      })
  }

  async updateCompany(company) {
    const token = localStorage.getItem('token')
    return await axios
      .put('/api/company', JSON.stringify(company), {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-Type': 'application/json',
        },
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        const error = err.response
        const message = error.data.message
        throw message
      })
  }
}

export default new Api()
