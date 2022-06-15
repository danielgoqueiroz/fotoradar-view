<template>
  <b-container>
    <h1>Empresas</h1>
    <b-list-group>
      <b-list-group-item v-for="company in companies" :key="company.index">
        <b-form-group label="Host">
          <b-input-group>
            <b-form-input v-model="company.host" disabled></b-form-input>
            <b-input-group-append>
              <b-button @click="company.show = !company.show" variant="info"
                >Infos
                <b-icon-arrow-down v-if="!company.show" />
                <b-icon-arrow-up v-if="company.show" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <div v-if="company.show">
          <b-form-group label="Endereço">
            <b-form-input v-model="company.address"></b-form-input>
          </b-form-group>
          <b-form-group label="CNPJ/CPF">
            <b-form-input v-model="company.cnpj"></b-form-input
          ></b-form-group>
          <b-form-group label="Nome">
            <b-form-input v-model="company.name"></b-form-input
          ></b-form-group>
          <b-form-group label="Telefone">
            <b-form-input v-model="company.phone"></b-form-input
          ></b-form-group>
          <b-form-group label="E-mail"
            ><b-form-input v-model="company.mail"></b-form-input
          ></b-form-group>
          <b-form-group label="Responsável (CPF)">
            <b-form-input v-model="company.suid_responsable"></b-form-input
          ></b-form-group>
          <b-button variant="success" @click="update(company)">Salvar</b-button>
        </div>
      </b-list-group-item>
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
  async mounted() {
    const companies = await api.getCompanies()
    this.companies = companies.map((c) => {
      c.show = false
      return c
    })
  },
  methods: {
    async update(company) {
      await api.updateCompany(company)
    },
  },
}
</script>