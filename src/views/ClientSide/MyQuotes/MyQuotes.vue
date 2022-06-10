<template>
  <section class="my-quotes position-relative">
    <ModalMessage />

    <div class="border rounded m-3 p-3 shadow">
      <form>
        <InceptionDateOfCoverForm />

        <p class="fw-bold mt-3">Select car</p>

        <select
          class="form-select mt-3"
          aria-label="Default select example"
          v-model="selectedCar"
          @change="selectCar(selectedCar.vehicleId)"
          required
        >
          <option value="" selected>Select customer's car...</option>
          <option
            v-for="(vehicle, index) in vehiclesList"
            :key="index"
            :value="vehicle"
            :disabled="vehicle.isTrackingDeviceRequired"
          >
            {{ vehicle.details }},&nbsp;VIN:&nbsp;{{ vehicle.vin }}
          </option>
        </select>

        <!-- <div v-if="isCarSelected">
          <p class="mt-3">select accessories:</p>
          <div
            v-for="(accessory, index) in selectedCar.accessories"
            :key="accessory.accessoryId"
            class="form-check form-switch"
          >
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              :value="accessory.accessoryId"
              :id="`flexSwitchCheckDefault${index}`"
              v-model="checkedAccessoriesIds"
            />
            <label
              class="form-check-label"
              :for="`flexSwitchCheckDefault${index}`"
              ><span class="text-capitalize">{{ accessory.name }}</span
              >, <strong>R{{ accessory.cost }}</strong></label
            >
          </div>
        </div> -->

        <p class="fw-bold mt-3">Select product</p>
        <select
          @change="selectMainProduct()"
          class="form-select mt-3"
          aria-label="Default select example"
          v-model="selectedMainProduct"
          required
        >
          <option value="" selected>Select product...</option>
          <option
            v-for="(product, index) in productsList"
            :key="index"
            :value="product"
          >
            {{ product.mainProductName }}
          </option>
        </select>
        <div class="options-wrapper mt-3 mb-3 ms-3">
          <div
            v-for="(subProduct, index) in selectedMainProduct.subProducts"
            :key="index"
            class="form-check form-switch"
          >
            <input
              class="form-check-input"
              type="checkbox"
              :id="`flexCheckDefault${index}`"
              :value="subProduct.subProductId"
              v-model="checkedSubProducts"
              :required="selectedMainProduct.isRequiredCoverages"
            />
            <label class="form-check-label" :for="`flexCheckDefault${index}`">
              <span>{{ subProduct.subProductName }}</span>
              <span class="fw-bold"
                >&nbsp;R{{ subProduct.subProductCost }}</span
              >
            </label>
          </div>
        </div>

        <button
          type="button"
          class="btn btn-outline-danger mt-3"
          :disabled="!isMainProductSelected || !getInseptionDateOfCover.isSet"
          @click="createEstimation"
        >
          Calculate
        </button>
        <hr />

        <div v-if="showEstimate" class="d-block mt-1">
          <p class="text-uppercase">Monthly</p>
          <p class="text-danger fw-bold">
            R{{ getEstimationsData.totalCost ?? 0 }}
          </p>
          <p class="text-uppercase">You will pay from the inception date</p>
          <p class="text-danger fw-bold">
            R{{ getEstimationsData.totalCostCalculated }}
          </p>

          <hr v-if="checkedAccessoriesIds.length > 0" />
          <button
            v-if="checkedAccessoriesIds.length > 0"
            type="button"
            class="btn btn-outline-danger"
            @click="createAccessoryEstimation"
          >
            Accessories Quote
          </button>
          <hr />
          <span
            v-if="
              checkedAccessoriesIds.length > 0 &&
              getEstimationAccessoriesData != ``
            "
            >Quote for accessories,</span
          >
          <span
            v-if="
              checkedAccessoriesIds.length > 0 &&
              getEstimationAccessoriesData != ``
            "
          >
            Monthly payment: R{{
              getEstimationAccessoriesData.totalCost ?? 0
            }}</span
          >
          <span
            v-if="
              checkedAccessoriesIds.length > 0 &&
              getEstimationAccessoriesData != ``
            "
            class="d-block mt-1"
          >
            You will pay from the inception date: R{{
              getEstimationAccessoriesData.totalCostCalculated ?? 0
            }}</span
          >
        </div>
      </form>
    </div>
    <MyQuotesList @createdOrderConfirm="createOrder" />
  </section>
