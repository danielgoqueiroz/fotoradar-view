<template>
  <div>
    <VueSidebarMenuAkahon
      :menu-items="menu"
      menu-title="Fotoradar"
      menu-logo="/logo_fotoradar.svg"
      :is-search="false"
      search-placeholder="Buscar..."
      search-tooltip="Buscar"
      :is-exit-button="false"
      profile-role="Desenvolvedor/Fotógrafo"
      profile-name="Daniel G. Queiroz"
      profile-img="https://danielqueiroz.com/api/wp-content/uploads/2023/01/image.jpg"
    ></VueSidebarMenuAkahon>
    <!-- <b-navbar toggleable="lg" type="dark" variant="info">
      <span>
        <b-navbar-brand href="/">
          <object
            data="/logo_tipo_fotoradar.svg"
            width="75"
            height="75"
            class="circle"
          ></object> </b-navbar-brand
      ></span> -->
  </div>
</template>

<script>
import VueSidebarMenuAkahon from 'vue-sidebar-menu-akahon'

import api from '../service/api'
export default {
  components: { VueSidebarMenuAkahon },

  data() {
    return {
      user: {},
      menu: [
        {
          link: '/images',
          name: 'Imagens',
          tooltip: 'Sobre',
          icon: 'bx-image ',
        },
        {
          link: '/pages',
          name: 'Páginas',
          tooltip: 'Projetos',
          icon: 'bx-file-blank',
        },
        {
          link: '/companies',
          name: 'Empresas',
          tooltip: 'Arquivos fotográficos',
          icon: 'bx-home',
        },
        {
          link: '/processes',
          name: 'Processos',
          tooltip: 'Matérias',
          icon: 'bx-news',
        },
      ],
    }
  },

  async mounted() {
    this.user = await this.getUserData()
  },
  methods: {
    async getUserData() {
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
