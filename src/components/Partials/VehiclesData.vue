<template>
  <section class="container mt-3">
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th class="text-capitalize" scope="col">make</th>
          <th class="text-capitalize" scope="col">model</th>
          <th class="text-capitalize" scope="col">year</th>
          <th class="text-capitalize" scope="col">vehicle type</th>
          <th class="text-capitalize" scope="col">Tracking Device Required</th>
          <th class="text-capitalize" scope="col">Insurance Type</th>
          <th class="text-capitalize" scope="col">X</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in vehiclesDataList" :key="vehicle.vehicleDataId">
          <td class="text-uppercase">{{ vehicle.make }}</td>
          <td class="text-uppercase">{{ vehicle.model }}</td>
          <td class="text-uppercase">{{ vehicle.year }}</td>
          <td class="text-uppercase">{{ vehicle.type }}</td>
          <td class="text-uppercase">
            <span v-if="vehicle.trackingDeviceIsRequired">Yes</span>
            <span v-else>No</span>
          </td>
          <td class="text-uppercase">{{ vehicle.vehicleInsuranceType }}</td>
          <td class="text-uppercase">
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
