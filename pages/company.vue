<template>
  <b-container>
    <b-form>
      <h1>{{ company.host }}</h1>
      <b-form-group
        id="input-group-1"
        label="Host"
        label-for="input-1"
        description="Endereço do host do site"
      >
        <b-form-input
          id="input-1"
          v-model="company.host"
          placeholder="host"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Nome"
        label-for="input-1"
        description="Nome social da empresa"
      >
        <b-form-input
          id="input-1"
          v-model="company.name"
          type="text"
          placeholder="nome da empresa"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="CNPJ"
        label-for="input-1"
        description="Nome da empresa"
      >
        <b-form-input
          id="input-1"
          v-model="company.cnpj"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="E-mail"
        label-for="input-1"
        description="Endereço de e-mail"
      >
        <b-form-input
          id="input-1"
          v-model="company.email"
          type="email"
          placeholder="e-mail"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Telefone"
        label-for="input-1"
        description="E-mail de contato"
      >
        <b-form-input
          id="input-1"
          v-model="company.phone"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Endereço"
        label-for="input-1"
        description="Telefone de contato"
      >
        <b-form-input
          id="input-1"
          v-model="company.address"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
    </b-form>
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  name: 'Company',
  data() {
    return {
      company: {},
    }
  },
  async mounted() {
    const url = new URL(window.location.href)
    const id = url.searchParams.get('id')
    const company = await api.getCompanyId(id)
    this.company = company
  },
  methods: {
    async update(company) {
      await api.updateCompany(company)
    },
  },
}
</script>
