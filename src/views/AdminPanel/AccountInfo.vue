<template>
  <section class="container">
    <h3>Account Details:</h3>
    <span class="fw-bold text-decoration-underline">ID Number: </span>
    <span>&nbsp;{{ accountInfo.clientIdNumber }}</span> <br />
    <span class="fw-bold text-decoration-underline">Account username: </span>
    <span>&nbsp;{{ accountInfo.username }}</span> <br />
    <span class="fw-bold text-decoration-underline">First: </span>
    <span>&nbsp;{{ accountInfo.firstName }}</span> <br />
    <span class="fw-bold text-decoration-underline">Last: </span>
    <span>&nbsp;{{ accountInfo.lastName }}</span> <br />
    <span class="fw-bold text-decoration-underline">Age: </span>
    <span>&nbsp;{{ accountInfo.age }}</span> <br />
    <span class="fw-bold text-decoration-underline">Email: </span>
    <a :href="`mailto:${accountInfo.email}`">&nbsp;{{ accountInfo.email }}</a>
    <br />
    <span class="fw-bold text-decoration-underline">Cellphone: </span>
    <a :href="`tel:${accountInfo.cellphone}`"
      >&nbsp;{{ accountInfo.cellphone }}</a
    ><br />
    <span class="fw-bold text-decoration-underline">Telephone number: </span>
    <a :href="`tel:${accountInfo.phoneNumber}`"
      >&nbsp;{{ accountInfo.phoneNumber }}</a
    ><br />
    <span class="fw-bold text-decoration-underline">Marital Status: </span>
    <span>&nbsp;{{ accountInfo.maritalStatus }}</span> <br />
    <span class="fw-bold text-decoration-underline">Area & Postal Code: </span>
    <span>&nbsp;{{ accountInfo.address }}</span> <br />
    <span class="fw-bold text-decoration-underline"
      >Country Of Residence:
    </span>
    <span>&nbsp;{{ accountInfo.countryOfResidence }}</span> <br />
    <span class="fw-bold text-decoration-underline"
      >Year of issue driver license:
    </span>
    <span>&nbsp;{{ accountInfo.yearOfIssueDriverLicense }}</span> <br />
    <span class="fw-bold text-decoration-underline">Claims history: </span>
    <span>&nbsp;{{ accountInfo.claimsHistory }}</span> <br />
    <span class="fw-bold text-decoration-underline">Previous Insurer: </span>
    <span>&nbsp;{{ accountInfo.previousInsurer }}</span> <br />
    <p>
      <button
        class="btn btn-primary mt-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseWidthExample1"
        aria-expanded="false"
        aria-controls="collapseWidthExample1"
      >
        Change Account
      </button>
    </p>
    <div>
      <div class="collapse collapse-horizontal" id="collapseWidthExample1">
        <form
          @submit.prevent="changeAccount()"
          class="card card-body"
          style="width: 300px"
        >
          <label>
            <span class="fw-bold text-decoration-underline lh-lg"
              >First name:</span
            >
            <input
              class="form-control"
              type="text"
              :placeholder="accountInfo.firstName"
              v-model="changeUserObj.firstName"
            />
          </label>
          <label>
            <span class="fw-bold text-decoration-underline lh-lg"
              >Last name:</span
            >
            <input
              class="form-control"
              type="text"
              :placeholder="accountInfo.lastName"
              v-model="changeUserObj.lastName"
            />
          </label>
          <label>
            <span class="fw-bold text-decoration-underline lh-lg"
              >Date of birth:</span
            >
            <input class="form-control" type="date" v-model="dateOfBirth" />
          </label>
          <label>
            <span class="fw-bold text-decoration-underline lh-lg"
              >Address:</span
            >
            <input
              class="form-control"
              type="text"
              :placeholder="accountInfo.address"
              v-model="changeUserObj.address"
            />
          </label>
          <label>
            <span class="fw-bold text-decoration-underline lh-lg"
              >Cellphone:</span
            >
            <input
              class="form-control"
              type="text"
              :placeholder="accountInfo.cellphone"
              v-model="changeUserObj.cellphone"
            />
          </label>
          <label>
            <span class="fw-bold text-decoration-underline lh-lg"
              >Home phone:</span
            >
            <input
              class="form-control"
              type="text"
              :placeholder="accountInfo.phoneNumber"
              v-model="changeUserObj.phoneNumber"
            />
          </label>
          <select
            class="form-select mt-3"
            aria-label="Default select example"
            v-model="changeUserObj.maritalStatus"
          >
            <option value="" selected>Select marital status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
          <label>
            <span class="fw-bold text-decoration-underline lh-lg"
              >Country Of Residence:</span
            >
            <input
              class="form-control"
              type="text"
              :placeholder="accountInfo.countryOfResidence"
              v-model="changeUserObj.countryOfResidence"
            />
          </label>
          <label>
            <span class="fw-bold text-decoration-underline lh-lg"
              >Previous Insurer:</span
            >
            <input
              class="form-control"
              type="text"
              :placeholder="accountInfo.previousInsurer"
              v-model="changeUserObj.previousInsurer"
            />
          </label>
          <label>
            <span class="fw-bold text-decoration-underline lh-lg"
              >Year of issue driver license:</span
            >
            <input
              class="form-control"
              type="text"
              :placeholder="accountInfo.yearOfIssueDriverLicense"
              v-model="changeUserObj.yearOfIssueDriverLicense"
            />
          </label>
          <!-- <label>
            <span class="fw-bold text-decoration-underline lh-lg"
              >Overnight parking vehicle:</span
            >
            <input
              class="form-control"
              type="text"
              :placeholder="accountInfo.overnightParkingVehicle"
              v-model="changeUserObj.overnightParkingVehicle"
            />
          </label> -->
          <label>
            <span class="fw-bold text-decoration-underline lh-lg"
              >Claims history:</span
            >
            <input
              class="form-control"
              type="text"
              :placeholder="accountInfo.claimsHistory"
              v-model="changeUserObj.claimsHistory"
            />
          </label>
          <button type="submit" class="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    </div>
    <h4 class="mt-3">Vehicles information:</h4>
    <p class="m-0 p-0">
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
    <ul class="list-group position-relative">
      <li
        v-for="(vehicle, index) in accountInfo.vehicles"
        :key="index"
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
        <button
          type="button"
          class="btn btn-secondary mt-3 me-3"
          @click="openEditVehicle(vehicle, index)"
        >
          Edit vehicle
        </button>
        <button
          @click="removePopup(vehicle, index)"
          type="button"
          class="btn btn-danger mt-3"
        >
          Remove vehicle
        </button>
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
const getTimeStamp = (date) => {
  let myDate = date;
  myDate = myDate.split("-");
  const timestamp = +new Date(
    Date.UTC(myDate[0], myDate[1] - 1, myDate[2])
  ).getTime();
  return timestamp;
};
export default {
  data() {
    return {
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
      changeVehicleObj: {},
      dateOfBirth: ``,
      changeUserObj: {
        accountId: ``,
        firstName: ``,
        lastName: ``,
        birthDate: ``,
        address: ``,
        cellphone: ``,
        phoneNumber: ``,
        maritalStatus: ``,
        countryOfResidence: ``,
        previousInsurer: ``,
        yearOfIssueDriverLicense: ``,
        overnightParkingVehicle: ``,
        claimsHistory: ``,
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
    changeAccount() {
      this.changeUserObj.accountId = this.accountId;
      this.changeUserObj.birthDate = getTimeStamp(this.dateOfBirth);
      this.$store
        .dispatch(`MODIFY_USER`, this.changeUserObj)
        .then(
          this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`),
          this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`)
        )
        .catch((err) => alert(err));
    },
    createVehicle() {
      this.vehicleInfo.accountId = this.accountId;
      this.$store
        .dispatch(`CREATE_VEHICLE`, this.vehicleInfo)
        .then(
          this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`),
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
          this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`),
          (this.isEdit = false)
        )
        .catch((err) => console.log(err))
        .then(() => {
          this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`);
        });
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
          this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`),
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