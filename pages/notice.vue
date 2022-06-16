<template>
  <b-container>
    <h1>Notices</h1>
    <b-list-group>
      <b-list-group-item v-for="notice in notices" :key="notice.index">
        <b>{{ notice.company ? notice.company.host : '' }}</b>
        <span v-if="notice.processNumber">
          | Processo: {{ notice.processNumber }}</span
        >
        <span v-else> | Sem processo cadastrado</span>
        <b-form-group>
          <b-input-group>
            <b-form-input v-model="notice.link" disabled></b-form-input>
            <b-input-group-append>
              <b-button variant="info" @click="notice.show = !notice.show"
                >Infos
                <b-icon-arrow-down v-if="!notice.show" />
                <b-icon-arrow-up v-if="notice.show" />
              </b-button>
            </b-input-group-append>
            <b-input-group-append>
              <b-img
                v-show="notice.image != null"
                :src="notice.image ? notice.image.link : ''"
                class="img-thumbnail" />
              <b-button
                v-show="notice.image == null"
                @click="selectImage(notice.id)"
                ><b-icon-image /></b-button
            ></b-input-group-append>
          </b-input-group>
        </b-form-group>
        <div v-if="notice.show">
          <b-form-group label="Processo">
            <b-form-input v-model="notice.processNumber"></b-form-input>
          </b-form-group>
          <b-button variant="success" @click="update(notice)">Salvar</b-button>
        </div>
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
    console.log(this.notices)
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
    async update(notice) {
      await api.updateNotice(notice)
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