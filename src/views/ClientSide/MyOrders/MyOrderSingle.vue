<template>
  <section class="order-modal container position-relative mt-3">
    <h4>Order Details</h4>
    <ModalMessage />
    <YocoPage v-if="showPaymentSystem" />
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
      <strong class="text-danger">
        &#124; Total R{{ order.allEstimationsTotalCostCalculated }}</strong
      >

      <div
        v-if="order.orderStatus == 'pending' && order.paidBy === ''"
        class="mt-3"
      >
        <button
          type="button"
          class="btn link-secondary p-0"
          @click="goToPaymentPage(order.orderId)"
        >
          Pay online
        </button>

        <button
          type="button"
          class="btn link-secondary ms-3 p-0"
          @click="getCallRequest(order.orderId)"
        >
          Rquest a call
        </button>
      </div>
    </div>

    <hr />
    <!-- ORDER INCLUDES -->
    <section
      v-for="orderIncludedEstimation in order.estimations"
      :key="orderIncludedEstimation.estimationId"
      class="border p-3 mb-3"
    >
      <div class="row mt-3">
        <!-- CAR IMAGE -->
        <div class="col-12 col-lg-3">
          <strong class="text-uppercase"
            >{{ orderIncludedEstimation.vehicleDetails }}, R{{
              orderIncludedEstimation.vehicleRetailValue
            }}</strong
          >
          <img
            v-if="orderIncludedEstimation.vehicleAssets.length > 0"
            :src="`${FILE_URL}${orderIncludedEstimation.vehicleAssets[0].path}`"
            class="d-block vehicle-image mt-3"
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
        <!-- CAR IMAGE END -->
        <!-- ORDER DETAILS -->
        <div class="col-12 col-lg-9 mt-3 mt-lg-0">
          <div
            v-if="
              orderIncludedEstimation.estimationType == 'tuffstuff' ||
              orderIncludedEstimation.estimationType == 'topmarq'
            "
          >
            <strong class="text-dark text-uppercase fs-6">{{
              orderIncludedEstimation.mainProductName
            }}</strong>
            <span class="d-block float-lg-end mt-3 mt-lg-0">
              Inception date of cover is
              {{ getDate(orderIncludedEstimation.startFromFormatted) }}
            </span>
            <hr />
            <span
              class="mt-1 mb-0 text-secondary text-uppercase"
              v-for="(sub, i) in orderIncludedEstimation.subProducts"
              :key="sub"
            >
              {{ sub.subProductName }}&nbsp;<span
                v-if="i !== orderIncludedEstimation.subProducts.length - 1"
              >
                &#124;</span
              >&nbsp;
            </span>
            <p class="mt-3 mb-0 text-danger fw-bold">
              Total R{{ orderIncludedEstimation.totalCostCalculated }}
            </p>
          </div>
          <div
            class="mt-3"
            v-else-if="orderIncludedEstimation.estimationType == 'accessory'"
          >
            <strong class="text-uppercase">Accessories</strong>
            <span class="d-block float-lg-end mt-3 mt-lg-0">
              Inception date of cover is
              {{ getDate(orderIncludedEstimation.startFromFormatted) }}
            </span>
            <hr />
            <span
              class="mb-0 text-uppercase"
              v-for="(accessory, index) in orderIncludedEstimation.accessories"
              :key="accessory"
            >
              {{ accessory.accessoryName }}&nbsp;<span
                v-if="index !== orderIncludedEstimation.accessories.length - 1"
              >
                &#124;</span
              >&nbsp;
            </span>
            <p class="mt-3 mb-0 text-danger fw-bold">
              Total R{{ orderIncludedEstimation.totalCostCalculated }}
            </p>
          </div>
        </div>
        <!-- ORDER DETAILS END -->
      </div>
    </section>

    <!-- ORDER INCLUDES END -->
  </section>
</template>

<script>
import { FILE_URL, CAR_DEFAULT_IMAGE } from "../../../constants";
import ModalMessage from "../../../components/Modals/ModalMessage.vue";
import YocoPage from "../../../components/PaymentSystem/YocoPage.vue";
export default {
  components: { ModalMessage, YocoPage },
  data() {
    return {
      FILE_URL: FILE_URL,
      CAR_DEFAULT_IMAGE,
      showPaymentSystem: false,
    };
  },
  computed: {
    order() {
      return this.$store.state.orders.orders[0];
    },
  },
  mounted() {
    this.scrollToTop();
    this.getOrder(this.$route.query.id);
    this.unfixHeader();
  },
  unmounted() {
    this.fixHeader();
  },
  methods: {
    getOrder(id) {
      this.$store.dispatch(`GET_ORDERS`, `?orderId=${id}`);
    },
    goToMyPortal() {
      this.$router.push(`/my-portal`);
    },
    getCallRequest(id) {
      this.$store
        .dispatch(`CREATE_ORDER`, {
          orderId: id,
          paidBy: `offline`,
        })
        .then(() => {
          this.scrollToTop();
          this.$store.dispatch(`GET_ORDERS`, ``);
          this.$store.commit(`SET_MODAL`, {
            isModal: true,
            msg: `Your request has been submitted. Allow up to 24 hours for an update.`,
          });
        });
    },
    // eslint-disable-next-line no-unused-vars
    goToPaymentPage(id) {
      this.showPaymentSystem = true;
      setTimeout(() => {
        this.showPaymentSystem = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.vehicle-image {
  width: 100%;
  height: auto;
  max-height: 430px;
  object-fit: contain;
}
</style>