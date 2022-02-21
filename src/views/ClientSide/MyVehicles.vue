<template>
  <section class="my-vehicles">
    <h3 class="mt-3 fw-bold text-capitalize">Vehicles information:</h3>

    <button
      class="btn btn-dark mt-3"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseWidthExample"
      aria-expanded="false"
      aria-controls="collapseWidthExample"
    >
      <span class="text-capitalize">Add vehicle</span>
    </button>

    <!-- CREATE VEHICLE FORN -->
    <div>
      <div class="collapse mt-3" id="collapseWidthExample">
        <div class="card card-body">
          <CreateVehicleForm :myProps="{ accountId: accountId }" />
        </div>
      </div>
    </div>
    <!-- CREATE VEHICLE FORN END -->
    <!-- VEHICLES LIST -->
    <ul class="list-group position-relative">
      <li
        v-for="(vehicle, index) in myVehicles"
        :key="vehicle.vehicleId"
        class="list-group-item mt-3 overflow-auto"
        v-show="vehicle.deleted == false"
      >
        <div class="row">
          <div class="col-sm-8">
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
            <span class="fw-bold text-decoration-underline"
              >Vehicle engine:</span
            >
            <span>&nbsp;{{ vehicle.engine }}</span> <br />
            <span class="fw-bold text-decoration-underline"
              >Vehicle retail value:</span
            >
            <span
              >&nbsp;<span class="fw-bold">R</span
              >{{ vehicle.retailValue }}</span
            >
            <br />
            <span class="fw-bold text-decoration-underline"
              >Tracking device:</span
            >
            <span>&nbsp;{{ vehicle.trackingDevice }}</span> <br />
            <span class="fw-bold text-decoration-underline">Use case:</span>
            <span class="text-capitalize">&nbsp;{{ vehicle.useCase }}</span>
            <br />
            <span class="fw-bold text-decoration-underline">Accessories:</span>
            <span>&nbsp;{{ vehicle.accessories }}</span> <br />
            <span class="fw-bold text-decoration-underline"
              >Explanation Of The Business Use:</span
            >
            <span>&nbsp;{{ vehicle.businessDescription }}</span> <br />
            <div class="row row-cols-auto">
              <div class="col">
                <button
                  type="button"
                  class="btn btn-secondary mt-3"
                  @click="openEditVehicle(vehicle)"
                >
                  Edit vehicle
                </button>
              </div>
              <div class="col">
                <button
                  @click="removePopup(vehicle, index)"
                  type="button"
                  class="btn btn-danger mt-3"
                >
                  Remove vehicle
                </button>
              </div>
              <div class="col">
                <router-link
                  to="/my-quotes"
                  type="button"
                  class="btn btn-info mt-3"
                >
                  Insure vehicle
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <label class="car-photo-wrap">
              <img
                :src="vehiclePhoto"
                alt="image"
                width="100"
                height="100"
                class="car-photo"
              />
              <input type="file" v-show="showInput" />
            </label>
          </div>
        </div>

        <EditVehicleForm
          v-if="
            this.$store.state.modals_toggle.isEditVehicleOpen ==
            vehicle.vehicleId
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
              class="btn btn-dark"
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
      accountId: ``,
      changeVehicleObj: {},
      isRemovePopup: false,
      showInput: false,
      vehiclePhoto: `https://www.pinclipart.com/picdir/big/118-1187597_nouvelle-porsche-911-icon-avto-podbor-bel-clipart.png`,
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
          this.$store.dispatch(`GET_VEHICLES`, ``),
          (this.isRemovePopup = false)
        )
        .catch((err) => console.log(err))
        .then(() => {
          this.$store.dispatch(`GET_VEHICLES`, ``);
        });
      console.log(index);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  min-width: 12em;
}
.car-photo-wrap {
  width: 255px;
  margin-top: 20px;
  cursor: pointer;
  object-fit: cover;
  @include media-breakpoint-up(sm) {
    width: 155px;
    margin-top: 10px;
  }
  @include media-breakpoint-up(md) {
    width: 220px;
  }
  @include media-breakpoint-up(lg) {
    width: 295px;
  }
  @include media-breakpoint-up(xl) {
    width: 360px;
  }
  @include media-breakpoint-up(xxl) {
    width: 420px;
  }
}
.car-photo-wrap:hover {
  outline: solid 1px #212529;
  background-image: url("../../assets/img/icon-change-avatar.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100px 100px;
}
.car-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.car-photo:hover {
  opacity: 0.5;
}
</style>