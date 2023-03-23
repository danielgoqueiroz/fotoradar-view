<template>
  <b-container>
    <div class="login">
      <span>
        <h3>Login</h3>
        <b-form-input
          v-model="username"
          placeholder="Digite o usuário"
          @keypress.enter="login(username, password)"
        />
        <b-form-input
          v-model="password"
          type="password"
          placeholder="Digite a
        senha"
          @keypress.enter="login(username, password)"
        />
        <b-button variant="primary" @click="login(username, password)"
          >Login</b-button
        >
        <b-button to="/createAccount">Criar conta</b-button>
      </span>
      <span> </span>
    </div>
  </b-container>
</template>

<script>
import loginApi from '../service/loginService'
import userApi from '../service/api'

export default {
  name: 'LoginComp',
  data() {
    return {
      switchForm: false,
      username: '',
      password: '',
      response: {},
      token: '',
    }
  },
  methods: {
    async createAccount() {
      const username = this.username
      const password = this.password
      await userApi
        .saveUser(username, password)
        .then(() => (this.switchForm = !this.switchForm))
    },
    async login(username, password) {
      await loginApi
        .login(username, password)
        .then(() => {
          this.$router.push('images')
        })
        .catch((err) => {
          console.log(err)
          this.makeToast(false, 'Não foi possível fazer o login')
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
