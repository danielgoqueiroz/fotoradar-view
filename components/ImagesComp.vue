<template>
  <div>
    <b-container
      v-for="image in images"
      :key="image.index"
      class="img-container images-content"
    >
      <b-row>
        <b-col cols="10">
          <b-img :src="image.link" class="image-item" />
        </b-col>
        <b-col cols="2">
          <b-button class="btn" @click="emitEvent(image)">
            <b-icon-trash variant="white"> </b-icon-trash></b-button
        ></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'ImagesComp',
  props: {
    images: {
      type: Array,
      default: () => {},
    },
  },
  emits: ['delete'],
  methods: {
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