</template>

<script>
import { CAR_INSURANCE_CATEGORY } from "../../../constants";
import ModalMessage from "../../../components/Modals/ModalMessage.vue";
import MyQuotesList from "./MyQuotesList.vue";
import InceptionDateOfCoverForm from "../../../components/Forms/InceptionDateOfCoverForm.vue";

export default {
  components: {
    ModalMessage,
    MyQuotesList,
    InceptionDateOfCoverForm,
  },
  data() {
    return {
      isMainProductSelected: false,
      isCarSelected: false,
      selectedMainProduct: ``,
      checkedSubProducts: [],
      selectedCar: ``,
      showEstimate: false,
      checkedAccessoriesIds: [],
      // estimationsData: ``,
      // estimationAccessoriesData: ``,
    };
  },
  computed: {
    getInseptionDateOfCover() {
      return this.$store.state.inseption_date_of_cover;
    },
    productsList() {
      return this.$store.state.main_products.mainProducts || [];
    },
    vehiclesList() {
      return this.$store.state.vehicles.vehicles || [];
    },
    getEstimationsData() {
      return this.$store.state.current_estimation;
    },
    getEstimationAccessoriesData() {
      return this.$store.state.current_estimation_accessories;
    },
  },
  mounted() {
    this.$store.dispatch(
      `GET_MAIN_PRODUCTS`,
      `?categoryId=${CAR_INSURANCE_CATEGORY}`
    );
    this.$store.dispatch(`GET_VEHICLES`, ``);
  },
  methods: {
    selectMainProduct() {
      this.isMainProductSelected = true;
      this.checkedSubProducts = [];
    },
    selectCar(id) {
      if (id != ``) {
        this.isCarSelected = true;
      } else {
        this.isCarSelected = false;
      }
    },
    createEstimation() {
      // this.estimationsData = ``;
      this.$store
        .dispatch(`CREATE_ESTIMATION`, {
          accountId: this.$store.state.user.accountId,
          mainProductId: this.selectedMainProduct.mainProductId,
          subProductsIds: Object.values(this.checkedSubProducts),
          vehicleId: this.selectedCar.vehicleId,
          estimationType: `estimation`,
          startFrom: this.getInseptionDateOfCover.date,
        })
        .then(() => {
          this.showEstimate = true;
          // setTimeout(() => {
          //   this.estimationsData = this.$store.state.current_estimation;
          // }, 1000);
        });
    },
    createAccessoryEstimation() {
      // this.estimationAccessoriesData = ``;
      this.$store
        .dispatch(`CREATE_ESTIMATION_ACCESSORIES`, {
          accountId: this.$store.state.user.accountId,
          accessoriesIds: Object.values(this.checkedAccessoriesIds),
          vehicleId: this.selectedCar.vehicleId,
          estimationType: `accessory`,
          startFrom: this.getInseptionDateOfCover.date,
        })
        .then(() => {
          // setTimeout(() => {
          //   this.estimationAccessoriesData =
          //     this.$store.state.current_estimation_accessories;
          // }, 1000);
        });
    },
    createOrder(payload) {
      if (payload.isOrderCreated) {
        this.$store.dispatch(`GET_ORDERS`, ``);
        this.resetForm();
        this.$store.commit(`SET_MODAL`, {
          isModal: true,
          msg: `Your order is under review now, we will contact you for further
              information.`,
        });
      }
    },
    resetForm() {
      this.scrollToTop();

      this.isMainProductSelected = false;
      this.selectedMainProduct = ``;
      this.showEstimate = false;
      this.selectedCar = ``;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  min-width: 10em;
}
.my-quotes {
  min-height: calc(100vh - 10em);
}
.btn-outline-danger {
  color: $colorBrick;
  border-color: $colorBrick;
}
.btn-outline-danger:hover {
  color: $colorWhite;
  background-color: $colorBrick;
}
.quote-form {
  outline: solid 3px red;
}
.order-create-popup {
  min-width: 300px;
  @include media-breakpoint-up(sm) {
    min-width: 400px;
  }
  @include media-breakpoint-up(md) {
    min-width: 500px;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>