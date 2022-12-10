import axios from './axios'

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

  async getImage(id) {
    const token = localStorage.getItem('token')
    return await axios
      .get(`/api/image/find-by-id?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data
      })
      .catch((e) => {
        console.error(e)
        throw e
      })
  }

  async getPageId(id) {
    const token = localStorage.getItem('token')
    return await axios
      .get(`/api/page/find-by-id?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res)
        return res.data
      })
      .catch((e) => {
        console.error('Errro')

        console.error(e)
        throw e
      })
  }

  async getCompanyId(id) {
    const token = localStorage.getItem('token')
    return await axios
      .get(`/api/company/find-by-id?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res)
        return res.data
      })
      .catch((e) => {
        console.error('Errro')

        console.error(e)
        throw e
      })
  }

  async getPagesByImageId(id) {
    const token = localStorage.getItem('token')
    return await axios
      .get(`/api/page/find-by-image-id?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res)
        return res.data
      })
      .catch((e) => {
        console.error('Errro')

        console.error(e)
        throw e
      })
  }

  async loadPages() {
    const token = localStorage.getItem('token')
    return await axios
      .get('/api/page', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('carregando paginas')
        console.log(res)
        const pages = res.data
        return pages
      })
      .catch((e) => {
        console.error(e)
        throw e
      })
  }

  async loadProcesses() {
    const token = localStorage.getItem('token')
    return await axios
      .get('/api/process', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('carregando processos')
        const processes = res.data
        return processes
      })
      .catch((e) => {
        console.error(e)
        throw e
      })
  }

  async loadProcessById(id) {
    const token = localStorage.getItem('token')
    return await axios
      .get(`/api/process/find-by-id?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data
      })
      .catch((e) => {
        console.error(e)
        throw e
      })
  }

  async addPaymentOnProcess(id, value, date) {
    const token = localStorage.getItem('token')
    return await axios
      .get(`/api/process/add-payment?id=${id}&value=${value}&date=${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data
      })
      .catch((e) => {
        console.error(e)
        throw e
      })
  }

  async saveProcess(pageId, processNumber) {
    const token = localStorage.getItem('token')
    return await axios
      .put(
        `/api/page/process?pageId=${pageId}&processNumber=${processNumber}`,
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

  async updatePageProcess(page) {
    const token = localStorage.getItem('token')
    return await axios
      .put(
        `/api/page/process?pageId=${page.id}&processNumber=${page.processNumber}`,
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

  async updateProcessNumber(pageId, processNumber) {
    const token = localStorage.getItem('token')
    return await axios
      .put(
        `/api/page/update-process?id=${pageId}&processNumber=${processNumber}`,
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

  async updatePage(page) {
    const token = localStorage.getItem('token')
    return await axios
      .put('/api/page', JSON.stringify(page), {
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

  async addPayment(pageId, payment) {
    const token = localStorage.getItem('token')
    return await axios
      .post(`/api/page/add-payment?idPage=${pageId}&value=${payment}`, null, {
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
        '/api/page',
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

  async addPageByImage(url, image) {
    console.log(url, image.id)
    const token = localStorage.getItem('token')
    return await axios
      .post('/api/page/add-image-on-page', null, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          url,
          imageId: image.id,
        },
      })
      .then((res) => {
        console.log(res)
        return res.data
      })
      .catch((err) => {
        console.error(err)

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
