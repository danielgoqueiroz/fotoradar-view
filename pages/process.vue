<template>
  <b-container>
    <h1>Processo</h1>
    <b-form>
      <b-form-input v-model="process.processNumber"></b-form-input>
      <b-form-input v-model="process.createdAt"></b-form-input>
      <b-form-input v-model="process.description"></b-form-input>
      <b-form-input v-model="process.status"></b-form-input>

      <b-form-input v-model="process.attorney"></b-form-input>

      Adicionar pagamento

      <b-form-group description="Pagamento" :state="state">
        <b-button-group>
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
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  data() {
    return {
      addPaymentValue: 0,
      fields: [{ key: 'processNumber', label: 'Número do processo' }],
      process: [],
    }
  },
  computed: {
    paymentTotal() {
      return this.process.payments.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue.value)
      )
    },
  },
  async mounted() {
    const url = new URL(window.location.href)
    this.id = url.searchParams.get('id')
    this.process = await api.loadProcessById(this.id)
  },
  methods: {
    async addPayment() {
      await api.addPaymentOnProcess(this.id, this.addPaymentValue)
      this.process = await api.loadProcessById(this.id)
    },
  },
}
</script>