<template>
  <b-container>
    <b-form>
      <h1>{{ page.url }}</h1>
      <b-form-group
        id="input-group-1"
        label="Nome da imagem"
        label-for="input-1"
        description="Endereço do host do site"
      >
        <b-form-input
          id="input-1"
          v-model="page.image.name"
          disabled
          placeholder="host"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Empresa(host)"
        label-for="input-1"
        description="Host da empresa"
      >
        <b-form-input
          id="input-1"
          v-model="page.company.host"
          disabled
          type="text"
          placeholder="nome da empresa"
          required
        ></b-form-input>
      </b-form-group>
      <b-input-group
        id="input-group-1"
        label="Processo"
        label-for="input-1"
        description="Host da empresa"
      >
        <b-form-input
          id="input-1"
          v-model="processNumber"
          :state="processNumberValidation"
          placeholder="número do processo"
          required
        ></b-form-input>

        <b-button
          v-if="page.process"
          variant="success"
          :to="`/process?id=${page.process.id}`"
          >Detalhes</b-button
        >
        <b-button v-else variant="success" @click="saveProcess()"
          >Salvar</b-button
        >
      </b-input-group>
    </b-form>
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  name: 'Pagina',
  data() {
    return {
      id: '',
      processNumber: '',
      page: {},
    }
  },
  computed: {
    processNumberValidation() {
      const regex = /[0-9]+-[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/i
      return regex.test(this.processNumber)
    },
  },

  async mounted() {
    const url = new URL(window.location.href)
    this.id = url.searchParams.get('id')
    this.page = await api.getPageId(this.id)
    this.processNumber = this.page.process
      ? this.page.process.processNumber
      : ''
  },
  methods: {
    async saveProcess() {
      await api.saveProcess(this.id, this.processNumber)
      this.page = await api.getPageId(this.id)
    },
    // async updateProcess() {
    //   const number = this.processNumber
    //   await api.updateProcessNumber(this.id, number)
    //   this.page = await api.getPageId(this.id)
    // },
  },
}
</script>
