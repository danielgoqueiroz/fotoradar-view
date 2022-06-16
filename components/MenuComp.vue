<template>
  <b-container>
    <!-- Left -->
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">FotoRadar</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="notice">Notificações</b-nav-item>
          <b-nav-item href="image">Images</b-nav-item>
          <b-nav-item href="company">Companias</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <!-- Right -->
      <b-navbar-nav class="ml-auto">
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-show="user" disabled
              >Olá {{ user ? user.username : '' }}</b-nav-item
            >
            <b-nav-item href="user"><b-icon-person /></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar-nav>
    </b-navbar>
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
    this.user = await this.getUserData()
  },
  methods: {
    async getUserData() {
      return await api.getUserData()
    },
  },
}
</script>