<template>
  <div>
    <div>
      <b-card-group deck>
        <b-card v-for="image in images" :key="image.index" :header="image.name">
          <b-card-img :src="image.link" />

          <b-button class="btn" @click="emitEvent(image)">
            <b-icon-trash variant="white" />
          </b-button>
          <b-button class="btn" @click="openPageModal(image)">
            <b-icon-book variant="white" />
          </b-button>
          <b-button class="btn" :to="`image?id=${image.id}`">
            <b-icon-info variant="white" />
          </b-button>
        </b-card>
      </b-card-group>
    </div>

    <b-modal v-model="showPageModal" hide-footer>
      <template #modal-title> Adicionar página </template>
      <b-input v-model="urlToSave" />
      <b-button @click="hideModalPage">Cancelar</b-button>
      <b-button variant="success" @click="savePage()">Salvar</b-button>
    </b-modal>
  </div>
</template>

<script>
import api from '../service/api'
export default {
  name: 'ImagesComp',
  props: {
    images: {
      type: Array,
      default: () => {},
    },
  },
  emits: ['delete'],
  data() {
    return {
      showPageModal: false,
      urlToSave: '',
      selectedImage: {},
    }
  },

  methods: {
    hideModalPage() {
      this.showPageModal = !this.showPageModal
    },
    async savePage() {
      console.log(this.urlToSave, this.selectedImage)
      await api.addPageByImage(this.urlToSave, this.selectedImage)
      this.showPageModal = false
    },
    openPageModal(image) {
      console.log(image)
      this.selectedImage = image
      this.showPageModal = true
    },

    emitEvent(image) {
      this.$emit('delete', image)
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
</style>
