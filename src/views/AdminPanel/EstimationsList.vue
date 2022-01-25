<template>
  <section class="container estimations-list-wrapper mt-3">
    <h3>Quotes:</h3>
    <ul class="list-group mt-3">
      <li
        v-for="(estimation, index) in estimationsList"
        :key="index"
        class="list-group-item shadow-lg"
      >
        {{ estimation.totalCost }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  computed: {
    estimationsList() {
      return this.$store.state.estimations.estimations;
    },
  },

  mounted() {
    this.$store.dispatch(`GET_ESTIMATIONS`, ``);
  },
};
</script>

<style lang="scss" scoped>
.estimations-list-wrapper {
  // outline: solid 4px green;
}
</style>