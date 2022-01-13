<template>
  <section class="container products-list-wrapper position-relative">
    <!-- PRODUCTS RENDER -->
    <h3 v-show="showListItem" class="mt-3">Products:</h3>
    <ul class="list-group mt-3">
      <li
        v-for="(product, index) in productsList"
        v-show="showListItem"
        :key="index"
        class="list-group-item"
        :class="{ active: index === pickedProductIndex }"
        @click="pickProduct(product, index)"
      >
        <div class="container">
          <div class="row product-item">
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Name:</span
              >
              <span class="d-block">
                {{ product.mainProductName }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Description:</span
              >
              <span class="d-block">
                {{ product.mainProductDescription }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Cost:</span
              >
              <span class="d-block"> R{{ product.mainProductCost }} </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Category:</span
              >
              <span class="d-block">
                {{ product.categoryName }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Coverages:</span
              >
              <p
                v-for="(subProduct, index) in product.subProducts"
                :key="index"
                class="m-0"
              >
                <span class="">{{ subProduct.subProductName }}</span>
                <span class="fw-bold"
                  >&nbsp;R{{ subProduct.subProductCost }}</span
                >
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- CREATE NEW PRODUCT -->
    <p class="mt-5" v-show="showListItem">
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
    <div class="edit-wrap p-3" v-if="isEditProductModal">
      <button
        type="button"
        class="btn-close float-end"
        aria-label="Close"
        @click="closeModal"
      ></button>
      <EditProduct />
    </div>
  </section>
</template>

<script>
import EditProduct from "./EditProduct.vue";
export default {
  components: {
    EditProduct,
  },
  data() {
    return {
      showListItem: true,
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
      isEditProductModal: false,
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
    closeModal() {
      this.isEditProductModal = false;
      this.showListItem = true;
      this.$store.dispatch(`GET_MAIN_PRODUCTS`, ``);
    },
    pickProduct(product, index) {
      this.pickedProductIndex = index;
      this.pickedProductInfo = product;
      this.$store
        .dispatch(
          `GET_MAIN_PRODUCTS`,
          `?mainProductId=${product.mainProductId}`
        )
        .then(() => {
          this.isEditProductModal = true;
          this.showListItem = false;
        });
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
  },
};
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
}
.active {
  color: $bgColorMain;
}
.product-item {
  min-height: 7em;
  background-color: $mainGreen;
  box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
  -webkit-box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
  -moz-box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
}

.edit-wrap {
  width: 100%;
  min-height: 100%;
  background: $bgLight;
  outline: solid 5px blue;
}
</style>