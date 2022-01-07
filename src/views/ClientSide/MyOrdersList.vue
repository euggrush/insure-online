<template>
  <section class="my-orders-list">
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
          class="order-modal w-100 h-100 p-3 border border-info"
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
      myId: ``,
      isOrderModal: false,
    };
  },
  computed: {
    ordersList() {
      return this.$store.state.orders.orders || [];
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
      this.$store.dispatch(`GET_ORDERS`, ``);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>