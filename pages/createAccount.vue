<template>
  <b-container>
    <h1>Criar conta</h1>
    <b-form-group>
      <b-form-group label="Username">
        <b-form-input v-model="user.username" type="text" />
      </b-form-group>
      <b-form-group label="Nome">
        <b-form-input v-model="user.name" type="text" />
      </b-form-group>
      <b-form-group label="E-mail">
        <b-form-input v-model="user.email" type="email" />
      </b-form-group>
      <b-form-group label="CPF">
        <b-form-input v-model="user.cpf" type="number" />
      </b-form-group>
      <b-form-group label="Senha">
        <b-form-input v-model="user.password" type="password" />
      </b-form-group>
      <b-form-group label="Repita a senha">
        <b-form-input v-model="user.passwordCheck" type="password" />
      </b-form-group>
      <b-button :disabled="isValid" @click="createAccount()"
        >Criar conta</b-button
      >
    </b-form-group>
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  layout: 'loginLayout',
  data() {
    return {
      user: {
        username: '',
        name: '',
        email: '',
        cpf: '',
        password: '',
        passwordCheck: '',
      },
    }
  },
  computed: {
    isValid() {
      return (
        this.user.password !== this.user.passwordCheck ||
        this.user.password === '' ||
        this.user.passwordCheck === '' ||
        this.user.cpf.length < 10
      )
    },
  },
  methods: {
    createAccount() {
      if (
        this.user.username === '' ||
        this.user.name === '' ||
        this.user.email === '' ||
        this.user.cpf === ''
      ) {
        this.makeToast('Dados incompletos', 'Não foi possível criar a conta')
        return
      }
      api
        .createUser(this.user)
        .then(() => {
          console.log('Conta criada com sucesso')
          this.$router.push('login')
        })
        .catch((err) => this.makeToast('Ops!', err))
    },
    makeToast(title, message) {
      this.$bvToast.toast(message, {
        title,
        autoHideDelay: 5000,
        toaster: 'b-toaster-top-center',
        appendToast: true,
        variant: 'danger',
      })
    },
  },
}
</script>
