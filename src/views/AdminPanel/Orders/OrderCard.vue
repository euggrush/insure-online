<template>
  <div
    class="w-100 h-100 p-3 border"
    :class="{
      'border-info': order.orderStatus == `approved`,
      'border-danger': order.orderStatus == `rejected`,
    }"
  >
    <button
      type="button"
      class="btn-close"
      aria-label="Close"
      @click="closeOrderModal"
    ></button>

    <div
      class="row border p-3"
      v-for="(quote, index) in order.estimations"
      :key="index"
    >
      <div class="col">
        <strong
          >{{ quote.vehicleDetails }}, R{{ quote.vehicleRetailValue }}</strong
        >
        <img
          v-if="quote.vehicleAssets.length > 0"
          :src="`${FILE_URL}${
            quote.vehicleAssets[quote.vehicleAssets.length - 1].path
          }`"
          class="d-block vehicle-image p-5"
          alt="image"
          width="200"
          height="200"
        />
        <img
          v-else
          :src="CAR_DEFAULT_IMAGE"
          alt="image"
          class="d-block vehicle-image p-5"
          width="200"
          height="200"
        />
      </div>
      <div v-if="quote.estimationType == 'tuffstuff'" class="col">
        <strong>{{ quote.mainProductName }}</strong>
        <div
          v-for="(sub, index) in quote.subProducts"
          :key="index"
          class="form-check form-switch mt-1 ms-1"
        >
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            :id="`flexSwitchCheckCheckedDisabled${index}`"
            checked
            disabled
          />
          <label
            class="form-check-label"
            :for="`flexSwitchCheckCheckedDisabled${index}`"
            >{{ sub.subProductName }}</label
          >
        </div>
      </div>
      <div v-else class="col">
        <strong>Insuranse for the {{ quote.estimationType }}</strong>
        <div
          v-for="(accessory, index) in quote.accessories"
          :key="index"
          class="form-check form-switch mt-1 ms-1"
        >
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            :id="`flexSwitchCheckCheckedDisabled${index}`"
            checked
            disabled
          />
          <label
            class="form-check-label"
            :for="`flexSwitchCheckCheckedDisabled${index}`"
            >{{ accessory.accessoryName }},
            <strong>R{{ accessory.accessoryCost }}</strong></label
          >
        </div>
      </div>
    </div>

    <span class="d-inline-block mt-3 fw-bold text-decoration-underline"
      >Total:&nbsp;</span
    >
    <span>R{{ order.allEstimationsTotalCost }}</span
    ><br />
    <span
      v-if="order.adjustedCost > 0"
      class="d-inline-block mt-3 mb-1 fw-bold text-decoration-underline"
      >Adjusted:&nbsp;</span
    >
    <span v-if="order.adjustedCost > 0">R{{ order.adjustedCost }}</span
    ><br />
    <div v-if="isAdjust" class="input-group mt-3 adjust-input">
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

    <button type="button" class="btn btn-primary mt-3" @click="toggleAdjust()">
      Adjust Premium
    </button>
    <br />

    <div class="d-flex flex-wrap mt-3">
      <a
        v-for="(file, index) in order.assets"
        :key="index"
        :href="`${FILE_URL}${file.path}`"
        class="btn btn-outline-dark btn-pdf text-end me-3"
        target="_blank"
      >
        {{ file.description }}
      </a>
    </div>

    <div class="row row-cols-auto">
      <div class="col">
        <button
          type="button"
          class="btn btn-primary mt-3"
          :disabled="order.orderStatus == `approved`"
          @click="approveOrder(order)"
        >
          Approve
        </button>
      </div>
      <div class="col">
        <button
          type="button"
          class="btn btn-danger mt-3"
          :disabled="order.orderStatus == `rejected`"
          @click="rejectOrder(order)"
        >
          Reject
        </button>
      </div>
    </div>
  </div>
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
    closeOrderModal() {
      // eslint-disable-next-line vue/custom-event-name-casing
      this.$emit("closeOrder", {});
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
        .then(this.closeOrderModal, this.scrollToTop())
        .catch((err) => alert(err))
        .then(this.closeOrderModal);
    },
    rejectOrder(order) {
      this.$store
        .dispatch(`CREATE_ORDER`, {
          orderId: order.orderId,
          orderStatus: `rejected`,
        })
        .then(this.closeOrderModal, this.scrollToTop())
        .catch((err) => alert(err))
        .then(this.closeOrderModal);
    },
    toggleAdjust() {
      this.isAdjust = !this.isAdjust;
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
        .catch((err) => console.log(err))
        .then(() => {
          this.getOrder(order.orderId);
          this.isAdjust = false;
          this.adjustedCost = ``;
        });
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
.adjust-input {
  width: 11em;
}
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
.btn-close {
  margin: 0 auto 0 98%;
}
</style>