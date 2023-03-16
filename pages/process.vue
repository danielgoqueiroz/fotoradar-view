<template>
  <b-container>
    <h1>Processo</h1>
    <b-form>
      <b-form-group label="Número do processo">
        <b-form-input v-model="process.processNumber"></b-form-input>
      </b-form-group>
      <b-form-group label="Data de criação">
        <b-form-input v-model="process.createdAt"></b-form-input>
      </b-form-group>
      <b-form-group label="Descrição">
        <b-form-input v-model="process.description"></b-form-input>
      </b-form-group>
      <b-form-group label="Status">
        <b-form-input v-model="process.status"></b-form-input>
      </b-form-group>
      <b-form-group label="Páginas">
        <b-form-input v-model="process.pages"></b-form-input>
      </b-form-group>
      <b-form-group label="Advogado responsável">
        <b-form-input v-model="process.attorney"></b-form-input>
      </b-form-group>

      Adicionar pagamento

      <b-form-group description="Pagamento">
        <b-button-group>
          {{ addPaymentDate }}
          <b-form-input v-model="addPaymentDate" type="date"></b-form-input>
          <b-form-input v-model="addPaymentValue" type="number"></b-form-input>
          <b-button @click="addPayment()">Adicionar</b-button>
        </b-button-group>
        <b-card>
          Pagamentos
          <p v-for="payment in process.payments" :key="payment.key">
            {{ payment.date }} --------------- {{ payment.value }}
          </p>
        </b-card>
        --------------- {{ paymentTotal }}
      </b-form-group>
    </b-form>
    {{ paymentTotal }}
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  data() {
    return {
      addPaymentDate: '',
      addPaymentValue: '',
      fields: [{ key: 'processNumber', label: 'Número do processo' }],
      process: [{ payments: [] }],
    }
  },
  computed: {
    paymentTotal() {
      let total = 0
      this.process.payments.forEach((payment) => {
        total += payment.value
      })
      return total
    },
  },
  async mounted() {
    const url = new URL(window.location.href)
    this.id = url.searchParams.get('id')
    this.process = await api.loadProcessById(this.id)
    console.log(this.process)
  },
  methods: {
    async addPayment() {
      await api.addPaymentOnProcess(
        this.id,
        this.addPaymentValue,
        this.addPaymentDate
      )
      this.process = await api.loadProcessById(this.id)
    },
  },
}
</script>