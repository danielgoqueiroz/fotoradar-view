<!-- <template>
  <div v-if="page.show">
    <h5>Processo</h5>
    <b-input-group prepend="Número do processo" class="mt-3">
      <b-form-input v-model="page.processNumber"></b-form-input>
      <b-button variant="success" @click="updateProcessNumber(page)"
        >Salvar</b-button
      >
    </b-input-group>

    <h5>Extrato</h5>
    <b-card class="extrato-conatiner">
      <div
        v-for="payment in page.payments"
        :key="payment.index"
        :prepend="payment.date"
        class="mt-3"
      >
        {{ getDate(payment.date) }} ------- R$ {{ payment.value }}
      </div>

      <b>Total: R$ {{ page.total }}</b>
    </b-card>
    <b-input-group prepend="Valor de pagamento" class="mt-3">
      <b-form-input v-model="page.payment" type="number"></b-form-input>
      <b-input-group-append>
        <b-button variant="success" @click="addPayment(page, page.payment)"
          >Adicionar</b-button
        >
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style> -->


<!-- 
<b-badge variant="success"
          ><b-icon-coin /> Pagamentos: R$ {{ page.total }}</b-badge
        >
        <b-badge v-if="page.processNumber"
          ><b-icon-file-earmark-text /> Número do processo:
          {{ page.processNumber }}</b-badge
        >
        <b-badge v-else> Sem processo cadastrado</b-badge> -->