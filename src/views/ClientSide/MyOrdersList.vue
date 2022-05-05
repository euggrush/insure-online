<template>
  <section
    class="my-orders-list bg-dark bg-gradient p-3 rounded position-relative"
  >
    <ul class="list-group">
      <li
        v-for="(order, index) in ordersList"
        :key="index"
        class="list-group-item list-group-item-dark"
      >
        <div class="container">
          <div class="row border p-1 order-item">
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Order status:</span
              >
              <span
                class="fw-bold text-uppercase"
                :class="{
                  'text-primary': order.orderStatus == `approved`,
                  'text-danger': order.orderStatus == `rejected`,
                }"
                >{{ order.orderStatus }}</span
              >
            </div>
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Products:</span
              >
              <span
                class="d-block"
                v-for="(item, index) in order.estimations"
                :key="index"
                ><span v-if="item.estimationType == 'estimation'">{{
                  item.mainProductName
                }}</span>
                <span v-else>Asseccories</span>
              </span>
            </div>

            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Cars:</span
              >
              <span
                class="d-block"
                v-for="(car, index) in order.estimations"
                :key="index"
                >{{ car.vehicleDetails }},&nbsp;<strong>R</strong
                >{{ car.vehicleRetailValue }}</span
              >
            </div>
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Total:</span
              >
              <span
                ><strong>R</strong> {{ order.allEstimationsTotalCost }}</span
              >
            </div>
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold fst-italic">Adjusted:</span>
              <span v-if="order.adjustedCost > 0"
                ><strong>R</strong> {{ order.adjustedCost }}</span
              >
              <span v-else>Not Adjusted</span>
            </div>
            <div class="col-12 col-lg-3 col-xl-2">
              <button
                type="button"
                class="btn btn-outline-success float-end mt-1 mt-lg-0"
                @click="getOrder(order.orderId)"
              >
                View order
              </button>
              <button
                type="button"
                class="btn btn-outline-info mt-1"
                @click="goToPaymentPage"
              >
                Pay Online
              </button>
              <button
                type="button"
                class="btn btn-outline-dark mt-1"
                @click="getCallRequest"
              >
                Request Call
              </button>
            </div>
          </div>
        </div>

        <MyOrderView
          v-if="isOrderModal == order.orderId"
          :myProps="{ order: order }"
          @closeOrderView="closeOrderModal"
        />
      </li>
    </ul>

    <!-- <Transition>
      <MyPaymentPage
        v-if="isPaymentModal"
        class="position-absolute top-50 start-50 translate-middle"
      />
    </Transition> -->
  </section>
</template>

<script>
import MyOrderView from "../ClientSide/MyOrderView.vue";
// import MyPaymentPage from "../ClientSide/MyPaymentPage.vue";

export default {
  components: { MyOrderView },
  data() {
    return {
      isOrderModal: false,
      isPaymentModal: true,
    };
  },
  computed: {
    ordersList() {
      return this.$store.state.orders.orders;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_ORDERS`, ``).catch((err) => console.log(err));
  },
  methods: {
    getOrder(id) {
      this.$store
        .dispatch(`GET_ORDERS`, `?orderId=${id}`)
        .then((this.isOrderModal = id));
    },
    closeOrderModal() {
      this.isOrderModal = false;
      this.$store.dispatch(`GET_ORDERS`, ``);
    },
    getCallRequest() {
      this.scrollToTop();
      this.$store.commit(`SET_MODAL`, {
        isModal: true,
        msg: `Your request has been submitted. Allow up to 24 hours for an update.`,
      });
    },
    goToPaymentPage() {
      // this.isPaymentModal = true;
      this.$router.push(`/my-payment`);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  // min-width: 10em;
  width: 100%;
}
.btn-pdf {
  min-width: 100%;
  border-radius: 0;
  background-image: url("../../assets/img/icon-pdf.png");
  background-size: 27px 27px;
  background-repeat: no-repeat;
  background-position: 5% center;
  margin-bottom: 10px;
  padding-left: 40px;
  @include media-breakpoint-up(md) {
    min-width: 11em;
  }
}
.btn-pdf:hover {
  background-image: url("../../assets/img/icon-pdf.svg");
}
</style>