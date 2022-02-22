<template>
  <section class="container mt-3">
    <div class="row bg-dark text-white ps-3 pe-3 pb-3 rounded">
      <div class="col">
        <span class="d-block mt-3">Accounts</span>
        <input
          class="form-control mt-3"
          type="text"
          placeholder="Tab Name"
          v-model="tabName"
        />
        <button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`accountsTab`, tabName)"
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
          v-model="tabName"
        />
        <button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`categoriesTab`, tabName)"
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
          v-model="tabName"
        />
        <button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`productsTab`, tabName)"
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
          v-model="tabName"
        />
        <button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`quotesTab`, tabName)"
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
          v-model="tabName"
        />
        <button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`ordersTab`, tabName)"
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
          v-model="tabName"
        />
        <button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`resoursesTab`, tabName)"
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
      tabName: ``,
    };
  },
  methods: {
    editTab(arg1, arg2) {
      this.$store.dispatch(`MODIFY_RATING`, {
        resourceKey: arg1,
        resourceValue: arg2,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>