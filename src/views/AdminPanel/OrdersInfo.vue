<template>
  <section class="order">
    <ul class="list-group">
      <li
        v-for="(order, index) in ordersList"
        :key="index"
        class="list-group-item"
      >
        <div class="container">
          <div class="row row-cols-auto border p-1 bg-light">
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
              <button type="button" class="btn btn-info">View order</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  computed: {
    ordersList() {
      return this.$store.state.orders.orders || [];
    },
  },
  mounted() {
    this.$store.dispatch(`GET_ORDERS`, ``);
  },
};
</script>

<style lang="scss" scoped>
</style>