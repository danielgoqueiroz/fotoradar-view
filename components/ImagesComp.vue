<template>
  <b-container fluid>
    <b-container>
      <b-input-group v-show="showAddImage" prepend="Adicionar">
        <b-form-input v-model="addImage.link" placeholder="link" />
        <b-form-input v-model="nameFromLink" disabled placeholder="nome" />
        <b-input-group-append>
          <b-button
            variant="outline-success"
            @click="saveImage(addImage.link, nameFromLink)"
            >Salvar</b-button
          >
        </b-input-group-append>
      </b-input-group>
    </b-container>
    <b-container>
      <b-form-input
        v-model="range"
        min="100"
        max="250"
        type="range"
      ></b-form-input>

      <b-card-group deck>
        <b-card class="add-image-box">
          <b-link class="add-image" @click="showAddImage = !showAddImage">
            <b-icon-plus-circle v-if="!showAddImage" variant="info" />
            <b-icon-x-circle v-else
          /></b-link>
        </b-card>
        <!-- <b-col v-for="image in images" :key="image.index"> -->
        <div v-for="image in images" :key="image.index">
          <b-button class="btn" @click="deleteImage(image)">
            <b-icon-trash variant="white" />
          </b-button>
          <b-button class="btn" :to="`image?id=${image.id}`">
            <b-icon-info variant="white" />
          </b-button>
          <b-img
            :style="sizeImages"
            thumbnail
            fluid
            sizes="sm"
            :src="image.link"
            alt="Image 1"
          />
        </div>

        <!-- <b-card v-for="image in images" :key="image.index" :header="image.name">
          <b-card-img :src="image.link" />

          <b-button class="btn" @click="deleteImage(image)">
            <b-icon-trash variant="white" />
          </b-button>
          <b-button class="btn" :to="`image?id=${image.id}`">
            <b-icon-info variant="white" />
          </b-button>
        </b-card> -->
      </b-card-group>
    </b-container>
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  name: 'ImagesComp',
  data() {
    return {
      range: 150,
      images: [],
      addImage: {},
      showAddImage: false,
      showPageModal: false,
      urlToSave: '',
      selectedImage: {},
    }
  },

  computed: {
    sizeImages() {
      return `height: ${this.range}px`
    },
    nameFromLink() {
      if (this.addImage.link) {
        const names = this.addImage.link.split('/')
        const name = names[names.length - 1]
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
  font-size: 75px;
}
</style>
