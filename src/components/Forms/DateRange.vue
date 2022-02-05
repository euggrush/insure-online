<template>
  <div class="d-flex flex-wrap justify-content-between align-items-sm-center">
    <span class="me-1">From:</span>
    <Datepicker v-model="dateFrom" />
    <span class="ms-1 me-1">To:</span>
    <Datepicker v-model="dateTo" />
    <button type="button" class="btn btn-dark ms-1" @click="getRange">
      Show
    </button>
  </div>
</template>

<script>
import Datepicker from "vue3-datepicker";
import { ref } from "vue";
export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      dateFrom: ref(new Date()),
      dateTo: ref(new Date()),
    };
  },
  methods: {
    getRange() {
      let timestampFromTo = {
        createdFrom: this.dateFrom.getTime(),
        createdTill: this.dateTo.getTime(),
      };
      this.$store.commit(`SET_DATE_RANGE`, timestampFromTo);
    },
  },
};
</script>

<style lang="sass" scoped>
</style>