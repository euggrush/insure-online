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
        <tr v-for="(item, index) in ratingDataList" :key="index">
          <th scope="row">{{ (item.value * 100).toFixed(2) }}%</th>
          <td>{{ item.data.ageRange }}</td>
          <td>{{ item.data.carValueRange }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      resourcesKeysMap: new Map(),
      dataArray: [],
    };
  },
  computed: {
    ratingDataList() {
      return this.dataArray;
    },
  },
  mounted() {
    this.resourcesKeysMap.set(`rating_age25-45_price100000`, {
      ageRange: `25 to 45`,
      carValueRange: `R0 to R100 000`,
    });
    this.resourcesKeysMap.set(`rating_age25-45_price100000-350000`, {
      ageRange: `25 to 45`,
      carValueRange: `R100 001 to R350 000`,
    });
    this.resourcesKeysMap.set(`rating_age25-45_price350000-700000`, {
      ageRange: `25 to 45`,
      carValueRange: `R350 001 to R700 000`,
    });
    this.resourcesKeysMap.set(`rating_age25-45_price700000-1000000`, {
      ageRange: `25 to 45`,
      carValueRange: `R700 001 to R1 000 000`,
    });
    this.resourcesKeysMap.set(`rating_age45-85_price100000`, {
      ageRange: `46 to 85`,
      carValueRange: `R0 to R100 000`,
    });
    this.resourcesKeysMap.set(`rating_age45-85_price100000-350000`, {
      ageRange: `46 to 85`,
      carValueRange: `R100 001 to R350 000`,
    });
    this.resourcesKeysMap.set(`rating_age45-85_price350000-700000`, {
      ageRange: `46 to 85`,
      carValueRange: `R350 001 to R700 000`,
    });
    this.resourcesKeysMap.set(`rating_age45-85_price700000-1000000`, {
      ageRange: `46 to 85`,
      carValueRange: `R700 001 to R1 000 000`,
    });

    this.$store.dispatch(`GET_RATING`, ``).then(() => {
      setTimeout(() => {
        if (this.$store.state.rating.resources) {
          this.$store.state.rating.resources.map((item) => {
            this.dataArray.push({
              key: item.resourceKey,
              value: item.resourceValue,
              data: this.resourcesKeysMap.get(item.resourceKey),
            });
          });
        }
      }, 100);
    });
  },
};
</script>

<style lang="scss" scoped>
th {
  cursor: pointer;
}
</style>