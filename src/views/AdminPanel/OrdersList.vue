<template>
  <section class="container orders-list-wrapper pb-3">
    <h3 class="mt-3">Orders:</h3>
    <div class="d-flex justify-content-between flex-wrap align-items-center">
      <button
        class="btn btn-primary mt-1"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseWidthExample"
        aria-expanded="false"
        aria-controls="collapseWidthExample"
      >
        Create order
      </button>
      <div
        class="btn-group d-flex flex-wrap"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio0"
          autocomplete="off"
          value=""
          v-model="orderStatus"
          checked
        />
        <label class="btn btn-outline-dark" for="btnradio0">All</label>
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio1"
          autocomplete="off"
          value="pending"
          v-model="orderStatus"
        />
        <label class="btn btn-outline-dark" for="btnradio1">Pending</label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio2"
          value="approved"
          v-model="orderStatus"
          autocomplete="off"
        />
        <label class="btn btn-outline-dark" for="btnradio2">Approved</label>

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio3"
          value="rejected"
          v-model="orderStatus"
          autocomplete="off"
        />
        <label class="btn btn-outline-dark" for="btnradio3">Rejected</label>
      </div>
    </div>
    <div class="mt-3">
      <div class="collapse" id="collapseWidthExample">
        <div class="card card-body">
          <form @submit.prevent="getEstimation">
            <!-- CUSTOMER START -->
            <p class="fw-bold">Customer</p>
            <SearchAccount class="w-100 mb-3" />
            <div
              v-if="isAccountInfo"
              class="
                container
                bg-info
                text-white
                bg-opacity-75
                p-3
                mb-3
                rounded
              "
            >
              <div class="row row-cols-auto">
                <div class="col">
                  <span class="text-black">First, Last Name:</span>&nbsp;
                  <span class="text-danger fw-bold">{{
                    accountInfo.firstName
                  }}</span>
                  <span class="text-danger fw-bold"
                    >&nbsp;{{ accountInfo.lastName }}</span
                  >
                </div>

                <div class="col">
                  <span class="text-black">Age:</span>
                  <span class="text-danger fw-bold"
                    >&nbsp;{{ accountInfo.age }}</span
                  >
                </div>
              </div>
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
                  v-for="(vehicle, index) in accountInfo.vehicles"
                  :key="index"
                  :value="vehicle.vehicleId"
                >
                  {{ vehicle.details }}
                </option>
              </select>
              <!-- ADD CAR -->
              <div v-if="isCarCategorySelected">
                <button
                  class="btn btn-primary mt-3"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  :disabled="isCarSelected"
                >
                  Create Car
                </button>

                <div class="collapse mt-3" id="collapseExample">
                  <div class="card card-body">
                    <CreateVehicleForm
                      :myProps="{ accountId: accountInfo.accountId }"
                      class="text-black"
                    />
                  </div>
                </div>
              </div>

              <!-- ADD CAR END -->
            </div>
            <!-- CUSTOMER END -->
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
              >
                {{ category.categoryName }}
              </option>
              ]
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
                :value="product.mainProductId"
              >
                {{ product.mainProductName }}
              </option>
            </select>
            <div class="options-wrapper mt-3 mb-3">
              <div
                v-for="(subProduct, index) in subProductsList"
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
                  :required="isCarCategorySelected"
                />
                <label
                  class="form-check-label"
                  for="flexSwitchCheckCheckedDisabled"
                >
                  <span>{{ subProduct.subProductName }}</span>
                  <span class="fw-bold"
                    >&nbsp;${{ subProduct.subProductCost }}</span
                  >
                </label>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-info mt-5"
              :disabled="
                !isCategorySelected || !isMainProductSelected || !isUserSelected
              "
            >
              Calculate
            </button>
            <span v-if="showEstimate" class="d-block mt-5"
              >Estimation: R{{ currentEstimation.totalCost || 0 }}</span
            >
          </form>
          <div>
            <button
              v-if="showEstimate"
              type="button"
              class="btn btn-success mt-5"
              :disabled="
                !isCategorySelected || !isMainProductSelected || !isUserSelected
              "
              @click="createOrder"
            >
              Submit order
            </button>
          </div>
        </div>
      </div>
    </div>
    <OrdersInfo
      :myProps="{
        componentKey: componentKey,
        orderStatus: `orderStatus=${orderStatus}`,
      }"
    />
  </section>
</template>

