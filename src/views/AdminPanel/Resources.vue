<template>
  <section class="container">
    <div>
      {{ dataArray }}
    </div>
    <h3 class="mt-3">Rating:</h3>
    <button type="button" class="btn btn-dark mt-1" @click="show = !show">
      Change Rating
    </button>
    <Transition>
      <div class="bg-light mt-3 p-3" v-if="show">
        <EditRating :myProps="dataArray" />
      </div>
    </Transition>
    <table class="table table-dark table-striped caption-top table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">Annual Rate</th>
          <th scope="col">Age</th>
          <th scope="col">Vehicle Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in ratingDataList" :key="item.value">
          <th scope="row">{{ (item.value * 100).toFixed(2) }}%</th>
          <td>{{ item.data.ageRange }}</td>
          <td>{{ item.data.carValueRange }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import EditRating from "../../components/Forms/EditRating.vue";
export default {
  components: {
    EditRating,
  },
  data() {
    return {
      show: false,
      resourcesKeysMap: new Map(),
      dataArray: [],
    };
  },
  watch: {
    ratingRawData() {
      return this.fillDataArr();
    },
  },
  computed: {
    ratingRawData() {
      return this.$store.state.rating.resources;
    },
    ratingDataList() {
      return this.fillDataArr();
      // return this.dataArray;
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
    this.fetchAllData();
  },
  methods: {
    // updateDataArray() {
    //   this.getAllData();
    // },
    fetchAllData() {
      this.dataArray = [];
      this.$nextTick(() => {
        this.$store.dispatch(`GET_RATING`, ``);
      });
    },
    fillDataArr() {
      this.dataArray = [];

      if (this.$store.state.rating.resources) {
        this.$store.state.rating.resources.map((item) => {
          this.dataArray.push({
            key: item.resourceKey,
            value: item.resourceValue,
            data: this.resourcesKeysMap.get(item.resourceKey),
          });
        });
      }
      return this.dataArray;
    },
    getAllData() {
      this.dataArray = [];
      this.$nextTick(() => {
        this.$store.dispatch(`GET_RATING`, ``).then(() => {
          if (this.$store.state.rating.resources) {
            this.$store.state.rating.resources.map((item) => {
              this.dataArray.push({
                key: item.resourceKey,
                value: item.resourceValue,
                data: this.resourcesKeysMap.get(item.resourceKey),
              });
            });
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
th {
  cursor: pointer;
}
.btn {
  min-width: 12em;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>