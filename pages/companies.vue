<template>
  <b-container>
    <h1>Empresas</h1>
    <b-list-group>
      <b-table striped hover :items="companies" :fields="fields">
        <template #cell(button)="data">
          <!-- `data.value` is the value after formatted by the Formatter -->
          <b-button :to="`company?id=${data.item.id}`">Abrir</b-button>
        </template>
      </b-table>
    </b-list-group>
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  name: 'Company',
  data() {
    return {
      companies: [],
      fields: [
        { key: 'host', label: 'Host' },
        { key: 'button', label: 'Ação' },
      ],
    }
  },
  async mounted() {
    const companies = await api
      .getCompanies()
      .catch(() => this.$router.push('login'))
    if (companies) {
      this.companies = companies.map((c) => {
        c.show = false
        return c
      })
    }
  },
  methods: {
    gotToCompany(id) {},
    async update(company) {
      await api.updateCompany(company)
    },
  },
}
</script>
