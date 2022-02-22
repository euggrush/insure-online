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
          @click="editTab(`accountsTab`, `Accounts`)"
        >
          Change
        </button>
      </div>
      <div class="col">
        <span class="d-block mt-3">Categories</span
        ><button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`categoriesTab`, `Categories`)"
        >
          Change
        </button>
      </div>
      <div class="col">
        <span class="d-block mt-3">Products</span
        ><button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`productsTab`, `Products`)"
        >
          Change
        </button>
      </div>
      <div class="col">
        <span class="d-block mt-3">Quotes</span
        ><button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`quotesTab`, `Quotes`)"
        >
          Change
        </button>
      </div>
      <div class="col">
        <span class="d-block mt-3">Orders</span
        ><button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`ordersTab`, `Orders`)"
        >
          Change
        </button>
      </div>
      <div class="col">
        <span class="d-block mt-3">Resourses</span
        ><button
          type="button"
          class="btn btn-outline-warning mt-3"
          @click="editTab(`resoursesTab`, `Resourses`)"
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
  computed: {
    tabsList() {
      return this.$store.state.rating.resources;
    },
  },
  // mounted() {
  //   this.$store.dispatch(`GET_RATING`, ``);
  // },
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