<template>
  <section class="container p-3 border">
    <div class="mb-3" v-for="[key, value] in topmarqResourceMap" :key="key">
      <span class="fw-bold">Age&nbsp;</span>
      <span> {{ value.ageRange }};</span>
      <span class="fw-bold">&nbsp;Vehicle value&nbsp;</span>
      <span> {{ value.carValueRange }};</span>
      <span class="fw-bold">&nbsp;Rate&nbsp; %</span>
      <span>{{ value.rate * 100 }};</span>
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