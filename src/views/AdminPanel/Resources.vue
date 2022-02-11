<template>
  <section class="container-fluid">
    <table class="table table-dark table-striped caption-top table-hover">
      <caption class="fw-bold">
        Rating
      </caption>

      <thead>
        <tr>
          <th scope="col">Annual Rate</th>
          <th scope="col">Age</th>
          <th scope="col">Vehicle Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1.99%</th>
          <td>25 to 45</td>
          <td><strong>R</strong>0 to <strong>R</strong>100 000</td>
        </tr>
        <tr>
          <th scope="row">1.95%</th>
          <td>25 to 45</td>
          <td><strong>R</strong>100 001 to <strong>R</strong>350 000</td>
        </tr>
        <tr>
          <th scope="row">1.71%</th>
          <td>25 to 45</td>
          <td><strong>R</strong>350 001 to <strong>R</strong>700 000</td>
        </tr>
        <tr>
          <th scope="row">1.65%</th>
          <td>25 to 45</td>
          <td><strong>R</strong>700 001 to <strong>R</strong>1 000 000</td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <th scope="row">1.40%</th>
          <td>46 to 85</td>
          <td><strong>R</strong>0 to <strong>R</strong>100 000</td>
        </tr>
        <tr>
          <th scope="row">1.36%</th>
          <td>46 to 85</td>
          <td><strong>R</strong>100 001 to <strong>R</strong>350 000</td>
        </tr>
        <tr>
          <th scope="row">1.20%</th>
          <td>46 to 85</td>
          <td><strong>R</strong>350 001 to <strong>R</strong>700 000</td>
        </tr>
        <tr>
          <th scope="row">1.15%</th>
          <td>46 to 85</td>
          <td><strong>R</strong>700 001 to <strong>R</strong>1 000 000</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      resourcesKeysAndData: [],
      resourcesKeysArray: [
        `rating_age25-45_price100000`,
        `rating_age25-45_price100000-350000`,
        `rating_age25-45_price350000-700000`,
        `rating_age25-45_price700000-1000000`,
        `rating_age45-85_price100000`,
        `rating_age45-85_price100000-350000`,
        `rating_age45-85_price350000-700000`,
        `rating_age45-85_price700000-1000000`,
      ],
      resourcesObject: {},
    };
  },
  computed: {
    ratingList() {
      return this.$store.state.rating.resources;
    },
  },
  mounted() {
    this.resourcesKeysAndData = new Map();
    this.$store.dispatch(`GET_RATING`, ``).then(() => {
      setTimeout(() => {
        if (this.$store.state.rating.resources) {
          this.$store.state.rating.resources.map((item) => {
            this.resourcesObject[item.resourceKey] = item.resourceValue;
            this.resourcesKeysAndData.set(item.resourceKey, item.resourceValue);
          });
        }
        console.log(this.resourcesKeysAndData);
      }, 1000);
    });
  },
};
</script>

<style lang="scss" scoped>
th {
  cursor: pointer;
}
</style>