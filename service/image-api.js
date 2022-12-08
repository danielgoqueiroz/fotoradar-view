import axios from './axios'

export async function loadImages() {
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

export async function getImage(id) {
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

export async function getPagesByImageId(id) {
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

export async function addLink(imageId, link) {
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
export async function saveImage(name, link) {
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

export async function deleteImage(image) {
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

export async function loagImages() {
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
