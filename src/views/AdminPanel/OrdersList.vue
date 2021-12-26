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
            <select
              @change="selectCategory($event)"
              class="form-select"
              aria-label="Default select example"
              required
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
            <select
              @change="selectMainProduct($event)"
              class="form-select mt-3"
              aria-label="Default select example"
              :disabled="!isCategorySelected"
              required
            >
              <option selected>Select product...</option>
              <option
                v-for="(product, index) in productsList"
                :key="index"
                :value="product.mainProductId"
              >
                {{ product.mainProductName }}
              </option>
            </select>
            <div class="options-wrapper mt-3">
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
                  v-model="checkedSubProducts"
                  :value="subProduct.subProductId"
                />
                <label
                  class="form-check-label"
                  for="flexSwitchCheckCheckedDisabled"
                >
                  <span>{{ subProduct.subProductName }}</span>
                  <span>&nbsp;for ${{ subProduct.subProductCost }}</span>
                </label>
              </div>
            </div>
            <div class="input-group mt-3 mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Customer's username"
                aria-label="Customer's username"
                aria-describedby="button-addon2"
                v-model="accountUsername"
                required
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
              class="container bg-info text-white bg-opacity-75 p-3"
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
                class="form-select mt-3"
                aria-label="Default select example"
                v-model="selectedCarId"
              >
                <option selected>Select customer's car...</option>
                <option
                  v-for="(vehicle, index) in accountInfo.vehicles"
                  :key="index"
                  :value="vehicle.vehicleId"
                >
                  {{ vehicle.details }}
                </option>
              </select>
            </div>
            <span class="d-block mt-5"
              >Estimation: {{ currentEstimation.totalCost || 0 }}</span
            >
            <button type="submit" class="btn btn-info mt-5">Calculate</button>
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
      isSubProducts: false,
      accountUsername: ``,
      selectedCategory: ``,
      selectedMainProduct: ``,
      checkedSubProducts: [],
      selectedAccountId: ``,
      selectedCarId: `Select customer's car...`,
      isAccountInfo: false,
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
      return this.$store.state.current_estimation || 0;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_PRODUCT_CATEGORIES`);
  },
  methods: {
    selectCategory(event) {
      this.isCategorySelected = true;
      this.selectedCategory = event.target.value;
      if (this.selectedCategory === `Select category...`) {
        this.isCategorySelected = false;
      } else {
        this.isCategorySelected = true;
      }
      // this.$store.dispatch(`GET_MAIN_PRODUCTS`, ``);
      this.$store.dispatch(
        `GET_MAIN_PRODUCTS`,
        `?categoryId=${this.selectedCategory}`
      );
    },
    selectMainProduct(event) {
      this.selectedMainProduct = event.target.value;
      this.$store
        .dispatch(
          `GET_SUB_PRODUCTS`,
          `?mainProductId=${this.selectedMainProduct}`
        )
        .then((this.isSubProducts = true))
        .catch((err) => {
          this.isSubProducts = false;
          console.log(err);
        });
    },
    getAccount() {
      if (this.accountUsername !== ``) {
        this.$store
          .dispatch(`GET_USERS`, `?username=${this.accountUsername}`)
          .then((this.isAccountInfo = true))
          .catch((err) => alert(err.response.data.message));
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
        // .then((this.current_estimation = this.$store.state.current_estimation))
        .catch((err) => alert(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.orders-list-wrapper {
  min-height: 53vh;
  // outline: solid 4px palevioletred;
}
</style>