<template>
  <section class="container orders-list-wrapper pb-3">
    <h3 class="mt-3">Orders:</h3>
    <p>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseWidthExample"
        aria-expanded="false"
        aria-controls="collapseWidthExample"
      >
        Create order
      </button>
    </p>
    <div>
      <div class="collapse" id="collapseWidthExample">
        <div class="card card-body">
          <form @submit.prevent="getEstimation">
            <!-- CUSTOMER START -->
            <p class="fw-bold">Customer</p>
            <div class="input-group mt-3 mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Customer's username"
                aria-label="Customer's username"
                aria-describedby="button-addon2"
                v-model="accountUsername"
                required
                v-on:keyup.enter="getAccount"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                @click="getAccount"
              >
                Find
              </button>
            </div>
            <div
              v-if="isAccountInfo"
              class="container bg-info text-white bg-opacity-75 p-3 mb-3"
            >
              <div class="row row-cols-auto">
                <div class="col">
                  Username:
                  <span class="d-block text-danger fw-bold">{{
                    accountInfo.username
                  }}</span>
                </div>
                <div class="col">
                  First name:
                  <span class="d-block text-danger fw-bold">{{
                    accountInfo.firstName
                  }}</span>
                </div>
                <div class="col">
                  Last name:
                  <span class="d-block text-danger fw-bold">{{
                    accountInfo.lastName
                  }}</span>
                </div>
                <div class="col">
                  Date of birth:
                  <span class="d-block text-danger fw-bold">{{
                    accountInfo.age
                  }}</span>
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

            <span v-if="showEstimate" class="d-block mt-5"
              >Estimation: {{ currentEstimation.totalCost || 0 }}</span
            >
            <button
              type="submit"
              class="btn btn-info mt-5"
              :disabled="
                !isCategorySelected || !isMainProductSelected || !isUserSelected
              "
            >
              Calculate
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isCategorySelected: false,
      isMainProductSelected: false,
      isUserSelected: false,
      isCarSelected: false,
      isSubProducts: false,
      accountUsername: ``,
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
    };
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
    getAccount() {
      if (this.accountUsername !== ``) {
        this.$store
          .dispatch(`GET_USERS`, `?username=${this.accountUsername}`)
          .then((res) => {
            (this.isAccountInfo = true),
              (this.isUserSelected = true),
              console.log(res);
          })
          .catch(
            (err) => alert(err.response.data.message),
            (this.isAccountInfo = false),
            (this.isUserSelected = false)
          );
      }
    },
    getEstimation() {
      this.$store
        .dispatch(`CREATE_ESTIMATION`, {
          accountId: this.selectedAccountId,
          mainProductId: this.selectedMainProduct,
          subProductsIds: Object.values(this.checkedSubProducts),
          vehicleId: this.selectedCarId,
        })
        .then(
          (this.showEstimate = true),
          (this.shoNullEstimation = false)
          // console.log({
          //   accountId: this.selectedAccountId,
          //   mainProductId: this.selectedMainProduct,
          //   subProductsIds: Object.values(this.checkedSubProducts),
          //   vehicleId: this.selectedCarId,
          // })
        )
        .catch((err) => alert(err));
    },
    selectCar() {
      if (this.selectedCarId !== ``) {
        this.isCarSelected = true;
      }
      this.isCarSelected = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.orders-list-wrapper {
  min-height: 53vh;
}
</style>