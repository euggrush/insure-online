<template>
  <form @submit.prevent="createVehicle">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Make and model:</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        v-model="vehicleInfo.details"
        placeholder="Make And Model"
        minlength="5"
        maxlength="30"
        required
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail2" class="form-label">Year:</label>
      <input
        type="number"
        class="form-control"
        id="exampleInputEmail2"
        v-model="vehicleInfo.year"
        placeholder="Year"
        required
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label"
        >Registration license plate:</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleInputPassword1"
        v-model="vehicleInfo.regNumber"
        minlength="2"
        maxlength="10"
        placeholder="Registration License Plate"
        required
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword2" class="form-label">VIN:</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputPassword2"
        v-model="vehicleInfo.vin"
        minlength="17"
        maxlength="17"
        placeholder="VIN"
        required
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword3" class="form-label">Engine size:</label>
      <input
        type="number"
        class="form-control"
        id="exampleInputPassword3"
        v-model="vehicleInfo.engine"
        step="0.1"
        placeholder="Engine Size"
        required
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword4" class="form-label"
        >Retail value:</label
      >
      <input
        type="number"
        class="form-control"
        id="exampleInputPassword4"
        v-model="vehicleInfo.retailValue"
        placeholder="Retail Value"
        required
      />
    </div>
    <div class="form-floating mt-3 mb-5">
      <textarea
        class="form-control"
        placeholder="Accessories"
        id="floatingTextarea"
        v-model="vehicleInfo.accessories"
      ></textarea>
      <label for="floatingTextarea">Accessories:</label>
    </div>
    <div class="mb-3">
      <span>Tracking device:</span>
      <label class="ms-3">
        <input
          type="radio"
          name="tracking"
          value="Yes"
          v-model="vehicleInfo.trackingDevice"
          required
        />
        Yes
      </label>
      <label class="ms-3">
        <input
          type="radio"
          name="tracking"
          value="No"
          v-model="vehicleInfo.trackingDevice"
        />
        No
      </label>
    </div>
    <div class="mb-3">
      <span>Use:</span>
      <label class="ms-3">
        <input
          type="radio"
          name="use"
          value="Private"
          v-model="vehicleInfo.useCase"
          required
        />
        Private
      </label>
      <label class="ms-3">
        <input
          type="radio"
          name="use"
          value="Business"
          v-model="vehicleInfo.useCase"
        />
        Business
      </label>
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      accountId: ``,
      vehicleInfo: {
        accountId: ``,
        details: ``,
        year: ``,
        regNumber: ``,
        vin: ``,
        engine: ``,
        retailValue: ``,
        trackingDevice: ``,
        useCase: ``,
        accessories: ``,
      },
    };
  },
  props: {
    myProps: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.$store.dispatch(`GET_VEHICLES`, ``);
  },
  methods: {
    createVehicle() {
      this.accountId = this.myProps.accountId;
      this.vehicleInfo.accountId = this.myProps.accountId;
      this.$store
        .dispatch(`CREATE_VEHICLE`, this.vehicleInfo)
        .then(
          this.$store.dispatch(`GET_VEHICLES`, ``),
          this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`),
          (this.vehicleInfo = {})
        )
        .catch((error) => alert(error))
        .then(() => {
          this.$store.dispatch(`GET_VEHICLES`, ``);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>