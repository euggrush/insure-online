<template>
  <div class="bg-dark bg-gradient shadow-lg mt-3 p-3 rounded">
    <ul class="list-group">
      <li
        v-for="(item, index) in estimationsList"
        :key="item.estimationId"
        v-show="lessThanOneHourAgo(item.created)"
        class="list-group-item list-group-item-dark"
      >
        <div class="row">
          <div class="col"><strong>#</strong> {{ item.referenceNumber }}</div>

          <div class="col"><strong>Car:</strong> {{ item.vehicleDetails }}</div>

          <div v-if="item.mainProductName" class="col">
            <strong>Product:</strong> {{ item.mainProductName }}
          </div>
          <div v-else class="col">
            <strong>Accessories:</strong>&nbsp;
            <span
              class="text-capitalize"
              v-for="(accessory, index) in item.accessories"
              :key="accessory.accessoryId"
              >{{ accessory.accessoryName
              }}<span v-if="index != item.accessories.length - 1">,&nbsp;</span>
            </span>
          </div>
          <div class="col"><strong>Monthly:</strong> R{{ item.totalCost }}</div>
          <div class="col">
            <strong>Start from:</strong> {{ getDate(item.startFromFormatted) }}
          </div>
          <div class="col">
            <strong>Total Due:</strong> R{{ item.totalCostCalculated }}
          </div>
          <div class="form-check col col-12 col-md-2 mt-3 mt-md-0">
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
      </li>
    </ul>
    <textarea
      v-if="estimationIdsArray.length !== 0"
      class="form-control mt-3"
      :placeholder="termsAndConditionsData"
      id="floatingTextarea"
      disabled
    ></textarea>
    <div class="form-check mt-3" v-if="estimationIdsArray.length !== 0">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckDefault"
        v-model="termsAndConditionsChecked"
        required
      />
      <label
        class="form-check-label text-white text-capitalize"
        for="flexCheckDefault"
      >
        terms and conditions
      </label>
    </div>
    <button
      type="button"
      class="btn btn-outline-warning mt-3"
      @click="createOrder"
      :disabled="estimationIdsArray.length == 0 || !termsAndConditionsChecked"
    >
      Create Order
    </button>
  </div>
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
    this.$store.dispatch(`GET_ESTIMATIONS`, ``);
    this.$store.dispatch(`GET_RATING`, ``);
  },
  methods: {
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
          this.$emit(`createdOrderConfirm`, { isOrderCreated: true });
        });
    },
    // createOrder(payload) {
    //   if (payload.isOrderCreated) {
    //     this.$store.dispatch(`GET_ORDERS`, ``);
    //     this.resetForm();
    //     this.$store.commit(`SET_MODAL`, {
    //       isModal: true,
    //       msg: `Your order is under review now, we will contact you for further
    //           information.`,
    //     });
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
</style>