<script>
import OrdersInfo from "../AdminPanel/OrdersInfo.vue";
import SearchAccount from "../../components/Forms/SearchAccount.vue";
import CreateVehicleForm from "../../components/Forms/CreateVehicleForm.vue";
export default {
  components: {
    OrdersInfo,
    SearchAccount,
    CreateVehicleForm,
  },
  data() {
    return {
      isCategorySelected: false,
      isMainProductSelected: false,
      isUserSelected: false,
      isCarSelected: false,
      isSubProducts: false,
      selectedCategory: `Select category...`,
      selectedMainProduct: ``,
      checkedSubProducts: [],
      selectedAccountId: ``,
      selectedCarId: ``,
      isAccountInfo: false,
      showEstimate: false,
      isCalcBtnDisabled: true,
      resetSelectMainProduct: true,
      isCarCategorySelected: false,
      shoNullEstimation: true,
      componentKey: 0,
      orderStatus: ``,
    };
  },
  watch: {
    accountInfo() {
      if (this.$store.state.users_array.accounts.length == 1) {
        this.isAccountInfo = true;
        this.isUserSelected = true;
      } else {
        this.isAccountInfo = false;
        this.isUserSelected = false;
      }
    },
  },
  computed: {
    categoriesList() {
      return this.$store.state.product_categories.categories || [];
    },
    productsList() {
      return this.$store.state.main_products.mainProducts || [];
    },
    subProductsList() {
      if (this.isSubProducts) {
        return this.$store.state.sub_products.subProducts;
      }
      return [];
    },
    accountInfo() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.selectedAccountId =
        this.$store.state.users_array.accounts[0].accountId;
      if (this.isAccountInfo == true) {
        return this.$store.state.users_array.accounts[0];
      }
      return [];
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
  },
  mounted() {
    this.$store.dispatch(`GET_PRODUCT_CATEGORIES`);
  },
  methods: {
    selectCategory() {
      this.selectedMainProduct = ``;
      this.isSubProducts = false;
      this.isCarCategorySelected = false;
      if (this.selectedCategory === `Select category...`) {
        this.isCategorySelected = false;
        this.shoNullEstimation = true;
      } else {
        this.isCategorySelected = true;
      }
      if (this.selectedCategory == `280fc9df-1dec-4631-8fe3-76a6f606d6ad`) {
        this.isCarCategorySelected = true;
      }
      this.$store.dispatch(
        `GET_MAIN_PRODUCTS`,
        `?categoryId=${this.selectedCategory}`
      );
    },
    selectMainProduct() {
      this.$store
        .dispatch(
          `GET_SUB_PRODUCTS`,
          `?mainProductId=${this.selectedMainProduct}`
        )
        .then((this.isSubProducts = true), (this.isMainProductSelected = true))
        .catch((err) => {
          this.isSubProducts = false;
          console.log(err);
        });
    },
    getEstimation() {
      this.$store
        .dispatch(`CREATE_ESTIMATION`, {
          accountId: this.selectedAccountId,
          mainProductId: this.selectedMainProduct,
          subProductsIds: Object.values(this.checkedSubProducts),
          vehicleId: this.selectedCarId,
        })
        .then((this.showEstimate = true), (this.shoNullEstimation = false))
        .catch((err) => alert(err));
    },
    selectCar() {
      if (this.selectedCarId.length === 0) {
        this.isCarSelected = false;
      } else {
        this.isCarSelected = true;
      }
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
          (this.componentKey += 1),
          this.resetForm(),
          (this.isCategorySelected = false),
          (this.isMainProductSelected = false),
          (this.isUserSelected = false)
        )
        .catch((err) => alert(err));
    },
    resetForm() {
      (this.isCategorySelected = false),
        (this.isMainProductSelected = false),
        (this.isUserSelected = false),
        (this.selectedCategory = `Select category...`),
        (this.isAccountInfo = false),
        (this.selectedMainProduct = ``),
        (this.isSubProducts = false);
      (this.shoNullEstimation = true),
        (this.showEstimate = false),
        (this.selectedCarId = ``);
      this.$store.dispatch(`GET_USERS`, ``);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-outline-dark {
  margin-top: 1em;
  border-radius: 0;
  @include media-breakpoint-up(lg) {
    margin-top: 0.25rem;
    border-radius: 50px;
  }
}
.orders-list-wrapper {
  min-height: 53vh;
}
.btn {
  min-width: 12em;
}
#button-addon2 {
  min-width: auto;
  width: auto;
}
#collapseExample {
  @include media-breakpoint-up(lg) {
    max-width: 40%;
  }
}
</style>