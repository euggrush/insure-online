<template>
  <section class="container">
    <h3 class="text-center mt-3">Resourses</h3>

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: showTuffstuffRaring }"
          type="button"
          @click="openTuffstuffRateTab"
        >
          TUFFSTUFF rate
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: showTopmarqRating }"
          type="button"
          @click="openTopmarqRateTab"
        >
          TOPMARQ rate
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: showAccessoriesRating }"
          type="button"
          @click="openAccessoriesRateTab"
        >
          Accessiries rate
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: showVehicleData }"
          type="button"
          @click="openVehicleDataTab"
        >
          Vehicles data
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: showPolicyCreation }"
          type="button"
          @click="openPrivacyTab"
        >
          Privacy policy
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: showTermsAndConditionCreation }"
          type="button"
          @click="openTermsTab"
        >
          Terms & conditions
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: showEditTabs }"
          type="button"
          @click="openEditRateTab"
        >
          Other resourses
        </button>
      </li>
    </ul>

    <button
      type="button"
      class="btn btn-outline-dark m-1"
      @click="showRatingTable = !showRatingTable"
    >
      Show TUFFSTUFF Rating
    </button>
    <Transition>
      <div v-if="showRatingTable">
        <RatingTuffstuff />
      </div>
    </Transition>
    <button
      type="button"
      class="btn btn-outline-dark m-1"
      @click="showTopmarqRating = !showTopmarqRating"
    >
      Show TOPMARQ Rating
    </button>
    <Transition>
      <div v-if="showTopmarqRating" class="mt-3"><RatingTopmarq /></div>
    </Transition>
    <button
      type="button"
      class="btn btn-outline-dark m-1"
      @click="showAccessoriesRating = !showAccessoriesRating"
    >
      Accessiries Rating
    </button>
    <Transition>
      <div v-if="showAccessoriesRating" class="mt-3"><AccessoriesRating /></div>
    </Transition>
    <p class="mt-3 fs-5">Vehicles data</p>
    <button
      type="button"
      class="btn btn-outline-dark m-1"
      @click="showVehicleData = !showVehicleData"
    >
      Vehicles Data
    </button>
    <Transition>
      <VehiclesData v-if="showVehicleData" />
    </Transition>

    <button
      type="button"
      class="btn btn-outline-dark m-1"
      @click="showCreateVehiclesData = !showCreateVehiclesData"
    >
      Add Vehicles Data
    </button>
    <Transition>
      <CreateVehicleDataForm v-if="showCreateVehiclesData" />
    </Transition>

    <p class="fs-5 mt-3">Other resourses</p>
    <button
      type="button"
      class="btn btn-outline-dark m-1"
      @click="showPolicyCreation = !showPolicyCreation"
    >
      Privacy Policy
    </button>
    <Transition>
      <CreatePolicy v-if="showPolicyCreation" class="mt-3" />
    </Transition>

    <button
      type="button"
      class="btn btn-outline-dark m-1"
      @click="showTermsAndConditionCreation = !showTermsAndConditionCreation"
    >
      Terms And Condition
    </button>
    <Transition>
      <CreateTermsAndConditions
        v-if="showTermsAndConditionCreation"
        class="mt-3"
      />
    </Transition>

    <button
      type="button"
      class="btn btn-outline-dark m-1"
      @click="showEditTabs = !showEditTabs"
    >
      Edit Tabs
    </button>
    <Transition>
      <div v-if="showEditTabs"><EditTabs /></div>
    </Transition>
  </section>
</template>

