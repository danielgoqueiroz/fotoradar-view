<template>
  <b-container>
    <h1>
      Notificações
      <b-link @click="showAddNotice = !showAddNotice">
        <b-icon-plus-circle
          v-if="!showAddNotice"
          variant="info" /><b-icon-x-circle v-else variant="danger"
      /></b-link>
    </h1>
    <b-form-group v-show="showAddNotice">
      <b-input-group>
        <b-form-input v-model="link"></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="addLink(link)"
            >Adicionar link</b-button
          >
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <b-list-group>
      <b-list-group-item v-for="notice in notices" :key="notice.index">
        <b-badge variant="info"
          ><b-icon-link45deg />
          {{ notice.company ? notice.company.host : '' }}</b-badge
        >

        <b-badge variant="success"
          ><b-icon-coin /> Pagamentos: R$ {{ notice.total }}</b-badge
        >
        <b-badge v-if="notice.processNumber"
          ><b-icon-file-earmark-text /> Número do processo:
          {{ notice.processNumber }}</b-badge
        >
        <b-badge v-else> Sem processo cadastrado</b-badge>
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
          <h5>Processo</h5>
          <b-input-group prepend="Número do processo" class="mt-3">
            <b-form-input v-model="notice.processNumber"></b-form-input>
            <b-button variant="success" @click="updateProcessNumber(notice)"
              >Salvar</b-button
            >
          </b-input-group>

          <h5>Extrato</h5>
          <b-card class="extrato-conatiner">
            <div
              v-for="payment in notice.payments"
              :key="payment.index"
              :prepend="payment.date"
              class="mt-3"
            >
              {{ getDate(payment.date) }} ------- R$ {{ payment.value }}
            </div>

            <b>Total: R$ {{ notice.total }}</b>
          </b-card>
          <b-input-group prepend="Valor de pagamento" class="mt-3">
            <b-form-input v-model="notice.payment" type="number"></b-form-input>
            <b-input-group-append>
              <b-button
                variant="success"
                @click="addPayment(notice, notice.payment)"
                >Adicionar</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </div>
      </b-list-group-item>
    </b-list-group>
    <b-modal v-model="modalShow">
      <b-img
        v-for="image in images"
        :key="image.id"
        :src="image.link"
        class="img-selectable"
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
      link: '',
      notices: [],
      images: [{ id: 0, link: '' }],
      idNoticeSelected: {},
      modalShow: false,
      showAddNotice: false,
    }
  },
  async mounted() {
    this.notices = await api.loadNotices()
    this.images = await api.loadImages()
  },
  methods: {
    getDate(dateValue) {
      const date = new Date(dateValue)
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    },
    async addLink(link) {
      await api.addLink(3, link)
    },
    selectImage(noticeId) {
      this.modalShow = !this.modalShow
      this.idNoticeSelected = noticeId
    },
    async addPayment(notice, payment) {
      await api.addPayment(notice.id, payment).catch((err) => console.log(err))
      this.notices = await api.loadNotices()
      this.notices.find((n) => n.id === notice.id).show = true
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
    async updateProcessNumber(notice) {
      await api.updateNoticeProcess(notice)
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

.extrato-conatiner {
  max-width: 250px;
}
</style>