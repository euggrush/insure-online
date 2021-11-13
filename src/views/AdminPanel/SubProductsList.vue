<template>
  <section class="container subproducts-list-wrapper">
    <h3>Products options:</h3>
    <ul class="list-group">
      <li
        v-for="(subProduct, index) in subProductsList"
        :key="index"
        class="list-group-item"
        :class="{ active: index === pickedSubProductIndex }"
        @click="pickSubProduct(subProduct, index)"
      >
        <div class="container">
          <div class="row">
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Option's name:</span
              >
              <span class="d-block">
                {{ subProduct.subProductName }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Option's description:</span
              >
              <span class="d-block">
                {{ subProduct.subProductDescription }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Option's related product:</span
              >
              <span class="d-block">
                {{ subProduct.mainProductName }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Option's related category:</span
              >
              <span class="d-block">
                {{ subProduct.categoryName }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline"
                >Option's cost:</span
              >
              <span class="d-block">
                {{ subProduct.subProductCost }}
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- CREATE NEW PRODUCT -->
<p class="mt-5">
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">
    Create product
  </button>
</p>
<div class="collapse" id="collapseExample1">
  <div class="card card-body">
    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
  </div>
</div>
<!-- CHANGE PRODUCT -->
<p class="mt-5">
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2">
    Change product
  </button>
</p>
<div class="collapse" id="collapseExample2">
  <div class="card card-body">
    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
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
    };
  },
  computed: {
    subProductsList() {
      return this.$store.state.sub_products.subProducts;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_SUB_PRODUCTS`);
  },
  methods: {
    pickSubProduct(subProduct, index) {
      this.pickedSubProductIndex = index;
      this.pickedSubProductInfo = subProduct;
      this.isBtnDisabled = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.subproducts-list-wrapper {
  outline: solid 4px blue;
}
</style>