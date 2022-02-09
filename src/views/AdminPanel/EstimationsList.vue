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
            <a
              class="
                d-block
                text-decoration-none
                email-link
                text-black
                border-end border-bottom border-dark
              "
              :href="`mailto:${estimation.email}`"
              >&nbsp;{{ estimation.email }}</a
            >
            <a
              class="
                d-block
                text-decoration-none
                cell-link
                text-black
                mt-1
                mb-1
                border-end border-bottom border-dark
              "
              :href="`tel:${estimation.cellphone}`"
              >&nbsp;{{ estimation.cellphone }}</a
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
.quote-item {
  background-color: $mainGreen;
  box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
  -webkit-box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
  -moz-box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
}
.email-link {
  background-image: url("../../assets/img/icon-mail.svg");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: left center;
  padding-left: 25px;
}
.cell-link {
  background-image: url("../../assets/img/icon-cell.svg");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: left center;
  padding-left: 25px;
}
</style>