<template>
  <section class="container estimations-list-wrapper mt-3">
    <h3 class="text-center">Quotes</h3>
    <div class="d-flex flex-wrap justify-content-between">
      <div class="date-range-wrap">
        <DateRange class="mt-0" />
      </div>
      <div class="search-wrap mt-3 mt-xl-0">
        <SearchEstimation />
      </div>
    </div>
    <div
      v-for="item in estimationsList"
      :key="item.estimationId"
      class="quote-item mt-3 border rounded shadow"
    >
      <div class="row h-25 bg-light border-bottom m-0 p-1">
        <div class="col">
          <p class="text-uppercase">Created</p>
          <p>{{ getDate(item.created) }}</p>
        </div>
        <div class="col">
          <p class="text-uppercase">total</p>
          <p class="text-danger fw-bold">R{{ item.totalCostCalculated }}</p>
        </div>
        <div class="col">
          <p class="text-uppercase">inception date of cover</p>
          <p>{{ getDate(item.startFromFormatted) }}</p>
        </div>
        <div class="col">
          <p class="text-uppercase mb-0">Quote #{{ item.referenceNumber }}</p>
        </div>
        <div class="col">
          <p class="mb-1">{{ item.firstName }}&nbsp;{{ item.lastName }}</p>
          <a
            class="d-block text-decoration-none email-link text-black"
            :href="`mailto:${item.email}`"
            >&nbsp;{{ item.email }}</a
          >
          <a
            class="d-block text-decoration-none cell-link text-black"
            :href="`tel:${item.cellphone}`"
            >&nbsp;{{ item.cellphone }}</a
          >
        </div>
      </div>

      <div class="row row-cols-2 p-3">
        <div class="col">
          <h5 class="text-uppercase">{{ item.vehicleDetails }}</h5>
          <p class="fw-bold">R{{ item.vehicleRetailValue }}</p>
        </div>
        <div class="col">
          <div
            v-if="
              item.estimationType == 'tuffstuff' ||
              item.estimationType == 'topmarq'
            "
          >
            <p class="text-uppercase fw-bold">{{ item.mainProductName }}</p>
            <hr />
            <p
              v-if="item.subProducts.length > 0"
              class="text-uppercase fw-bold"
            >
              coverages
            </p>
            <span v-for="(sub, j) in item.subProducts" :key="sub">
              {{ sub.subProductName }}
              <span v-if="j !== item.subProducts.length - 1"
                >&nbsp;&#124;&nbsp;</span
              >
            </span>
          </div>
          <div v-else-if="item.estimationType == 'accessory'">
            <p class="text-uppercase fw-bold">accessories</p>
            <span
              v-for="(accessory, count) in item.accessories"
              :key="accessory.accessoryId"
            >
              {{ accessory.accessoryName
              }}<span v-if="count !== item.accessories.length - 1"
                >&nbsp;&#124;&nbsp;</span
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DateRange from "../../../components/Forms/DateRange.vue";
import SearchEstimation from "../../../components/Forms/SearchEstimation.vue";

export default {
  components: {
    DateRange,
    SearchEstimation,
  },
  watch: {
    getTimeRange() {
      this.$store.dispatch(
        `GET_ESTIMATIONS`,
        `?order=desc&createdFrom=${this.$store.state.date_range.createdFrom}&createdTo=${this.$store.state.date_range.createdTo}`
      );
    },
  },
  computed: {
    estimationsList() {
      return this.$store.state.estimations.estimations;
    },
    getTimeRange() {
      return this.$store.state.date_range;
    },
  },

  mounted() {
    this.$store.dispatch(`GET_ESTIMATIONS`, ``);
  },
};
</script>

<style lang="scss" scoped>
.quote-item {
  min-height: 300px;
}
.email-link {
  background-image: url("../../../assets/img/icon-mail.svg");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: left center;
  padding-left: 25px;
}
.cell-link {
  background-image: url("../../../assets/img/icon-cell.svg");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: left center;
  padding-left: 25px;
}
.date-range-wrap {
  @include media-breakpoint-up(md) {
    max-width: 87%;
  }
  @include media-breakpoint-up(lg) {
    max-width: 70%;
  }
  @include media-breakpoint-up(xl) {
    max-width: 55%;
  }
}
</style>