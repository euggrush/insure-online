<template>
  <section class="my-quotes position-relative">
    <ModalMessage />

    <form class="border rounded m-3 p-3 shadow">
      <InceptionDateOfCoverForm />

      <p class="fw-bold mt-3">Select car</p>

      <select
        class="form-select mt-3"
        aria-label="Default select example"
        v-model="selectedCar"
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

      <div v-if="selectedCar">
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
      </div>

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
            v-if="!selectedMainProduct.isRequiredCoverages"
            class="form-check-input"
            type="checkbox"
            role="switch"
            :id="`flexCheckDefault${index}`"
            :value="subProduct.subProductId"
            v-model="checkedSubProducts"
          />
          <label class="form-check-label" :for="`flexCheckDefault${index}`">
            <span>{{ subProduct.subProductName }}</span>
            <span class="fw-bold">&nbsp;R{{ subProduct.subProductCost }}</span>
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
      <!-- QUOTE TOTAL -->
      <div v-if="showEstimate" class="border mt-3 p-3">
        <p class="text-uppercase">Monthly</p>
        <p class="text-danger fw-bold">
          R{{ getEstimationsData.totalCost ?? 0 }}
        </p>
        <p class="text-uppercase">You will pay from the inception date</p>
        <p class="text-danger fw-bold">
          R{{ getEstimationsData.totalCostCalculated }}
        </p>
      </div>
      <!-- QUOTE TOTAL END -->
      <!-- ACCESSORIES QUOTE -->
      <div v-if="checkedAccessoriesIds.length > 0 && showEstimate">
        <hr />
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="createAccessoryEstimation"
        >
          Accessories Quote
        </button>
        <div v-if="showEstimateAccessories" class="border mt-3 p-3">
          <p class="fw-bold">Accessories</p>
          <p class="text-uppercase">Monthly</p>
          <p class="text-danger fw-bold">
            R{{ getEstimationAccessoriesData.totalCost ?? 0 }}
          </p>
          <p class="text-uppercase">You will pay from the inception date</p>
          <p class="text-danger fw-bold">
            R{{ getEstimationAccessoriesData.totalCostCalculated ?? 0 }}
          </p>
        </div>
      </div>
      <!-- ACCESSORIES QUOTE END -->
      <hr v-if="showEstimate" />
      <button
        v-if="showEstimate"
        type="button"
        class="btn btn-outline-secondary"
        @click="resetForm"
      >
        Reset
      </button>
    </form>
    <MyQuotesList />
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
      selectedMainProduct: ``,
      checkedSubProducts: [],
      selectedCar: ``,
      showEstimate: false,
      showEstimateAccessories: false,
      checkedAccessoriesIds: [],
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
    createEstimation() {
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
        });
    },
    createAccessoryEstimation() {
      this.$store
        .dispatch(`CREATE_ESTIMATION_ACCESSORIES`, {
          accountId: this.$store.state.user.accountId,
          accessoriesIds: Object.values(this.checkedAccessoriesIds),
          vehicleId: this.selectedCar.vehicleId,
          estimationType: `accessory`,
          startFrom: this.getInseptionDateOfCover.date,
        })
        .then(() => {
          this.showEstimateAccessories = true;
        });
    },
    // createOrder(payload) {
    //   if (payload.isOrderCreated) {
    //     this.$store.dispatch(`GET_ORDERS`, ``);
    //     this.resetForm();
    //     this.$store.commit(`SET_MODAL`, {
    //       isModal: true,
    //       msg: `Your order is under review now, we will contact you for further
    //           information.`,
    //     });
    //   }
    // },
    resetForm() {
      this.scrollToTop();
      this.isMainProductSelected = false;
      this.checkedSubProducts = [];
      this.selectedCar = ``;
      this.checkedAccessoriesIds = [];
      this.showEstimateAccessories = false;
      this.selectedMainProduct = ``;
      this.showEstimate = false;
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