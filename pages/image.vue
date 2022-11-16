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
    <b-list-group>
      <b-table striped hover :items="pagesTable"></b-table>
    </b-list-group>
  </b-container>
</template>

<script>
import api from '../service/api'

export default {
  data() {
    return {
      image: {},
      pages: [],
    }
  },
  computed: {
    pagesTable() {
      return this.pages.map((p) => {
        return {
          url: p.url,
          Imagem: p.image.link,
          empresa: p.company.host,
          // site: p.company ? p.company.host : '',
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
  methods: {},
}
</script>