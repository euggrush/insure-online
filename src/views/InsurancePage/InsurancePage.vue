<template>
  <section class="container-fluid our-products">
    <h3>Insurance categories:</h3>
    <ul class="list-group">
      <li
        v-for="(category, index) in categoriesList"
        :key="index"
        class="list-group-item"
        :class="{ active: index === pickedCategoryIndex }"
        @click="pickCategory(category, index)"
      >
        {{ category.categoryName }}
      </li>
    </ul>
    <section v-if="isProductListOpen" class="container border mt-5">
      <p>Products of this category:</p>
      <button type="button" class="btn btn-primary btn-lg">Get quote</button>
    </section>
  </section>
</template>

<script>
export default {
  name: `InsurancePage`,
  data() {
    return {
      pickedCategoryIndex: ``,
      pickedCategoryInfo: [],
      isProductListOpen: false,
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.product_categories.categories;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_PRODUCT_CATEGORIES`);
  },
  methods: {
    pickCategory(category, index) {
      this.pickedCategoryIndex = index;
      this.pickedCategoryInfo = category;
      this.isProductListOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
}
.our-products {
  min-height: calc(100vh - 7em);
  background-image: url($mainBg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>