<template>
  <section class="container mt-3">
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">make</th>
          <th scope="col">model</th>
          <th scope="col">trim</th>
          <th scope="col">type</th>
          <th scope="col">year</th>
          <th scope="col">Tracking Device Required</th>
          <th scope="col">Insurance Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in vehiclesDataList" :key="vehicle.vehicleDataId">
          <td>{{ vehicle.make }}</td>
          <td>{{ vehicle.model }}</td>
          <td>{{ vehicle.trim }}</td>
          <td>{{ vehicle.type }}</td>
          <td>{{ vehicle.year }}</td>
          <td>{{ vehicle.trackingDeviceIsRequired }}</td>
          <td>{{ vehicle.vehicleInsuranceType }}</td>
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
    this.$store.dispatch(`GET_VEHICLES_DATA`);
  },
};
</script>

<style scoped lang="scss">
</style>
