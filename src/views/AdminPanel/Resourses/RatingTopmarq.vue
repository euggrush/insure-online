<template>
  <section class="container p-3 border">
    <div class="mb-3" v-for="(item, index) in topmarqRatingArray" :key="index">
      <span>{{ item.resourceKey }}</span
      ><span>&nbsp;</span>
      <span>{{ item.resourceValue*100 }}%</span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      topmarqRatingArray: [],
      topmarqResourceKeys: [
        `topmarq_rating_age25-45_price500000`,
        `topmarq_rating_age25-45_price500000-1000000`,
        `topmarq_rating_age45-85_price500000`,
        `topmarq_rating_age45-85_price500000-1000000`,
      ],
    };
  },
  mounted() {
    this.fetchTopmarqRate();
  },
  methods: {
    fetchTopmarqRate() {
      this.topmarqRatingArray = [];
      this.topmarqResourceKeys.map((item) => {
        this.$store.dispatch(`GET_RATING`, `?resourceKey=${item}`).then(() => {
          setTimeout(() => {
            this.topmarqRatingArray.push(this.$store.state.rating.resources[0]);
          }, 100);
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>