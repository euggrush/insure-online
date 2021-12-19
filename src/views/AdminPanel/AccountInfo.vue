<template>
  <section class="container p-3">
    <h3>Account Details:</h3>
    <span class="fw-bold text-decoration-underline">Client ID: </span>
    <span>&nbsp;{{ accountInfo.clientIdNumber }}</span> <br />
    <span class="fw-bold text-decoration-underline">Account username: </span>
    <span>&nbsp;{{ accountInfo.username }}</span> <br />
    <span class="fw-bold text-decoration-underline">First: </span>
    <span>&nbsp;{{ accountInfo.firstName }}</span> <br />
    <span class="fw-bold text-decoration-underline">Last: </span>
    <span>&nbsp;{{ accountInfo.lastName }}</span> <br />
    <span class="fw-bold text-decoration-underline">Date of birth: </span>
    <span>&nbsp;{{ accountInfo.age }}</span> <br />
    <span class="fw-bold text-decoration-underline">Address: </span>
    <span>&nbsp;{{ accountInfo.address }}</span> <br />
    <span class="fw-bold text-decoration-underline">Email: </span>
    <span>&nbsp;{{ accountInfo.email }}</span> <br />
    <span class="fw-bold text-decoration-underline">Cellphone: </span>
    <span>&nbsp;{{ accountInfo.cellphone }}</span> <br />
    <span class="fw-bold text-decoration-underline">Home phone: </span>
    <span>&nbsp;{{ accountInfo.phoneNumber }}</span> <br />
    <span class="fw-bold text-decoration-underline">Marital Status: </span>
    <span>&nbsp;{{ accountInfo.maritalStatus }}</span> <br />
    <span class="fw-bold text-decoration-underline"
      >Country Of Residence:
    </span>
    <span>&nbsp;{{ accountInfo.countryOfResidence }}</span> <br />
    <span class="fw-bold text-decoration-underline">Previous Insurer: </span>
    <span>&nbsp;{{ accountInfo.previousInsurer }}</span> <br />
    <span class="fw-bold text-decoration-underline"
      >Year of issue driver license:
    </span>
    <span>&nbsp;{{ accountInfo.yearOfIssueDriverLicense }}</span> <br />
    <span class="fw-bold text-decoration-underline"
      >Overnight parking vehicle:
    </span>
    <span>&nbsp;{{ accountInfo.overnightParkingVehicle }}</span> <br />
    <span class="fw-bold text-decoration-underline">Claims history: </span>
    <span>&nbsp;{{ accountInfo.claimsHistory }}</span> <br />
    <span class="fw-bold text-decoration-underline">Rating: </span>
    <span>&nbsp;{{ accountInfo.rating }}</span>
    <h4 class="mt-3">Vehicles information:</h4>
    <p>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseWidthExample"
        aria-expanded="false"
        aria-controls="collapseWidthExample"
      >
        <span>Add new vehicle</span>
      </button>
    </p>
    <!-- CREATE VEHICLE FORN -->
    <div>
      <div class="collapse collapse-horizontal" id="collapseWidthExample">
        <div class="card card-body" style="width: 300px">
          <form @submit.prevent="createVehicle">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Make and model:</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                v-model="vehicleInfo.details"
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
                v-model="vehicleInfo.reg_number"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">VIN:</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                v-model="vehicleInfo.vin"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Engine size:</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                v-model="vehicleInfo.engine"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Retail value:</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                v-model="vehicleInfo.retail_value"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Tracking device:</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                v-model="vehicleInfo.tracking_device"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Use case:</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                v-model="vehicleInfo.use_case"
              />
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
    <!-- CREATE VEHICLE FORN END -->
    <ul
      v-for="(vehicle, index) in accountInfo.vehicles"
      :key="index"
      class="list-group mt-3"
    >
      <li class="list-group-item">
        <span class="fw-bold text-decoration-underline"
          >Vehicle make and model:</span
        >
        <span>&nbsp;{{ vehicle.details }}</span> <br />
        <span class="fw-bold text-decoration-underline"
          >Vehicle license plate nunber:</span
        >
        <span>&nbsp;{{ vehicle.regNumber }}</span> <br />
        <span class="fw-bold text-decoration-underline">Vehicle VIN:</span>
        <span>&nbsp;{{ vehicle.vin }}</span> <br />
        <span class="fw-bold text-decoration-underline">Vehicle engine:</span>
        <span>&nbsp;{{ vehicle.engine }}</span> <br />
        <span class="fw-bold text-decoration-underline"
          >Vehicle retail value:</span
        >
        <span>&nbsp;{{ vehicle.retailValue }}</span> <br />
        <span class="fw-bold text-decoration-underline">Tracking device:</span>
        <span>&nbsp;{{ vehicle.trackingDevice }}</span> <br />
        <span class="fw-bold text-decoration-underline">Use case:</span>
        <span>&nbsp;{{ vehicle.useCase }}</span> <br />
        <button type="button" class="btn btn-secondary mt-3 me-3">
          Edit vehicle
        </button>
        <button type="button" class="btn btn-danger mt-3">Remove vehicle</button>

      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      vehicleInfo: {
        userId: this.accountId,
        details: ``,
        reg_number: ``,
        vin: ``,
        engine: ``,
        retail_value: ``,
        tracking_device: ``,
        use_case: ``,
      },
    };
  },
  props: {
    accountId: {
      type: String,
      default: ``,
    },
  },
  computed: {
    accountInfo() {
      return this.$store.state.users_array.accounts[0];
    },
  },
  mounted() {
    this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`);
  },
  methods: {
    createVehicle() {
      this.$store
        .dispatch(`CREATE_VEHICLE`, this.vehicleInfo)
        .then(
          this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`),
          this.vehicleInfo = ``
        )
        .catch((error) => alert(error));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>