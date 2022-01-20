<template>
  <section class="container my-account pb-5">
    <router-link to="/my-order" class="btn btn-info btn-lg mt-5"
      >Insure</router-link
    >

    <div class="row mt-5 my-account_info">
      <div class="col-md-4 col-xs-12 col-sm-6 col-lg-4">
        <img
          src="https://i.ibb.co/VC7PVnD/vector-unisex-avatar-468.png"
          alt="stack photo"
          class="img user-avatar"
        />
      </div>
      <div class="col-md-8 col-xs-12 col-sm-6 col-lg-8">
        <div class="container" style="border-bottom: 1px solid black">
          <h2 class="mt-3">
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
        class="btn btn-primary"
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
            <button type="submit" class="btn btn-primary mt-3">Submit</button>
          </form>
        </form>
      </div>
    </div>
    <MyVehicles
      :myProps="{ myVehicles: myAccountInfo.vehicles, accountId: accountId }"
    />
  </section>
</template>

<script>
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
  },
  data() {
    return {
      dateOfBirth: ``,
      accountId: ``,
      changeUserObj: {
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
    changeAccount() {
      this.changeUserObj.accountId = this.accountId;
      this.changeUserObj.birthDate = getTimeStamp(this.dateOfBirth);
      this.$store
        .dispatch(`MODIFY_USER`, this.changeUserObj)
        .then(this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`))
        .catch((err) => alert(err))
        .then(
          this.$store.dispatch(`GET_USERS`, `?accountId=${this.accountId}`)
        );
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-info {
  min-width: 8em;
}
.my-account {
  min-height: calc(100vh - 10em);
}
.details li {
  list-style: none;
}
li {
  margin-bottom: 10px;
}
.user-avatar {
  width: 100%;
  height: auto;
  @include media-breakpoint-up(sm) {
    width: 180px;
    margin-top: 10px;
  }
  @include media-breakpoint-up(md) {
    width: 200px;
  }
  @include media-breakpoint-up(lg) {
    width: 250px;
  }
  @include media-breakpoint-up(xl) {
    width: 300px;
  }
}
</style>