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
html {
  min-height: 100vh;
}
body {
  min-height: 100vh;
  background-color: $bgLight;
}
#app {
  font-family: "Ubuntu", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $colorDark;
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
.btn-primary {
  background-color: $mainBlue;
  border: none;
}
</style>
