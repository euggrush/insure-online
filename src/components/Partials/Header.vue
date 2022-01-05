<template>
  <nav
    class="navbar navbar-expand-lg navbar-light container-fluid fw-bold shadow"
  >
    <router-link class="navbar-brand" to="/"
      ><img
        src="../../assets/tuffstuff_logo.png"
        alt="logo"
        class="rounded-circle"
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
      <ul class="navbar-nav ms-auto">
        <li
          v-if="
            this.$store.state.status === '' ||
            this.$store.state.status === 'error'
          "
          class="nav-item me-5"
        >
          <router-link class="nav-link" to="/">Home</router-link>
        </li>

        <li
          v-if="
            this.$store.state.status === '' ||
            this.$store.state.status === 'error'
          "
          class="nav-item me-5"
        >
          <router-link class="nav-link" to="/">About</router-link>
        </li>
        <li
          v-if="
            this.$store.state.status === '' ||
            this.$store.state.status === 'error'
          "
          class="nav-item me-5"
        >
          <router-link class="nav-link" to="/">Insurance</router-link>
        </li>
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
          class="nav-item ms-5"
        >
          <router-link to="/login" class="btn btn-warning rounded-pill"
            >Login</router-link
          >
        </li>
        <!-- <li
          v-if="
            this.$store.state.status === '' ||
            this.$store.state.status === 'error'
          "
          class="nav-item"
        >
          <router-link class="nav-link" to="/signup">Registration</router-link>
        </li> -->
        <li v-if="this.$store.state.status === 'success'" class="nav-item">
          <button
            class="logout-btn btn btn-warning rounded-pill"
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
    outline: solid 4px orangered;

}
.btn {
  min-width: 8em;
  font-weight: bold;
}
.logout-btn {
  background-image: url("../../assets/img/exit.svg");
  background-size: 27px 27px;
  background-repeat: no-repeat;
  background-position: right center;
}
</style>