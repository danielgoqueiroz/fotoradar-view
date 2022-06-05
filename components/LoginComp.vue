<template>
  <b-container>
    <b-form-input v-model="username" placeholder="Digite o usuário" />
    <b-form-input v-model="password" placeholder="Digite a senha" />
    <b-button @click="login()">Enviar</b-button>
    {{ token }}
  </b-container>
</template>

<script>
import api from '../service/api'

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
    async login() {
      const res = await api.login(this.username, this.password)
      if (res) {
        this.$router.push('image')
      }
    },
  },
}
</script>
