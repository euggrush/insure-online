<template>
  <section class="container pb-3">
    <div
      v-for="(order, index) in ordersList"
      :key="index"
      class="order-item border rounded shadow-sm mt-3"
    >
      <!-- ORDER TOP ROW -->

      <div class="row row-cols-md-4 h-25 bg-light border-bottom m-0 p-1">
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
              'text-success': order.orderStatus == `approved`,
              'text-danger': order.orderStatus == `rejected`,
            }"
          >
            {{ order.orderStatus }}
          </p>
          <p
            v-if="order.paidBy == ''"
            class="text-danger fw-bold text-uppercase"
          >
            unpaid
          </p>
          <p
            v-else-if="order.paidBy == 'offline'"
            class="text-success fw-bold text-uppercase"
          >
            paid offline
          </p>
          <p
            v-else-if="order.paidBy == 'online'"
            class="text-success fw-bold text-uppercase"
          >
            paid online
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

      <!-- ORDER MAIN ROW -->

      <div
        v-for="orderInfo in order.estimations"
        :key="orderInfo.vehicleId"
        class="row p-3"
      >
        <div class="col">
          <p class="text-uppercase fw-bold text-secondary">
            {{ orderInfo.vehicleDetails }}
          </p>
          <img
            v-if="orderInfo.vehicleAssets.length > 0"
            :src="`${FILE_URL}${orderInfo.vehicleAssets[0].path}`"
            class="d-block img-fluid"
            alt="image"
            width="100"
          />
          <img
            v-else
            :src="CAR_DEFAULT_IMAGE"
            class="d-block"
            alt="image"
            width="100"
          />
        </div>
        <div class="col col-lg-10">
          <div>
            <div
              v-if="
                orderInfo.estimationType == 'tuffstuff' ||
                orderInfo.estimationType == 'topmarq'
              "
            >
              <strong class="text-dark text-uppercase fs-6">{{
                orderInfo.mainProductName
              }}</strong>
              <span class="text-secondary d-block float-lg-end">
                Covered from {{ getDate(orderInfo.startFromFormatted) }}</span
              >
              <hr />
              <span
                class="mt-1 mb-0 text-secondary"
                v-for="(sub, i) in orderInfo.subProducts"
                :key="sub"
              >
                {{ sub.subProductName }}
                <span v-if="i !== orderInfo.subProducts.length - 1"
                  >&nbsp;&#124;&nbsp;</span
                >
              </span>
              <p class="mt-1 mb-0 text-danger fw-bold">
                Total R{{ orderInfo.totalCostCalculated }}
              </p>
            </div>
            <div
              class="mt-3"
              v-else-if="orderInfo.estimationType == 'accessory'"
            >
              <strong class="text-uppercase">Accessories</strong>
              <span class="text-secondary d-block float-lg-end">
                Covered from {{ getDate(orderInfo.startFromFormatted) }}</span
              >
              <hr />
              <span
                class="mb-0"
                v-for="(accessory, j) in orderInfo.accessories"
                :key="accessory"
              >
                {{ accessory.accessoryName
                }}<span v-if="j !== orderInfo.accessories.length - 1"
                  >&nbsp;&#124;&nbsp;</span
                >
              </span>
              <p class="mt-1 mb-0 text-danger fw-bold">
                Total R{{ orderInfo.totalCostCalculated }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- ORDER MAIN ROW END -->
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
  min-height: 550px;
  @include media-breakpoint-up(md) {
    min-height: 400px;
  }
}
</style>