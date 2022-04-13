<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Header from "./components/Partials/Header.vue";
import Footer from "./components/Partials/Footer.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
  },
  created() {
    axios.interceptors.response.use(undefined, function (err) {
      // eslint-disable-next-line no-unused-vars
      return new Promise(function (_resolve, _reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(`LOGOUT`);
        }
        throw err;
      });
    });
  },
};
</script>

<style lang="scss">
body {
  background-color: $bgLight;
}
#app {
  min-height: 100vh;
  font-family: "Neometric Alt", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $colorDark;
  font-size: $font-size-mobile;
  @include media-breakpoint-up(sm) {
    font-size: $font-size-small;
  }
  @include media-breakpoint-up(md) {
    font-size: $font-size-medium;
  }
  @include media-breakpoint-up(lg) {
    font-size: $font-size-medium;
  }
  @include media-breakpoint-up(xl) {
    font-size: $font-size-large;
  }
  @include media-breakpoint-up(xxl) {
    font-size: $font-size-xxl;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $colorDark;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.btn-info {
  color: $colorWhite;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: $font-size-mobile;
  @include media-breakpoint-up(sm) {
    font-size: $font-size-small;
  }
  @include media-breakpoint-up(md) {
    font-size: $font-size-medium;
  }
  @include media-breakpoint-up(lg) {
    font-size: $font-size-medium;
  }
  @include media-breakpoint-up(xl) {
    font-size: $font-size-large;
  }
  @include media-breakpoint-up(xxl) {
    font-size: $font-size-xxl;
  }
}

.gradient {
  display: inline-block;
  position: relative;
  line-height: 0;
}
.gradient:after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  background-image: linear-gradient(to bottom, transparent, #fcfcfc);
  opacity: 0.8;
}
.btn {
  border-radius: 50rem;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
