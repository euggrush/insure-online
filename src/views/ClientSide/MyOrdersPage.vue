<template>
  <section class="container-fluid my-order position-relative">
    <ModalMessage />
    <router-link to="/my-account" class="btn btn-secondary"
      >Back to my account</router-link
    >
    <h3 class="mt-3">Orders:</h3>
    <button
      class="btn btn-dark mt-3"
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
            @change="selectCar(selectedCarId)"
            required
          >
            <option value="" selected>Select customer's car...</option>
            <option
              v-for="(vehicle, index) in vehiclesList"
              :key="index"
              :value="vehicle.vehicleId"
              :disabled="vehicle.isTrackingDeviceRequired"
            >
              {{ vehicle.details }},&nbsp;VIN:&nbsp;{{ vehicle.vin }}
            </option>
          </select>
          <Transition>
            <div v-if="isCarSelected">
              <p class="mt-3">select accessories:</p>
              <div
                v-for="(accessory, index) in accessoriesList"
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

          <button
            type="submit"
            class="btn btn-outline-warning mt-3 mb-5"
            :disabled="!isCategorySelected || !isMainProductSelected"
          >
            Calculate
          </button>
          <div
            v-show="showEstimate"
            v-for="estimate in newEstimationsList"
            :key="estimate.estimationId"
            class="d-block mt-1"
          >
            <span>{{
              estimate.estimationType == `estimation`
                ? `Quote for vehicle`
                : `Quote for accessories`
            }}</span
            >,
            <span> Monthly payment: R{{ estimate.totalCost || 0 }}</span>
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
            Add To Order
          </button>
        </div>
      </div>
    </Transition>
    <button
      v-if="estimationsList.length > 0"
      class="d-block btn btn-dark mt-3"
      @click="showMyQuites = !showMyQuites"
    >
      Show My Quotes
    </button>
    <Transition>
      <div
        v-if="showMyQuites"
        class="bg-dark bg-gradient shadow-lg mt-3 p-3 rounded"
      >
        <ul class="list-group">
          <li
            v-for="(item, index) in estimationsList"
            :key="item.estimationId"
            class="list-group-item list-group-item-dark"
          >
            <div class="row">
              <div class="col">
                <strong>Car:</strong> {{ item.vehicleDetails }}
              </div>
              <div v-if="item.mainProductName" class="col">
                <strong>Product:</strong> {{ item.mainProductName }}
              </div>
              <div v-else class="col">
                <strong>Accessories:</strong>&nbsp;
                <span
                  class="text-capitalize"
                  v-for="(accessory, index) in item.accessories"
                  :key="accessory.accessoryId"
                  >{{ accessory.accessoryName
                  }}<span v-if="index != item.accessories.length - 1"
                    >,&nbsp;</span
                  >
                </span>
              </div>
              <div class="col">
                <strong>Total:</strong> {{ item.totalCost }}
              </div>
              <div class="form-check col">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="item.estimationId"
                  :id="`flexCheckDefault${index}`"
                  v-model="estimationIdsArray"
                />
                <label
                  class="form-check-label"
                  :for="`flexCheckDefault${index}`"
                >
                  Add To Order
                </label>
              </div>
            </div>
          </li>
        </ul>
        <button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="createOrder"
        >
          Create Order
        </button>
      </div>
    </Transition>
    <button class="btn btn-dark mt-3" @click="showMyOrders = !showMyOrders">
      Show My Orders
    </button>
    <Transition>
      <MyOrdersList class="mt-3" v-if="showMyOrders" />
    </Transition>

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
import ModalMessage from "../../components/Modals/ModalMessage.vue";
export default {
  components: {
    MyOrdersList,
    ModalMessage,
  },
  data() {
    return {
      estimationType: `estimation`,
      showMyOrders: false,
      showGetQuoteMenu: true,
      showMyQuites: false,
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
      estimationIdsArray: [],
      showAccessoriesCreateForm: false,
      checkedAccessoriesIds: [],
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
    newEstimationsList() {
      if (this.shoNullEstimation) {
        return 0;
      }
      return this.$store.state.new_estimations;
    },
    vehiclesList() {
      return this.$store.state.vehicles.vehicles || [];
    },
    accessoriesList() {
      return this.$store.state.accessories.accessories ?? [];
    },
  },
  mounted() {
    this.carInsuranceCategory = CAR_INSURANCE_CATEGORY;
    this.$store.dispatch(`GET_PRODUCT_CATEGORIES`);
    this.$store.dispatch(`GET_VEHICLES`, ``);
    this.$store.dispatch(`GET_ESTIMATIONS`, ``);
  },
  methods: {
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
          estimationType: this.estimationType,
        })
        .then(
          (this.showEstimate = true),
          (this.shoNullEstimation = false),
          setTimeout(() => {
            if (this.checkedAccessoriesIds.length > 0) {
              this.$store.dispatch(`CREATE_ESTIMATION`, {
                accountId: this.$store.state.user.accountId,
                accessoriesIds: Object.values(this.checkedAccessoriesIds),
                vehicleId: this.selectedCarId,
                estimationType: `accessory`,
              });
            }
            this.estimationIdsArray.push(
              this.$store.state.current_estimation.estimationId
            );
          }, 1000)
        )
        .catch((err) => console.log(err));
    },
    selectCar(id) {
      if (id != ``) {
        this.isCarSelected = true;
        this.getAccessories();
      } else {
        this.isCarSelected = false;
      }
    },
    getAccessories() {
      this.$store.dispatch(
        `GET_ACCESSORIES`,
        `?vehicleId=${this.selectedCarId}`
      );
    },
    quoteToOrder() {
      this.showGetQuoteMenu = false;
      this.showMyQuites = true;
      this.resetForm();
      this.$store.dispatch(`GET_ESTIMATIONS`, ``);
    },

    createOrder() {
      this.$store
        .dispatch(`CREATE_ORDER`, {
          estimationIds: this.estimationIdsArray,
        })
        .then((response) => {
          console.log(response.data),
            (this.isCreateOrderPopup = true),
            this.$store.dispatch(`GET_ORDERS`, ``),
            this.resetForm(),
            (this.isCategorySelected = false),
            (this.isMainProductSelected = false),
            (this.isUserSelected = false),
            (this.showMyQuites = !this.showMyQuites),
            (this.showMyOrders = !this.showMyOrders),
            this.scrollToTop();
        })
        .catch((err) => {
          this.scrollToTop();
          this.geErrorMessage(err);
        })
        .then(() => {
          this.showMyQuites = !this.showMyQuites;
        });
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
      this.$store.dispatch(`GET_ORDERS`, ``);
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