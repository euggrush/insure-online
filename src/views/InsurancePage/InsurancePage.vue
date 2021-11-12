<template>
  <section class="container">
    <h3>Insurance categories:</h3>
    <ul class="list-group">
      <li
        v-for="(category, index) in categoriesList"
        :key="index"
        class="list-group-item"
      >
        {{ category.categoryName }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: `InsurancePage`,
  computed: {
    categoriesList() {
      return this.$store.state.product_categories.categories;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_PRODUCT_CATEGORIES`);
  },
};
</script>

<style lang="scss" scoped>
</style>