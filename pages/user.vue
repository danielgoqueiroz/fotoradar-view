<template>
  <b-container>
    <span v-show="user">
      <h1>Olá, {{ user ? user.username : '' }}</h1>
    </span>
    <b-form-group>
      <b-form-group label="Username">
        <b-form-input v-if="isUserLoaded" v-model="user.username" />
        <b-skeleton v-else type="input" />
      </b-form-group>
      <b-form-group label="Nome">
        <b-form-input v-if="isUserLoaded" v-model="user.name" />
        <b-skeleton v-else type="input" />
      </b-form-group>
      <b-form-group label="E-mail">
        <b-form-input v-if="isUserLoaded" v-model="user.email" />
        <b-skeleton v-else type="input" />
      </b-form-group>
      <b-form-group label="CPF">
        <b-form-input v-if="isUserLoaded" v-model="user.cpf" />
        <b-skeleton v-else type="input" />
      </b-form-group>
      <b-button @click="updateUser(user)">Salvar</b-button>
      <b-button @click="logout()">Logout</b-button>
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
  computed: {
    isUserLoaded() {
      return this.user !== {}
    },
  },
  async mounted() {
    this.user = await this.getUserData().catch(() => this.$router.push('login'))
  },
  methods: {
    logout() {
      localStorage.setItem('token', null)
      this.$router.push('login')
    },
    async getUserData() {
      return await api.getUserData().catch(() => this.$router.push('login'))
    },
    async updateUser(user) {
      await api.updateUser(user).catch(() => this.$router.push('login'))
    },
  },
}
</script>
