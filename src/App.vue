<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Header from "./components/Partials/Header.vue";
import Footer from "./components/Partials/Footer.vue";
export default {
  name: "Home",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
body {
  background-color: $bgLight;
}
#app {
  min-height: 100vh;
  font-family: "Ubuntu", sans-serif;
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
</style>
