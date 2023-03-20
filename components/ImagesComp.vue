<template>
  <b-container>
    <b-row>
      <b-col></b-col>
      <b-col
        ><b-link class="add-image" @click="showAddImage = !showAddImage">
          <b-icon-plus-circle v-if="!showAddImage" variant="info" />
          <b-icon-x-circle v-else /></b-link
      ></b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col cols="9"
        ><b-input-group v-show="showAddImage" prepend="Adicionar">
          <b-form-input v-model="addImage.link" placeholder="link" />
          <b-form-input v-model="nameFromLink" disabled placeholder="nome" />
          <b-input-group-append>
            <b-button
              variant="outline-success"
              @click="saveImage(addImage.link, nameFromLink)"
              >Salvar</b-button
            >
          </b-input-group-append>
        </b-input-group></b-col
      >
      <b-col cols="2">
        <b-form-input
          v-model="range"
          min="1"
          max="10"
          type="range"
        ></b-form-input>
      </b-col>
      <b-col cols="1">{{ range }}</b-col>
    </b-row>

    <b-container v-if="!images.length" fluid>
      <b-skeleton-img
        v-if="!images.length"
        class="img-skeleton"
        no-aspect
        width="450px"
        height="250px"
      />
      <b-skeleton-img
        v-if="!images.length"
        class="img-skeleton"
        no-aspect
        width="450px"
        height="250px"
      />
    </b-container>

    <b-container fluid class="p-4">
      <b-row v-for="imageI in imagesArrays" :key="imageI.index">
        <b-col v-for="image in imageI" :key="image.index">
          <nuxt-link :to="`/image?id=${image.id}`">
            <b-img thumbnail :src="image.link"></b-img>
          </nuxt-link>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  name: 'ImagesComp',
  data() {
    return {
      range: 3,
      images: [],
      addImage: {},
      showAddImage: false,
      showPageModal: false,
      urlToSave: '',
      selectedImage: {},
    }
  },

  computed: {
    imagesArrays() {
      const imagesArrays = []
      const chunkSize = this.range
      const images = this.images
      for (let i = 0; i < images.length; i += chunkSize) {
        const chunk = images.slice(i, i + chunkSize)
        imagesArrays.push(chunk)
      }
      return imagesArrays
    },
    sizeImages() {
      return `height: ${this.range}px`
    },
    nameFromLink() {
      if (this.addImage.link) {
        const names = this.addImage.link.split('/')
        const name = names[names.length - 1]
        console.log(name)
        return name.split('.jpg')[0]
      }
      return ''
    },
  },
  async mounted() {
    this.images = await this.loadImages()
  },
  methods: {
    async deleteImage(image) {
      await api.deleteImage(image)
      this.images = await this.loadImages().catch(() =>
        this.$router.push('login')
      )
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
    hideModalPage() {
      this.showPageModal = !this.showPageModal
    },
    async savePage() {
      await api.addPageByImage(this.urlToSave, this.selectedImage)
      this.showPageModal = false
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
<style scoped>
.img-skeleton {
  margin: 10px;
}

.images-content {
  max-width: 500px;
}

.img-container {
  padding: 0.3rem;
  background-color: #fff;
  border: 1px solid #dee2e6;
  margin-block: 10px;
}

.img-container .btn {
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}

.image-item {
  border-radius: 0.25rem;
  max-width: 150px;
}

.add-image-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-image {
  font-size: 25px;
}
</style>
