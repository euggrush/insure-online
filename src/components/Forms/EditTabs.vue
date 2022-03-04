<template>
  <section class="container mt-3">
    <div class="row bg-dark text-white ps-3 pe-3 pb-3 rounded">
      <div class="col">
        <span class="d-block mt-3">Accounts</span>
        <input
          class="form-control mt-3"
          type="text"
          placeholder="Tab Name"
          v-model="tabNameAccounts"
        />
        <button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`accountsTab`, tabNameAccounts)"
        >
          Change
        </button>
      </div>
      <div class="col">
        <span class="d-block mt-3">Categories</span>
        <input
          class="form-control mt-3"
          type="text"
          placeholder="Tab Name"
          v-model="tabNameCategories"
        />
        <button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`categoriesTab`, tabNameCategories)"
        >
          Change
        </button>
      </div>
      <div class="col">
        <span class="d-block mt-3">Products</span>
        <input
          class="form-control mt-3"
          type="text"
          placeholder="Tab Name"
          v-model="tabNameProducts"
        />
        <button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`productsTab`, tabNameProducts)"
        >
          Change
        </button>
      </div>
      <div class="col">
        <span class="d-block mt-3">Quotes</span>
        <input
          class="form-control mt-3"
          type="text"
          placeholder="Tab Name"
          v-model="tabNameQuotes"
        />
        <button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`quotesTab`, tabNameQuotes)"
        >
          Change
        </button>
      </div>
      <div class="col">
        <span class="d-block mt-3">Orders</span>
        <input
          class="form-control mt-3"
          type="text"
          placeholder="Tab Name"
          v-model="tabNameOrders"
        />
        <button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`ordersTab`, tabNameOrders)"
        >
          Change
        </button>
      </div>
      <div class="col">
        <span class="d-block mt-3">Resourses</span>
        <input
          class="form-control mt-3"
          type="text"
          placeholder="Tab Name"
          v-model="tabNameResourses"
        />
        <button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`resoursesTab`, tabNameResourses)"
        >
          Change
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tabNameAccounts: ``,
      tabNameCategories: ``,
      tabNameProducts: ``,
      tabNameQuotes: ``,
      tabNameOrders: ``,
      tabNameResourses: ``,
    };
  },
  methods: {
    editTab(arg1, arg2) {
      this.$store
        .dispatch(`MODIFY_RATING`, {
          resourceKey: arg1,
          resourceValue: arg2,
        })
        .then(() => {
          this.$store.dispatch(`GET_RATING`, ``);
          this.scrollToTop();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>