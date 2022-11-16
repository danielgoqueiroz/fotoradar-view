<template>
  <b-container>
    <h1>Empresas</h1>
    <b-list-group>
      <b-table striped hover :items="companiesTable"></b-table>
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
    }
  },
  computed: {
    companiesTable() {
      return this.companies.map((company) => {
        return {
          host: company.host,
          // Imagem: p.image.link,
        }
      })
    },
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
    async update(company) {
      await api.updateCompany(company)
    },
  },
}
</script>
