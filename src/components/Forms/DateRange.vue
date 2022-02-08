<template>
  <div
    class="
      d-flex
      flex-wrap
      justify-content-between
      align-items-center
      range-wrap
    "
  >
    <div class="d-flex justify-content-end align-items-center from-wrap">
      <span class="me-1">From:</span>
      <Datepicker v-model="dateFrom" />
    </div>
    <div class="d-flex justify-content-end align-items-center to-frap">
      <span class="ms-1 me-1">To:</span>
      <Datepicker v-model="dateTo" />
    </div>
    <div class="d-flex justify-content-end align-items-center btns-wrap">
      <button type="button" class="btn btn-dark ms-1 me-1" @click="getRange">
        Show
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary ms-1"
        @click="resetRange"
      >
        Reset
      </button>
    </div>
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
        createdTo: this.dateTo.getTime(),
      };
      this.$store.commit(`SET_DATE_RANGE`, timestampFromTo);
    },
    resetRange() {
      this.dateFrom = new Date();
      this.dateTo = new Date();
      let timestampFromTo = {
        createdFrom: 0,
        createdTo: new Date().getTime(),
      };
      this.$store.commit(`SET_DATE_RANGE`, timestampFromTo);
    },
  },
};
</script>

<style lang="scss" scoped>
.range-wrap {
  width: 100%;
  margin-top: 1em;
  @include media-breakpoint-up(lg) {
    width: auto;
  }
}
.from-wrap,
.to-frap,
.btns-wrap {
  width: 100%;
  margin-top: 1em;
  @include media-breakpoint-up(md) {
    width: auto;
    margin-top: 0;
  }
}
</style>