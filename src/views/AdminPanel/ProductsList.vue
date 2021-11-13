<template>
  <section class="container products-list-wrapper">
    <h3>Products:</h3>
    <ul class="list-group">
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
              <span class="d-block fw-bold text-decoration-underline">Product's category:</span>
              <span class="d-block">
                {{ product.categoryName }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline">Product's name:</span>
              <span class="d-block">
                {{ product.mainProductName }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline">Product's description:</span>
              <span class="d-block">
                {{ product.mainProductDescription }}
              </span>
            </div>
            <div class="col border">
              <span class="d-block fw-bold text-decoration-underline">Product's cost:</span>
              <span class="d-block">
                {{ product.mainProductCost }}
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
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
    };
  },
  computed: {
    productsList() {
      return this.$store.state.main_products.mainProducts;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_MAIN_PRODUCTS`);
  },
  methods: {
    pickProduct(product, index) {
      this.pickedProductIndex = index;
      this.pickedProductInfo = product;
      this.isBtnDisabled = false;
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
}
.products-list-wrapper {
  outline: solid 4px yellow;
}
</style>