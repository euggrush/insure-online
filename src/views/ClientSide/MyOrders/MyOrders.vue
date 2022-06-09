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
              <span>{{ getDate(order.orderCreated) }}</span>
            </div>
            <div class="col border-bottom border-start">
              <span class="fw-bold">#</span>
              <span>{{ order.referenceNumber }}</span>
            </div>

            <div class="col border-bottom border-start">
              <!-- <span class="d-block fw-bold">Order status:</span> -->
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
              <strong>Total Due: R</strong>
              <span> {{ order.allEstimationsTotalCostCalculated }}</span>
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
                @click="goToPaymentPage(order.orderId)"
              >
                Pay Online
              </button>
              <button
                type="button"
                class="btn btn-outline-dark mt-1"
                @click="getCallRequest(order.orderId)"
              >
                Request Call
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      orderIdToPass: ``,
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
      this.$router.push({ path: `/my-orders`, query: { id: id } });
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
    goToPaymentPage(id) {
      this.$store
        .dispatch(`CREATE_ORDER`, {
          orderId: id,
          paidBy: `online`,
        })
        .then(() => {
          this.scrollToTop();
          this.$store.dispatch(`GET_ORDERS`, `?orderId=${id}`);
          setTimeout(() => {
            this.$router.push(`/yoco-payment`);
          }, 1000);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
}
.btn-pdf {
  min-width: 100%;
  border-radius: 0;
  background-size: 27px 27px;
  background-repeat: no-repeat;
  background-position: 5% center;
  margin-bottom: 10px;
  padding-left: 40px;
  @include media-breakpoint-up(md) {
    min-width: 11em;
  }
}

.inception-date-wrap {
  width: 100%;
  height: 200px;
  z-index: 2;
  @include media-breakpoint-up(md) {
    width: 500px;
    height: 200px;
  }
}
</style>