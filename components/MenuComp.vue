<template>
  <div>
    <!-- Left -->
    <b-navbar toggleable="lg" type="dark" variant="info">
      <span>
        <b-navbar-brand href="/">
          <object
            data="/logo_tipo_fotoradar.svg"
            width="75"
            height="75"
            class="circle"
          ></object> </b-navbar-brand
      ></span>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="images">Imagens</b-nav-item>
          <b-nav-item to="pages">Páginas</b-nav-item>
          <b-nav-item to="company">Empresas</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <!-- Right -->
      <b-navbar-nav class="ml-auto">
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-show="user" disabled
              >Olá {{ user ? user.username : '' }}</b-nav-item
            >
            <b-nav-item to="user"><b-icon-person /></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar-nav>
    </b-navbar>
  </div>
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
      console.log('Fazendo login')
      return await api.getUserData().catch((err) => {
        console.log('Erro de login', err)
        this.$router.push('/login')
      })
    },
  },
}
</script>
<style scoped>
.circle {
  background-color: rgb(255 255 255);
  border-radius: 25%;
}
</style>
