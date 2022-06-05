<template>
  <b-container>
    <b-img
      v-for="image in images"
      :key="image.index"
      :src="image.link"
      thumbnail
      fluid
    />
  </b-container>
</template>

<script>
import api from '../service/api'

export default {
  name: 'ImagesComp',
  data() {
    return {
      images: [],
    }
  },
  async mounted() {
    this.images = await api.loagImages()
  },
}
</script>