<template>
  <section class="container categories-list-wrapper">
    <h3>Categories:</h3>
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

    <!-- ADD NEW CATEGORY -->
    <div>
      <button
        class="btn btn-primary mt-5"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample1"
        aria-expanded="false"
        aria-controls="collapseExample1"
      >
        Add new category
      </button>
    </div>

    <div class="collapse" id="collapseExample1">
      <div class="card card-body mt-3">
        <form class="mt-1" @submit.prevent="addCategory">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Category name</label
            >
            <input type="text" class="form-control" v-model="categoryName" />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>

    <!-- CHANGE CATEGORY -->
    <div>
      <button
        class="btn btn-primary mt-5"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample2"
        aria-expanded="false"
        aria-controls="collapseExample2"
      >
        Change category
      </button>
    </div>

    <div class="collapse" id="collapseExample2">
      <div class="card card-body mt-3">
        <form class="mt-1" @submit.prevent="changeCategory">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Old category name</label
            >
            <input
              type="text"
              class="form-control"
              v-model="pickedCategoryInfo.categoryName"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >New category name</label
            >
            <input type="text" class="form-control" v-model="categoryNewName" />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isBtnDisabled"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      categoryName: ``,
      pickedCategoryIndex: ``,
      pickedCategoryInfo: [],
      pickedCategoryId: ``,
      categoryNewName: ``,
      isBtnDisabled: true,
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
    addCategory() {
      this.$store
        .dispatch(`CREATE_PRODUCT_CATEGORY`, {
          categoryName: this.categoryName,
        })
        .then(() => {
          this.$store.dispatch(`GET_PRODUCT_CATEGORIES`);
        });
    },
    changeCategory() {
      this.$store
        .dispatch(`CREATE_PRODUCT_CATEGORY`, {
          categoryId: this.pickedCategoryInfo.categoryId,
          categoryName: this.categoryNewName,
        })
        .then(() => {
          this.$store.dispatch(`GET_PRODUCT_CATEGORIES`);
          this.isBtnDisabled = true;
          this.categoryNewName = ``;
          this.pickedCategoryInfo = [];
          this.pickedCategoryIndex = ``;
        });
    },
    pickCategory(category, index) {
      this.pickedCategoryIndex = index;
      this.pickedCategoryInfo = category;
      this.isBtnDisabled = false;
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
}
.categories-list-wrapper {
  outline: solid 4px purple;
}
</style>