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

    <b-input-group>
      <b-input-group-prepend is-text>Adicionar página</b-input-group-prepend>
      <b-form-input v-model="urlToSave" placeholder="URL" />
      <b-input-group-append>
        <b-button variant="success" @click="savePage()">Salvar</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-list-group>
      <b-table
        striped
        hover
        :items="pagesTable"
        :fields="['empresa', 'url', 'button']"
      >
        <template #cell(button)="data">
          <!-- `data.value` is the value after formatted by the Formatter -->
          <b-button :to="`page?id=${data.item.id}`">Abrir</b-button>
        </template>
      </b-table>
    </b-list-group>
  </b-container>
</template>

<script>
import api from '../service/api'

export default {
  data() {
    return {
      urlToSave: '',
      showPageModal: false,
      image: {},
      pages: [],
    }
  },
  computed: {
    pagesTable() {
      const pages = this.pages.map((p) => {
        return {
          urlToSave: '',
          url: p.url,
          id: p.id,
          Imagem: p.image.link,
          empresa: p.company.host,
        }
      })
      console.log('pages map', pages)
      return pages
    },
  },
  async mounted() {
    const url = new URL(window.location.href)
    const id = url.searchParams.get('id')
    const image = await api.getImage(id)
    this.image = image

    this.pages = await api.getPagesByImageId(id)
    console.log('páginas', this.pages)
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