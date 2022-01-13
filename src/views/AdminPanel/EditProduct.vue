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
  </section>
</template>

<script>
export default {
  data() {
    return {
      productInfo: {},
    };
  },
  computed: {
    product() {
      return this.$store.state.main_products.mainProducts[0] || [];
    },
    // categoriesList() {
    //   return this.$store.state.product_categories.categories;
    // },
  },
  methods: {
    closeModal() {
      this.isEditProductModal = false;
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