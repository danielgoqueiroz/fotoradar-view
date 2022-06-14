<template>
  <b-container>
    <h1>Notices</h1>
    <b-list-group>
      <b-list-group-item v-for="notice in notices" :key="notice.index">
        <b>{{ notice.company ? notice.company.host : '' }}</b>
        <b-row>
          <b-col cols="10"
            ><p style="font-size: 12px">{{ notice.link }}</p>
          </b-col>
          <b-col cols="2">
            <b-img
              v-show="notice.image != null"
              :src="notice.image ? notice.image.link : ''"
              class="img-thumbnail"
            />
            <b-button
              v-show="notice.image != null"
              @click="selectImage(notice.id)"
              ><b-icon-image
            /></b-button>
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
    <b-modal v-model="modalShow">
      <b-img
        class="img-selectable"
        v-for="image in images"
        :key="image.id"
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

<style scoped>
.img-selectable {
  max-width: 100%;
  filter: opacity(50%) grayscale(100%);
}

.img-selectable:hover {
  max-width: 100%;
  filter: opacity(100%) grayscale(0);
}

.img-thumbnail {
  max-width: 50px;
}
</style>