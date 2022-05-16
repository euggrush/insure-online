<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
    <div class="container-fluid px-4 px-lg-5">
      <button
        class="navbar-brand border-0 bg-transparent"
        @click="getLogoButtonAction"
      >
        <img
          src="../../assets/tuffstuff_logo3.png"
          alt="logo"
          class="rounded-circle"
          width="130"
        />
      </button>
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ms-auto my-2 my-lg-0 align-items-center">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">About</router-link>
          </li>
          <li
            v-if="
              this.$store.state.status === '' ||
              this.$store.state.status === 'error'
            "
            class="nav-item"
          >
            <router-link class="nav-link" to="/registration"
              >Sign Up</router-link
            >
          </li>
          <li
            v-if="
              this.$store.state.status === 'success' && !tokenExpirationTime
            "
            class="nav-item"
          >
            <button
              class="logout-btn btn btn-outline-warning rounded-pill"
              type="button"
              @click="logout"
            >
              Logout
            </button>
          </li>
          <li v-else class="nav-item">
            <router-link
              to="/login"
              class="btn btn-outline-danger login-btn rounded-pill"
              >Login</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  computed: {
    tokenExpirationTime() {
      return this.isTokenExpired(this.$store.state.toke_expiration_time);
    },
  },
  mounted() {
    this.shrinkNavbar();
  },
  methods: {
    getLogoButtonAction() {
      if (this.$store.state.status === ``) {
        this.$router.push(`/`);
      } else {
        this.$store.dispatch("LOGOUT").then(() => {
          this.$router.push("/");
        });
      }
    },
    logout() {
      this.$store
        .dispatch("LOGOUT")
        .then(() => this.$router.push("/login"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  min-height: 4em;
}
.btn {
  min-width: 8em;
  font-weight: bold;
}
.login-btn,
.logout-btn {
  min-width: 10em;
  @include media-breakpoint-up(lg) {
    margin: 0 2em 0 4em;
  }
}
.logout-btn {
  background-image: url("../../assets/img/exit.svg");
  background-size: 27px 27px;
  background-repeat: no-repeat;
  background-position: 95% center;
}
#mainNav {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  background-color: #fff;
  transition: background-color 0.2s ease;
}
#mainNav .navbar-brand {
  font-weight: 700;
  color: #212529;
}
#mainNav .navbar-nav .nav-item .nav-link {
  color: #6c757d;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.75rem 0;
}
@media (min-width: 992px) {
  #mainNav {
    box-shadow: none;
    background-color: transparent;
  }
  #mainNav .navbar-brand {
    color: rgba(255, 255, 255, 0.7);
  }
  #mainNav .navbar-brand:hover {
    color: #fff;
  }
  #mainNav .navbar-nav .nav-item .nav-link {
    color: rgba(255, 255, 255, 0.7);
    padding: 0 1rem;
  }
  #mainNav .navbar-nav .nav-item .nav-link:hover {
    color: #fff;
  }
  #mainNav .navbar-nav .nav-item:last-child .nav-link {
    padding-right: 0;
  }
  #mainNav.navbar-shrink {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    background-color: $colorBlack;
  }
  #mainNav.navbar-shrink .navbar-brand {
    color: #212529;
  }
}
</style>