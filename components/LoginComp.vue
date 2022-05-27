<template>
  <b-container>
    <b-form-input v-model="username" placeholder="Digite o usuário"/>
    <b-form-input v-model="password" placeholder="Digite a senha" />
    {{response}}
  </b-container>
</template>

<script>
import axios from '@nuxtjs/axios'

export default {
  name: 'LoginComp',
  data () {
    return {
      username: '',
      password: '',
      response: {}
    }
  },
  mounted() {
    this.login()
  },
  methods: {
    login() {
      axios.post('http://localhost:8080/api/login',
        new URLSearchParams({
          username: 'daniel',
          password: 'senha123',
        }))
        .then((res) => {
          this.response = res;
        });
    }
  }
}
</script>
