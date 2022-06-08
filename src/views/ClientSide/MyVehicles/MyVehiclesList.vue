<template>
  <!-- VEHICLES LIST -->
  <ul class="list-group position-relative">
    <li
      v-for="(vehicle, index) in myVehicles"
      :key="vehicle.vehicleId"
      class="
        list-group-item
        mt-3
        overflow-auto
        bg-secondary bg-gradient
        rounded
        text-light text-capitalize
      "
      v-show="vehicle.deleted == false"
    >
      <div class="row">
        <div class="col-sm-8">
          <div
            v-if="
              vehicle.isTrackingDeviceRequired &&
              vehicle.trackingDevice &&
              vehicle.trackingDevice == 'No'
            "
            class="
              border border-danger
              rounded
              border-3
              text-uppercase text-danger
              p-3
              mt-1
              mb-3
              fw-bold
            "
          >
            this vehicle has been identified as a required tracking device.
            Please contact our office for further assistance.
          </div>
          <span class="fw-bold">make and model:</span>
          <span>&nbsp;{{ vehicle.details }}</span> <br />
          <span class="fw-bold">year:</span>
          <span>&nbsp;{{ vehicle.year }}</span> <br />
          <span class="fw-bold">license plate:</span>
          <span>&nbsp;{{ vehicle.regNumber }}</span> <br />
          <span class="fw-bold"> VIN:</span>
          <span>&nbsp;{{ vehicle.vin }}</span> <br />
          <span class="fw-bold"> engine:</span>
          <span>&nbsp;{{ vehicle.engine }}L</span> <br />
          <span class="fw-bold"> retail value:</span>
          <span
            >&nbsp;<span class="fw-bold">R</span>{{ vehicle.retailValue }}</span
          >
          <br />
          <span class="fw-bold">Tracking device:</span>
          <span>&nbsp;{{ vehicle.trackingDevice }}</span> <br />
          <span class="fw-bold">Use case:</span>
          <span class="text-capitalize">&nbsp;{{ vehicle.useCase }}</span>
          <br />
          <span class="fw-bold">Accessories:</span>
          <span
            v-for="(accessory, index) in vehicle.accessories"
            :key="accessory.accessoryId"
            >&nbsp;<span>{{ accessory.name }}</span
            >&nbsp;<strong
              >R{{ accessory.cost
              }}<span v-if="index !== vehicle.accessories.length - 1"
                >,</span
              ></strong
            ></span
          >
          <br />
          <span class="fw-bold">Explanation Of The Business Use:</span>
          <span>&nbsp;{{ vehicle.businessDescription }}</span> <br />

          <span class="fw-bold">Financed vehicle:</span>
          <span>&nbsp;{{ vehicle.financed }}</span> <br />
          <span class="fw-bold">Name of the finance house:</span>
          <span>&nbsp;{{ vehicle.financeHouse }}</span> <br />
          <div class="row row-cols-auto">
            <div class="col">
              <button
                type="button"
                class="btn btn-outline-info mt-3"
                @click="openEditVehicle(vehicle)"
              >
                Edit vehicle
              </button>
            </div>
            <div class="col">
              <button
                @click="removePopup(vehicle, index)"
                type="button"
                class="btn btn-outline-danger mt-3"
              >
                Remove vehicle
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <!-- CAR IMAGE -->
          <MyVehicleImage :myProps="{ vehicle: { vehicle, index } }" />
        </div>
      </div>

      <EditVehicleForm
        class="text-black"
        v-if="
          this.$store.state.modals_toggle.isEditVehicleOpen == vehicle.vehicleId
        "
        :myProps="{ changeVehicleObj: changeVehicleObj }"
      />
      <!-- REMOVE VEHICLE -->
      <div
        class="
          modal-content
          position-absolute
          top-50
          start-50
          translate-middle
          text-black
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
            <span class="fw-bold">{{ vehicle.details }}</span> will be removed.
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
            class="btn btn-dark"
          >
            Save changes
          </button>
        </div>
      </div>
      <!-- REMOVE VEHICLE END -->
    </li>
  </ul>
</template>

<script>
import EditVehicleForm from "../../../components/Forms/EditVehicleForm.vue";
import MyVehicleImage from "./MyVehicleImage.vue";

export default {
  components: {
    EditVehicleForm,
    MyVehicleImage,
  },
  data() {
    return {
      accountId: ``,
      changeVehicleObj: {},
      isRemovePopup: false,
    };
  },
  computed: {
    myVehicles() {
      return this.$store.state.vehicles.vehicles;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_VEHICLES`, ``);
    this.accountId = this.$store.state.user.accountId;
  },
  methods: {
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
        accessories: vehicle.accessories,
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
          deleted: true,
        })
        .then((response) => {
          console.log(response.data);
          this.$store.dispatch(`GET_VEHICLES`, ``);
        })
        .catch((err) => {
          this.geErrorMessage(err);
        })
        .then((this.isRemovePopup = false));

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