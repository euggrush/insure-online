<template>
  <section class="my-vehicles position-relative">
    <ModalMessage />
    <button
      class="btn btn-dark mt-1"
      type="button"
      @click="showAddCar = !showAddCar"
    >
      <span class="text-capitalize">Add vehicle</span>
    </button>

    <!-- CREATE VEHICLE FORN -->

    <Transition>
      <CreateVehicleForm
        @closeForm="closeCreateCarForm"
        class="mt-3"
        v-if="showAddCar"
        :myProps="{ accountId: accountId }"
      />
    </Transition>
    <!-- CREATE VEHICLE FORN END -->
    <!-- VEHICLES LIST -->
    <ul class="list-group position-relative">
      <li
        v-for="(vehicle, index) in myVehicles"
        :key="vehicle.vehicleId"
        class="
          list-group-item
          mt-3
          overflow-auto
          bg-dark bg-gradient
          rounded
          text-light text-capitalize
        "
        v-show="vehicle.deleted == false"
      >
        <div class="row">
          <div class="col-sm-8">
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
              >&nbsp;<span class="fw-bold">R</span
              >{{ vehicle.retailValue }}</span
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
              <div class="col">
                <router-link
                  to="/my-quotes"
                  type="button"
                  class="btn btn-outline-warning mt-3"
                >
                  Insure vehicle
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <label class="car-photo-wrap">
              <img
                v-if="vehicle.assets.length > 0"
                :id="`car-photo-input${index}`"
                :src="`${FILE_URL}${
                  vehicle.assets[vehicle.assets.length - 1].path
                }`"
                alt="image"
                width="100"
                height="100"
                class="car-photo img-thumbnail"
              />
              <img
                v-else
                :id="`car-photo-input${index}`"
                :src="vehiclePhoto"
                alt="alt"
                width="100"
                height="100"
                class="car-photo img-thumbnail"
              />
              <input
                type="file"
                v-show="showInput"
                @change="getCarPhoto($event, vehicle, index)"
              />
            </label>
          </div>
        </div>

        <EditVehicleForm
          class="text-black"
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
import ModalMessage from "../../components/Modals/ModalMessage.vue";
import { FILE_URL, CAR_DEFAULT_IMAGE } from "../../constants";

export default {
  components: {
    CreateVehicleForm,
    EditVehicleForm,
    ModalMessage,
  },
  data() {
    return {
      showAddCar: false,
      FILE_URL: FILE_URL,
      accountId: ``,
      changeVehicleObj: {},
      isRemovePopup: false,
      showInput: false,
      vehiclePhoto: CAR_DEFAULT_IMAGE,
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
    closeCreateCarForm() {
      this.showAddCar = false;
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
          // accountId: this.accountId,
          deleted: true,
          // useCase: `private`,
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
    getCarPhoto(event, vehicle, index) {
      let files = event.target.files;
      let file = files[0];
      if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById(`car-photo-input${index}`).src =
            e.target.result;
        };
        reader.readAsDataURL(file);
        setTimeout(() => {
          this.resizeImage(file, vehicle);
        }, 1000);
      }
    },
    resizeImage(file, vehicle) {
      if (file) {
        let reader = new FileReader();

        reader.onload = (e) => {
          let img = document.createElement("img");
          img.src = e.target.result;
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");

          ctx.drawImage(img, 0, 0);

          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;

          ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          let dataurl = canvas.toDataURL(file);
          setTimeout(() => {
            let asset = this.dataURItoBlob(dataurl);
            this.uploadCarPhoto(asset, vehicle);
          }, 1000);
        };
        reader.readAsDataURL(file);
      }
    },
    uploadCarPhoto(asset, vehicle) {
      const formData = new FormData();
      formData.append(
        `meta`,
        JSON.stringify({
          fileType: `photo`,
          description: `car photo`,
          relatedTo: `vehicles`,
          relationId: vehicle.vehicleId,
        })
      );
      formData.append("asset[]", asset);
      this.$store
        .dispatch(`UPLOAD`, formData)
        .then(() => {
          setTimeout(() => {
            this.$store.dispatch(`GET_VEHICLES`, ``);
          }, 1000);
        })
        .catch(() => {
          this.$store.commit(`SET_MODAL`, {
            isModal: true,
            msg:
              this.$store.state.general_errors ??
              `File upload error, please try later`,
          });
        });
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
  height: 222px;
  margin-top: 20px;
  cursor: pointer;
  @include media-breakpoint-up(sm) {
    width: 155px;
    height: 130px;

    margin-top: 10px;
  }
  @include media-breakpoint-up(md) {
    width: 220px;
    height: 190px;
  }
  @include media-breakpoint-up(lg) {
    width: 295px;
    height: 245px;
  }
  @include media-breakpoint-up(xl) {
    width: 360px;
    height: 285px;
  }
  @include media-breakpoint-up(xxl) {
    width: 420px;
    height: 300px;
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
  object-fit: contain;
}
.car-photo:hover {
  opacity: 0.5;
}
</style>