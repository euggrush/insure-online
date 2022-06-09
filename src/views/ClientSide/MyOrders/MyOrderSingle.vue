<template>
  <section class="order-modal container position-relative pb-3">
    <h4>Order Details</h4>
    <ModalMessage />
    <button
      type="button"
      class="btn-close float-end"
      aria-label="Close"
      @click="goToMyPortal"
    ></button>

    <div class="mt-3">
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
    <hr/>
    <p class="mt-3">
      Inception date of cover is
      {{ getDate(order.startFromFormatted) }}
    </p>
    <strong class="text-uppercase"
          >{{ order.estimations[0].vehicleDetails }}, R{{
            order.estimations[0].vehicleRetailValue
          }}</strong
        >
    <div class="row mt-3">
      <div class="col-12 col-lg-6">
        
        <img
          v-if="order.estimations[0].vehicleAssets.length > 0"
          :src="`${FILE_URL}${order.estimations[0].vehicleAssets[0].path}`"
          class="d-block vehicle-image"
          alt="image"
          width="200"
          height="200"
        />
        <img
          v-else
          :src="CAR_DEFAULT_IMAGE"
          class="d-block vehicle-image"
          alt="image"
          width="200"
          height="200"
        />
      </div>
      <div class="col-12 col-lg-2 mt-3 mt-lg-0">
        <div v-for="item in order.estimations" :key="item">
          <div v-if="item.estimationType == 'estimation'">
            <strong class="text-dark text-uppercase">{{ item.mainProductName }}</strong>
            <p class="mt-1 mb-0 text-secondary" v-for="sub in item.subProducts" :key="sub">
              -{{ sub.subProductName }};
            </p>
            <p class="mt-1 mb-0 text-danger fw-bold">Total R{{ item.totalCost }}</p>
          </div>
          <div class="mt-3" v-else-if="item.estimationType == 'accessory'">
            <strong class="text-uppercase">Accessories</strong>
            <p
              class="mb-0"
              v-for="accessory in item.accessories"
              :key="accessory"
            >
              -{{ accessory.accessoryName }};
            </p>
            <p class="mt-1 mb-0 text-danger fw-bold">Total R{{ item.totalCost }}</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4 mt-3">
        <button type="button" class="btn btn-outline-secondary w-100">
          Pay online
        </button>

        <button type="button" class="btn btn-outline-secondary w-100 mt-3">
          Rquest a call
        </button>
      </div>
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