<template>
  <section
    class="my-orders-list bg-dark bg-gradient p-3 rounded position-relative"
  >
    <!-- <div
      v-if="isInceptionDateOfCoverModal"
      class="
        position-absolute
        top-0
        start-50
        translate-middle
        inception-date-wrap
        bg-light bg-gradient
        p-1
      "
    >
      <button
        type="button"
        class="btn-close float-end"
        aria-label="Close"
        @click="closeInceptionDateOfCoverForm"
      ></button>
      <InceptionDateOfCoverForm :myProps="{ orderId: orderIdToPass }" />
    </div> -->
    <ul class="list-group">
      <li
        v-for="(order, index) in ordersList"
        :key="index"
        class="list-group-item list-group-item-dark"
      >
        <div class="container">
          <div class="row border p-1 order-item">
            <div class="col border-bottom border-start">
              <!-- <span class="fw-bold d-block fw-bold">Created:</span> -->
              <span>{{ getDate(order.orderCreated) }}</span>
            </div>
            <div class="col border-bottom border-start">
              <span class="fw-bold">#</span>
              <span>{{ order.referenceNumber }}</span>
            </div>
            <!-- <div class="col border-bottom border-start">
              <span class="fw-bold d-block fw-bold "
                >Inception date:</span
              >
              <span>{{ getDate(order.inceptionDateOfCover) }}</span>
            </div> -->
            <div class="col border-bottom border-start">
              <!-- <span class="d-block fw-bold">Order status:</span> -->
              <span
                class="fw-bold text-uppercase"
                :class="{
                  'text-primary': order.orderStatus == `approved`,
                  'text-danger': order.orderStatus == `rejected`,
                }"
                >{{ order.orderStatus }}</span
              >
            </div>
            <!-- <div class="col border-bottom border-start">
              <span class="d-block fw-bold "
                >Products:</span
              >
              <span
                class="d-block"
                v-for="(item, index) in order.estimations"
                :key="index"
                ><span v-if="item.estimationType == 'estimation'">{{
                  item.mainProductName
                }}</span>
                <span v-else>Asseccories</span>
              </span>
            </div>

            <div class="col border-bottom border-start">
              <span class="d-block fw-bold "
                >Cars:</span
              >
              <span
                class="d-block"
                v-for="(car, index) in order.estimations"
                :key="index"
                >{{ car.vehicleDetails }},&nbsp;<strong>R</strong
                >{{ car.vehicleRetailValue }}</span
              >
            </div> -->
            <div class="col border-bottom border-start">
              <strong>Total Due: R</strong>
              <span> {{ order.allEstimationsTotalCostCalculated }}</span>
            </div>
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold fst-italic">Adjusted:</span>
              <span v-if="order.adjustedCost > 0"
                ><strong>R</strong> {{ order.adjustedCost }}</span
              >
              <span v-else>Not Adjusted</span>
            </div>
            <div class="col-12 col-lg-3 col-xl-2">
              <button
                type="button"
                class="btn btn-outline-success float-end mt-1 mt-lg-0"
                @click="getOrder(order.orderId)"
              >
                View order
              </button>
              <button
                type="button"
                class="btn btn-outline-info mt-1"
                @click="goToPaymentPage(order.orderId)"
              >
                Pay Online
              </button>
              <button
                type="button"
                class="btn btn-outline-dark mt-1"
                @click="getCallRequest(order.orderId)"
              >
                Request Call
              </button>
            </div>
          </div>
        </div>

        <MyOrderView
          v-if="isOrderModal == order.orderId"
          :myProps="{ order: order }"
          @closeOrderView="closeOrderModal"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import MyOrderView from "../ClientSide/MyOrderView.vue";
// import InceptionDateOfCoverForm from "../../components/Forms/InceptionDateOfCoverForm.vue";

export default {
  components: {
    MyOrderView,
    // InceptionDateOfCoverForm,
  },
  data() {
    return {
      isOrderModal: false,
      // isInceptionDateOfCoverModal: false,
      orderIdToPass: ``,
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
      this.$store
        .dispatch(`GET_ORDERS`, `?orderId=${id}`)
        .then((this.isOrderModal = id));
    },
    closeOrderModal() {
      this.isOrderModal = false;
      this.$store.dispatch(`GET_ORDERS`, ``);
    },
    getCallRequest(id) {
      this.$store
        .dispatch(`CREATE_ORDER`, {
          orderId: id,
          paidBy: `offline`,
        })
        .then(() => {
          this.scrollToTop();
          this.$store.dispatch(`GET_ORDERS`, ``);
          this.$store.commit(`SET_MODAL`, {
            isModal: true,
            msg: `Your request has been submitted. Allow up to 24 hours for an update.`,
          });
        });
    },
    goToPaymentPage(id) {
      this.$store
        .dispatch(`CREATE_ORDER`, {
          orderId: id,
          paidBy: `online`,
        })
        .then(() => {
          this.scrollToTop();
          this.$store.dispatch(`GET_ORDERS`, `?orderId=${id}`);
          setTimeout(() => {
            this.$router.push(`/yoco-payment`);
          }, 1000);
          // this.isInceptionDateOfCoverModal = true;
          // this.orderIdToPass = id;
        });
    },
    // closeInceptionDateOfCoverForm() {
    //   this.isInceptionDateOfCoverModal = false;
    // },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  // min-width: 10em;
  width: 100%;
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
.inception-date-wrap {
  width: 100%;
  height: 200px;
  // outline: solid 3px red;
  z-index: 2;
  @include media-breakpoint-up(md) {
    width: 500px;
    height: 200px;
  }
  // @include media-breakpoint-up(lg) {
  //   width: 250px;
  //   height: 150px;
  // }
  // @include media-breakpoint-up(xl) {
  //   width: 250px;
  //   height: 150px;
  // }
  // @include media-breakpoint-up(xxl) {
  //   width: 250px;
  //   height: 150px;
  // }
}
</style>