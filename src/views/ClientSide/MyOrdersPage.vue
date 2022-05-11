<template>
  <section class="container-fluid my-order position-relative">
    <ModalMessage />
    <router-link to="/my-account" class="btn btn-secondary"
      >Back to my account</router-link
    >
    <hr />
    <button
      class="btn btn-dark mt-1"
      type="button"
      @click="showGetQuoteMenu = !showGetQuoteMenu"
    >
      Get Quote</button
    ><br />
    <Transition>
      <div
        v-if="showGetQuoteMenu"
        class="bg-dark bg-gradient shadow-lg text-white mt-3 p-3 rounded"
      >
        <form>
          <p class="fw-bold">Category</p>
          <select
            @change="selectCategory()"
            class="form-select"
            aria-label="Default select example"
            required
            v-model="selectedCategory"
          >
            <option selected>Select category...</option>
            <option
              v-for="(category, index) in categoriesList"
              :key="index"
              :value="category.categoryId"
              :disabled="category.categoryId !== carInsuranceCategory"
            >
              {{ category.categoryName }}
            </option>
            ]
          </select>
          <p v-if="isCarCategorySelected" class="fw-bold mt-3">Select car</p>
          <select
            v-if="isCarCategorySelected"
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
          <Transition>
            <div v-if="isCarSelected">
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
          </Transition>
          <p class="fw-bold mt-3">Product</p>
          <select
            @change="selectMainProduct()"
            class="form-select mt-3"
            aria-label="Default select example"
            :disabled="!isCategorySelected"
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
          <div class="options-wrapper mt-3 mb-3">
            <div
              v-for="(subProduct, index) in selectedMainProduct.subProducts"
              :key="index"
              class="form-check form-switch"
            >
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckCheckedDisabled"
                :value="subProduct.subProductId"
                v-model="checkedSubProducts"
                :required="selectedMainProduct.isRequiredCoverages"
              />
              <label
                class="form-check-label"
                for="flexSwitchCheckCheckedDisabled"
              >
                <span>{{ subProduct.subProductName }}</span>
                <span class="fw-bold"
                  >&nbsp;R{{ subProduct.subProductCost }}</span
                >
              </label>
            </div>
          </div>
          <Transition>
            <InceptionDateOfCoverForm v-if="isCarCategorySelected" />
          </Transition>
          <button
            type="button"
            class="btn btn-outline-warning mt-3"
            :disabled="
              !isCategorySelected ||
              !isMainProductSelected ||
              !getInseptionDateOfCover.isSet
            "
            @click="createEstimation"
          >
            Calculate
          </button>
          <hr />

          <div v-if="showEstimate" class="d-block mt-1">
            <span>Quote for vehicle</span>,
            <span> Monthly payment: R{{ estimationsData.totalCost ?? 0 }}</span>
            <span class="d-block mt-1">
              You will pay from the inception date: R{{
                estimationsData.totalCostCalculated ?? 0
              }}</span
            >

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
                estimationAccessoriesData != ``
              "
              >Quote for accessories,</span
            >
            <span
              v-if="
                checkedAccessoriesIds.length > 0 &&
                estimationAccessoriesData != ``
              "
            >
              Monthly payment: R{{
                estimationAccessoriesData.totalCost ?? 0
              }}</span
            >
            <span
              v-if="
                checkedAccessoriesIds.length > 0 &&
                estimationAccessoriesData != ``
              "
              class="d-block mt-1"
            >
              You will pay from the inception date: R{{
                estimationAccessoriesData.totalCostCalculated ?? 0
              }}</span
            >
          </div>
        </form>
        <div>
          <button
            v-if="showEstimate"
            type="button"
            class="btn btn-outline-success mt-5"
            :disabled="!isCategorySelected || !isMainProductSelected"
            @click="quoteToOrder"
          >
            Go To Orders
          </button>
        </div>
      </div>
    </Transition>
    <button
      class="d-block btn btn-dark mt-3"
      @click="showMyQuites = !showMyQuites"
    >
      Show My Quotes
    </button>
    <Transition>
      <MyEstimationsList
        @createdOrderConfirm="createOrder"
        v-if="showMyQuites"
      />
    </Transition>
    <button class="btn btn-dark mt-3" @click="showMyOrders = !showMyOrders">
      Show My Orders
    </button>
    <Transition>
      <MyOrdersList class="mt-3" v-if="showMyOrders" />
    </Transition>
  </section>
