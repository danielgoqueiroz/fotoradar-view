<template>
  <b-container class="login-box">
    <div class="login">
      <span v-show="!switchForm">
        <h3>Login</h3>
        <b-form-input v-model="username" placeholder="Digite o usuário" />
        <b-form-input v-model="password" placeholder="Digite a senha" />
        <b-button @click="login()">Login</b-button>
      </span>
      <span v-show="switchForm">
        <h3>Criar conta</h3>
        <b-form-input v-model="username" placeholder="Digite o usuário" />
        <b-form-input
          v-model="password"
          type="password"
          placeholder="Digite a senha"
        />
        <b-button @click="createAccount()">Criar conta</b-button>
      </span>
      <b-button @click="change()"><b-icon-arrow-left-right /></b-button>
    </div>
  </b-container>
</template>

<script>
import api from '../service/api'

export default {
  name: 'LoginComp',
  data() {
    return {
      switchForm: false,
      username: 'daniel',
      password: 'senha123',
      response: {},
      token: '',
    }
  },
  methods: {
    async createAccount() {
      await api.saveUser(this.username, this.password)
    },
    change() {
      this.switchForm = !this.switchForm
    },
    async login() {
      await api
        .login(this.username, this.password)
        .then(() => {
          this.$router.push('image')
        })
        .catch((err) => {
          this.makeToast(false, err.message)
        })
    },
    makeToast(append, message) {
      this.$bvToast.toast(message, {
        title: 'Mensagem',
        toaster: 'b-toaster-bottom-center',
        autoHideDelay: 3000,
        variant: 'danger',
        appendToast: append,
      })
    },
  },
}
</script>
<style scoped>
.login-box {
  height: 500px;
}

.login {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  max-height: 350px;
  margin-top: 300px;
}
</style>
