<template>
  <section class="container-fluid my-account position-relative">
    <router-link to="/my-quotes" class="btn btn-dark btn-lg"
      >Quotes</router-link
    >
    <div
      class="row mt-3 my-account_info bg-dark bg-gradient text-white shadow-lg"
    >
      <div class="col-md-4 col-xs-12 col-sm-6 col-lg-4">
        <label for="formFile" class="form-label fw-bold user-avatar-wrap">
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
        <h2 class="fs-3 text-center mt-1">
          {{ myAccountInfo.firstName }} {{ myAccountInfo.lastName }}
        </h2>
        <p class="text-center fw-bold">
          {{ myAccountInfo.email }}
        </p>
        <p class="fw-bold fst-italic text-center">
          Age&nbsp;{{ myAccountInfo.age }}
        </p>
        <hr />
      </div>
      <div class="col-md-8 col-xs-12 col-sm-6 col-lg-8">
        <table class="table table-dark table-striped border-start">
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
    <p class="mt-3 pb-3 border-bottom">
      <button
        class="btn btn-dark text-capitalize"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Edit my account details
      </button>
    </p>
    <div class="collapse" id="collapseExample">
      <form
        @submit.prevent="changeAccount()"
        class="card card-body bg-dark bg-gradient shadow-lg text-white mb-3"
        style="width: 300px"
      >
        <label>
          <span class="fw-bold text-decoration-underline lh-lg"
            >First name:</span
          >
          <input
            class="form-control"
            type="text"
            :placeholder="myAccountInfo.firstName"
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
            :placeholder="myAccountInfo.lastName"
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
          <span class="fw-bold text-decoration-underline lh-lg">Address:</span>
          <input
            class="form-control"
            type="text"
            :placeholder="myAccountInfo.address"
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
            :placeholder="myAccountInfo.cellphone"
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
            :placeholder="myAccountInfo.phoneNumber"
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
            :placeholder="myAccountInfo.countryOfResidence"
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
            :placeholder="myAccountInfo.previousInsurer"
            v-model="changeUserObj.previousInsurer"
          />
        </label>
        <label>
          <span class="fw-bold text-decoration-underline lh-lg"
            >Year of issue driver license:</span
          >
          <input
            class="form-control"
            type="number"
            :placeholder="myAccountInfo.yearOfIssueDriverLicense"
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
            :placeholder="myAccountInfo.claimsHistory"
            v-model="changeUserObj.claimsHistory"
          />
        </label>
        <button type="submit" class="btn btn-outline-warning mt-3">
          Submit
        </button>
      </form>
    </div>
    <MyVehicles />
    <ModalMessage />
  </section>
</template>

<script>
import { FILE_URL, DEFAULT_AVATAR } from "../../constants";
import ModalMessage from "../../components/Modals/ModalMessage.vue";
import MyVehicles from "./MyVehicles.vue";

export default {
  components: {
    MyVehicles,
    ModalMessage,
  },
  data() {
    return {
      FILE_URL: FILE_URL,
      showInput: false,
      avatar: DEFAULT_AVATAR,
      dateOfBirth: ``,
      accountId: ``,
      changeUserObj: {
        avatar: ``,
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
        myInfo: [],
      },
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
    changeAccount() {
      this.changeUserObj.accountId = this.accountId;
      this.changeUserObj.birthDate = this.getTimeStamp(this.dateOfBirth);
      this.$store
        .dispatch(`MODIFY_USER`, this.changeUserObj)
        .then(
          this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`),
          this.scrollToTop()
        )
        .catch((err) => console.log(err))
        .then(
          this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`)
        );
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  min-width: 8em;
}
.my-account {
  min-height: calc(100vh - 10em);
  background-color: $bgOrange;
  background-image: url($mainBg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 7em;
  padding-bottom: 3em;
}
.details li {
  list-style: none;
}
li {
  margin-bottom: 10px;
}
// .my-account_info {
//   outline: solid 3px red;
// }
.user-avatar-wrap {
  width: 290px;
  height: 290px;
  cursor: pointer;
  object-fit: cover;
  @include media-breakpoint-up(sm) {
    width: 180px;
    height: 180px;
    margin-top: 10px;
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
  background-image: url("../../assets/img/icon-change-avatar.png");
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
</style>