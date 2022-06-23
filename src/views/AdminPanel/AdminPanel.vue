<template>
  <section class="admin-panel container-fluid pb-5">
    <div
      class="d-flex justify-content-between mt-3 ps-5 pe-5 pb-3 border-bottom noPrint"
    >
      <h2 class="text-white fw-bold mt-1">Admin Panel</h2>
      <span class="text-white">
        <span>{{ this.$store.state.user.firstName || loggedUser }}</span>
        <span>&nbsp;{{ this.$store.state.user.lastName || loggedUser }}</span>
      </span>
    </div>

    <nav class="nav nav-pills nav-justified mt-5 ps-5 pe-5 noPrint">
      <!-- <button
        class="nav-link rounded-pill"
        :class="{ active: isAccounts }"
        aria-current="page"
        @click="showAccounts"
      >
        {{ tabs.accountsTab ?? `Accounts` }}
      </button>
      <button
        class="nav-link rounded-pill"
        :class="{ active: isCategories }"
        @click="showCategories"
      >
        {{ tabs.categoriesTab ?? `Categories` }}
      </button> -->
      <button
        class="nav-link rounded-pill"
        :class="{ active: isProducts }"
        @click="showProducts"
      >
        {{ tabs.productsTab ?? `Products` }}
      </button>
      <button
        class="nav-link rounded-pill"
        :class="{ active: isEstimations }"
        @click="showEstimations"
      >
        {{ tabs.quotesTab ?? `Quotes` }}
      </button>
      <button
        class="nav-link rounded-pill"
        :class="{ active: isOrders }"
        @click="showOrders"
      >
        {{ tabs.ordersTab ?? `Orders` }}
      </button>
      <button
        class="nav-link rounded-pill"
        :class="{ active: isResources }"
        @click="showResources"
      >
        {{ tabs.resoursesTab ?? `Resources` }}
      </button>
    </nav>

    <section class="mt-1">
      <!-- <AccountsList v-if="isAccounts" /> -->
      <!-- <CategoriesList v-if="isCategories" /> -->
      <ProductsList v-if="isProducts" />
      <SubProducts v-if="isSubProducts" />
      <EstimationsList v-if="isEstimations" />
      <Orders v-if="isOrders" />
      <Resources v-if="isResources" />
    </section>
  </section>
</template>

<script>
// import AccountsList from "../AdminPanel/AccountsList.vue";
// import CategoriesList from "../AdminPanel/CategoriesList.vue";
import ProductsList from "./Products/ProductsList.vue";
import SubProducts from "../AdminPanel/SubProductsList.vue";
import EstimationsList from "./Estimations/EstimationsList.vue";
import Orders from "../AdminPanel/Orders/Orders.vue";
import Resources from "./Resourses/Resources.vue";
export default {
  name: `AdminPanel`,
  components: {
    // AccountsList,
    // CategoriesList,
    ProductsList,
    SubProducts,
    EstimationsList,
    Orders,
    Resources,
  },
  data() {
    return {
      tabs: {},
      // isAccounts: true,
      // isCategories: false,
      isProducts: false,
      isSubProducts: false,
      isEstimations: false,
      isOrders: true,
      isResources: false,
      loggedUser: `John Doe`,
    };
  },
  watch: {
    getTabs() {
      this.fillTabs();
    },
  },
  computed: {
    getTabs() {
      return this.$store.state.rating.resources;
    },
  },
  mounted() {
    this.unfixHeader();

    this.fetchTabs();
    this.$nextTick(() => {
      this.fillTabs();
    });
  },
  unmounted() {
    this.fixHeader();
  },
  methods: {
    fetchTabs() {
      this.$store.dispatch(`GET_RATING`, ``);
    },
    fillTabs() {
      if (this.$store.state.rating.resources) {
        this.$store.state.rating.resources.map((item) => {
          if (
            item.resourceKey === `accountsTab` ||
            item.resourceKey === `categoriesTab` ||
            item.resourceKey === `productsTab` ||
            item.resourceKey === `quotesTab` ||
            item.resourceKey === `ordersTab` ||
            item.resourceKey === `resoursesTab`
          ) {
            this.tabs[item.resourceKey] = item.resourceValue;
          }
        });
      }
      return this.tabs;
    },
    // showAccounts() {
    //   this.isAccounts = true;
    //   this.isCategories = false;
    //   this.isProducts = false;
    //   this.isSubProducts = false;
    //   this.isEstimations = false;
    //   this.isOrders = false;
    //   this.isResources = false;
    // },
    // showCategories() {
    //   this.isAccounts = false;
    //   this.isCategories = true;
    //   this.isProducts = false;
    //   this.isSubProducts = false;
    //   this.isEstimations = false;
    //   this.isOrders = false;
    //   this.isResources = false;
    // },
    showProducts() {
      // this.isAccounts = false;
      // this.isCategories = false;
      this.isProducts = true;
      this.isSubProducts = false;
      this.isEstimations = false;
      this.isOrders = false;
      this.isResources = false;
    },
    showSubProducts() {
      // this.isAccounts = false;
      // this.isCategories = false;
      this.isProducts = false;
      this.isSubProducts = true;
      this.isEstimations = false;
      this.isOrders = false;
      this.isResources = false;
    },
    showEstimations() {
      // this.isAccounts = false;
      // this.isCategories = false;
      this.isProducts = false;
      this.isSubProducts = false;
      this.isEstimations = true;
      this.isOrders = false;
      this.isResources = false;
    },
    showOrders() {
      // this.isAccounts = false;
      // this.isCategories = false;
      this.isProducts = false;
      this.isSubProducts = false;
      this.isEstimations = false;
      this.isOrders = true;
      this.isResources = false;
    },
    showResources() {
      // this.isAccounts = false;
      // this.isCategories = false;
      this.isProducts = false;
      this.isSubProducts = false;
      this.isEstimations = false;
      this.isOrders = false;
      this.isResources = true;
    },
  },
};
</script>

<style lang="scss" scoped>
// .admin-panel {
//   min-height: calc(100vh - 6.2em);
//   padding-top: 7em;
// }
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: $colorDark;
}
.nav-link {
  color: $colorBrick;
}
@media print {
  .noPrint {
    display: none;
  }
}
</style>