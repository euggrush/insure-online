<template>
  <section class="container-fluid">
    <nav class="nav nav-pills flex-column flex-sm-row mt-3">
      <button
        class="flex-sm-fill text-sm-center nav-link rounded-pill"
        :class="{ active: tabsNavigation.isProfile }"
        type="button"
        @click="showProfile"
      >
        Profile
      </button>
      <button
        class="flex-sm-fill text-sm-center nav-link rounded-pill"
        :class="{ active: tabsNavigation.isQuotes }"
        type="button"
        @click="showQuotes"
      >
        Quotes
      </button>
      <button
        class="flex-sm-fill text-sm-center nav-link rounded-pill"
        :class="{ active: tabsNavigation.isOrders }"
        type="button"
        @click="showOrders"
      >
        Orders
      </button>
      <button
        class="flex-sm-fill text-sm-center nav-link rounded-pill"
        :class="{ active: tabsNavigation.isVehicles }"
        type="button"
        @click="showVehicles"
      >
        Vehicles
      </button>
    </nav>
    <hr />
    <MyAccount v-if="tabsNavigation.isProfile" />
    <MyQuotes v-if="tabsNavigation.isQuotes" />
    <MyOrders v-if="tabsNavigation.isOrders" />
    <MyVehicles v-if="tabsNavigation.isVehicles" />
  </section>
</template>

<script>
import MyAccount from "./MyAccount/MyAccount.vue";
import MyQuotes from "./MyQuotes/MyQuotes.vue";
import MyOrders from "./MyOrders/MyOrders.vue";
import MyVehicles from "./MyVehicles/MyVehicles.vue";

export default {
  components: { MyAccount, MyQuotes, MyVehicles, MyOrders },
  data() {
    return {
      tabsNavigation: {
        isProfile: true,
        isQuotes: false,
        isOrders: false,
        isVehicles: false,
      },
    };
  },
  mounted() {
    this.unfixHeader();
    this.fetchTabsValue();
  },
  unmounted() {
    this.fixHeader();
  },
  methods: {
    saveTabValue(arg1, arg2, arg3, arg4) {
      sessionStorage.setItem("isProfile", arg1);
      sessionStorage.setItem("isQuotes", arg2);
      sessionStorage.setItem("isOrders", arg3);
      sessionStorage.setItem("isVehicles", arg4);
    },
    fetchTabsValue() {
      this.tabsNavigation.isProfile =
        JSON.parse(sessionStorage.getItem("isProfile")) ?? true;
      this.tabsNavigation.isQuotes = JSON.parse(
        sessionStorage.getItem("isQuotes")
      );
      this.tabsNavigation.isOrders = JSON.parse(
        sessionStorage.getItem("isOrders")
      );
      this.tabsNavigation.isVehicles = JSON.parse(
        sessionStorage.getItem("isVehicles")
      );
    },
    showProfile() {
      this.saveTabValue(true, false, false, false);
      this.fetchTabsValue();
    },
    showQuotes() {
      this.saveTabValue(false, true, false, false);
      this.fetchTabsValue();
    },
    showOrders() {
      this.saveTabValue(false, false, true, false);
      this.fetchTabsValue();
    },
    showVehicles() {
      this.saveTabValue(false, false, false, true);
      this.fetchTabsValue();
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: $colorDark;
}
.nav-link {
  color: $colorBrick;
}
</style>