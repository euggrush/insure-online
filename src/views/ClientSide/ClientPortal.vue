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
  },
  unmounted() {
    this.fixHeader();
  },
  methods: {
    toggleTabs(arg1, arg2, arg3, arg4) {
      this.tabsNavigation.isProfile = arg1;
      this.tabsNavigation.isQuotes = arg2;
      this.tabsNavigation.isOrders = arg3;
      this.tabsNavigation.isVehicles = arg4;
    },

    showProfile() {
      this.toggleTabs(true, false, false, false);
    },
    showQuotes() {
      this.toggleTabs(false, true, false, false);
    },
    showOrders() {
      this.toggleTabs(false, false, true, false);
    },
    showVehicles() {
      this.toggleTabs(false, false, false, true);
    },
  },
};
</script>

<style lang="scss" scoped>
// .container-fluid {
//   padding-top: 150px;
// }
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #fff;
  background-color: $colorDark;
}
.nav-link {
  color: $colorBrick;
}
</style>