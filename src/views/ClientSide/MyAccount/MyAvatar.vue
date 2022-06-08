<template>
  <label for="formFile" class="form-label user-avatar-wrap">
    <img
      id="avatar"
      :src="`${FILE_URL}${getMyAvatarUrl}`"
      alt="avatar"
      class="img user-avatar-photo img-thumbnail rounded-circle"
      width="100"
      height="100"
    />
    <input
      type="file"
      accept="image/*"
      id="formFile"
      name="asset"
      @change="getAvatar($event)"
      v-show="showInput"
    />
  </label>
</template>

<script>
import { FILE_URL, DEFAULT_AVATAR } from "../../../constants";

export default {
  data() {
    return {
      showAccountEdit: false,
      FILE_URL: FILE_URL,
      showInput: false,
    };
  },
  computed: {
    getMyAvatarUrl() {
      let avatarUrl = ``;
      if (this.$store.state.users_array.accounts[0].avatar == ``) {
        avatarUrl = DEFAULT_AVATAR;
      }
      avatarUrl = this.$store.state.users_array.accounts[0].avatar;
      return avatarUrl;
    },
  },
  methods: {
    getAvatar(event) {
      let files = event.target.files;
      let file = files[0];
      if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("avatar").src = e.target.result;
        };
        reader.readAsDataURL(file);
        setTimeout(() => {
          this.resizeImage(file);
        }, 1000);
      }
    },
    resizeImage(file) {
      if (file) {
        let reader = new FileReader();

        reader.onload = (e) => {
          let img = document.createElement("img");
          img.src = e.target.result;
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");

          ctx.drawImage(img, 0, 0);

          const MAX_WIDTH = 300;
          const MAX_HEIGHT = 300;

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
            this.uploadAvatar(asset);
          }, 1000);
        };
        reader.readAsDataURL(file);
      }
    },
    uploadAvatar(asset) {
      const formData = new FormData();
      formData.append(
        `meta`,
        JSON.stringify({
          fileType: `avatar`,
          description: `avatar`,
          relatedTo: `avatar`,
          relationId: this.$store.state.users_array.accounts[0].accountId,
        })
      );
      formData.append("asset[]", asset);
      this.$store
        .dispatch(`UPLOAD`, formData)
        .then(() => {
          setTimeout(() => {
            this.$store.dispatch(`GET_USERS`, ``);
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
.user-avatar-wrap {
  width: 100%;
  height: auto;
  cursor: pointer;
  object-fit: cover;
  margin-top: 10px;
  @include media-breakpoint-up(sm) {
    width: 180px;
    height: 180px;
  }
  @include media-breakpoint-up(md) {
    width: 230px;
    height: 230px;
  }
  @include media-breakpoint-up(lg) {
    width: 308px;
    height: 308px;
  }
  @include media-breakpoint-up(xl) {
    width: 375px;
    height: 375px;
  }
  @include media-breakpoint-up(xxl) {
    width: 445px;
    height: 445px;
  }
}
.user-avatar-wrap:hover {
  outline: solid 1px #212529;
  background-image: url("../../../assets/img/icon-change-avatar.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100px 100px;
}
.user-avatar-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.user-avatar-photo:hover {
  opacity: 0.3;
}
</style>