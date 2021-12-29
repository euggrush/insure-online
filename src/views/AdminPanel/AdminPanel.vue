<template>
  <section class="admin-panel container-fluid pt-1 pb-5">
    <div class="d-flex justify-content-between align-items-center mt-1 p-3">
      <h1 class="text-center text-white fw-bold">Admin Panel</h1>
      <span class="text-white fs-3">
        <span>{{ this.$store.state.user.firstName || loggedUser }}</span>
        <span>&nbsp;{{ this.$store.state.user.lastName || loggedUser }}</span>
      </span>
    </div>

    <nav class="nav nav-pills nav-justified mt-5">
      <button
        class="nav-link fs-5 fw-bold"
        :class="{ active: isAccounts }"
        aria-current="page"
        @click="showAccounts"
      >
        Accounts
      </button>
      <button
        class="nav-link fs-5 fw-bold"
        :class="{ active: isCategories }"
        @click="showCategories"
      >
        Categories
      </button>
      <button
        class="nav-link fs-5 fw-bold"
        :class="{ active: isProducts }"
        @click="showProducts"
      >
        Products
      </button>
      <button
        class="nav-link fs-5 fw-bold"
        :class="{ active: isSubProducts }"
        @click="showSubProducts"
      >
        Coverages
      </button>
      <button
        class="nav-link fs-5 fw-bold"
        :class="{ active: isOrders }"
        @click="showOrders"
      >
        Orders
      </button>
    </nav>

    <section class="mt-1">
      <AccountsList v-if="isAccounts" />
      <CategoriesList v-if="isCategories" />
      <ProductsList v-if="isProducts" />
      <SubProducts v-if="isSubProducts" />
      <EstimationsList v-if="isEstimations" />
      <OrdersList v-if="isOrders" />
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
export default {
  name: `AdminPanel`,
  components: {
    AccountsList,
    CategoriesList,
    ProductsList,
    SubProducts,
    EstimationsList,
    OrdersList,
  },
  data() {
    return {
      isAccounts: true,
      isCategories: false,
      isProducts: false,
      isSubProducts: false,
      isEstimations: false,
      isOrders: false,
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
    },
    showCategories() {
      this.isAccounts = false;
      this.isCategories = true;
      this.isProducts = false;
      this.isSubProducts = false;
      this.isEstimations = false;
      this.isOrders = false;
    },
    showProducts() {
      this.isAccounts = false;
      this.isCategories = false;
      this.isProducts = true;
      this.isSubProducts = false;
      this.isEstimations = false;
      this.isOrders = false;
    },
    showSubProducts() {
      this.isAccounts = false;
      this.isCategories = false;
      this.isProducts = false;
      this.isSubProducts = true;
      this.isEstimations = false;
      this.isOrders = false;
    },
    showEstimations() {
      this.isAccounts = false;
      this.isCategories = false;
      this.isProducts = false;
      this.isSubProducts = false;
      this.isEstimations = true;
      this.isOrders = false;
    },
    showOrders() {
      this.isAccounts = false;
      this.isCategories = false;
      this.isProducts = false;
      this.isSubProducts = false;
      this.isEstimations = false;
      this.isOrders = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-panel {
  background-color: $bgOrange;
  background-image: url($mainBg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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