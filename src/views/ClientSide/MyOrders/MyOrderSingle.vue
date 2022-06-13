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
      <div v-if="order.orderStatus == 'pending'" class="mt-3">
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
    <section class="order-includes-wrap">
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
        <!-- CAR IMAGE -->
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
        <!-- CAR IMAGE END -->
        <!-- ORDER DETAILS -->
        <div class="col-12 col-lg-6 mt-3 mt-lg-0">
          <div v-for="item in order.estimations" :key="item">
            <div v-if="item.estimationType == 'estimation'">
              <strong class="text-dark text-uppercase">{{
                item.mainProductName
              }}</strong>
              <p
                class="mt-1 mb-0 text-secondary"
                v-for="sub in item.subProducts"
                :key="sub"
              >
                -{{ sub.subProductName }};
              </p>
              <p class="mt-1 mb-0 text-danger fw-bold">
                Total R{{ item.totalCost }}
              </p>
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
              <p class="mt-1 mb-0 text-danger fw-bold">
                Total R{{ item.totalCost }}
              </p>
            </div>
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

export default {
  components: { ModalMessage },
  data() {
    return {
      FILE_URL: FILE_URL,
      CAR_DEFAULT_IMAGE,
    };
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
      this.$router.push(`/yoco-payment`);
      // this.$store
      //   .dispatch(`CREATE_ORDER`, {
      //     orderId: id,
      //     paidBy: `online`,
      //   })
      //   .then(() => {
      //     this.scrollToTop();
      //     this.$store.dispatch(`GET_ORDERS`, `?orderId=${id}`);
      //     setTimeout(() => {
      //       this.$router.push(`/yoco-payment`);
      //     }, 1000);
      //   });
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