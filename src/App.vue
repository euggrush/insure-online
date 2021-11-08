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

#app {
  font-family: "Ubuntu", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $color;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
