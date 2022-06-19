<template>
  <table class="table table-dark mb-0">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Rate, %</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Accessories</th>
        <td>{{ fetchedAccessoriesRateValue * 100 }}%</td>
      </tr>
    </tbody>
  </table>

  <form class="p-3 bg-dark" @submit.prevent="changeAccessoriesRating">
    <label for="exampleFormControlInput1" class="form-label text-white"
      >Change Rate</label
    >
    <div class="input-group mt-1">
      <input
        type="number"
        class="form-control"
        :placeholder="fetchedAccessoriesRateValue*100"
        aria-label="rate"
        aria-describedby="button-addon2"
        id="exampleFormControlInput1"
        v-model="accessoriesRateValue"
      />
      <button
        class="btn btn-outline-secondary"
        type="submit"
        id="button-addon2"
      >
        Change
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      accessoriesRateValue: 0,
      fetchedAccessoriesRateValue: 0,
      ratingAccessory: `rating_accessory`,
    };
  },
  mounted() {
    this.fetchAndFillRatingData();
  },
  methods: {
    fetchAndFillRatingData() {
      this.$store.dispatch(`GET_RATING`, ``).then(() => {
        setTimeout(() => {
          if (this.$store.state.rating.resources) {
            this.$store.state.rating.resources.map((item) => {
              if (item.resourceKey == this.ratingAccessory) {
                this.fetchedAccessoriesRateValue = item.resourceValue;
              }
            });
          }
        }, 1000);
      });
    },
    changeAccessoriesRating() {
      this.$store
        .dispatch(`MODIFY_RATING`, {
          resourceKey: this.ratingAccessory,
          resourceValue: this.accessoriesRateValue / 100,
        })
        .then(() => {
          this.accessoriesRateValue = 0;
          this.fetchAndFillRatingData();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>