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
        <div class="card card-body mt-3">
          <CreateVehicleForm :myProps="{ accountId: accountId }" />
        </div>
      </div>
    </div>
    <!-- CREATE VEHICLE FORN END -->
    <ul class="list-group position-relative">
      <li
        v-for="(vehicle, index) in accountInfo.vehicles"
        :key="index"
        class="list-group-item mt-3 overflow-auto"
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
        <span class="text-capitalize">&nbsp;{{ vehicle.useCase }}</span> <br />
        <span class="fw-bold text-decoration-underline">Accessories:</span>
        <span
          v-for="(accessory, index) in vehicle.accessories"
          :key="accessory.accessoryId"
          >&nbsp;{{ accessory.name }} <strong>R{{ accessory.cost }}</strong
          ><span v-if="index < vehicle.accessories.length - 1">,</span>
        </span>
        <br />
        <span class="fw-bold text-decoration-underline"
          >Explanation Of The Business Use:</span
        >
        <span>&nbsp;{{ vehicle.businessDescription }}</span> <br />

        <span class="fw-bold text-decoration-underline">Financed vehicle:</span>
        <span>&nbsp;{{ vehicle.financed }}</span> <br />
        <span class="fw-bold text-decoration-underline"
          >Name of the finance house:</span
        >
        <span>&nbsp;{{ vehicle.financeHouse }}</span> <br />
        <button
          type="button"
          class="btn btn-secondary mt-3 me-3"
          @click="openEditVehicle(vehicle)"
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

        <EditVehicleForm
          v-if="
            this.$store.state.modals_toggle.isEditVehicleOpen ==
            vehicle.vehicleId
          "
          :myProps="{ changeVehicleObj: changeVehicleObj }"
        />
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
import CreateVehicleForm from "../../components/Forms/CreateVehicleForm.vue";
import EditVehicleForm from "../../components/Forms/EditVehicleForm.vue";

export default {
  components: {
    CreateVehicleForm,
    EditVehicleForm,
  },
  data() {
    return {
      // isEdit: false,
      isRemovePopup: false,

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
      this.changeUserObj.birthDate = this.getTimeStamp(this.dateOfBirth);
      this.$store
        .dispatch(`MODIFY_USER`, this.changeUserObj)
        .then(
          this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`),
          this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`)
        )
        .catch((err) => alert(err));
    },

    openEditVehicle(vehicle) {
      this.$store.commit(`SET_MODALS_TOGGLE`, {
        isEditVehicleOpen: vehicle.vehicleId,
      });
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
        financed: vehicle.financed,
        financeHouse: vehicle.financeHouse,
      };
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
.list-group-item {
  min-height: 23em;
}
</style>