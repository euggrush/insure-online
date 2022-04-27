<template>
  <form
    class="bg-dark bg-gradient shadow-lg text-white p-3 rounded mt-3"
    @submit.prevent="createVehiclesData"
  >
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Make:</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        v-model="make"
        placeholder="Make..."
        minlength="2"
        maxlength="30"
        required
      />
    </div>

    <div class="mb-3">
      <label for="exampleInputEmail2" class="form-label">Model:</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail2"
        v-model="model"
        placeholder="Model..."
        minlength="2"
        maxlength="30"
        required
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail5" class="form-label">Year:</label>
      <input
        type="number"
        class="form-control"
        id="exampleInputEmail5"
        v-model="year"
        placeholder="YEAR"
        minlength="2"
        maxlength="30"
        required
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail6" class="form-label">Type:</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail6"
        v-model="type"
        placeholder="Type..."
        minlength="2"
        maxlength="30"
        required
      />
    </div>
    <p>Is tracking Device Required</p>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefault1"
        value="1"
        v-model="trackingDeviceIsRequired"
      />
      <label class="form-check-label" for="flexRadioDefault1"> Yes </label>
    </div>
    <div class="form-check mb-3">
      <input
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefault2"
        value="0"
        v-model="trackingDeviceIsRequired"
        checked
      />
      <label class="form-check-label" for="flexRadioDefault2"> No </label>
    </div>
    <select
      class="form-select mb-3"
      aria-label="Default select example"
      v-model="vehicleInsuranceType"
      required
    >
      <option selected disabled value="">Insurance Type</option>
      <option value="Tuffstuff">Tuffstuff</option>
      <option value="Topmarq">Topmarq</option>
    </select>
    <button type="submit" class="btn btn-outline-warning">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      make: ``,
      model: ``,
      year: ``,
      type: ``,
      trackingDeviceIsRequired: false,
      vehicleInsuranceType: ``,
    };
  },
  methods: {
    createVehiclesData() {
      this.$store
        .dispatch(`CREATE_VEHICLES_DATA`, {
          make: this.make,
          model: this.model,
          year: this.year,
          type: this.type,
          trackingDeviceIsRequired: this.trackingDeviceIsRequired,
          vehicleInsuranceType: this.vehicleInsuranceType,
        })
        .then(() => {
          this.$store.dispatch(`GET_VEHICLES_DATA`, ``);
          this.make = ``;
          this.model = ``;
          this.year = ``;
          this.type = ``;
          this.trackingDeviceIsRequired = false;
          this.vehicleInsuranceType = ``;
        })
        .catch((error) => alert(error))
        .then(() => {
          this.$store.dispatch(`GET_VEHICLES_DATA`, ``);
        });
    },
  },
};
</script>

<style>
</style>