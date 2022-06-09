<template>
  <b-container>
    <h1>Notices</h1>
    <b-list-group>
      <b-list-group-item v-for="notice in notices" :key="notice.index">
        <b-row>
          <b-col> {{ notice.link }}</b-col>
          <b-col v-show="notice.image != null">{{ notice.image }}</b-col>
          <b-button @click="selectImage(notice)">Sel. imagem</b-button>
          <!-- <b-button @click="addImageToNotice(notice)">Salvar</b-button> -->
        </b-row>
      </b-list-group-item>
    </b-list-group>
    <b-modal v-model="modalShow">
      <b-img
        v-for="image in images"
        :key="image.id"
        thumbnail
        :src="image.link"
        @click="setImageToNotice(image, notice)"
      >
      </b-img>
    </b-modal>
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  data() {
    return {
      notices: [],
      images: [{ id: 0, link: '' }],
      imageSelected: {},
      modalShow: false,
    }
  },
  async mounted() {
    this.notices = await api.loadNotices()
    this.images = await api.loadImages()
  },
  methods: {
    addImageToNotice(notice) {
      console.log(notice)
    },
    selectImage(notice) {
      console.log(notice)
      this.modalShow = !this.modalShow
    },
    setImageToNotice(image) {
      console.log(image)
    },
  },
}
</script>