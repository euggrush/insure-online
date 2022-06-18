<template>
  <section class="container products-list-wrapper position-relative">
    <!-- PRODUCTS RENDER -->
    <h3 v-show="showListItem" class="mt-3">Products:</h3>
    <!-- CREATE NEW PRODUCT -->
    <button
      v-show="showListItem"
      class="btn btn-primary mt-1"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample1"
      aria-expanded="false"
      aria-controls="collapseExample1"
    >
      Create product
    </button>
    <div v-show="showListItem" class="collapse mt-3" id="collapseExample1">
      <form class="card card-body mt-1" @submit.prevent="createProduct">
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="selectedProductType"
          required
        >
          <option disabled selected value="">Select product type</option>
          <option value="TOPMARQ">Topmarq</option>
          <option value="tuffstuff">Tuffstuff</option>
        </select>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Product name</label
          >
          <input
            type="text"
            class="form-control"
            v-model="mainProductName"
            required
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
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Product cost</label
          >
          <input type="number" class="form-control" v-model="cost" required />
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="isRequiredCoverages"
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Coverages in this product are required (Recommended)
          </label>
        </div>
        <button
          type="submit"
          class="btn btn-primary mt-3"
          :disabled="selectedProductType == ''"
        >
          Submit
        </button>
      </form>
    </div>
    <ul class="list-group mt-3">
      <li
        v-for="(product, index) in productsList"
        v-show="showListItem"
        :key="index"
        class="list-group-item"
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
            <div class="col">
              <button
                type="button"
                class="btn btn-secondary"
                @click="removeProduct(product.mainProductId)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>

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
import { CAR_INSURANCE_CATEGORY } from "../../../constants";

export default {
  components: {
    EditProduct,
  },
  data() {
    return {
      selectedProductType: ``,
      showListItem: true,
      // productName: ``,
      pickedProductIndex: ``,
      pickedProductInfo: [],
      // pickedProductId: ``,
      // productNewName: ``,
      // isChangeBtnDisabled: true,
      mainProductName: ``,
      mainProductDescription: ``,
      cost: ``,
      isRequiredCoverages: ``,
      // isProductToChangeSelected: false,
      mainProductId: ``,
      isEditProductModal: false,
    };
  },
  watch: {
    isChangesNeeded() {
      this.fetchMainProducts();
    },
  },
  computed: {
    isChangesNeeded() {
      return this.$store.state.is_changes_needed;
    },
    productsList() {
      return this.$store.state.main_products.mainProducts;
    },
  },
  mounted() {
    this.fetchMainProducts();
  },
  methods: {
    fetchMainProducts() {
      this.$store.dispatch(`GET_MAIN_PRODUCTS`, ``);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    closeModal() {
      this.isEditProductModal = false;
      this.showListItem = true;
      this.fetchMainProducts();
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
          this.scrollToTop();
        });
    },
    createProduct() {
      this.$store
        .dispatch(`CREATE_MAIN_PRODUCT`, {
          categoryId: CAR_INSURANCE_CATEGORY,
          mainProductName: this.mainProductName,
          mainProductDescription: this.mainProductDescription,
          isRequiredCoverages: this.isRequiredCoverages,
          cost: this.cost,
        })
        .then(() => {
          this.$store.dispatch(`GET_MAIN_PRODUCTS`, ``);
          this.mainProductName = ``;
          this.mainProductDescription = ``;
          this.cost = ``;
          this.selectedProductType = ``;
        })
        .catch((error) => {
          alert(error);
        });
    },
    removeProduct(id) {
      let isExecuted = confirm("Remove product?");
      if (isExecuted) {
        this.$store.dispatch(`CREATE_MAIN_PRODUCT`, {
          mainProductId: id,
          deleted: true,
        });
      }
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
  transition: all 0.5s ease;

  min-height: 7em;
  background-color: $mainGreen;
  box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
  -webkit-box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
  -moz-box-shadow: 6px 7px 7px 0px rgba(22, 104, 55, 0.75);
}
.product-item:hover {
  background-color: $mainGreen;
  opacity: 0.8;
}
.edit-wrap {
  width: 100%;
  min-height: 100%;
  background: $bgLight;
}
.btn {
  min-width: 12em;
}
</style>