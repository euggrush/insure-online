<template>
  <form class="input-group" @submit.prevent="searchEstimation">
    <input
      type="text"
      class="form-control"
      placeholder="Quote reference #"
      aria-describedby="button-addon2"
      v-model="referenceNumber"
    />
    <button class="btn btn-outline-secondary" type="submit" id="button-addon2">
      Search
    </button>
    <button
      class="btn btn-outline-secondary"
      type="button"
      @click="getAllEstimations"
    >
      All Quotes
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      referenceNumber: ``,
    };
  },

  methods: {
    searchEstimation() {
      this.$store
        .dispatch(`GET_ESTIMATIONS`, `?referenceNumber=${this.referenceNumber}`)
        .then(() => {
          this.referenceNumber = ``;
        });
    },
    getAllEstimations() {
      this.$store.dispatch(`GET_ESTIMATIONS`, ``).then(() => {
        this.referenceNumber = ``;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>