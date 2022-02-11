<template>
  <section class="admin-panel container-fluid pt-1 pb-5">
    <div
      class="d-flex justify-content-between mt-3 ps-5 pe-5 pb-3 border-bottom"
    >
      <h2 class="text-white fw-bold mt-1">Admin Panel</h2>
      <span class="text-white">
        <span>{{ this.$store.state.user.firstName || loggedUser }}</span>
        <span>&nbsp;{{ this.$store.state.user.lastName || loggedUser }}</span>
      </span>
    </div>

    <nav class="nav nav-pills nav-justified mt-5 ps-5 pe-5">
      <button
        class="nav-link fw-bold"
        :class="{ active: isAccounts }"
        aria-current="page"
        @click="showAccounts"
      >
        Accounts
      </button>
      <button
        class="nav-link fw-bold"
        :class="{ active: isCategories }"
        @click="showCategories"
      >
        Categories
      </button>
      <button
        class="nav-link fw-bold"
        :class="{ active: isProducts }"
        @click="showProducts"
      >
        Products
      </button>
      <button
        class="nav-link fw-bold"
        :class="{ active: isEstimations }"
        @click="showEstimations"
      >
        Quotes
      </button>
      <button
        class="nav-link fw-bold"
        :class="{ active: isOrders }"
        @click="showOrders"
      >
        Orders
      </button>
      <button
        class="nav-link fw-bold"
        :class="{ active: isResources }"
        @click="showResources"
      >
        Resources
      </button>
    </nav>

    <section class="mt-1">
      <AccountsList v-if="isAccounts" />
      <CategoriesList v-if="isCategories" />
      <ProductsList v-if="isProducts" />
      <SubProducts v-if="isSubProducts" />
      <EstimationsList v-if="isEstimations" />
      <OrdersList v-if="isOrders" />
      <Resources v-if="isResources" />
    </section>
  </section>
</template>

<script>
import AccountsList from "../AdminPanel/AccountsList.vue";
import CategoriesList from "../AdminPanel/CategoriesList.vue";
import ProductsList from "../AdminPanel/ProductsList.vue";
import SubProducts from "../AdminPanel/SubProductsList.vue";
import EstimationsList from "../AdminPanel/EstimationsList.vue";
import OrdersList from "../AdminPanel/OrdersList.vue";
import Resources from "../AdminPanel/Resources.vue";
export default {
  name: `AdminPanel`,
  components: {
    AccountsList,
    CategoriesList,
    ProductsList,
    SubProducts,
    EstimationsList,
    OrdersList,
    Resources,
  },
  data() {
    return {
      isAccounts: true,
      isCategories: false,
      isProducts: false,
      isSubProducts: false,
      isEstimations: false,
      isOrders: false,
      isResources: false,
      loggedUser: `John Doe`,
    };
  },
  methods: {
    showAccounts() {
      this.isAccounts = true;
      this.isCategories = false;
      this.isProducts = false;
      this.isSubProducts = false;
      this.isEstimations = false;
      this.isOrders = false;
      this.isResources = false;
    },
    showCategories() {
      this.isAccounts = false;
      this.isCategories = true;
      this.isProducts = false;
      this.isSubProducts = false;
      this.isEstimations = false;
      this.isOrders = false;
      this.isResources = false;
    },
    showProducts() {
      this.isAccounts = false;
      this.isCategories = false;
      this.isProducts = true;
      this.isSubProducts = false;
      this.isEstimations = false;
      this.isOrders = false;
      this.isResources = false;
    },
    showSubProducts() {
      this.isAccounts = false;
      this.isCategories = false;
      this.isProducts = false;
      this.isSubProducts = true;
      this.isEstimations = false;
      this.isOrders = false;
      this.isResources = false;
    },
    showEstimations() {
      this.isAccounts = false;
      this.isCategories = false;
      this.isProducts = false;
      this.isSubProducts = false;
      this.isEstimations = true;
      this.isOrders = false;
      this.isResources = false;
    },
    showOrders() {
      this.isAccounts = false;
      this.isCategories = false;
      this.isProducts = false;
      this.isSubProducts = false;
      this.isEstimations = false;
      this.isOrders = true;
      this.isResources = false;
    },
    showResources() {
      this.isAccounts = false;
      this.isCategories = false;
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
.admin-panel {
  min-height: calc(100vh - 6.2em);
  background-color: $bgOrange;
  background-image: url($mainBg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.nav-link {
  color: $colorWhite;
}
.nav-link.active {
  color: $colorWhite;
  background-color: $colorDark;
  border-radius: 50px;
}
</style>