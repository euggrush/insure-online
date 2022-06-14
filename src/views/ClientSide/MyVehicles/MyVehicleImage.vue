<template>
  <label class="car-photo-wrap">
    <img
      v-if="vehicleData.vehicle.assets.length > 0"
      :id="`car-photo-input${vehicleData.index}`"
      :src="`${FILE_URL}${
        vehicleData.vehicle.assets[vehicleData.vehicle.assets.length - 1].path
      }`"
      alt="image"
      width="100"
      height="100"
      class="car-photo"
    />
    <img
      v-else
      :id="`car-photo-input${vehicleData.index}`"
      :src="vehiclePhoto"
      alt="alt"
      width="100"
      height="100"
      class="car-photo"
    />
    <input
      type="file"
      v-show="showInput"
      @change="getCarPhoto($event, vehicleData.vehicle, vehicleData.index)"
    />
  </label>
</template>

<script>
import { FILE_URL, CAR_DEFAULT_IMAGE } from "../../../constants";

export default {
  data() {
    return {
      FILE_URL: FILE_URL,
      showInput: false,
      vehiclePhoto: CAR_DEFAULT_IMAGE,
    };
  },
  props: {
    myProps: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    vehicleData() {
      return this.myProps.vehicle;
    },
  },
  methods: {
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
.car-photo-wrap {
  width: 100%;
  height: 430px;
  cursor: pointer;
}
.car-photo-wrap:hover {
  outline: solid 1px #212529;
  background-image: url("../../../assets/img/icon-change-avatar.png");
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