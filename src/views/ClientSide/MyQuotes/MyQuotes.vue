<template>
  <section class="my-quotes position-relative">
    <ModalMessage />

    <form
      class="border rounded m-3 p-3 shadow"
      @submit.prevent="createEstimation"
    >
      <InceptionDateOfCoverForm />

      <p class="fw-bold mt-3">Select car</p>

      <select
        class="form-select mt-3"
        aria-label="Default select example"
        v-model="selectedCar"
        required
        @change="resetPickedFields"
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
            ><span class="text-capitalize">{{ accessory.name }}</span>
            <strong class="text-danger"
              >&nbsp;R{{ accessory.cost }}</strong
            ></label
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
          :disabled="
            (selectedCar.insuranceTypeRecommended == 'tuffstuff' &&
              product.productType == 'TOPMARQ') ||
            (selectedCar.insuranceTypeRecommended == 'topmarq' &&
              product.productType == 'tuffstuff')
          "
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
            role="switch"
            :id="`flexCheckDefault${index}`"
            :value="subProduct.subProductId"
            v-model="checkedSubProducts"
            :required="selectedMainProduct.isRequiredCoverages"
          />
          <label class="form-check-label" :for="`flexCheckDefault${index}`">
            <span>{{ subProduct.subProductName }}</span>
            <span class="fw-bold text-danger"
              >&nbsp;R{{ subProduct.subProductCost }}</span
            >
          </label>
        </div>
      </div>

      <button
        type="submit"
        class="btn btn-outline-danger mt-3"
        :disabled="!isMainProductSelected || !getInseptionDateOfCover.isSet"
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
    <Transition> <MyQuotesList /></Transition>
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
    fetchProductsByType(arg) {
      this.$store.dispatch(`GET_MAIN_PRODUCTS`, `?productType=${arg}`);
    },
    fetchEstimations() {
      let today = Date.now();
      const THREE_HOURS_AGO = 10800000;
      let threeHoursAgoCalculated = today - THREE_HOURS_AGO;
      this.$store.dispatch(
        `GET_ESTIMATIONS`,
        `?limit=4&createdFrom=${threeHoursAgoCalculated}`
      );
    },
    selectMainProduct() {
      this.isMainProductSelected = true;
      this.resetPickedFields();
    },
    createEstimation() {
      this.$store
        .dispatch(`CREATE_ESTIMATION`, {
          accountId: this.$store.state.user.accountId,
          mainProductId: this.selectedMainProduct.mainProductId,
          subProductsIds: Object.values(this.checkedSubProducts),
          vehicleId: this.selectedCar.vehicleId,
          estimationType: this.selectedMainProduct.productType.toLowerCase(),
          startFrom: this.getInseptionDateOfCover.date,
        })
        .then(() => {
          this.showEstimate = true;
          this.fetchEstimations();
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
          this.fetchEstimations();
        });
    },
    resetPickedFields() {
      this.checkedSubProducts = [];
      this.checkedAccessoriesIds = [];
      this.showEstimate = false;
      this.showEstimateAccessories = false;
    },
    resetForm() {
      this.scrollToTop();
      this.isMainProductSelected = false;
      this.checkedSubProducts = [];
      this.selectedCar = ``;
      this.checkedAccessoriesIds = [];
      this.showEstimateAccessories = false;
      this.selectedMainProduct = ``;
      this.showEstimate = false;
      this.fetchEstimations();
      this.$store.commit(`SET_INSEPTION_DATE_OF_COVER`, {
        date: 0,
        isSet: false,
      });
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