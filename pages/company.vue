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
          placeholder="Nome da empresa"
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
          type="text"
          placeholder="CNPJ"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="E-mail"
        label-for="input-1"
        description="CNPJ"
      >
        <b-form-input
          id="input-1"
          v-model="company.email"
          type="email"
          placeholder="E-mail"
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
          type="tel"
          placeholder="Telefone"
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
          type="text"
          placeholder="Endereço"
          required
        ></b-form-input>
      </b-form-group>
      <b-button @click="update()">Salvar</b-button>
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
    console.log(company)
    this.company = company
  },
  methods: {
    update() {
      api
        .updateCompany(this.company)
        .then(() => {
          this.$bvToast.toast('Dados atualizados', {
            title: 'Mensagem',
            toaster: 'b-toaster-bottom-center',
            autoHideDelay: 3000,
            variant: 'success',
            appendToast: true,
          })
        })
        .catch((err) => {
          this.$bvToast.toast(
            'Erro ao atualizar dado: ' + err.response.data.message,
            {
              title: 'Mensagem',
              toaster: 'b-toaster-bottom-center',
              autoHideDelay: 3000,
              variant: 'danger',
              appendToast: true,
            }
          )
        })
    },
  },
}
</script>
