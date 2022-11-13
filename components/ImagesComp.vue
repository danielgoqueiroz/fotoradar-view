<template>
  <div>
    <b-container
      v-for="image in images"
      :key="image.index"
      class="img-container images-content"
    >
      <b-row>
        <b-col cols="4">
          <b-img :src="image.link" class="image-item" />
        </b-col>
        <b-col cols="6">
          <div>{{ image.name }}</div>
        </b-col>
        <b-col cols="2">
          <b-button class="btn" @click="emitEvent(image)">
            <b-icon-trash variant="white" />
          </b-button>
          <b-button @click="openPageModal(image)" class="btn">
            <b-icon-book variant="white" />
          </b-button>
        </b-col>
      </b-row>

      <b-modal v-model="showPageModal" hide-footer>
        <template #modal-title> Adicionar página </template>
        <b-input v-model="urlToSave" />
        <b-button @click="hideModalPage">Cancelar</b-button>
        <b-button variant="success" @click="salvarPage()">Salvar</b-button>
      </b-modal>
    </b-container>
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
    async salvarPage() {
      console.log(this.urlToSave, this.selectedImage)
      await api.addPageByImage(this.urlToSave, this.selectedImage)
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
