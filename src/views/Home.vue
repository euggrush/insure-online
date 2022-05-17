<template>
  <body id="page-top">
    <Masthead />
    <About />
    <Services />
    <Contact />
    <Portfolio />
  </body>
</template>

<script>
import Contact from "../components/Partials/Contact.vue";
import Portfolio from "../components/Partials/Portfolio.vue";
import Masthead from "../components/Partials/Masthead.vue";
import About from "../components/Partials/About.vue";
import Services from "../components/Partials/Services.vue";
export default {
  components: { Contact, Portfolio, Masthead, About, Services },
};
</script>

<style lang="scss">
</style>
