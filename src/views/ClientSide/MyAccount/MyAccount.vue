<template>
  <section class="my-account position-relative">
    <div
      class="m-5 my-account_info d-flex flex-wrap justify-content-lg-between"
    >
      <div class="my-account_one d-flex flex-column align-items-center">
        <label for="formFile" class="form-label user-avatar-wrap">
          <img
            id="avatar"
            :src="`${FILE_URL}${avatar}`"
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
        <h2 class="text-center">
          {{ myAccountInfo.firstName }} {{ myAccountInfo.lastName }}
        </h2>
        <p class="text-center fw-light">
          {{ myAccountInfo.email }}
        </p>
        <p class="fw-light fst-italic text-center">
          Age&nbsp;{{ myAccountInfo.age }}
        </p>
        <hr />
      </div>
      <div class="my-account_two">
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">Cell</th>
              <td>{{ myAccountInfo.cellphone }}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>{{ myAccountInfo.address }}</td>
            </tr>
            <tr>
              <th scope="row">Client ID</th>
              <td colspan="2">{{ myAccountInfo.clientIdNumber }}</td>
            </tr>
            <tr>
              <th scope="row">Marital Status</th>
              <td>{{ myAccountInfo.maritalStatus }}</td>
            </tr>
            <tr>
              <th scope="row">Country Of Residence</th>
              <td>{{ myAccountInfo.countryOfResidence }}</td>
            </tr>
            <tr>
              <th scope="row">Year Of Issue Driver License</th>
              <td>{{ myAccountInfo.yearOfIssueDriverLicense }}</td>
            </tr>
            <tr>
              <th scope="row">Claims History</th>
              <td>{{ myAccountInfo.claimsHistory }}</td>
            </tr>
            <tr>
              <th scope="row">Previous Insurer</th>
              <td>{{ myAccountInfo.previousInsurer }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button
      class="btn btn-dark"
      type="button"
      @click="showAccountEdit = !showAccountEdit"
    >
      Edit my account details
    </button>
    <Transition>
      <EditAccountForm
        v-if="showAccountEdit"
        :myProps="{ myAccountInfo: myAccountInfo }"
      />
    </Transition>

    <ModalMessage />
  </section>
</template>

<script>
import { FILE_URL, DEFAULT_AVATAR } from "../../../constants";
import ModalMessage from "../../../components/Modals/ModalMessage.vue";
import EditAccountForm from "../../../components/Forms/EditForms/EditAccountForm.vue";

export default {
  components: {
    ModalMessage,
    EditAccountForm,
  },
  data() {
    return {
      showAccountEdit: false,
      FILE_URL: FILE_URL,
      showInput: false,
      avatar: DEFAULT_AVATAR,
      accountId: ``,
      
    };
  },
  computed: {
    myAccountInfo() {
      if (this.$store.state.users_array.accounts) {
        if (this.$store.state.users_array.accounts[0].avatar !== ``) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.avatar = this.$store.state.users_array.accounts[0].avatar;
        }
        return this.$store.state.users_array.accounts[0];
      }
      return [];
    },
  },
  mounted() {
    this.accountId = this.$store.state.user.accountId;
    this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`);
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
          relationId: this.accountId,
        })
      );
      formData.append("asset[]", asset);
      this.$store
        .dispatch(`UPLOAD`, formData)
        .then(() => {
          setTimeout(() => {
            this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`);
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
  min-width: 10em;
}
.my-account_info {
  outline: solid 6px red;
}
.my-account_one {
  width: 100%;
  @include media-breakpoint-up(lg) {
    width: 45%;
  }

  outline: solid 6px blue;
}
.my-account_two {
  width: 100%;
  @include media-breakpoint-up(lg) {
    width: 45%;
  }

  outline: solid 6px green;
}
.details li {
  list-style: none;
}
li {
  margin-bottom: 10px;
}
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
.table-dark {
  min-height: 290px;
  @include media-breakpoint-up(sm) {
    min-height: 180px;
  }
  @include media-breakpoint-up(md) {
    margin-top: 11px;
    min-height: 230px;
  }
  @include media-breakpoint-up(lg) {
    min-height: 308px;
  }
  @include media-breakpoint-up(xl) {
    min-height: 375px;
  }
  @include media-breakpoint-up(xxl) {
    min-height: 445px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>