<template>
  <section class="order mt-5">
    <ul class="list-group">
      <li
        v-for="(order, index) in ordersList"
        :key="index"
        class="list-group-item"
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
                >Customer:</span
              >
              <span>{{ order.firstName }}</span>
              <span>&nbsp;{{ order.lastName }}</span>
            </div>

            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Car:</span
              >
              <span>{{ order.vehicleDetails }}</span>
            </div>
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Car value:</span
              >
              <span>{{ order.vehicleRetailValue }}</span>
            </div>
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Category:</span
              >
              <span>{{ order.categoryName }}</span>
            </div>
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Product:</span
              >
              <span>{{ order.mainProductName }}</span>
            </div>
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Total:</span
              >
              <span>R{{ order.totalCost }}</span>
            </div>
            <div class="col">
              <button
                type="button"
                class="btn btn-primary float-end mt-3"
                @click="getOrder(order.orderId)"
              >
                View order
              </button>
            </div>
          </div>
        </div>
        <div
          v-if="isOrderModal == order.orderId"
          class="order-modal w-100 h-100 p-3 border"
          :class="{
            'border-info': order.orderStatus == `approved`,
            'border-danger': order.orderStatus == `rejected`,
          }"
        >
          <button
            type="button"
            class="btn-close float-end"
            aria-label="Close"
            @click="closeOrderModal"
          ></button>
          <h5>Order details:</h5>
          <span class="fw-bold text-decoration-underline">Product:</span>
          <p>{{ order.mainProductName }}</p>
          <h6 class="fw-bold text-decoration-underline">Coverages Included:</h6>
          <p v-for="(sub, index) in order.subProducts" :key="index">
            <span>{{ sub.subProductName }}</span>
          </p>
          <span class="fw-bold text-decoration-underline">Total:</span>
          <p>R{{ order.totalCost }}</p>
          <span class="fw-bold text-decoration-underline">Order created:</span>
          <p>{{ getDate(order.orderCreated) }}</p>
          <span class="fw-bold text-decoration-underline">Order status:</span>
          <p
            class="fw-bold text-uppercase"
            :class="{
              'text-warning': order.orderStatus == `approved`,
              'text-danger': order.orderStatus == `rejected`,
            }"
          >
            {{ order.orderStatus }}
          </p>
          <span class="fw-bold text-decoration-underline">Customer:</span>
          <p>{{ order.firstName }}&nbsp;{{ order.lastName }}</p>
          <span class="fw-bold text-decoration-underline">Vehicle:</span>
          <p>{{ order.vehicleDetails }}</p>
          <span class="fw-bold text-decoration-underline">Vehicle value:</span>
          <p>R{{ order.vehicleRetailValue }}</p>

          <div class="row row-cols-auto">
            <div class="col">
              <button
                type="button"
                class="btn btn-primary mt-1"
                :disabled="order.orderStatus == `approved`"
                @click="approveOrder(order)"
              >
                Approve
              </button>
            </div>
            <div class="col">
              <button
                type="button"
                class="btn btn-danger mt-1"
                :disabled="order.orderStatus == `rejected`"
                @click="rejectOrder(order)"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
const dayjs = require("dayjs");

export default {
  data() {
    return {
      isOrderModal: false,
    };
  },
  props: {
    componentKey: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    componentRerenderKey() {
      this.$store.dispatch(`GET_ORDERS`, `?order=desc`);
    },
  },
  computed: {
    ordersList() {
      return this.$store.state.orders.orders || [];
    },
    componentRerenderKey() {
      return this.componentKey;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_ORDERS`, `?order=desc`);
  },
  methods: {
    getDate(date) {
      return dayjs(date).format("MMMM D, YYYY h:mm A");
    },
    getOrder(id) {
      this.$store
        .dispatch(`GET_ORDERS`, `?orderId=${id}`)
        .then((this.isOrderModal = id));
    },
    closeOrderModal() {
      this.isOrderModal = false;
      this.$store.dispatch(`GET_ORDERS`, `?order=desc`);
    },
    approveOrder(order) {
      this.$store
        .dispatch(`CREATE_ORDER`, {
          orderId: order.orderId,
          orderStatus: `approved`,
        })
        .then(this.closeOrderModal)
        .catch((err) => alert(err))
        .then(this.closeOrderModal);
    },
    rejectOrder(order) {
      this.$store
        .dispatch(`CREATE_ORDER`, {
          orderId: order.orderId,
          orderStatus: `rejected`,
        })
        .then(this.closeOrderModal)
        .catch((err) => alert(err))
        .then(this.closeOrderModal);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  min-width: 12em;
}

.order-modal {
  height: auto;
}
.order-item {
  background-color: $mainGreen;
  box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
  -webkit-box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
  -moz-box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
}
</style>