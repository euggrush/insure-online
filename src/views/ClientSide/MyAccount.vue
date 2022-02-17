<template>
  <section class="container-fluid my-account p-3 position-relative">
    <router-link to="/my-order" class="btn btn-dark btn-lg"
      >Quotes</router-link
    >

    <div class="row mt-1 my-account_info">
      <div class="col-md-4 col-xs-12 col-sm-6 col-lg-4">
        <div>
          <label for="formFile" class="form-label fw-bold user-avatar-wrap">
            <img
              :src="`${FILE_URL}${avatar}`"
              alt="avatar"
              class="img user-avatar-photo rounded"
              width="100"
              height="100"
            />
            <input
              type="file"
              id="formFile"
              name="asset"
              @change="uploadAvatar($event)"
              v-show="showInput"
            />
          </label>
        </div>
      </div>
      <div class="col-md-8 col-xs-12 col-sm-6 col-lg-8">
        <div class="container" style="border-bottom: 1px solid black">
          <h2 class="mt-1">
            {{ myAccountInfo.firstName }} {{ myAccountInfo.lastName }}
          </h2>
        </div>
        <hr />
        <p>
          <span class="fw-bold">Cell:&nbsp;</span>{{ myAccountInfo.cellphone }}
        </p>
        <p>
          <span class="fw-bold">Phone:&nbsp;</span
          >{{ myAccountInfo.phoneNumber }}
        </p>
        <p>
          <span class="fw-bold">Email:&nbsp;</span>{{ myAccountInfo.email }}
        </p>
        <p><span class="fw-bold">Age:&nbsp;</span> {{ myAccountInfo.age }}</p>
        <p>
          <span class="fw-bold">Address:&nbsp;</span>{{ myAccountInfo.address }}
        </p>
        <p>
          <span class="fw-bold">Client ID:&nbsp;</span
          >{{ myAccountInfo.clientIdNumber }}
        </p>
        <p>
          <span class="fw-bold">Marital Status:&nbsp;</span
          >{{ myAccountInfo.maritalStatus }}
        </p>
        <p>
          <span class="fw-bold">Country Of Residence:&nbsp;</span
          >{{ myAccountInfo.countryOfResidence }}
        </p>
        <p>
          <span class="fw-bold">Year Of Issue Driver License:&nbsp;</span
          >{{ myAccountInfo.yearOfIssueDriverLicense }}
        </p>
        <p>
          <span class="fw-bold">Claims History:&nbsp;</span
          >{{ myAccountInfo.claimsHistory }}
        </p>
        <p>
          <span class="fw-bold">Previous Insurer:&nbsp;</span
          >{{ myAccountInfo.previousInsurer }}
        </p>
        <p>
          <span class="fw-bold">Created:&nbsp;</span
          >{{ getDate(myAccountInfo.created) }}
        </p>
      </div>
    </div>
    <p class="mt-5 pb-3 border-bottom">
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
      <div class="card card-body">
        <form @submit.prevent="changeAccount">
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
              <span class="fw-bold text-decoration-underline lh-lg"
                >Address:</span
              >
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
            <button type="submit" class="btn btn-dark mt-3">Submit</button>
          </form>
        </form>
      </div>
    </div>
    <MyVehicles />
    <ModalMessage />
  </section>
</template>

<script>
import { FILE_URL, DEFAULT_AVATAR } from "../../constants";
import ModalMessage from "../../components/Modals/ModalMessage.vue";

import MyVehicles from "./MyVehicles.vue";
const dayjs = require("dayjs");
const getTimeStamp = (date) => {
  let myDate = date;
  myDate = myDate.split("-");
  const timestamp = +new Date(
    Date.UTC(myDate[0], myDate[1] - 1, myDate[2])
  ).getTime();
  return timestamp;
};
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
    getDate(date) {
      return dayjs(date).format("MMMM D, YYYY h:mm A");
    },
    uploadAvatar(event) {
      const asset = event.target.files[0];
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
      this.changeUserObj.birthDate = getTimeStamp(this.dateOfBirth);
      this.$store
        .dispatch(`MODIFY_USER`, this.changeUserObj)
        .then(this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`))
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
}
.details li {
  list-style: none;
}
li {
  margin-bottom: 10px;
}
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
  outline: solid 1px $mainBlue;
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
  opacity: 0.5;
}
</style>