<template>
  <nav
    class="
      navbar navbar-expand-lg navbar-light
      container-fluid
      fs-5
      fw-bold
    "
  >
    <router-link class="navbar-brand" to="/"
      ><img src="../../assets/logo.png" width="50" height="50" alt="logo"
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
      <ul class="navbar-nav">
        <li v-if="this.$store.state.status === '' || this.$store.state.status === 'error'" class="nav-item active">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li v-if="this.$store.state.status === '' || this.$store.state.status === 'error'" class="nav-item">
          <router-link class="nav-link" to="/signup">Registration</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/our-products"
            >Our Products</router-link
          >
        </li>
        <li v-if="this.$store.state.status === 'success'" class="nav-item">
          <button
            class="nav-link border-0 bg-transparent fs-5 fw-bold"
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
  height: 4em;
  opacity: 0.8;
}
</style>