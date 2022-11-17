<template>
  <b-container>
    <h1>Imagens</h1>
    <ImagesComp />
  </b-container>
</template>

<script>
// import api from '../service/api'
export default {
  data() {
    return {
      showAddImage: false,
      image: { name: '', link: '' },
    }
  },
  computed: {},
  // async mounted() {
  //   this.images = await this.loadImages()
  // },
  methods: {
    updateName() {
      const names = this.image.link.split('/')
      const name = names[names.length - 1]
      this.image.name = name.split('.jpg')[0]
    },
    // updateImages() {
    //   this.images = this.loadImages().catch(() => this.$router.push('login'))
    // },
    async deleteImage(image) {
      // await api.deleteImage(image)
      // this.images = await this.loadImages().catch(() =>
      //   this.$router.push('login')
      // )
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
