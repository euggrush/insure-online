<template>
  <section class="order mt-3">
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
                >Ref #</span
              >
              <span>{{ order.referenceNumber }}</span>
            </div>
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Created:</span
              ><span class="fst-italic">{{ getDate(order.orderCreated) }}</span>
            </div>
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

            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Cars:</span
              >
              <span
                class="d-block"
                v-for="(car, index) in order.estimations"
                :key="index"
                >{{ car.vehicleDetails }},
              </span>
            </div>
            <div class="col border-bottom border-start">
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

            <div class="col border-bottom border-start">
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
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Total:</span
              >
              <span>R{{ order.allEstimationsTotalCost }}</span>
            </div>
            <div class="col border-bottom border-start">
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
          </div>
        </div>
        <OrderView
          v-if="isOrderModal == order.orderId"
          :myProps="{ order: order }"
          @closeOrder="closeOrderModal"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import OrderView from "../AdminPanel/OrderView.vue";
export default {
  components: { OrderView },
  data() {
    return {
      adjustedCost: ``,
      isOrderModal: false,
    };
  },
  props: {
    myProps: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    componentRerenderKey() {
      this.$store.dispatch(
        `GET_ORDERS`,
        `?order=desc&${this.myProps.orderStatus}`
      );
    },
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
    componentRerenderKey() {
      return this.myProps.componentKey;
    },
    toggleStatus() {
      return this.myProps.orderStatus;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_ORDERS`, `?order=desc`);
  },
  methods: {
    getOrder(id) {
      this.$store
        .dispatch(`GET_ORDERS`, `?orderId=${id}`)
        .then((this.isOrderModal = id));
    },
    closeOrderModal() {
      this.isOrderModal = false;
      this.$store.dispatch(`GET_ORDERS`, `?order=desc`);
    },
  },
};
</script>

<style lang="scss" scoped>
.order-item {
  background-color: $mainGreen;
  box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
  -webkit-box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
  -moz-box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
}

br {
  display: block;
  content: "";
  margin-top: 0;
}
.link-email {
  @include media-breakpoint-up(md) {
    background-image: url("../../assets/img/icon-mail.svg");
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: 0px 1px;
    padding-left: 25px;
  }
}
</style>