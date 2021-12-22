<template>
  <section class="container products-list-wrapper">
    <!-- PRODUCTS RENDER -->
    <h3 class="mt-3">Products:</h3>
    <ul class="list-group mt-3">
      <li
        v-for="(product, index) in productsList"
        :key="index"
        class="list-group-item"
        :class="{ active: index === pickedProductIndex }"
        @click="pickProduct(product, index)"
      >
        <div class="container">
          <div class="row">
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Product's name:</span
              >
              <span class="d-block">
                {{ product.mainProductName }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Product's description:</span
              >
              <span class="d-block">
                {{ product.mainProductDescription }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Product's cost:</span
              >
              <span class="d-block">
                {{ product.mainProductCost }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Product's category:</span
              >
              <span class="d-block">
                {{ product.categoryName }}
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- CREATE NEW PRODUCT -->
    <p class="mt-5">
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample1"
        aria-expanded="false"
        aria-controls="collapseExample1"
      >
        Create product
      </button>
    </p>
    <div class="collapse" id="collapseExample1">
      <div class="card card-body">
        <!-- CATEGORIES LIST -->

        <select
          class="form-select"
          aria-label="Default select example"
          @change="selectCategory($event)"
          required
        >
          <option disabled :selected="!isCategorySelected">
            Choose category
          </option>
          <option
            v-for="(category, index) in categoriesList"
            :key="index"
            :value="category.categoryId"
          >
            {{ category.categoryName }}
          </option>
        </select>

        <form class="mt-1" @submit.prevent="createProduct">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product name</label
            >
            <input
              type="text"
              class="form-control"
              v-model="mainProductName"
              required
              :disabled="isBtnDisabled"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product description</label
            >
            <input
              type="text"
              class="form-control"
              v-model="mainProductDescription"
              :disabled="isBtnDisabled"
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product cost</label
            >
            <input
              type="number"
              class="form-control"
              v-model="cost"
              required
              :disabled="isBtnDisabled"
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isBtnDisabled"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    <!-- CHANGE PRODUCT -->
    <p class="mt-5">
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample2"
        aria-expanded="false"
        aria-controls="collapseExample2"
      >
        Change product
      </button>
    </p>
    <div class="collapse" id="collapseExample2">
      <div class="card card-body">
        <select
          class="form-select"
          aria-label="Default select example"
          @change="selectProductToChange($event)"
          required
        >
          <option disabled :selected="!isProductToChangeSelected">
            Choose product to change
          </option>
          <option
            v-for="(product, index) in productsList"
            :key="index"
            :value="product.mainProductId"
          >
            {{ product.mainProductName }}
            <span> (Category related to: {{ product.categoryName }}) </span>
          </option>
        </select>
        <form class="mt-1" @submit.prevent="changeProduct">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product name</label
            >
            <input
              type="text"
              class="form-control"
              v-model="mainProductName"
              required
              :disabled="isChangeBtnDisabled"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product description</label
            >
            <input
              type="text"
              class="form-control"
              v-model="mainProductDescription"
              :disabled="isChangeBtnDisabled"
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product cost</label
            >
            <input
              type="number"
              class="form-control"
              v-model="cost"
              required
              :disabled="isChangeBtnDisabled"
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isChangeBtnDisabled"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
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
      productCategoryId: ``,
      productNewName: ``,
      isBtnDisabled: true,
      isChangeBtnDisabled: true,
      mainProductName: ``,
      mainProductDescription: ``,
      cost: ``,
      isCategorySelected: false,
      isProductToChangeSelected: false,
      mainProductId: ``,
    };
  },
  computed: {
    productsList() {
      return this.$store.state.main_products.mainProducts;
    },
    categoriesList() {
      return this.$store.state.product_categories.categories;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_MAIN_PRODUCTS`, ``);
    this.$store.dispatch(`GET_PRODUCT_CATEGORIES`);
  },
  methods: {
    pickProduct(product, index) {
      this.pickedProductIndex = index;
      this.pickedProductInfo = product;
    },
    createProduct() {
      this.$store
        .dispatch(`CREATE_MAIN_PRODUCT`, {
          categoryId: this.productCategoryId,
          mainProductName: this.mainProductName,
          mainProductDescription: this.mainProductDescription,
          cost: this.cost,
        })
        .then(() => {
          this.$store.dispatch(`GET_MAIN_PRODUCTS`, ``);
          this.mainProductName = ``;
          this.mainProductDescription = ``;
          this.cost = ``;
          this.isBtnDisabled = true;
          this.isCategorySelected = false;
        })
        .catch((error) => {
          alert(error);
        });
    },
    selectCategory(event) {
      this.productCategoryId = event.target.value;
      this.isBtnDisabled = false;
      this.isCategorySelected = true;
    },
    selectProductToChange(event) {
      this.mainProductId = event.target.value;
      this.isChangeBtnDisabled = false;
      this.isProductToChangeSelected = true;
    },
    changeProduct() {
      this.$store
        .dispatch(`CREATE_MAIN_PRODUCT`, {
          mainProductId: this.mainProductId,
          mainProductName: this.mainProductName,
          mainProductDescription: this.mainProductDescription,
          cost: this.cost,
        })
        .then(() => {
          this.$store.dispatch(`GET_MAIN_PRODUCTS`, ``);
          this.mainProductName = ``;
          this.mainProductDescription = ``;
          this.cost = ``;
          this.isChangeBtnDisabled = true;
          this.isProductToChangeSelected = false;
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
}
// .products-list-wrapper {
//   outline: solid 4px yellow;
// }
</style>