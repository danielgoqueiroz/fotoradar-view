<template>
  <b-container>
    <b-input-group prepend="Adicionar">
      <b-form-input v-model="imageToSave.name" />
      <b-form-input v-model="imageToSave.link" />
      <b-input-group-append>
        <b-button variant="outline-success" @click="saveImage()"
          >Salvar</b-button
        >
      </b-input-group-append>
    </b-input-group>

    <b-container
      v-for="image in images"
      :key="image.index"
      class="img-container"
    >
      <b-button class="btn">
        <b-icon-trash variant="white"> </b-icon-trash
      ></b-button>
      <b-img :src="image.link" class="image-item" />
    </b-container>
  </b-container>
</template>

<script>
import api from '../service/api'

export default {
  name: 'ImagesComp',
  data() {
    return {
      imageToSave: {
        name: 'teste',
        link: 'https://img.freepik.com/fotos-gratis/imagem-aproximada-em-tons-de-cinza-de-uma-aguia-careca-americana-em-um-fundo-escuro_181624-31795.jpg?t=st=1654464107~exp=1654464707~hmac=0e655bf2a50f1143b60c1de169b44bdcc8ffd2cf0f0f48d6df1cd8d2185f74c9&w=900',
      },
      images: [],
    }
  },
  async mounted() {
    this.images = await api.loagImages()
  },
  methods: {
    saveImage() {
      api
        .saveImage(this.imageToSave.name, this.imageToSave.link)
        .catch((err) => {
          this.makeToast(true, err)
        })
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
  max-width: 100%;
}
</style>