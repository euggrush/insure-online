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
            >
              <option selected>Select category...</option>
              <option
                v-for="(category, index) in categoriesList"
                :key="index"
                :value="category.categoryId"
              >
                {{ category.categoryName }}
              </option>
            </select>
            <select
              @change="selectMainProduct($event)"
              class="form-select mt-3"
              aria-label="Default select example"
              :disabled="!isCategorySelected"
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
                  id="flexSwitchCheckChecked"
                  checked
                />
                <label class="form-check-label" for="flexSwitchCheckChecked">
                  <span>{{ subProduct.subProductName }}</span>
                  <span>&nbsp;for ${{subProduct.subProductCost}}</span>
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
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                Find
              </button>
            </div>
            <div class="container bg-info text-white bg-opacity-75">
              <div class="row row-cols-auto">
                <div class="col">Username:</div>
                <div class="col">First name:</div>
                <div class="col">Last name:</div>
                <div class="col">Date of birth:</div>
              </div>
            </div>
            <select
              class="form-select mt-3"
              aria-label="Default select example"
            >
              <option selected>Select customer's car...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <button type="submit" class="btn btn-info mt-5">Calculate</button>
          </form>
        </div>
      </div>
    </div>
    <!-- <ul class="list-group">
      <li
        v-for="(product, index) in productsList"
        :key="index"
        class="list-group-item"
        :class="{ active: index === pickedProductIndex }"
        @click="pickProduct(product, index)"
      >
        {{ product.mainProductName }}
      </li>
    </ul> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      productName: ``,
      pickedProductIndex: ``,
      pickedProductInfo: [],
      pickedProductId: ``,
      productNewName: ``,
      isBtnDisabled: true,
      isCategorySelected: false,
      isSubProducts: false,
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
  },
  mounted() {
    this.$store.dispatch(`GET_PRODUCT_CATEGORIES`);
    this.$store.dispatch(`GET_MAIN_PRODUCTS`, ``);
  },
  methods: {
    selectCategory(event) {
      this.isCategorySelected = true;
      let catId = event.target.value;
      console.log(catId);

      // this.$store.dispatch(`GET_MAIN_PRODUCTS`, `categoryId=${catId}`);
    },
    selectMainProduct(event) {
      let mainProductId = event.target.value;
      this.$store
        .dispatch(`GET_SUB_PRODUCTS`, `?mainProductId=${mainProductId}`)
        .then((this.isSubProducts = true))
        .catch((err) => {
          this.isSubProducts = false;
          console.log(err);
        });
    },
    getEstimation() {
      alert(`haha`);
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