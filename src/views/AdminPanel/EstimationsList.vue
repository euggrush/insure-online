<template>
  <section class="container estimations-list-wrapper mt-3">
    <h3>Quotes:</h3>
    <ul class="list-group mt-3">
      <li
        v-for="(estimation, index) in estimationsList"
        :key="index"
        class="list-group-item shadow-lg"
      >
        <div class="row quote-item p-1">
          <div class="col border-bottom border-start">
            <span class="d-block fw-bold text-decoration-underline"
              >Created at:</span
            >
            <span class="fst-italic">{{ getDate(estimation.created) }}</span>
          </div>
          <div class="col border-bottom border-start">
            <span class="d-block fw-bold text-decoration-underline"
              >Category:</span
            >
            <span>{{ estimation.categoryName }}</span>
          </div>
          <div class="col border-bottom border-start">
            <span class="d-block fw-bold text-decoration-underline"
              >Product:</span
            >
            <span>{{ estimation.mainProductName }}</span>
          </div>
          <div class="col border-bottom border-start">
            <span class="d-block fw-bold text-decoration-underline"
              >Total:</span
            >
            <span
              ><span class="fw-bold">R</span>{{ estimation.totalCost }}</span
            >
          </div>

          <div class="col border-bottom border-start">
            <span class="d-block fw-bold text-decoration-underline"
              >Vehicle:</span
            >

            <span>{{ estimation.vehicleDetails }}</span>
            <span class="d-block"
              ><span class="fw-bold">R</span
              >{{ estimation.vehicleRetailValue }}</span
            >
          </div>

          <div class="col border-bottom border-start">
            <span class="d-block fw-bold text-decoration-underline"
              >Client:</span
            >
            <span
              >{{ estimation.firstName }}&nbsp;{{ estimation.lastName }}</span
            >
            <a class="d-block" :href="`mailto:${estimation.username}`"
              >&nbsp;{{ estimation.username }}</a
            >
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
const dayjs = require("dayjs");

export default {
  computed: {
    estimationsList() {
      return this.$store.state.estimations.estimations;
    },
  },

  mounted() {
    this.$store.dispatch(`GET_ESTIMATIONS`, ``);
  },
  methods: {
    getDate(date) {
      return dayjs(date).format("MMMM D, YYYY h:mm A");
    },
  },
};
</script>

<style lang="scss" scoped>
.estimations-list-wrapper {
  // outline: solid 4px green;
}
.quote-item {
  background-color: $mainGreen;
  box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
  -webkit-box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
  -moz-box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
}
</style>