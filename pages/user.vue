<template>
  <b-container>
    <span v-show="user">
      <h1>Olá, {{ user ? user.username : '' }}</h1>
    </span>
    <b-form-group>
      <b-form-group label="Username">
        <b-form-input v-model="user.username"></b-form-input>
      </b-form-group>
      <b-form-group label="Nome">
        <b-form-input v-model="user.name"></b-form-input>
      </b-form-group>
      <b-form-group label="E-mail">
        <b-form-input v-model="user.email"></b-form-input>
      </b-form-group>
      <b-form-group label="CPF">
        <b-form-input v-model="user.cpf"></b-form-input>
      </b-form-group>
      <b-button @click="updateUser(user)">Salvar</b-button>
    </b-form-group>
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  data() {
    return {
      user: {},
    }
  },
  async mounted() {
    this.user = await this.getUserData().catch(() => this.$router.push('login'))
  },
  methods: {
    async getUserData() {
      return await api.getUserData().catch(() => this.$router.push('login'))
    },
    async updateUser(user) {
      await api.updateUser(user).catch(() => this.$router.push('login'))
    },
  },
}
</script>
