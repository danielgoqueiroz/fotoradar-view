<template>
  <b-container>
    <h1>Notices</h1>
    <b-list-group>
      <b-list-group-item v-for="notice in notices" :key="notice.index">
        <b-row>
          <b-col> {{ notice.link }}</b-col>
          <b-col v-show="notice.image != null">{{ notice.image }}</b-col>
          <b-col
            ><b-form-select
              v-show="notice.image == null"
              v-model="selected"
              :options="images"
            ></b-form-select
          ></b-col>
          <b-button @click="addImageToNotice(selected, notice)"
            >Salvar</b-button
          >
        </b-row>
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  data() {
    return {
      notices: [],
      images: ['image'],
      imageSelected: {},
    }
  },
  async mounted() {
    this.notices = await api.loadNotices()
    api.loadImages().then((res) => {
      this.images = res.map((i) => i.name)
    })
  },
  methods: {
    addImageToNotice(image, notice) {
      console.log(image, notice)
    },
  },
}
</script>