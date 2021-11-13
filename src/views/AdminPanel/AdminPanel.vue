<template>
  <section class="container">
    <h2 class="text-center mt-5">Admin Panel</h2>
    <nav class="nav nav-pills nav-justified mt-5">
      <button
        class="nav-link"
        :class="{ active: isAccounts }"
        aria-current="page"
        @click="showAccounts"
      >
        Accounts
      </button>
      <button
        class="nav-link"
        :class="{ active: isCategories }"
        @click="showCategories"
      >
        Categories
      </button>
      <button
        class="nav-link"
        :class="{ active: isProducts }"
        @click="showProducts"
      >
        Products
      </button>
      <button
        class="nav-link"
        :class="{ active: isSubProducts }"
        @click="showSubProducts"
      >
        Products options
      </button>
      <button
        class="nav-link"
        :class="{ active: isEstimations }"
        @click="showEstimations"
      >
        Estimations
      </button>
      <button
        class="nav-link"
        :class="{ active: isOrders }"
        @click="showOrders"
      >
        Orders
      </button>
    </nav>

    <section class="border mt-5">
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
</style>