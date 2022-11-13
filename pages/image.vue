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
      <b-form-input v-model="image.link" placeholder="link" />
      <b-form-input v-model="nameFromLink" disabled placeholder="nome" />
      <b-input-group-append>
        <b-button
          variant="outline-success"
          @click="saveImage(image.link, nameFromLink)"
          >Salvar</b-button
        >
      </b-input-group-append>
    </b-input-group>
    <ImagesComp :images="images" @delete="(i) => deleteImage(i)" />
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  data() {
    return {
      showAddImage: false,
      image: { name: '', link: '' },
      images: [],
    }
  },
  computed: {
    nameFromLink() {
      const names = this.image.link.split('/')
      const name = names[names.length - 1]
      return name.split('.jpg')[0]
    },
  },
  async mounted() {
    this.images = await this.loadImages()
  },
  methods: {
    updateName() {
      const names = this.image.link.split('/')
      const name = names[names.length - 1]
      this.image.name = name.split('.jpg')[0]
    },
    updateImages() {
      this.images = this.loadImages().catch(() => this.$router.push('login'))
    },
    async loadImages() {
      return await api.loadImages().catch(() => this.$router.push('login'))
    },
    async saveImage(name, link) {
      await api.saveImage(link, name).catch((err) => {
        this.makeToast(true, err)
      })
      this.images = await api
        .loadImages()
        .catch(() => this.$router.push('login'))
    },
    async deleteImage(image) {
      await api.deleteImage(image)
      this.images = await this.loadImages().catch(() =>
        this.$router.push('login')
      )
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
