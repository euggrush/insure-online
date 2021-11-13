<template>
  <section class="container orders-list-wrapper">
    <h3>Orders:</h3>
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
  // data() {
  //   return {
  //     productName: ``,
  //     pickedProductIndex: ``,
  //     pickedProductInfo: [],
  //     pickedProductId: ``,
  //     productNewName: ``,
  //     isBtnDisabled: true,
  //   };
  // },
  // computed: {
  //   productsList() {
  //     return this.$store.state.main_products.mainProducts;
  //   },
  // },
  // mounted() {
  //   this.$store.dispatch(`GET_MAIN_PRODUCTS`);
  // },
  // methods: {
  //   pickProduct(category, index) {
  //     this.pickedProductIndex = index;
  //     this.pickedProductInfo = category;
  //     this.isBtnDisabled = false;
  //   },
  // }
};
</script>

<style lang="scss" scoped>
.orders-list-wrapper {
  outline: solid 4px palevioletred;
}
</style>