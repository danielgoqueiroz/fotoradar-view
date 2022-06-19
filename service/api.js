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

  async getUserData() {
    const token = localStorage.getItem('token')
    return await axios
      .get('user', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data
        console.log(user)
        return user
      })
      .catch((err) => {
        console.info('$$$$')
        console.error(JSON.parse(err))
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

  async deleteImage(image) {
    const id = image.id
    const token = localStorage.getItem('token')
    return await axios
      .delete(`image?id=${id}`, {
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

  async saveUser(username, password) {
    const user = {
      username,
      password,
    }
    return await axios
      .post('user/save', user)
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

  async loadNotices() {
    const token = localStorage.getItem('token')
    return await axios
      .get('notice', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const notices = res.data
        console.log(notices)
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
      .catch((err) => {
        console.error('Falha ao carregar notificações', err)
      })
  }

  async updateNoticeProcess(notice) {
    const token = localStorage.getItem('token')
    return await axios
      .put(
        `notice/process?noticeId=${notice.id}&processNumber=${notice.processNumber}`,
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
      .put('notice', JSON.stringify(notice), {
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
    const token = localStorage.getItem('token')
    return await axios
      .put('user', JSON.stringify(user), {
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
      .post(`notice/add-payment?idNotice=${noticeId}&value=${payment}`, null, {
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

  async addLink(imageId, link) {
    const token = localStorage.getItem('token')
    return await axios
      .post(
        'notice',
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

  async getCompanies() {
    const token = localStorage.getItem('token')
    return await axios
      .get('company', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const companies = res.data
        console.log(companies)
        return companies
      })
      .catch((err) => {
        console.log('Erro ao buscar empresas', err)
      })
  }

  async updateCompany(company) {
    const token = localStorage.getItem('token')
    return await axios
      .put('company', JSON.stringify(company), {
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
