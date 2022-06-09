<template>
  <b-container>
    <h1>Notices</h1>
    <b-list-group>
      <b-list-group-item v-for="notice in notices" :key="notice.index">
        <b-row>
          <b-col cols="11"> {{ notice.link }}</b-col>
          <b-col v-show="notice.image != null" cols="1">
            <b-img
              :src="notice.image ? notice.image.link : ''"
              style="max-width: 50px"
            />
          </b-col>
          <b-col cols="1">
            <b-button
              v-show="notice.image == null"
              @click="selectImage(notice.id)"
              ><b-icon-image /></b-button
          ></b-col>
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
      idNoticeSelected: {},
      modalShow: false,
    }
  },
  async mounted() {
    this.notices = await api.loadNotices()
    this.images = await api.loadImages()
  },
  methods: {
    selectImage(noticeId) {
      this.modalShow = !this.modalShow
      this.idNoticeSelected = noticeId
    },
    async setImageToNotice(image) {
      await api
        .setImageToNotice(this.idNoticeSelected, image.id)
        .then(() => {
          this.modalShow = !this.modalShow
        })
        .catch((err) => {
          console.log(err)
        })
      this.notices = await api.loadNotices()
    },
  },
}
</script>