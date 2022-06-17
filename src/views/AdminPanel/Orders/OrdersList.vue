<template>
  <section class="orders-list mt-3">
    <div
      v-for="order in ordersList"
      :key="order.orderId"
      class="order-item border rounded shadow-sm mt-3"
    >
      <!-- ORDER HEADER -->
      <div
        class="
          row row-cols-md-3 row-cols-lg-5
          h-25
          bg-light
          border-bottom
          m-0
          p-1
        "
      >
        <div class="col">
          <p>ORDER PLACED</p>
          <p>{{ getDate(order.orderCreated) }}</p>
        </div>
        <div v-if="order.adjustedCost == 0" class="col">
          <p>TOTAL</p>
          <p class="text-danger fw-bold">
            R{{ order.allEstimationsTotalCostCalculated }}
          </p>
        </div>
        <div v-else class="col">
          <p class="text-uppercase">TOTAL adjusted</p>
          <p class="text-danger fw-bold">R{{ order.adjustedCost }}</p>
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
            v-else-if="
              order.paidBy == 'offline' && order.orderStatus == `pending`
            "
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
            :disabled="isOrderModal"
          >
            View order details
          </button>
        </div>
        <div class="col">
          <p class="m-0 p-0">
            {{ order.estimations[0].firstName }}
            {{ order.estimations[0].lastName }}
          </p>

          <a
            class="text-dark fw-light text-lowercase d-block"
            :href="`mailto:${order.estimations[0].email}`"
            >{{ order.estimations[0].email }}</a
          >
          <a
            class="text-dark fw-light text-lowercase d-block mt-1"
            :href="`tel:${order.estimations[0].cellphone}`"
            >{{ order.estimations[0].cellphone }}</a
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
    </div>
    <OrderCard
      v-if="isOrderModal"
      :myProps="{ order: orderToPass }"
      @closeOrder="closeOrderModal"
    />
  </section>
</template>

<script>
import OrderCard from "./OrderCard.vue";
export default {
  components: { OrderCard },
  data() {
    return {
      adjustedCost: ``,
      isOrderModal: false,
      orderToPass: {},
      orderStatus: ``,
    };
  },
  props: {
    myProps: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    isChangesNeeded() {
      this.fetchOrders(this.myProps.orderStatus);
    },
    toggleStatus() {
      this.fetchOrders(this.myProps.orderStatus);
    },
  },
  computed: {
    isChangesNeeded() {
      return this.$store.state.is_changes_needed;
    },
    ordersList() {
      return this.$store.state.orders.orders || [];
    },

    toggleStatus() {
      return this.myProps.orderStatus;
    },
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders(arg) {
      if (arg) {
        this.$store.dispatch(`GET_ORDERS`, `?orderStatus=${arg}`);
      } else {
        this.$store.dispatch(`GET_ORDERS`, ``);
      }
    },
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