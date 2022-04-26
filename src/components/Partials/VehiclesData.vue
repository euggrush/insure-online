<template>
  <section class="container mt-3">
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">make</th>
          <th scope="col">model</th>
          <th scope="col">year</th>
          <th scope="col">Tracking Device Required</th>
          <th scope="col">Insurance Type</th>
          <th scope="col">X</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in vehiclesDataList" :key="vehicle.vehicleDataId">
          <td>{{ vehicle.make }}</td>
          <td>{{ vehicle.model }}</td>
          <td>{{ vehicle.year }}</td>
          <td>
            <span v-if="vehicle.trackingDeviceIsRequired">Yes</span>
            <span v-else>No</span>
          </td>
          <td>{{ vehicle.vehicleInsuranceType }}</td>
          <td>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="removeVehiclesData(vehicle.vehicleDataId)"
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  computed: {
    vehiclesDataList() {
      return this.$store.state.vehicles_data.vehiclesData;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_VEHICLES_DATA`, ``);
  },
  methods: {
    removeVehiclesData(id) {
      this.$store
        .dispatch(`CREATE_VEHICLES_DATA`, {
          vehicleDataId: id,
          deleted: true,
        })
        .then(() => {
          this.$store.dispatch(`GET_VEHICLES_DATA`, ``);
        });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
