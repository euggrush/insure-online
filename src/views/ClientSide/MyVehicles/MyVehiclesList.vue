<template>
  <!-- VEHICLES LIST -->
  <ul class="list-group position-relative">
    <li
      v-for="(vehicle, index) in myVehicles"
      :key="vehicle.vehicleId"
      class="list-group-item mt-3 text-secondary shadow-lg"
      v-show="vehicle.deleted == false"
    >
      <div class="row">
        <div class="col-lg-6">
          <div class="mt-3 mb-3">
            <button
              type="button"
              class="btn edit-car-btn"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Edit"
              @click="openEditVehicle(vehicle)"
            ></button>
            <button
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Remove"
              @click="removePopup(vehicle, index)"
              type="button"
              class="btn remove-car-btn ms-3"
            ></button>
          </div>

          <!-- CAR IMAGE -->
          <MyVehicleImage
            class="mt-3"
            :myProps="{ vehicle: { vehicle, index } }"
          />
        </div>
        <div class="col-lg-6">
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
          <h4 class="text-center mt-3">
            {{ vehicle.year }}&nbsp;{{ vehicle.details }},&nbsp;{{
              vehicle.engine
            }}L engine
          </h4>
          <h6 class="text-center">VIN:&nbsp;{{ vehicle.vin }}</h6>
          <hr />

          <table class="table w-75 mx-auto">
            <tbody>
              <tr>
                <th>License plate</th>
                <td class="text-uppercase">{{ vehicle.regNumber }}</td>
              </tr>
              <tr>
                <th>Retail value</th>
                <td>R{{ vehicle.retailValue }}</td>
              </tr>
              <tr v-if="vehicle.trackingDevice == 'Yes'">
                <th>Tracking device</th>
                <td class="text-uppercase">{{ vehicle.trackingDevice }}</td>
              </tr>
              <tr>
                <th>Car used for</th>
                <td class="text-uppercase">{{ vehicle.useCase }}</td>
              </tr>

              <tr v-if="vehicle.businessDescription">
                <th>Explanation Of The Business Use</th>
                <td class="text-uppercase">
                  {{ vehicle.businessDescription }}
                </td>
              </tr>
              <tr v-if="vehicle.financed">
                <th>Vehicle Financed at</th>
                <td class="text-uppercase">{{ vehicle.financeHouse }}</td>
              </tr>
              <tr v-if="vehicle.accessories.length > 0">
                <th>Accessories</th>
                <td>
                  <span
                    v-for="(accessory, index) in vehicle.accessories"
                    :key="accessory.accessoryId"
                    ><span v-if="index !== 0">&nbsp;</span
                    ><span class="text-uppercase">{{ accessory.name }}</span
                    >&nbsp;<strong
                      >R{{ accessory.cost
                      }}<span v-if="index !== vehicle.accessories.length - 1"
                        >,</span
                      ></strong
                    ></span
                  >
                </td>
              </tr>
            </tbody>
          </table>
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
import EditVehicleForm from "../../../components/Forms/EditForms/EditVehicleForm.vue";
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
    this.enableTooltips();
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
.edit-car-btn,
.remove-car-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: 60%;
  background-position: center;
  background-repeat: no-repeat;
}
.edit-car-btn {
  background-color: $colorDark;
  background-image: url("../../../assets/img/icon-edit-car.svg");
}
.remove-car-btn {
  background-color: $colorBrick;
  background-image: url("../../../assets/img/icon-remove-car.svg");
}
</style>