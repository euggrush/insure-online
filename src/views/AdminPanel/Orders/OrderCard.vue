<template>
  <section class="container position-relative pt-3">
    <button
      type="button"
      class="btn-close float-end"
      aria-label="Close"
      @click="closeOrderModal"
    ></button>
    <h4>Order Details</h4>

    <div class="row gap-3">
      <button
        type="button"
        class="btn btn-outline-secondary col mt-3"
        :disabled="order.orderStatus == `approved`"
        @click="approveOrder(order)"
      >
        Approve
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary col mt-3"
        :disabled="order.orderStatus == `rejected`"
        @click="rejectOrder(order)"
      >
        Reject
      </button>
      <div class="input-group mt-3 p-0 col">
        <input
          type="number"
          class="form-control"
          aria-label="cost
              "
          aria-describedby="button-addon2"
          :placeholder="order.adjustedCost"
          v-model="adjustedCost"
        />
        <button
          class="btn btn-outline-secondary adjust-btn"
          type="button"
          id="button-addon2"
          @click="adjustOrderCost(order)"
        >
          Ok
        </button>
      </div>
    </div>

    <hr />
    <!-- ORDER INCLUDES -->
    <section
      v-for="orderIncludedEstimation in order.estimations"
      :key="orderIncludedEstimation.estimationId"
      class="border p-3 mb-3"
    >
      <div class="row">
        <!-- CAR IMAGE -->
        <div class="col-12 col-lg-3">
          <strong class="text-uppercase"
            >{{ orderIncludedEstimation.vehicleDetails }}, R{{
              orderIncludedEstimation.vehicleRetailValue
            }}</strong
          >
          <img
            v-if="orderIncludedEstimation.vehicleAssets.length > 0"
            :src="`${FILE_URL}${orderIncludedEstimation.vehicleAssets[0].path}`"
            class="d-block vehicle-image mt-3"
            alt="image"
            width="200"
            height="200"
          />
          <img
            v-else
            :src="CAR_DEFAULT_IMAGE"
            class="d-block vehicle-image"
            alt="image"
            width="200"
            height="200"
          />
        </div>
        <!-- CAR IMAGE END -->
        <!-- ORDER DETAILS -->
        <div class="col-12 col-lg-9 mt-3 mt-lg-0">
          <div
            v-if="
              orderIncludedEstimation.estimationType == 'tuffstuff' ||
              orderIncludedEstimation.estimationType == 'topmarq'
            "
          >
            <strong class="text-dark text-uppercase fs-6">{{
              orderIncludedEstimation.mainProductName
            }}</strong>
            <span class="d-block float-lg-end mt-3 mt-lg-0">
              Inception date of cover is
              {{ getDate(orderIncludedEstimation.startFromFormatted) }}
            </span>
            <hr />
            <span
              class="mt-1 mb-0 text-secondary text-uppercase"
              v-for="(sub, i) in orderIncludedEstimation.subProducts"
              :key="sub"
            >
              {{ sub.subProductName }}&nbsp;<span
                v-if="i !== orderIncludedEstimation.subProducts.length - 1"
              >
                &#124;</span
              >&nbsp;
            </span>
            <p class="mt-3 mb-0 text-danger fw-bold">
              Total R{{ orderIncludedEstimation.totalCostCalculated }}
            </p>
          </div>
          <div
            class="mt-3"
            v-else-if="orderIncludedEstimation.estimationType == 'accessory'"
          >
            <strong class="text-uppercase">Accessories</strong>
            <span class="d-block float-lg-end mt-3 mt-lg-0">
              Inception date of cover is
              {{ getDate(orderIncludedEstimation.startFromFormatted) }}
            </span>
            <hr />
            <span
              class="mb-0 text-uppercase"
              v-for="(accessory, index) in orderIncludedEstimation.accessories"
              :key="accessory"
            >
              {{ accessory.accessoryName }}&nbsp;<span
                v-if="index !== orderIncludedEstimation.accessories.length - 1"
              >
                &#124;</span
              >&nbsp;
            </span>
            <p class="mt-3 mb-0 text-danger fw-bold">
              Total R{{ orderIncludedEstimation.totalCostCalculated }}
            </p>
          </div>
        </div>
        <!-- ORDER DETAILS END -->
      </div>
    </section>

    <!-- ORDER INCLUDES END -->
  </section>
</template>

<script>
import { FILE_URL, CAR_DEFAULT_IMAGE } from "../../../constants";

export default {
  data() {
    return {
      isAdjust: false,
      adjustedCost: ``,
      FILE_URL: FILE_URL,
      CAR_DEFAULT_IMAGE: CAR_DEFAULT_IMAGE,
    };
  },
  props: {
    myProps: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    order() {
      return this.myProps.order;
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    closeOrderModal(arg) {
      // eslint-disable-next-line vue/custom-event-name-casing
      this.$emit("closeOrder", { orderStatus: arg });
    },
    getOrder(id) {
      this.$store.dispatch(`GET_ORDERS`, `?orderId=${id}`);
    },
    approveOrder(order) {
      this.$store
        .dispatch(`CREATE_ORDER`, {
          orderId: order.orderId,
          orderStatus: `approved`,
        })
        .then(() => {
          this.closeOrderModal(`approved`);
          this.scrollToTop();
        })
        .catch((err) => alert(err));
    },
    rejectOrder(order) {
      this.$store
        .dispatch(`CREATE_ORDER`, {
          orderId: order.orderId,
          orderStatus: `rejected`,
        })
        .then(() => {
          this.closeOrderModal(`rejected`);
          this.scrollToTop();
        })
        .catch((err) => alert(err));
    },
    adjustOrderCost(order) {
      this.$store
        .dispatch(`CREATE_ORDER`, {
          orderId: order.orderId,
          adjustedCost: this.adjustedCost,
        })
        .then(() => {
          this.getOrder(order.orderId);
          this.isAdjust = false;
          this.adjustedCost = ``;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  min-width: 12em;
}
.order-item {
  background-color: $mainGreen;
  box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
  -webkit-box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
  -moz-box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
}
// .adjust-input {
//   width: 11em;
// }
.adjust-btn {
  min-width: auto;
}
br {
  display: block;
  content: "";
  margin-top: 0;
}
// .btn-pdf {
//   min-width: 100%;
//   border-radius: 0;
//   background-image: url("../../assets/img/icon-pdf.png");
//   background-size: 27px 27px;
//   background-repeat: no-repeat;
//   background-position: 5% center;
//   margin-bottom: 10px;
//   padding-left: 40px;
//   @include media-breakpoint-up(md) {
//     min-width: 11em;
//   }
// }
// .btn-pdf:hover {
//   background-image: url("../../assets/img/icon-pdf.svg");
// }
.vehicle-image {
  width: 100%;
  height: auto;
}
// .btn-close {
//   margin: 0 auto 0 98%;
// }
</style>