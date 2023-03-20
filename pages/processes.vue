<template>
  <b-container>
    <h1>Processos</h1>
    <b-spinner v-if="!processes.length" />
    <b-table v-else :items="processes" :fields="fields">
      <template #cell(button)="data">
        <b-button :to="`/process?id=${data.item.id}`">Ver detalhes</b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  data() {
    return {
      fields: [
        { key: 'processNumber', label: 'Número do processo' },
        { key: 'button', label: 'Abrir' },
      ],
      processes: [],
    }
  },
  async mounted() {
    this.processes = await api.loadProcesses()
  },
}
</script>