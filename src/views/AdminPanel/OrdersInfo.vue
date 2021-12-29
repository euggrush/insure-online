<template>
  <section class="order mt-5">
    <ul class="list-group">
      <li
        v-for="(order, index) in ordersList"
        :key="index"
        class="list-group-item position-relative"
      >
        <div class="container">
          <div class="row border p-1 bg-light">
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Order status:</span
              >
              <span>{{ order.orderStatus }}</span>
            </div>

            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Customer:</span
              >
              <span>{{ order.firstName }}</span>
              <span>{{ order.lastName }}</span>
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
                class="btn btn-info"
                @click="getOrder(order.orderId)"
              >
                View order
              </button>
            </div>
          </div>
        </div>
        <div
          v-if="isOrderModal == order.orderId"
          class="order-modal w-100 h-100 p-3"
        >
          <button
            type="button"
            class="btn-close float-end"
            aria-label="Close"
            @click="closeOrderModal"
          ></button>
          <h5>Order details:</h5>
          <p>{{ order.mainProductName }}</p>
          <p>{{ order.mainProductName }}</p>
          <p>{{ order.mainProductName }}</p>
          <p>{{ order.mainProductName }}</p>
          <p>{{ order.mainProductName }}</p>
          <p>{{ order.mainProductName }}</p>
          <p>{{ order.mainProductName }}</p>
          <p>{{ order.mainProductName }}</p>
          <p>{{ order.mainProductName }}</p>
          <p>{{ order.mainProductName }}</p>
          <p>{{ order.mainProductName }}</p>
          <p>{{ order.mainProductName }}</p>
          <p>{{ order.mainProductName }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
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
      this.$store.dispatch(`GET_ORDERS`, ``);
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
    this.$store.dispatch(`GET_ORDERS`, ``);
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
  },
};
</script>

<style lang="scss" scoped>
.order-modal {
  min-height: 40em;
  margin-top: -6.5em;
  outline: solid 5px blue;
  // @include media-breakpoint-up(md) {
  //   margin-top: -6.5em;
  // }
  // @include media-breakpoint-up(lg) {
  //   margin-top: -6.5em;
  // }
}
</style>