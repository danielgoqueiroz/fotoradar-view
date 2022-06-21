<template>
  <b-container>
    <h1>
      Imagens
      <b-link @click="showAddImage = !showAddImage">
        <b-icon-plus-circle v-if="!showAddImage" variant="info" />
        <b-icon-x-circle v-else
      /></b-link>
    </h1>
    <b-input-group v-show="showAddImage" prepend="Adicionar">
      <b-form-input v-model="image.name" />
      <b-form-input v-model="image.link" />
      <b-input-group-append>
        <b-button variant="outline-success" @click="saveImage(image)"
          >Salvar</b-button
        >
      </b-input-group-append>
    </b-input-group>
    <ImagesComp :images="images" />
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  emits: ['updateImages'],
  data() {
    return {
      showAddImage: false,
      image: { name: '', link: '' },
      images: [],
    }
  },
  async mounted() {
    this.images = await this.loadImages()
  },
  methods: {
    updateImages() {
      this.images = this.loadImages()
    },
    async loadImages() {
      return await api.loadImages()
    },
    async saveImage(image) {
      await api.saveImage(image.name, image.link).catch((err) => {
        this.makeToast(true, err)
      })
      this.images = await api.loadImages()
    },
    makeToast(append, message) {
      this.$bvToast.toast(message, {
        title: 'Mensagem',
        toaster: 'b-toaster-bottom-center',
        autoHideDelay: 3000,
        variant: 'danger',
        appendToast: append,
      })
    },
  },
}
</script>