<script>
// import EditRating from "../../../components/Forms/EditForms/EditTuffstuffRating.vue";
import EditTabs from "../../../components/Forms/EditTabs.vue";
import VehiclesData from "../../../components/Partials/VehiclesData.vue";
import CreateVehicleDataForm from "../../../components/Forms/CreateVehicleDataForm.vue";
import CreatePolicy from "../../../components/Forms/CreatePolicy.vue";
import CreateTermsAndConditions from "../../../components/Forms/CreateTermsAndConditions.vue";
import AccessoriesRating from "../../../components/Partials/AccessoriesRating.vue";
import RatingTopmarq from "./RatingTopmarq.vue";
import RatingTuffstuff from "./RatingTuffstuff.vue";
export default {
  components: {
    // EditRating,
    EditTabs,
    VehiclesData,
    CreateVehicleDataForm,
    CreatePolicy,
    CreateTermsAndConditions,
    AccessoriesRating,
    RatingTopmarq,
    RatingTuffstuff,
  },
  data() {
    return {
      showTuffstuffRaring: true,
      showTopmarqRating: false,
      showRatingTable: false,
      showEditTabs: false,
      showVehicleData: false,
      showCreateVehiclesData: false,
      showPolicyCreation: false,
      showTermsAndConditionCreation: false,
      showAccessoriesRating: false,
      resourcesKeysMap: new Map(),
      dataArray: [],
    };
  },
  // watch: {
  //   ratingRawData() {
  //     return this.fillDataArr();
  //   },
  // },
  // computed: {
  //   ratingRawData() {
  //     return this.$store.state.rating.resources;
  //   },
  //   ratingDataList() {
  //     return this.fillDataArr();
  //   },
  // },
  // mounted() {
  //   this.resourcesKeysMap.set(`rating_age25-45_price100000`, {
  //     ageRange: `25 to 45`,
  //     carValueRange: `R0 to R100 000`,
  //   });
  //   this.resourcesKeysMap.set(`rating_age25-45_price100000-350000`, {
  //     ageRange: `25 to 45`,
  //     carValueRange: `R100 001 to R350 000`,
  //   });
  //   this.resourcesKeysMap.set(`rating_age25-45_price350000-700000`, {
  //     ageRange: `25 to 45`,
  //     carValueRange: `R350 001 to R700 000`,
  //   });
  //   this.resourcesKeysMap.set(`rating_age25-45_price700000-1000000`, {
  //     ageRange: `25 to 45`,
  //     carValueRange: `R700 001 to R1 000 000`,
  //   });
  //   this.resourcesKeysMap.set(`rating_age45-85_price100000`, {
  //     ageRange: `46 to 85`,
  //     carValueRange: `R0 to R100 000`,
  //   });
  //   this.resourcesKeysMap.set(`rating_age45-85_price100000-350000`, {
  //     ageRange: `46 to 85`,
  //     carValueRange: `R100 001 to R350 000`,
  //   });
  //   this.resourcesKeysMap.set(`rating_age45-85_price350000-700000`, {
  //     ageRange: `46 to 85`,
  //     carValueRange: `R350 001 to R700 000`,
  //   });
  //   this.resourcesKeysMap.set(`rating_age45-85_price700000-1000000`, {
  //     ageRange: `46 to 85`,
  //     carValueRange: `R700 001 to R1 000 000`,
  //   });
  //   this.fetchAllData();
  // },
  methods: {
    toggleResoursesTabs(arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
      this.showTuffstuffRaring = arg1;
      this.showTopmarqRating = arg2;
      this.showAccessoriesRating = arg3;
      this.showVehicleData = arg4;
      this.showPolicyCreation = arg5;
      this.showTermsAndConditionCreation = arg6;
      this.showEditTabs = arg7;
    },
    openTuffstuffRateTab() {
      this.toggleResoursesTabs(true, false, false, false, false, false, false);
    },
    openTopmarqRateTab() {
      this.toggleResoursesTabs(false, true, false, false, false, false, false);
    },
    openAccessoriesRateTab() {
      this.toggleResoursesTabs(false, false, true, false, false, false, false);
    },
    openVehicleDataTab() {
      this.toggleResoursesTabs(false, false, false, true, false, false, false);
    },
    openPrivacyTab() {
      this.toggleResoursesTabs(false, false, false, false, true, false, false);
    },
    openTermsTab() {
      this.toggleResoursesTabs(false, false, false, false, false, true, false);
    },
    openEditRateTab() {
      this.toggleResoursesTabs(false, false, false, false, false, false, true);
    },
    // closeRatingForm() {
    //   this.showTuffstuffRaring = false;
    // },
    // fetchAllData() {
    //   this.dataArray = [];
    //   this.$nextTick(() => {
    //     this.$store.dispatch(`GET_RATING`, ``);
    //   });
    // },
    // fillDataArr() {
    //   this.dataArray = [];

    //   if (this.$store.state.rating.resources) {
    //     this.$store.state.rating.resources.map((item) => {
    //       if (this.resourcesKeysMap.get(item.resourceKey)) {
    //         this.dataArray.push({
    //           key: item.resourceKey,
    //           value: item.resourceValue,
    //           data: this.resourcesKeysMap.get(item.resourceKey),
    //         });
    //       }
    //     });
    //   }
    //   return this.dataArray;
    // },
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