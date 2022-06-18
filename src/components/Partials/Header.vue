<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top py-1" id="mainNav">
    <div class="container-fluid px-4 px-lg-5">
      <button
        class="navbar-brand border-0 bg-transparent"
        @click="getLogoButtonAction"
      >
        <img
          src="../../assets/tuffstuff_logo3.png"
          alt="logo"
          class="rounded-circle"
          width="110"
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
            <a :href="`tel:${CORPORATE_PHONE}`" class="call-us-btn">
              <img
                src="../../assets/img/icon-call-us2.png"
                width="46"
                alt="Call us"
              />
            </a>
          </li>
          <li class="nav-item">
            <a
              :href="`mailto:${CORPORATE_EMAIL}`"
              class="email-us-btn mt-3 mt-lg-0"
            >
              <img
                src="../../assets/img/icon-email-us2.png"
                width="48"
                alt="Email us"
              />
            </a>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link about-us-btn p-0 mt-3 mt-lg-0"
              to="/about-us"
            >
              <img
                src="../../assets/img/icon-about-us.png"
                width="48"
                alt="About us"
              />
            </router-link>
          </li>
          <li
            v-if="
              this.$store.state.status === '' ||
              this.$store.state.status === 'error'
            "
            class="nav-item"
          >
            <router-link class="nav-link reg-btn mt-3 mt-lg-0 p-0" to="/registration">
              <img
                src="../../assets/img/icon-signin.png"
                width="48"
                alt="Sign Up"
              />
            </router-link>
          </li>
          <li
            v-if="
              this.$store.state.status === 'success' && !tokenExpirationTime
            "
            class="nav-item"
          >
            <button
              class="logout-btn btn text-start p-0 mt-3 mt-lg-0"
              type="button"
              @click="logout"
            >
              <img
                src="../../assets/img/icon-lock.png"
                width="48"
                alt="logout"
              />
            </button>
          </li>
          <li v-else class="nav-item">
            <router-link to="/login" class="login-btn mt-3 mt-lg-0">
              <img
                src="../../assets/img/icon-unlock.png"
                width="48"
                alt="login"
              />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {
  CORPORATE_CELLPHONE,
  CORPORATE_PHONE,
  CORPORATE_EMAIL,
} from "../../constants";
export default {
  name: "Header",
  data() {
    return {
      CORPORATE_CELLPHONE,
      CORPORATE_PHONE,
      CORPORATE_EMAIL,
    };
  },
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
}
#mainNav {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  background-color: #fff;
  transition: background-color 0.2s ease;
}
#mainNav .navbar-brand {
  color: #212529;
}
#mainNav .navbar-nav .nav-item .nav-link {
  color: #6c757d;
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
    color: $colorBrick;
    padding: 0 1rem;
  }
  #mainNav .navbar-nav .nav-item .nav-link:hover {
    color: $colorDark;
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
.call-us-btn,
.email-us-btn,
.about-us-btn,
.logout-btn,
.login-btn,
.reg-btn {
  display: block;
  width: 90px;
}
</style>