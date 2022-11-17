<template>
  <b-container>
    <b-row>
      <b-col cols="4">
        <b-img :src="image.link" thumbnail fluid alt="Responsive image"></b-img>
      </b-col>
      <b-col cols="8">
        <h3>Nome: {{ image.name }} <br /></h3>
        Descrição: {{ image.description }}
      </b-col>
    </b-row>
    <b-button class="btn" @click="openPageModal(image)">
      <b-icon-book variant="white" />
    </b-button>
    <b-list-group>
      <b-table striped hover :items="pagesTable"></b-table>
    </b-list-group>
    <b-modal v-model="showPageModal" hide-footer>
      <template #modal-title> Adicionar página </template>
      <b-input v-model="urlToSave" />
      <b-button @click="hideModalPage">Cancelar</b-button>
      <b-button variant="success" @click="savePage()">Salvar</b-button>
    </b-modal>
  </b-container>
</template>

<script>
import api from '../service/api'

export default {
  data() {
    return {
      showPageModal: false,
      image: {},
      pages: [],
    }
  },
  computed: {
    pagesTable() {
      return this.pages.map((p) => {
        return {
          urlToSave: '',
          url: p.url,
          Imagem: p.image.link,
          empresa: p.company.host,
        }
      })
    },
  },
  async mounted() {
    const url = new URL(window.location.href)
    const id = url.searchParams.get('id')
    const image = await api.getImage(id)
    this.image = image

    this.pages = await api.getPagesByImageId(id)
  },
  methods: {
    openPageModal(image) {
      console.log(image)
      this.showPageModal = true
    },
    hideModalPage() {
      this.showPageModal = !this.showPageModal
    },
    async savePage() {
      await api.addPageByImage(this.urlToSave, this.image)
      this.showPageModal = false
      this.pages = await api.getPagesByImageId(this.image.id)
    },
  },
}
</script>