<template>
  <b-container>
    <h1>Páginas</h1>
    <b-form-group v-show="showAddPage">
      <b-input-group>
        <b-form-input v-model="newPage.link"></b-form-input>
        <b-input-group-append>
          <b-button
            variant="info"
            @click="savePage(newPage.link, newPage.image.id)"
            >Adicionar link</b-button
          >
        </b-input-group-append>
        <b-input-group-append>
          <b-button v-if="!newPage.image.link" v-b-modal.add-image-modal
            ><b-icon-image
          /></b-button>
          <b-img
            v-else
            :src="newPage.image ? newPage.image.link : ''"
            class="img-thumbnail"
          />
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <b-list-group>
      <b-table striped hover :items="pagesTable"></b-table>
    </b-list-group>
    <b-modal id="image-select-modal">
      <b-img
        v-for="image in images"
        :key="image.id"
        :src="image.link"
        class="img-selectable"
        @click="setImageToPage(image, page)"
      >
      </b-img>
    </b-modal>
    <b-modal id="add-image-modal" ref="add-image-modal">
      <b-img
        v-for="image in images"
        :key="image.id"
        :src="image.link"
        class="img-selectable"
        @click="setImageNewToPage(image, idPageSelected)"
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
      newPage: {
        image: {},
        link: '',
      },
      pages: [],
      images: [{ id: 0, link: '' }],
      idPageSelected: {},
      modalShow: false,
      showAddPage: false,
    }
  },
  computed: {
    pagesTable() {
      return this.pages.map((p) => {
        return {
          url: p.url,
          Imagem: p.image.link,
          // site: p.company ? p.company.host : '',
        }
      })
    },
  },
  async mounted() {
    this.pages = await api.loadPages().catch(() => this.$router.push('login'))
    await console.log(this.pages)
    // this.images = await api.loadImages().catch(() => this.$router.push('login'))
  },
  methods: {
    showOrHide(page) {
      console.log(page.show)
      page.show = !page.show
    },
    getDate(dateValue) {
      const date = new Date(dateValue)
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    },
    async savePage(link, imageId) {
      await api.addLink(imageId, link)
      this.pages = await api.loadPages().catch(() => this.$router.push('login'))
    },
    selectImage(page) {
      this.idPageSelected = page.id
      console.log('selectImage')
      this.$refs['add-image-modal'].show()

      this.modalShow = !this.modalShow
    },
    async addPayment(page, payment) {
      await api.addPayment(page.id, payment)
      this.pages = await api.loadPages().catch(() => this.$router.push('login'))
      this.pages.find((n) => n.id === page.id).show = true
    },
    setImageToPage(image) {
      console.log('open image select')
      this.newPage.image = image
      this.$refs['add-image-modal'].hide()
    },
    async setImageNewToPage(image, pageid) {
      await api
        .setImageToPage(pageid, image.id)
        .then(() => {
          this.$refs['add-image-modal'].hide()

          this.modalShow = !this.modalShow
        })
        .catch(() => {})
      this.pages = await api.loadPages().catch(() => this.$router.push('login'))
    },
    async updateProcessNumber(page) {
      console.log('Salvando processo')
      await api.updatePageProcess(page)
      this.pages = await api.loadPages().catch(() => this.$router.push('login'))
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