</template>

<script>
import { CAR_INSURANCE_CATEGORY } from "../../constants";
import MyOrdersList from "./MyOrdersList.vue";
import ModalMessage from "../../components/Modals/ModalMessage.vue";
import MyEstimationsList from "./MyEstimationsList.vue";
import InceptionDateOfCoverForm from "../../components/Forms/InceptionDateOfCoverForm.vue";

export default {
  components: {
    MyOrdersList,
    ModalMessage,
    MyEstimationsList,
    InceptionDateOfCoverForm,
  },
  data() {
    return {
      showMyOrders: false,
      showGetQuoteMenu: false,
      showMyQuites: false,
      isCategorySelected: false,
      isMainProductSelected: false,
      isCarSelected: false,
      selectedCategory: `Select category...`,
      selectedMainProduct: ``,
      checkedSubProducts: [],
      selectedCar: ``,
      showEstimate: false,
      isCarCategorySelected: false,
      carInsuranceCategory: ``,
      checkedAccessoriesIds: [],
      estimationsData: ``,
      estimationAccessoriesData: ``,
    };
  },
  computed: {
    getInseptionDateOfCover() {
      return this.$store.state.inseption_date_of_cover;
    },
    categoriesList() {
      return this.$store.state.product_categories.categories || [];
    },
    productsList() {
      return this.$store.state.main_products.mainProducts || [];
    },
    vehiclesList() {
      return this.$store.state.vehicles.vehicles || [];
    },
  },
  mounted() {
    this.carInsuranceCategory = CAR_INSURANCE_CATEGORY;
    this.$store.dispatch(`GET_PRODUCT_CATEGORIES`);
    this.$store.dispatch(`GET_VEHICLES`, ``);
  },
  methods: {
    selectCategory() {
      this.checkedSubProducts = [];
      this.selectedMainProduct = ``;
      this.isCarCategorySelected = false;
      if (this.selectedCategory === `Select category...`) {
        this.isCategorySelected = false;
      } else {
        this.isCategorySelected = true;
      }
      if (this.selectedCategory == CAR_INSURANCE_CATEGORY) {
        this.isCarCategorySelected = true;
      }
      this.$store.dispatch(
        `GET_MAIN_PRODUCTS`,
        `?categoryId=${this.selectedCategory}`
      );
    },
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
      this.estimationsData = ``;
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
          setTimeout(() => {
            this.estimationsData = this.$store.state.current_estimation;
          }, 1000);
        });
    },
    createAccessoryEstimation() {
      this.estimationAccessoriesData = ``;
      this.$store
        .dispatch(`CREATE_ESTIMATION`, {
          accountId: this.$store.state.user.accountId,
          accessoriesIds: Object.values(this.checkedAccessoriesIds),
          vehicleId: this.selectedCar.vehicleId,
          estimationType: `accessory`,
          startFrom: this.getInseptionDateOfCover.date,
        })
        .then(() => {
          setTimeout(() => {
            this.estimationAccessoriesData =
              this.$store.state.current_estimation;
          }, 1000);
        });
    },

    quoteToOrder() {
      this.showGetQuoteMenu = false;
      this.showMyQuites = true;
      this.resetForm();
    },

    createOrder(payload) {
      if (payload.isOrderCreated) {
        this.$store.dispatch(`GET_ORDERS`, ``);
        this.resetForm();
        this.isCategorySelected = false;
        this.isMainProductSelected = false;
        this.showMyQuites = !this.showMyQuites;
        this.showMyOrders = !this.showMyOrders;
        this.scrollToTop();
        this.$store.commit(`SET_MODAL`, {
          isModal: true,
          msg: `Your order is under review now, we will contact you for further
              information.`,
        });
      }
    },
    resetForm() {
      this.isCategorySelected = false;
      this.isMainProductSelected = false;
      this.selectedCategory = `Select category...`;
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
.my-order {
  min-height: calc(100vh - 10em);
  background-color: $bgOrange;
  background-image: url($mainBg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 9em;
  padding-bottom: 3em;
  @include media-breakpoint-up(md) {
    padding-top: 8em;
  }
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