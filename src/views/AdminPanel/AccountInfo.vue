<template>
  <section class="container">
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
        <span>Add vehicle</span>
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
                v-model="vehicleInfo.regNumber"
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
                v-model="vehicleInfo.retailValue"
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
                v-model="vehicleInfo.trackingDevice"
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
                v-model="vehicleInfo.useCase"
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
      class="list-group mt-3 position-relative"
    >
      <li class="list-group-item" v-if="vehicle.deleted == false">
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
        <button
          type="button"
          class="btn btn-secondary mt-3 me-3"
          @click="openEditVehicle(vehicle, index)"
        >
          Edit vehicle
        </button>
        <button type="button" class="btn btn-danger mt-3">
          Remove vehicle
        </button>
      </li>
      <!-- EDIT VEHICLE FORM -->
      <form
        class="
          position-absolute
          top-0
          start-0
          w-100
          h-100
          bg-light
          border
          d-flex
          flex-column
          justify-content-between
          align-items-end
          p-3
        "
        v-if="isEdit == vehicle.vehicleId"
        @submit.prevent="editVehicle(vehicle, index)"
      >
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeEdit()"
        ></button>
        <div class="container p-0">
          <div class="row row-cols-auto">
            <label class="col mt-3">
              <span class="fw-bold text-decoration-underline lh-lg">
                Vehicle make and model:
              </span>
              <input
                class="form-control form-control-sm col"
                type="text"
                :placeholder="vehicleInfo.details"
                v-model="vehicleInfo.details"
              />
            </label>
            <label class="col mt-3">
              <span class="fw-bold text-decoration-underline lh-lg">
                Vehicle license plate nunber:
              </span>
              <input
                class="form-control form-control-sm"
                type="text"
                :placeholder="vehicleInfo.regNumber"
                v-model="vehicleInfo.regNumber"
              />
            </label>
            <label class="col mt-3">
              <span class="fw-bold text-decoration-underline lh-lg">
                Vehicle VIN:
              </span>
              <input
                class="form-control form-control-sm"
                type="text"
                :placeholder="vehicleInfo.vin"
                v-model="vehicleInfo.vin"
              />
            </label>
            <label class="col mt-3">
              <span class="fw-bold text-decoration-underline lh-lg">
                Engine size:
              </span>
              <input
                class="form-control form-control-sm"
                type="text"
                :placeholder="vehicleInfo.engine"
                v-model="vehicleInfo.engine"
              />
            </label>
            <label class="col mt-3">
              <span class="fw-bold text-decoration-underline lh-lg">
                Retail value:
              </span>
              <input
                class="form-control form-control-sm"
                type="text"
                :placeholder="vehicleInfo.retailValue"
                v-model="vehicleInfo.retailValue"
              />
            </label>
            <label class="col mt-3">
              <span class="fw-bold text-decoration-underline lh-lg">
                Tracking device:
              </span>
              <input
                class="form-control form-control-sm"
                type="text"
                :placeholder="vehicleInfo.trackingDevice"
                v-model="vehicleInfo.trackingDevice"
              />
            </label>
            <label class="col mt-3">
              <span class="fw-bold text-decoration-underline lh-lg"
                >Use case:</span
              >

              <input
                class="form-control form-control-sm"
                type="text"
                placeholder="Use case..."
                v-model="vehicleInfo.useCase"
              />
            </label>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <!-- EDIT VEHICLE FORM END -->
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false,
      vehicleInfo: {
        userId: this.accountId,
        details: ``,
        regNumber: ``,
        vin: ``,
        engine: ``,
        retailValue: ``,
        trackingDevice: ``,
        useCase: ``,
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
          (this.vehicleInfo = ``)
        )
        .catch((error) => alert(error));
    },
    openEditVehicle(vehicle, index) {
      this.isEdit = vehicle.vehicleId;
      console.log(index);
    },
    closeEdit() {
      this.isEdit = false;
    },
    editVehicle(vehicle, index) {
      const changeVehicleObj = {
        vehicleId: vehicle.vehicleId,
        userId: this.vehicleInfo.userId,
        details: this.vehicleInfo.details,
        regNumber: this.vehicleInfo.regNumber,
        vin: this.vehicleInfo.vin,
        retailValue: this.vehicleInfo.retailValue,
        trackingDevice: this.vehicleInfo.trackingDevice,
        useCase: this.vehicleInfo.useCase,
      };
      this.$store
        .dispatch(`CREATE_VEHICLE`, changeVehicleObj)
        .then(
          this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`),
          (this.isEdit = false)
        );
      console.log(index);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>