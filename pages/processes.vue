<template>
  <b-container>
    <h1>Processos</h1>
    <b-table :items="processes" :fields="fields"></b-table>
    <!-- <b-form-group
      id="input-group-1"
      label="Processo"
      label-for="input-1"
      description="Host da empresa"
    >
      <b-form-input
        id="input-1"
        v-model="page.company.process"
        :disabled="page.company.preocess"
        type="text"
        placeholder="nome da empresa"
        required
      ></b-form-input>
    </b-form-group>  -->
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  data() {
    return {
      fields: [{ key: 'processNumber', label: 'Número do processo' }],
      processes: [],
    }
  },
  async mounted() {
    this.processes = await api.loadProcesses()
  },
}
</script>