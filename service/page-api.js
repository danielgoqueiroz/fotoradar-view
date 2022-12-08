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