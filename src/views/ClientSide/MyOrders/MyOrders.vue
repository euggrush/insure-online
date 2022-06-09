<template>
  <section class="container">
    <div
      v-for="(order, index) in ordersList"
      :key="index"
      class="order-item border rounded shadow-sm mt-3"
    >
      <div class="row row-cols-4 h-25 bg-light border-bottom m-0 p-1">
        <div class="col">
          <p>ORDER PLACED</p>
          <p>{{ getDate(order.orderCreated) }}</p>
        </div>
        <div class="col">
          <p>TOTAL</p>
          <p class="text-danger fw-bold">
            R{{ order.allEstimationsTotalCostCalculated }}
          </p>
        </div>
        <div class="col">
          <p
            class="fw-bold text-uppercase"
            :class="{
              'text-primary': order.orderStatus == `approved`,
              'text-danger': order.orderStatus == `rejected`,
            }"
          >
            {{ order.orderStatus }}
          </p>
          <p class="text-secondary">
            Covered from {{ getDate(order.inceptionDateOfCover) }}
          </p>
        </div>
        <div class="col">
          <p>ORDER #{{ order.referenceNumber }}</p>

          <button
            type="button"
            class="btn link-secondary p-0"
            @click="getOrder(order.orderId)"
          >
            View order details
          </button>
        </div>
      </div>
      <div class="row p-3">
        <div class="col">
          <p class="text-uppercase fw-bold">
            {{ order.estimations[0].vehicleDetails }}
          </p>
          <img
            v-if="order.estimations[0].vehicleAssets.length > 0"
            :src="`${FILE_URL}${order.estimations[0].vehicleAssets[0].path}`"
            class="d-block img-fluid"
            alt="image"
            width="200"
            height="200"
          />
          <img
            v-else
            :src="CAR_DEFAULT_IMAGE"
            class="d-block"
            alt="image"
            width="200"
            height="200"
          />
        </div>
        <div class="col-8">
          <div v-for="item in order.estimations" :key="item">
            <div v-if="item.estimationType == 'estimation'">
              <strong class="text-dark text-uppercase">{{
                item.mainProductName
              }}</strong>
              <hr>
              <span
                class="mt-1 mb-0 text-secondary"
                v-for="sub in item.subProducts"
                :key="sub"
              >
                -{{ sub.subProductName }};
              </span>
              <p class="mt-1 mb-0 text-danger fw-bold">
                Total R{{ item.totalCost }}
              </p>
            </div>
            <div class="mt-3" v-else-if="item.estimationType == 'accessory'">
              <strong class="text-uppercase">Accessories</strong>
              <hr>
              <span
                class="mb-0"
                v-for="accessory in item.accessories"
                :key="accessory"
              >
                -{{ accessory.accessoryName }};
              </span>
              <p class="mt-1 mb-0 text-danger fw-bold">
                Total R{{ item.totalCost }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { FILE_URL, CAR_DEFAULT_IMAGE } from "../../../constants";

export default {
  data() {
    return {
      FILE_URL: FILE_URL,
      CAR_DEFAULT_IMAGE,
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
  },
};
</script>

<style lang="scss" scoped>
.order-item {
  height: 400px;
}
</style>