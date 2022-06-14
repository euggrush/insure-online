<template>
  <section class="container-fluid pb-3">
    <div
      v-for="(item, index) in estimationsList"
      :key="item.estimationId"
      class="quote-item mt-3 border rounded shadow"
    >
      <div class="row row-cols- h-25 bg-light border-bottom m-0 p-1">
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
          <p class="text-uppercase">Quote #{{ item.referenceNumber }}</p>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              :value="item.estimationId"
              :id="`flexCheckDefault${index}`"
              v-model="estimationIdsArray"
            />
            <label class="form-check-label" :for="`flexCheckDefault${index}`">
              Add To Order
            </label>
          </div>
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
            <p v-if="item.subProducts.length>0" class="text-uppercase fw-bold">coverages</p>
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

    <div v-if="estimationIdsArray.length !== 0">
      <textarea
        class="form-control mt-3"
        :placeholder="termsAndConditionsData"
        id="floatingTextarea"
        disabled
      ></textarea>
      <div class="form-check mt-3">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          v-model="termsAndConditionsChecked"
          required
        />
        <label class="form-check-label text-capitalize" for="flexCheckDefault">
          terms and conditions
        </label>
      </div>
    </div>

    <button
      v-if="estimationsList.length > 0"
      type="button"
      class="btn btn-outline-secondary mt-3"
      @click="createOrder"
      :disabled="estimationIdsArray.length == 0 || !termsAndConditionsChecked"
    >
      Create Order
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      estimationIdsArray: [],
      termsAndConditionsChecked: false,
    };
  },
  computed: {
    estimationsList() {
      return this.$store.state.estimations.estimations || [];
    },
    termsAndConditionsData() {
      return this.getTermsAndConditions();
    },
  },
  mounted() {
    this.fetchEstimations();
    this.$store.dispatch(`GET_RATING`, ``);
  },
  methods: {
    fetchEstimations() {
      let today = Date.now();
      const THREE_HOURS_AGO = 10800000;
      let threeHoursAgoCalculated = today - THREE_HOURS_AGO;
      this.$store.dispatch(
        `GET_ESTIMATIONS`,
        `?limit=2&createdFrom=${threeHoursAgoCalculated}`
      );
    },
    getTermsAndConditions() {
      let termsAndConditions = ``;
      this.$store.state.rating.resources.map((item) => {
        if (item.resourceKey == `termsAndConditions`) {
          termsAndConditions = item.resourceValue;
        }
      });
      return termsAndConditions;
    },
    createOrder() {
      this.$store
        .dispatch(`CREATE_ORDER`, {
          estimationIds: this.estimationIdsArray,
        })
        .then(() => {
          this.scrollToTop();
          this.fetchEstimations();
          this.$store.commit(`SET_MODAL`, {
            isModal: true,
            msg: `Your order is under review now, we will contact you for further
              information.`,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.quote-item {
  min-height: 300px;
}
</style>