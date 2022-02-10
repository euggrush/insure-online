<template>
  <section class="container-fluid my-order p-3 position-relative">
    <router-link to="/my-account" class="btn btn-secondary"
      >Back to my account</router-link
    >
    <h3 class="mt-3">Orders:</h3>
    <p>
      <button
        class="btn btn-dark mt-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseWidthExample"
        aria-expanded="false"
        aria-controls="collapseWidthExample"
      >
        Create Order
      </button>
    </p>
    <div>
      <div class="collapse" id="collapseWidthExample">
        <div class="card card-body">
          <form @submit.prevent="getEstimation">
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
              v-model="selectedCarId"
              @change="selectCar"
              required
            >
              <option value="" selected>Select customer's car...</option>
              <option
                v-for="(vehicle, index) in vehiclesList"
                :key="index"
                :value="vehicle.vehicleId"
              >
                {{ vehicle.details }},&nbsp;VIN:&nbsp;{{ vehicle.vin }}
              </option>
            </select>
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

            <button
              type="submit"
              class="btn btn-info mt-3"
              :disabled="!isCategorySelected || !isMainProductSelected"
            >
              Calculate
            </button>
            <span v-if="showEstimate" class="d-block mt-5"
              >Monthly payment: R{{ currentEstimation.totalCost || 0 }}</span
            >
          </form>
          <div>
            <button
              v-if="showEstimate"
              type="button"
              class="btn btn-success mt-5"
              :disabled="!isCategorySelected || !isMainProductSelected"
              @click="createOrder"
            >
              Submit order
            </button>
          </div>
        </div>
      </div>
    </div>
    <MyOrdersList />
    <!-- MODAL -->
    <div
      class="
        order-create-popup
        position-absolute
        top-0
        start-50
        translate-middle-x
      "
      tabindex="-1"
      v-if="isCreateOrderPopup"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">The order has been created.</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeCreateOrderPopup"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              Your order is under review now, we will contact you for further
              information.
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="closeCreateOrderPopup"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- MODAL END -->
  </section>
</template>

<script>
import { CAR_INSURANCE_CATEGORY } from "../../constants";
import MyOrdersList from "./MyOrdersList.vue";
export default {
  components: {
    MyOrdersList,
  },
  data() {
    return {
      isCreateOrderPopup: false,
      isCategorySelected: false,
      isMainProductSelected: false,
      isUserSelected: false,
      isCarSelected: false,
      accountUsername: ``,
      selectedCategory: `Select category...`,
      selectedMainProduct: ``,
      checkedSubProducts: [],
      selectedAccountId: ``,
      selectedCarId: ``,
      showEstimate: false,
      isCalcBtnDisabled: true,
      resetSelectMainProduct: true,
      isCarCategorySelected: false,
      shoNullEstimation: true,
      carInsuranceCategory: ``,
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.product_categories.categories || [];
    },
    productsList() {
      return this.$store.state.main_products.mainProducts || [];
    },

    accountInfo() {
      return this.$store.state.user;
    },
    estimationsList() {
      return this.$store.state.estimations.estimations || [];
    },
    currentEstimation() {
      if (this.shoNullEstimation) {
        return 0;
      }
      return this.$store.state.current_estimation;
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
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    selectCategory() {
      this.checkedSubProducts = [];
      this.selectedMainProduct = ``;
      this.isCarCategorySelected = false;
      if (this.selectedCategory === `Select category...`) {
        this.isCategorySelected = false;
        this.shoNullEstimation = true;
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
    getEstimation() {
      this.$store
        .dispatch(`CREATE_ESTIMATION`, {
          accountId: this.$store.state.user.accountId,
          mainProductId: this.selectedMainProduct.mainProductId,
          subProductsIds: Object.values(this.checkedSubProducts),
          vehicleId: this.selectedCarId,
        })
        .then((this.showEstimate = true), (this.shoNullEstimation = false))
        .catch((err) => console.log(err));
    },
    selectCar() {
      if (this.selectedCarId !== ``) {
        this.isCarSelected = true;
      }
      this.isCarSelected = false;
    },
    createOrder() {
      let estimationId = this.$store.state.current_estimation.estimationId;
      let accountId = this.$store.state.current_estimation.accountId;
      this.$store
        .dispatch(`CREATE_ORDER`, {
          accountId: accountId,
          estimationId: estimationId,
        })
        .then(
          (this.isCreateOrderPopup = true),
          this.$store.dispatch(`GET_ORDERS`, `?order=desc`, this.resetForm()),
          (this.isCategorySelected = false),
          (this.isMainProductSelected = false),
          (this.isUserSelected = false),
          this.scrollToTop()
        )
        .catch((err) => console.log(err))
        .then(this.$store.dispatch(`GET_ORDERS`, `?order=desc`));
    },
    resetForm() {
      (this.isCategorySelected = false),
        (this.isMainProductSelected = false),
        (this.isUserSelected = false),
        (this.selectedCategory = `Select category...`),
        (this.accountUsername = ``),
        (this.selectedMainProduct = ``),
        (this.shoNullEstimation = true),
        (this.showEstimate = false),
        (this.selectedCarId = ``);
    },
    closeCreateOrderPopup() {
      this.isCreateOrderPopup = false;
      this.$store.dispatch(`GET_ORDERS`, `?order=desc`);
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
</style>