<template>
  <section class="container">
    <h3 class="text-center mt-3">Resourses</h3>

    <ul class="nav nav-tabs mb-3">
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
      <!-- <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: showEditTabs }"
          type="button"
          @click="openEditRateTab"
        >
          Other resourses
        </button>
      </li> -->
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: showInsurancePolicy }"
          type="button"
          @click="openInsurancePolicyTab"
        >
          Insurance policy
        </button>
      </li>
    </ul>

    <Transition>
      <RatingTuffstuff v-if="showTuffstuffRaring" />
    </Transition>

    <Transition>
      <RatingTopmarq v-if="showTopmarqRating" />
    </Transition>

    <Transition>
      <AccessoriesRating v-if="showAccessoriesRating" />
    </Transition>

    <Transition>
      <VehiclesData v-if="showVehicleData" />
    </Transition>

    <Transition>
      <CreatePolicy v-if="showPolicyCreation" />
    </Transition>

    <Transition>
      <CreateTermsAndConditions v-if="showTermsAndConditionCreation" />
    </Transition>

    <!-- <Transition>
      <EditTabs v-if="showEditTabs" />
    </Transition> -->
    <Transition>
      <CreateOrderPolicy v-if="showInsurancePolicy" />
    </Transition>
    <!-- <Transition>
      <CreateVehicleDataForm v-if="showCreateVehiclesData" />
    </Transition> -->
  </section>
</template>

<script>
// import EditRating from "../../../components/Forms/EditForms/EditTuffstuffRating.vue";
// import EditTabs from "../../../components/Forms/EditForms/EditTabs.vue";
import VehiclesData from "../../../components/Partials/VehiclesData.vue";
// import CreateVehicleDataForm from "../../../components/Forms/CreateVehicleDataForm.vue";
import CreatePolicy from "../../../components/Forms/CreatePolicy.vue";
import CreateTermsAndConditions from "../../../components/Forms/CreateTermsAndConditions.vue";
import AccessoriesRating from "../../../components/Partials/AccessoriesRating.vue";
import RatingTopmarq from "./RatingTopmarq.vue";
import RatingTuffstuff from "./RatingTuffstuff.vue";
import CreateOrderPolicy from "../../../components/Forms/CreateForm/CreateOrderPolicy.vue";
export default {
  components: {
    // EditRating,
    // EditTabs,
    VehiclesData,
    // CreateVehicleDataForm,
    CreatePolicy,
    CreateTermsAndConditions,
    AccessoriesRating,
    RatingTopmarq,
    RatingTuffstuff,
    CreateOrderPolicy,
  },
  data() {
    return {
      showTuffstuffRaring: true,
      showTopmarqRating: false,
      // showRatingTable: false,
      showEditTabs: false,
      showVehicleData: false,
      showCreateVehiclesData: false,
      showPolicyCreation: false,
      showTermsAndConditionCreation: false,
      showAccessoriesRating: false,
      resourcesKeysMap: new Map(),
      dataArray: [],
      showInsurancePolicy: false,
    };
  },

  methods: {
    toggleResoursesTabs(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
      this.showTuffstuffRaring = arg1;
      this.showTopmarqRating = arg2;
      this.showAccessoriesRating = arg3;
      this.showVehicleData = arg4;
      this.showPolicyCreation = arg5;
      this.showTermsAndConditionCreation = arg6;
      this.showEditTabs = arg7;
      this.showInsurancePolicy = arg8;
    },
    openTuffstuffRateTab() {
      this.toggleResoursesTabs(
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      );
    },
    openTopmarqRateTab() {
      this.toggleResoursesTabs(
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false
      );
    },
    openAccessoriesRateTab() {
      this.toggleResoursesTabs(
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false
      );
    },
    openVehicleDataTab() {
      this.toggleResoursesTabs(
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        false
      );
    },
    openPrivacyTab() {
      this.toggleResoursesTabs(
        false,
        false,
        false,
        false,
        true,
        false,
        false,
        false
      );
    },
    openTermsTab() {
      this.toggleResoursesTabs(
        false,
        false,
        false,
        false,
        false,
        true,
        false,
        false
      );
    },
    openEditRateTab() {
      this.toggleResoursesTabs(
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        false
      );
    },
    openInsurancePolicyTab() {
      this.toggleResoursesTabs(
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true
      );
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