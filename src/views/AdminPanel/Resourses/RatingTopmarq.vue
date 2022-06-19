<template>
  <section class="container p-3 border">
    <div class="mb-3" v-for="(item, index) in topmarqRatingArray" :key="index">
      <span>{{ item.resourceKey }}</span
      ><span>&nbsp;</span>
      <span>{{ item.resourceValue * 100 }}%</span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      topmarqRatingArray: [],
      // topmarqResourceKeys: [
      //   `topmarq_rating_age25-45_price500000`,
      //   `topmarq_rating_age25-45_price500000-1000000`,
      //   `topmarq_rating_age45-85_price500000`,
      //   `topmarq_rating_age45-85_price500000-1000000`,
      // ],
      topmarqResourceMap: new Map(),
    };
  },
  computed: {
    topmarqRateDataList() {
      return this.topmarqResourceMap;
    },
  },
  mounted() {
    this.fetchTopmarqRate();
    this.fillResoursesMap();
  },
  methods: {
    fillResoursesMap() {
      this.topmarqResourceMap.set(`topmarq_rating_age25-45_price500000`, {
        ageRange: `25 to 45`,
        carValueRange: `R0 to R500 000`,
        rate: 0,
      });
      this.topmarqResourceMap.set(
        `topmarq_rating_age25-45_price500000-1000000`,
        {
          ageRange: `25 to 45`,
          carValueRange: `R500 000 to R1 000 000`,
          rate: 0,
        }
      );
      this.topmarqResourceMap.set(`topmarq_rating_age45-85_price500000`, {
        ageRange: `45 to 85`,
        carValueRange: `R0 to R500 000`,
        rate: 0,
      });
      this.topmarqResourceMap.set(
        `topmarq_rating_age45-85_price500000-1000000`,
        {
          ageRange: `45 to 85`,
          carValueRange: `R500 000 to R1 000 000`,
          rate: 0,
        }
      );
    },
    fetchTopmarqRate() {
      // this.topmarqRatingArray = [];

      // this.topmarqResourceKeys.map((item) => {
      //   this.$store.dispatch(`GET_RATING`, `?resourceKey=${item}`).then(() => {
      //     setTimeout(() => {
      //       this.topmarqRatingArray.push(this.$store.state.rating.resources[0]);
      //     }, 100);
      //   });
      // });

      this.$store.dispatch(`GET_RATING`, ``).then(() => {
        setTimeout(() => {
          this.$store.state.rating.resources.map((item) => {
            let rateValue;
            if (this.topmarqResourceMap.get(item.resourceKey)) {
              rateValue = this.topmarqResourceMap.get(item.resourceKey);
              rateValue.rate = item.resourceValue;
              console.log(rateValue);
            }
          });
        }, 1000);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>