<template>
  <nav class="navbar navbar-expand-lg navbar-light container-fluid fw-bold shadow">
    <router-link class="navbar-brand" to="/"
      ><img src="../../assets/tuffstuff_logo.png" alt="logo" class="rounded-circle"
    /></router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav w-100">
        <!-- <li
          v-if="
            this.$store.state.status === '' ||
            this.$store.state.status === 'error'
          "
          class="nav-item"
        >
          <router-link class="nav-link text-white" to="/our-products"
            >Our Products</router-link
          >
        </li> -->
        <li
          v-if="
            this.$store.state.status === '' ||
            this.$store.state.status === 'error'
          "
          class="nav-item active"
        >
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li
          v-if="
            this.$store.state.status === '' ||
            this.$store.state.status === 'error'
          "
          class="nav-item"
        >
          <router-link class="nav-link" to="/signup">Registration</router-link>
        </li>
        <li
          v-if="this.$store.state.status === 'success'"
          class="nav-item logout-btn"
        >
          <button
            class="nav-link border-0 bg-transparent fw-bold"
            type="button"
            @click="logout"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      currentPage: window.location.pathname,
    };
  },
  methods: {
    logout() {
      this.$store
        .dispatch("LOGOUT")
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  min-height: 4em;
  opacity: 0.8;
}
.logout-btn {
  min-width: 6em;
  margin: 0px 0px 0px auto;
  background-image: url("../../assets/img/exit.svg");
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: right center;
}
</style>