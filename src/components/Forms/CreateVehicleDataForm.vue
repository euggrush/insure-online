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
      <label for="exampleInputEmail3" class="form-label">Trim:</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail3"
        v-model="trim"
        placeholder="Trim..."
        minlength="2"
        maxlength="30"
        required
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail4" class="form-label">Body Type:</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail4"
        v-model="type"
        placeholder="Body Type..."
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
        placeholder="0000"
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
      trim: ``,
      type: ``,
      year: ``,
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
          trim: this.trim,
          type: this.type,
          year: this.year,
          trackingDeviceIsRequired: this.trackingDeviceIsRequired,
          vehicleInsuranceType: this.vehicleInsuranceType,
        })
        .then(this.$store.dispatch(`GET_VEHICLES_DATA`))
        .catch((error) => alert(error))
        .then(() => {
          this.$store.dispatch(`GET_VEHICLES_DATA`);
        });
    },
  },
};
</script>

<style>
</style>