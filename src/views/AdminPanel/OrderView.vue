<template>
  <div
    class="order-modal w-100 h-100 p-3 border"
    :class="{
      'border-info': order.orderStatus == `approved`,
      'border-danger': order.orderStatus == `rejected`,
    }"
  >
    <button
      type="button"
      class="btn-close float-end"
      aria-label="Close"
      @click="closeOrderModal"
    ></button>
    <h5>Order details:</h5>
    <span class="fw-bold text-decoration-underline">Product:&nbsp;</span>
    <span>{{ order.estimations[0].mainProductName }}</span
    ><br />
    <span class="d-inline-block mt-1 fw-bold text-decoration-underline"
      >The Minimum Premium is:&nbsp;</span
    >
    <span>R{{ order.estimations[0].mainProductCost }}</span>
    <h6 class="fw-bold text-decoration-underline mt-3">Coverages Included:</h6>
    <ul class="list-group">
      <li
        v-for="(sub, index) in order.estimations[0].subProducts"
        :key="index"
        class="list-group-item"
      >
        <span>{{ sub.subProductName }}&nbsp;</span>
        <span class="fw-bold">R{{ sub.subProductCost }}</span>
      </li>
    </ul>

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
    <span class="d-inline-block mt-3 fw-bold text-decoration-underline"
      >Created:&nbsp;</span
    >
    <span>{{ getDate(order.orderCreated) }}</span
    ><br />
    <span class="fw-bold text-decoration-underline">Status:&nbsp;</span>
    <span
      class="d-inline-block mt-3 fw-bold text-uppercase"
      :class="{
        'text-info': order.orderStatus == `approved`,
        'text-danger': order.orderStatus == `rejected`,
      }"
    >
      {{ order.orderStatus }} </span
    ><br />
    <span class="d-inline-block mt-3 fw-bold text-decoration-underline"
      >Customer:&nbsp;</span
    >
    <span
      >{{ order.estimations[0].firstName }}&nbsp;{{
        order.estimations[0].lastName
      }}</span
    ><br />
    <span class="d-inline-block mt-3 fw-bold text-decoration-underline"
      >Vehicle:&nbsp;</span
    >
    <span>{{ order.estimations[0].vehicleDetails }}</span
    ><br />
    <span class="d-inline-block mt-3 fw-bold text-decoration-underline"
      >Value:&nbsp;</span
    >
    <span>R{{ order.estimations[0].vehicleRetailValue }}</span
    ><br />
    <div class="d-flex flex-wrap">
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
const dayjs = require("dayjs");
import { FILE_URL } from "../../constants";

export default {
  data() {
    return {
      isAdjust: false,
      adjustedCost: ``,
      FILE_URL: FILE_URL,
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
    getDate(date) {
      return dayjs(date).format("MMMM D, YYYY h:mm A");
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

.order-modal {
  height: auto;
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
.btn-pdf {
  min-width: 100%;
  border-radius: 0;
  background-image: url("../../assets/img/icon-pdf.png");
  background-size: 27px 27px;
  background-repeat: no-repeat;
  background-position: 5% center;
  margin-bottom: 10px;
  padding-left: 40px;
  @include media-breakpoint-up(md) {
    min-width: 11em;
  }
}
.btn-pdf:hover {
  background-image: url("../../assets/img/icon-pdf.svg");
}
</style>