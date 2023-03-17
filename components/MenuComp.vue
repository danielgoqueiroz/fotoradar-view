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
      profile-role="Função"
      profile-name="Nome do Usuário"
      profile-img="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
    />
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
          link: '/user',
          name: 'Usuário',
          tooltip: 'Usuário',
          icon: 'bx-user',
        },
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
    this.$el.addEventListener('click', this.onClick)

    this.user = await this.getUserData()
  },
  destroyed() {
    this.$el.removeEventListener('click', this.onClick)
  },
  methods: {
    onClick() {
      console.log('a phone number was clicked')
    },
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
