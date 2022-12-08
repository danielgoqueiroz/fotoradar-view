import axios from './axios'

class LoginService {
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
}

export default new LoginService()
