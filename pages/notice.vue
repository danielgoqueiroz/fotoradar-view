<template>
  <b-container>
    <h1>Notices</h1>
    <b-list-group>
      <b-list-group-item v-for="item in notices" :key="item.index">
        {{ item.link }}
      </b-list-group-item></b-list-group
    >
  </b-container>
</template>

<script>
import api from '../service/api'
export default {
  data() {
    return {
      notices: [],
    }
  },
  async mounted() {
    this.notices = await api.loadNotices()
  },
}
</script>