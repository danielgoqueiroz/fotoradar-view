import axios from './axios'

class LoginService {
  async login(username, password) {
    return await axios
      .post(
        'login',
        new URLSearchParams({
          username,
          password,
        })
      )
      .then((res, err) => {
        if (err) {
          throw err
        }
        this.token = res.data.access_token
        localStorage.setItem('token', res.data.access_token)
      })
      .catch((erro) => {
        throw erro
      })
  }
}

export default new LoginService()
