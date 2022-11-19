<template>
  <b-container>
    <h1>Processo {{ process.processNumber }}</h1>
    {{ process }}
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  data() {
    return {
      fields: [{ key: 'processNumber', label: 'Número do processo' }],
      process: [],
    }
  },
  async mounted() {
    const url = new URL(window.location.href)
    this.id = url.searchParams.get('id')
    this.process = await api.loadProcessById(this.id)
  },
}
</script>