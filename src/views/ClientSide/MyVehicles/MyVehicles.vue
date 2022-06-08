<template>
  <section class="my-vehicles position-relative">
    <ModalMessage />
    <button
      class="btn btn-dark mt-1"
      type="button"
      @click="showAddCar = !showAddCar"
    >
      <span class="text-capitalize">Add vehicle</span>
    </button>

    <!-- CREATE VEHICLE FORN -->

    <Transition>
      <CreateVehicleForm
        @closeForm="closeCreateCarForm"
        class="mt-3"
        v-if="showAddCar"
        :myProps="{ accountId: accountId }"
      />
    </Transition>
    <!-- CREATE VEHICLE FORN END -->
    <MyVehiclesList />
  </section>
</template>

<script>
import CreateVehicleForm from "../../../components/Forms/CreateVehicleForm.vue";
import ModalMessage from "../../../components/Modals/ModalMessage.vue";
import MyVehiclesList from "./MyVehiclesList.vue";
export default {
  components: {
    CreateVehicleForm,
    ModalMessage,
    MyVehiclesList,
  },
  data() {
    return {
      showAddCar: false,
      accountId: ``,
    };
  },
  mounted() {
    this.accountId = this.$store.state.user.accountId;
  },
  methods: {
    closeCreateCarForm() {
      this.showAddCar = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>