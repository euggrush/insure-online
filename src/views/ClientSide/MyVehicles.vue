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
import { FILE_URL } from "../../constants";

export default {
  components: {
    CreateVehicleForm,
    EditVehicleForm,
  },
  data() {
    return {
      FILE_URL: FILE_URL,
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