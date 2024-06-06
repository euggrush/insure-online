<template>
  <section class="container p-3 border">
    <div class="mb-3" v-for="[key, value] in topmarqResourceMap" :key="key">
      <span class="fw-bold">Age&nbsp;</span>
      <span> {{ value.ageRange }};</span>
      <span class="fw-bold">&nbsp;Vehicle value&nbsp;</span>
      <span> {{ value.carValueRange }};</span>
      <span class="fw-bold">&nbsp;Rate&nbsp; %</span>
      <span>{{ (value.rate * 100).toFixed(2) }};</span>
    </div>
    <hr />
    <p class="fs-5">Change TOPMARQ rate</p>
    <EditRating class="mt-3" :myProps="{ ratingData: topmarqResourceMap }" />
  </section>
</template>

<script>
import EditRating from "../../../components/Forms/EditForms/EditRating.vue";
export default {
  components: { EditRating },
  data() {
    return {
      topmarqRatingArray: [],
      topmarqResourceMap: new Map(),
    };
  },
  watch: {
    isChangesNeeded() {
      this.fetchTopmarqRate();
      this.fillResoursesMap();
    },
  },
  computed: {
    isChangesNeeded() {
      return this.$store.state.is_changes_needed;
    },
  },
  mounted() {
    this.fetchTopmarqRate();
    this.fillResoursesMap();
  },
  methods: {
    fillResoursesMap() {
      // 25 to 45
      this.topmarqResourceMap.set(`rating_age25-45_price100000`, {
        ageRange: `25 to 45`,
        carValueRange: `R0 to R100 000`,
        rate: 0,
      });
      this.topmarqResourceMap.set(`rating_age25-45_price100000-350000`, {
        ageRange: `25 to 45`,
        carValueRange: `R100 000 to R350 000`,
        rate: 0,
      });
      this.topmarqResourceMap.set(`rating_age25-45_price350000-700000`, {
        ageRange: `25 to 45`,
        carValueRange: `R350 000 to R700 000`,
        rate: 0,
      });
      this.topmarqResourceMap.set(`rating_age25-45_price700000-1000000`, {
        ageRange: `25 to 45`,
        carValueRange: `R700 000 to R1 000 000`,
        rate: 0,
      });
      // 45 to 85
      this.topmarqResourceMap.set(`rating_age45-85_price100000`, {
        ageRange: `45 to 85`,
        carValueRange: `R0 to R100 000`,
        rate: 0,
      });
      this.topmarqResourceMap.set(`rating_age45-85_price100000-350000`, {
        ageRange: `45 to 85`,
        carValueRange: `R100 000 to R350 000`,
        rate: 0,
      });
      this.topmarqResourceMap.set(`rating_age45-85_price350000-700000`, {
        ageRange: `45 to 85`,
        carValueRange: `R350 000 to R700 000`,
        rate: 0,
      });
      this.topmarqResourceMap.set(`rating_age45-85_price700000-1000000`, {
        ageRange: `45 to 85`,
        carValueRange: `R700 000 to R1 000 000`,
        rate: 0,
      });
    },
    fetchTopmarqRate() {
      this.$store.dispatch(`GET_RATING`, ``).then(() => {
        setTimeout(() => {
          this.$store.state.rating.resources.map((item) => {
            if (this.topmarqResourceMap.get(item.resourceKey)) {
              this.topmarqResourceMap.get(item.resourceKey).rate =
                item.resourceValue;
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