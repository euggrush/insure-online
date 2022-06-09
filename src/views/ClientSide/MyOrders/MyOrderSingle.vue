<template>
  <section class="order-modal container position-relative">
    <h4>Order Details</h4>
    <ModalMessage />
    <button
      type="button"
      class="btn-close float-end"
      aria-label="Close"
      @click="goToMyPortal"
    ></button>

    <div>
      Placed on {{ getDate(order.orderCreated) }} &#124; Order #{{
        order.referenceNumber
      }}
      &#124;
      <span
        class="fw-bold text-uppercase"
        :class="{
          'text-warning': order.orderStatus == `approved`,
          'text-danger': order.orderStatus == `rejected`,
        }"
      >
        {{ order.orderStatus }}
      </span>
      &#124; Total R{{ order.allEstimationsTotalCostCalculated }}
    </div>

    <div class="row border mt-3 p-3">
      <!-- <strong class="d-inline"
        >Inception date of cover
        {{ getDate(order.estimation[0].startFromFormatted) }}</strong
      >

      <div class="col">
        <strong>{{ order.estimation[0].vehicleDetails }}</strong>
        <span>
          <strong>, R</strong>{{ order.estimation[0].vehicleRetailValue }}</span
        >
        <label class="car-photo-wrap">
          <img
            v-if="order.estimation[0].vehicleAssets.length > 0"
            :src="`${FILE_URL}${order.estimation[0].vehicleAssets[0].path}`"
            :id="`car-photo-input${index}`"
            class="d-block vehicle-image"
            alt="image"
            width="200"
            height="200"
          />
          <img
            v-else
            :id="`car-photo-input${index}`"
            :src="CAR_DEFAULT_IMAGE"
            class="d-block vehicle-image"
            alt="image"
            width="200"
            height="200"
          />
        </label>
      </div> -->
      <!-- <div v-if="estimation.estimationName" class="col">
        <strong class="d-inline-block text-uppercase mt-3 border-bottom"
          >{{ estimation.estimationName }}&nbsp;R{{
            estimation.estimationCost
          }}</strong
        >
        <div
          class="form-check form-switch mt-1 ms-1"
          v-for="(sub, index) in estimation.subProducts"
          :key="index"
        >
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            :id="`flexSwitchCheckCheckedDisabled${index}`"
            checked
            disabled
          />
          <label
            class="form-check-label"
            :for="`flexSwitchCheckCheckedDisabled${index}`"
            >{{ sub.subProductName }}&nbsp;<strong>R</strong>
            {{ sub.subProductCost }}</label
          >
        </div>
      </div>

      <div v-else class="col">
        <strong class="d-inline-block text-uppercase mt-3 border-bottom"
          >Accessories, total:&nbsp;R{{ estimation.totalCost }}</strong
        >
        <div
          class="form-check form-switch mt-1 ms-1"
          v-for="(sub, index) in estimation.accessories"
          :key="index"
        >
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            :id="`flexSwitchCheckCheckedDisabled${index}`"
            checked
            disabled
          />
          <label
            class="form-check-label"
            :for="`flexSwitchCheckCheckedDisabled${index}`"
            >{{ sub.accessoryName }}&nbsp;<strong>R</strong>
            {{ sub.accessoryCost }}</label
          >
        </div>
      </div> -->
    </div>
  </section>
</template>

<script>
import { FILE_URL, CAR_DEFAULT_IMAGE } from "../../../constants";
import ModalMessage from "../../../components/Modals/ModalMessage.vue";

export default {
  components: { ModalMessage },
  data() {
    return {
      showCarPhotoInput: false,
      isUploadError: false,
      FILE_URL: FILE_URL,
      CAR_DEFAULT_IMAGE,
    };
  },
  props: {
    myProps: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    order() {
      return this.$store.state.orders.orders[0];
    },
  },
  mounted() {
    this.getOrder(this.$route.query.id);
  },
  methods: {
    getOrder(id) {
      this.$store.dispatch(`GET_ORDERS`, `?orderId=${id}`);
    },
    goToMyPortal() {
      this.$router.push(`/my-portal`);
    },
  },
};
</script>

<style lang="scss" scoped>
.order-modal {
  padding-top: 150px;
}

.vehicle-image {
  width: 100%;
  height: auto;
}
</style>