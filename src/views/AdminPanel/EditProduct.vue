<template>
  <section>
    <p class="fw-bold">Product details:</p>
    <span class="fw-bolder text-decoration-underline mt-1"
      >Product name:&nbsp;</span
    >
    <span>{{ product.mainProductName }}</span
    ><br />
    <span class="d-inline-block fw-bolder text-decoration-underline mt-1"
      >Product description:&nbsp;</span
    >
    <span>{{ product.mainProductDescription }}</span
    ><br />
    <span class="d-inline-block fw-bolder text-decoration-underline mt-1"
      >Product cost:&nbsp;</span
    >
    <span>{{ product.mainProductCost }}</span
    ><br />
    <span class="d-inline-block fw-bolder text-decoration-underline mt-1"
      >Product category:&nbsp;</span
    >
    <span>{{ product.categoryName }}</span
    ><br />

    <span class="d-inline-block fw-bolder text-decoration-underline mt-1"
      >Product created:&nbsp;</span
    >
    <span>{{ product.created }}</span
    ><br />

    <p class="mt-3 fw-bold">Coverages included:</p>
    <ul class="list-group">
      <li
        v-for="(coverage, index) in product.subProducts"
        :key="index"
        class="list-group-item"
      >
        {{ coverage.subProductName }}
        <span class="fw-bold">R{{ coverage.subProductCost }}</span>
      </li>
    </ul>
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
        <form class="mt-1" @submit.prevent="changeProduct(product)">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product name</label
            >
            <input
              type="text"
              class="form-control"
              v-model="mainProductName"
              :placeholder="product.mainProductName"
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
              :placeholder="product.mainProductDescription"
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
              :placeholder="product.mainProductCost"
            />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
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
      mainProductName: ``,
      mainProductDescription: ``,
      cost: ``,
      isCategorySelected: false,
      mainProductId: ``,
      productInfo: {},
    };
  },
  computed: {
    product() {
      return this.$store.state.main_products.mainProducts[0] || [];
    },
  },
  methods: {
    closeModal() {
      this.isEditProductModal = false;
    },
    changeProduct(product) {
      this.$store
        .dispatch(`CREATE_MAIN_PRODUCT`, {
          mainProductId: product.mainProductId,
          mainProductName: this.mainProductName,
          mainProductDescription: this.mainProductDescription,
          cost: this.cost,
        })
        .then(() => {
          this.$store.dispatch(
            `GET_MAIN_PRODUCTS`,
            `?mainProductId=${product.mainProductId}`
          );
          this.mainProductName = ``;
          this.mainProductDescription = ``;
          this.cost = ``;
        })
        .catch((error) => {
          alert(error);
        })
        .then(() => {
          this.$store.dispatch(
            `GET_MAIN_PRODUCTS`,
            `?mainProductId=${product.mainProductId}`
          );
        });
    },
  },
};
</script>

<style lang="scss" scoped>
br {
  display: block;
  content: "";
  margin-top: 0;
}
</style>