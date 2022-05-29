<template>
  <b-container>
    <b-form-input v-model="username" placeholder="Digite o usuário" />
    <b-form-input v-model="password" placeholder="Digite a senha" />
    <b-button @click="login()">Enviar</b-button>
    {{ token }}
  </b-container>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'LoginComp',
  data() {
    return {
      username: 'daniel',
      password: 'senha123',
      response: {},
      token: '',
    }
  },
  methods: {
    login() {
      const axios = Axios.create({
        withCredentials: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
          crossorigin: 'true',
        },
      })
      axios
        .post(
          'http://localhost:8080/api/login',
          new URLSearchParams({
            username: this.username, // 'daniel'
            password: this.password, // 'senha123'
          })
        )
        .then((res, err) => {
          if (err) {
            console.err(err)
          }
          this.token = res.data.access_token
          localStorage.setItem('token', res.data.access_token)
          this.$router.push('welcome')
        })
    },
  },
}
</script>
