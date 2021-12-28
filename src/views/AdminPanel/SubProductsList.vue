<template>
  <section class="container subproducts-list-wrapper">
    <h3 class="mt-3">Products coverages:</h3>
    <ul class="list-group mt-3">
      <li
        v-for="(subProduct, index) in subProductsList"
        :key="index"
        class="list-group-item"
        :class="{ active: index === pickedSubProductIndex }"
        @click="pickSubProduct(subProduct, index)"
      >
        <div class="container">
          <div class="row  bg-light">
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Coverage name:</span
              >
              <span class="d-block">
                {{ subProduct.subProductName }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Coverage description:</span
              >
              <span class="d-block">
                {{ subProduct.subProductDescription }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Coverage cost:</span
              >
              <span class="d-block">
                {{ subProduct.subProductCost }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Related to product:</span
              >
              <span class="d-block">
                {{ subProduct.mainProductName }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Related to category:</span
              >
              <span class="d-block">
                {{ subProduct.categoryName }}
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
        Create product coverage
      </button>
    </p>
    <div class="collapse" id="collapseExample1">
      <div class="card card-body">
        <!-- MAIN PRODUCTS LIST -->

        <select
          class="form-select"
          aria-label="Default select example"
          @change="selectMainProduct($event)"
          required
        >
          <option disabled :selected="!isMainProductSelected">
            Choose product that you want add coverage
          </option>
          <option
            v-for="(product, index) in productsList"
            :key="index"
            :value="product.mainProductId"
          >
            {{ product.mainProductName
            }}<span> (Category: {{ product.categoryName }})</span>
          </option>
        </select>
        <form class="mt-1" @submit.prevent="createSubProduct">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product coverage name</label
            >
            <input
              type="text"
              class="form-control"
              v-model="subProductName"
              required
              :disabled="isBtnDisabled"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product coverage description</label
            >
            <input
              type="text"
              class="form-control"
              v-model="subProductDescription"
              :disabled="isBtnDisabled"
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product coverage cost</label
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
        Change product coverage
      </button>
    </p>
    <div class="collapse" id="collapseExample2">
      <div class="card card-body">
        <select
          class="form-select"
          aria-label="Default select example"
          @change="selectSubProduct($event)"
          required
        >
          <option disabled :selected="!isSubProductSelected">
            Choose product coverage that you want to change
          </option>
          <option
            v-for="(subProduct, index) in subProductsList"
            :key="index"
            :value="subProduct.subProductId"
          >
            {{ subProduct.subProductName
            }}<span>
              (Product related to: {{ subProduct.mainProductName }})</span
            >
          </option>
        </select>
        <form class="mt-1" @submit.prevent="changeSubProduct">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product coverage name</label
            >
            <input
              type="text"
              class="form-control"
              v-model="subProductName"
              required
              :disabled="isChangeBtnDisabled"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product coverage description</label
            >
            <input
              type="text"
              class="form-control"
              v-model="subProductDescription"
              :disabled="isChangeBtnDisabled"
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product coverage cost</label
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
      pickedSubProductIndex: ``,
      pickedSubProductInfo: [],
      pickedSubProductId: ``,
      productNewName: ``,
      isBtnDisabled: true,
      isMainProductSelected: false,
      isSubProductSelected: false,
      isChangeBtnDisabled: true,
      mainProductId: ``,
      subProductName: ``,
      subProductId: ``,
      subProductDescription: ``,
      cost: ``,
    };
  },
  computed: {
    subProductsList() {
      return this.$store.state.sub_products.subProducts;
    },
    productsList() {
      return this.$store.state.main_products.mainProducts;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_SUB_PRODUCTS`, ``);
    this.$store.dispatch(`GET_MAIN_PRODUCTS`, ``);
  },
  methods: {
    pickSubProduct(subProduct, index) {
      this.pickedSubProductIndex = index;
      this.pickedSubProductInfo = subProduct;
      this.isBtnDisabled = false;
    },
    createSubProduct() {
      this.$store
        .dispatch(`CREATE_SUB_PRODUCT`, {
          mainProductId: this.mainProductId,
          subProductName: this.subProductName,
          subProductDescription: this.subProductDescription,
          cost: this.cost,
        })
        .then(() => {
          this.$store.dispatch(`GET_SUB_PRODUCTS`);
          this.subProductName = ``;
          this.subProductDescription = ``;
          this.cost = ``;
          this.isBtnDisabled = true;
          this.isMainProductSelected = false;
        })
        .catch((error) => {
          alert(error);
        });
    },
    selectMainProduct(event) {
      this.mainProductId = event.target.value;
      this.isBtnDisabled = false;
      this.isMainProductSelected = true;
    },
    selectSubProduct(event) {
      this.subProductId = event.target.value;
      this.isChangeBtnDisabled = false;
      this.isSubProductSelected = true;
    },
    changeSubProduct() {
      this.$store
        .dispatch(`CREATE_SUB_PRODUCT`, {
          subProductId: this.subProductId,
          subProductName: this.subProductName,
          subProductDescription: this.subProductDescription,
          cost: this.cost,
        })
        .then(() => {
          this.$store.dispatch(`GET_SUB_PRODUCTS`);
          this.subProductName = ``;
          this.subProductDescription = ``;
          this.cost = ``;
          this.isChangeBtnDisabled = true;
          this.isSubProductSelected = false;
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
// .subproducts-list-wrapper {
//   outline: solid 4px blue;
// }
</style>