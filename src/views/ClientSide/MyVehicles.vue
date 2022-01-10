<template>
  <section class="my-vehicles">
    <h3 class="mt-3 fw-bold">Vehicles information:</h3>
    <p class="m-0 p-0">
      <button
        class="btn btn-primary mt-1"
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
                required
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword3" class="form-label"
                >Engine size:</label
              >
              <input
                type="number"
                class="form-control"
                id="exampleInputPassword3"
                v-model="vehicleInfo.engine"
                step="0.1"
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
                required
              />
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
        </div>
      </div>
    </div>
    <!-- CREATE VEHICLE FORN END -->
    <!-- VEHICLES LIST -->
    <ul class="list-group position-relative">
      <li
        v-for="(vehicle, index) in myVehicles"
        :key="vehicle.vehicleId"
        class="list-group-item mt-3"
        v-show="vehicle.deleted == false"
      >
        <span class="fw-bold text-decoration-underline"
          >Vehicle make and model:</span
        >
        <span>&nbsp;{{ vehicle.details }}</span> <br />
        <span class="fw-bold text-decoration-underline">Vehicle year:</span>
        <span>&nbsp;{{ vehicle.year }}</span> <br />
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
        <span
          >&nbsp;<span class="fw-bold">R</span>{{ vehicle.retailValue }}</span
        >
        <br />
        <span class="fw-bold text-decoration-underline">Tracking device:</span>
        <span>&nbsp;{{ vehicle.trackingDevice }}</span> <br />
        <span class="fw-bold text-decoration-underline">Use case:</span>
        <span>&nbsp;{{ vehicle.useCase }}</span> <br />
        <div class="row row-cols-auto">
          <div class="col col-lg-2">
            <button
              type="button"
              class="btn btn-secondary mt-3"
              @click="openEditVehicle(vehicle, index)"
            >
              Edit vehicle
            </button>
          </div>
          <div class="col col-lg-2">
            <button
              @click="removePopup(vehicle, index)"
              type="button"
              class="btn btn-danger mt-3"
            >
              Remove vehicle
            </button>
          </div>
          <div class="col col-lg-2">
            <router-link to="/my-order" type="button" class="btn btn-info mt-3">
              Insure vehicle
            </router-link>
          </div>
        </div>

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
                  :placeholder="changeVehicleObj.details"
                  v-model="changeVehicleObj.details"
                  minlength="5"
                  maxlength="30"
                />
              </label>
              <label class="col mt-3">
                <span class="fw-bold text-decoration-underline lh-lg">
                  Vehicle year:
                </span>
                <input
                  class="form-control form-control-sm col"
                  type="number"
                  :placeholder="changeVehicleObj.year"
                  v-model="changeVehicleObj.year"
                />
              </label>
              <label class="col mt-3">
                <span class="fw-bold text-decoration-underline lh-lg">
                  Vehicle license plate nunber:
                </span>
                <input
                  class="form-control form-control-sm"
                  type="text"
                  :placeholder="changeVehicleObj.regNumber"
                  v-model="changeVehicleObj.regNumber"
                  minlength="2"
                  maxlength="10"
                />
              </label>
              <label class="col mt-3">
                <span class="fw-bold text-decoration-underline lh-lg">
                  Vehicle VIN:
                </span>
                <input
                  class="form-control form-control-sm"
                  type="text"
                  :placeholder="changeVehicleObj.vin"
                  v-model="changeVehicleObj.vin"
                  minlength="17"
                  maxlength="17"
                />
              </label>
              <label class="col mt-3">
                <span class="fw-bold text-decoration-underline lh-lg">
                  Engine size:
                </span>
                <input
                  class="form-control form-control-sm"
                  type="number"
                  :placeholder="changeVehicleObj.engine"
                  v-model="changeVehicleObj.engine"
                  step="0.1"
                />
              </label>
              <label class="col mt-3">
                <span class="fw-bold text-decoration-underline lh-lg">
                  Retail value:
                </span>
                <input
                  class="form-control form-control-sm"
                  type="number"
                  :placeholder="changeVehicleObj.retailValue"
                  v-model="changeVehicleObj.retailValue"
                />
              </label>
              <div class="col mt-3 form-check">
                <span class="d-block fw-bold text-decoration-underline lh-lg">
                  Tracking device:
                </span>
                <label class="form-check-label m-1">
                  <input
                    type="radio"
                    name="trackingDevice"
                    value="Yes"
                    v-model="changeVehicleObj.trackingDevice"
                    required
                  />
                  Yes
                </label>
                <label class="m-1">
                  <input
                    type="radio"
                    name="trackingDevice"
                    value="No"
                    v-model="changeVehicleObj.trackingDevice"
                  />
                  No
                </label>
              </div>
              <div class="col mt-3 form-check">
                <span class="d-block fw-bold text-decoration-underline lh-lg"
                  >Use:</span
                >
                <label class="form-check-label m-1">
                  <input
                    type="radio"
                    name="useCase"
                    value="Private"
                    v-model="changeVehicleObj.useCase"
                    required
                  />
                  Private
                </label>
                <label class="m-1">
                  <input
                    type="radio"
                    name="useCase"
                    value="Business"
                    v-model="changeVehicleObj.useCase"
                  />
                  Business
                </label>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <!-- EDIT VEHICLE FORM END -->
        <!-- REMOVE VEHICLE -->
        <div
          class="
            modal-content
            position-absolute
            top-50
            start-50
            translate-middle
          "
          v-if="isRemovePopup == vehicle.vehicleId"
        >
          <div class="modal-header">
            <h5 class="modal-title">Remove vehicle?</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeRemovePopup"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              <span class="fw-bold">{{ vehicle.details }}</span> will be
              removed.
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="closeRemovePopup"
            >
              Close
            </button>
            <button
              @click="removeVehicle(vehicle, index)"
              type="button"
              class="btn btn-primary"
            >
              Save changes
            </button>
          </div>
        </div>
        <!-- REMOVE VEHICLE END -->
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      accountId: ``,
      changeVehicleObj: {},
      isEdit: false,
      isRemovePopup: false,
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
      },
    };
  },
  props: {
    myProps: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    myVehicles() {
      return this.$store.state.vehicles.vehicles;
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
          this.$store.dispatch(`GET_VEHICLES`, ``),
          (this.vehicleInfo = {})
        )
        .catch((error) => alert(error));
    },
    openEditVehicle(vehicle, index) {
      this.changeVehicleObj = {
        vehicleId: vehicle.vehicleId,
        accountId: this.accountId,
        details: vehicle.details,
        year: vehicle.year,
        regNumber: vehicle.regNumber,
        vin: vehicle.vin,
        engine: vehicle.engine,
        retailValue: vehicle.retailValue,
        trackingDevice: vehicle.trackingDevice,
        useCase: vehicle.useCase,
      };
      this.isEdit = vehicle.vehicleId;
      console.log(index);
    },
    closeEdit() {
      this.isEdit = false;
    },
    editVehicle(vehicle, index) {
      this.$store
        .dispatch(`CREATE_VEHICLE`, this.changeVehicleObj)
        .then(
          this.$store.dispatch(`GET_VEHICLES`, ``),
          this.$store.dispatch(`GET_VEHICLES`, ``),
          (this.isEdit = false)
        );
      console.log(index);
    },
    removePopup(vehicle, index) {
      this.isRemovePopup = vehicle.vehicleId;
      console.log(index);
    },
    closeRemovePopup() {
      this.isRemovePopup = false;
    },
    removeVehicle(vehicle, index) {
      this.$store
        .dispatch(`CREATE_VEHICLE`, {
          vehicleId: vehicle.vehicleId,
          accountId: this.accountId,
          deleted: true,
        })
        .then(
          this.$store.dispatch(`GET_VEHICLES`, ``),
          this.$store.dispatch(`GET_VEHICLES`, ``),
          (this.isRemovePopup = false)
        );
      console.log(index);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  min-width: 12em;
}
</style>