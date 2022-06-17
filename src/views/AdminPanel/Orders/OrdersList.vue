<template>
  <section class="orders-list mt-3">
    <div
      v-for="(order, index) in ordersList"
      :key="index"
      class="order-item border rounded shadow-sm mt-3"
    >
      <!-- ORDER HEADER -->
      <div class="row row-cols-md-3 row-cols-lg-5 h-25 bg-light border-bottom m-0 p-1">
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
          <div
            v-else-if="order.paidBy == 'offline'"
            class="
              border border-danger border-3
              text-danger text-uppercase text-center
              fw-bold
              pt-1
              ps-3
              pb-1
              pe-3
            "
          >
            Contact client ASAP
          </div>
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
        <div class="col">
          <p>
            {{ order.estimations[0].firstName }}
            {{ order.estimations[0].lastName }}
          </p>

          <a
            class="text-dark fw-light text-lowercase"
            :href="`mailto:${order.estimations[0].username}`"
            >{{ order.estimations[0].username }}</a
          >
        </div>
      </div>
      <!-- ORDER DETAILS INFO -->
      <div
        v-for="orderInfo in order.estimations"
        :key="orderInfo.vehicleId"
        class="row p-3"
      >
        <div class="col">
          <p class="text-uppercase fw-bold text-secondary">
            {{ orderInfo.vehicleDetails }}
          </p>
          <!-- <p class="text-danger">R{{ orderInfo.vehicleRetailValue }}</p> -->

          <!-- <img
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
          /> -->
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
      <!-- <div class="row">
        <div class="col">
          <span class="d-block fw-bold text-decoration-underline">Ref #</span>
          <span>{{ order.referenceNumber }}</span>
        </div>
        <div class="col">
          <span class="d-block fw-bold text-decoration-underline">Created:</span
          ><span class="fst-italic">{{ getDate(order.orderCreated) }}</span>
        </div>
        <div class="col">
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

        <div class="col">
          <span class="d-block fw-bold text-decoration-underline"
            >Customer:</span
          >
          <span>{{ order.estimations[0].firstName }}</span>
          <span>&nbsp;{{ order.estimations[0].lastName }}</span>
          <div
            v-if="order.paidBy == 'offline'"
            class="
              border border-danger border-3
              text-danger text-uppercase text-center
              fw-bold
              pt-1
              ps-3
              pb-1
              pe-3
            "
          >
            Paid offline.
            <hr />
            Contact client ASAP
            <a
              class="link-email text-dark fw-light text-lowercase"
              :href="`mailto:${order.estimations[0].username}`"
              >{{ order.estimations[0].username }}</a
            >
          </div>
        </div>

        <div class="col">
          <span class="d-block fw-bold text-decoration-underline">Cars:</span>
          <span
            class="d-block"
            v-for="(car, index) in order.estimations"
            :key="index"
            >{{ car.vehicleDetails }},
          </span>
        </div>
        <div class="col">
          <span class="d-block fw-bold text-decoration-underline"
            >Cars value:</span
          >
          <span
            class="d-block"
            v-for="(car, index) in order.estimations"
            :key="index"
            >{{ car.vehicleRetailValue }},
          </span>
        </div>

        <div class="col">
          <span class="d-block fw-bold text-decoration-underline"
            >Products:</span
          >
          <span
            class="d-block"
            v-for="(estimation, index) in order.estimations"
            :key="index"
            ><span v-if="estimation.estimationType == 'tuffstuff'">{{
              estimation.mainProductName
            }}</span>
            <span v-else>Accessories,</span>
          </span>
        </div>
        <div class="col">
          <span class="d-block fw-bold text-decoration-underline">Total:</span>
          <span>R{{ order.allEstimationsTotalCost }}</span>
        </div>
        <div class="col">
          <span class="d-block fw-bold text-decoration-underline fst-italic"
            >Adjusted:</span
          >
          <span v-if="order.adjustedCost > 0" class="fst-italic"
            >R{{ order.adjustedCost }}</span
          >
          <span v-else class="text-nowrap">Not Adjusted</span>
        </div>
        <div class="col">
          <button
            type="button"
            class="btn btn-primary float-end mt-3"
            @click="getOrder(order.orderId)"
          >
            More
          </button>
        </div>
      </div> -->
    </div>
    <OrderCard
      v-if="isOrderModal"
      :myProps="{ order: orderToPass }"
      @closeOrder="closeOrderModal"
    />
  </section>
</template>

<script>
// import { FILE_URL, CAR_DEFAULT_IMAGE } from "../../../constants";

import OrderCard from "./OrderCard.vue";
export default {
  components: { OrderCard },
  data() {
    return {
      // FILE_URL: FILE_URL,
      // CAR_DEFAULT_IMAGE,
      adjustedCost: ``,
      isOrderModal: false,
      orderToPass: {},
    };
  },
  props: {
    myProps: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    toggleStatus() {
      this.$store.dispatch(
        `GET_ORDERS`,
        `?order=desc&${this.myProps.orderStatus}`
      );
    },
  },
  computed: {
    ordersList() {
      return this.$store.state.orders.orders || [];
    },

    toggleStatus() {
      return this.myProps.orderStatus;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_ORDERS`, ``);
  },
  methods: {
    getOrder(id) {
      this.$store.dispatch(`GET_ORDERS`, `?orderId=${id}`).then(() => {
        setTimeout(() => {
          this.orderToPass = this.$store.state.orders.orders[0];
          this.isOrderModal = true;
        });
      });
    },
    closeOrderModal() {
      this.isOrderModal = false;
      this.$store.dispatch(`GET_ORDERS`, ``);
    },
  },
};
</script>

<style lang="scss" scoped>
.order-item {
  min-height: 550px;
  @include media-breakpoint-up(md) {
    min-height: 300px;
  }
}
br {
  display: block;
  content: "";
  margin-top: 0;
}
</style>