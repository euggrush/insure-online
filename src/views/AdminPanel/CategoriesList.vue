<template>
  <section class="container categories-list-wrapper">
    <h3>Categories:</h3>
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
.categories-list-wrapper {
  outline: solid 4px purple;
}
</style>