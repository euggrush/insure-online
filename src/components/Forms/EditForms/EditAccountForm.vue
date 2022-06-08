<template>
  <form
    @submit.prevent="changeAccount()"
    class="card card-body bg-secondary bg-gradient shadow-lg text-white"
  >
    <label>
      <span class="fw-light text-decoration-underline lh-lg">First name:</span>
      <input
        class="form-control"
        type="text"
        :placeholder="myAccountInfo.firstName"
        v-model="changeUserObj.firstName"
      />
    </label>
    <label>
      <span class="fw-light text-decoration-underline lh-lg">Last name:</span>
      <input
        class="form-control"
        type="text"
        :placeholder="myAccountInfo.lastName"
        v-model="changeUserObj.lastName"
      />
    </label>
    <label>
      <span class="fw-light text-decoration-underline lh-lg"
        >Date of birth:</span
      >
      <input class="form-control" type="date" v-model="dateOfBirth" />
    </label>
    <label>
      <span class="fw-light text-decoration-underline lh-lg">Address:</span>
      <input
        class="form-control"
        type="text"
        :placeholder="myAccountInfo.address"
        v-model="changeUserObj.address"
      />
    </label>
    <label>
      <span class="fw-light text-decoration-underline lh-lg">Cellphone:</span>
      <input
        class="form-control"
        type="text"
        :placeholder="myAccountInfo.cellphone"
        v-model="changeUserObj.cellphone"
      />
    </label>
    <label>
      <span class="fw-light text-decoration-underline lh-lg">Home phone:</span>
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
      <span class="fw-light text-decoration-underline lh-lg"
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
      <span class="fw-light text-decoration-underline lh-lg"
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
      <span class="fw-light text-decoration-underline lh-lg"
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
      <span class="fw-light text-decoration-underline lh-lg"
        >Claims history:</span
      >
      <input
        class="form-control"
        type="text"
        :placeholder="myAccountInfo.claimsHistory"
        v-model="changeUserObj.claimsHistory"
      />
    </label>
    <button type="submit" class="btn btn-outline-danger btn-lg mt-3">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      dateOfBirth: ``,
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
  props: {
    myProps: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    myAccountInfo() {
      return this.myProps.myAccountInfo;
    },
  },
  methods: {
    changeAccount() {
      this.changeUserObj.accountId = this.accountId;
      this.changeUserObj.birthDate = this.getTimeStamp(this.dateOfBirth);
      this.$store
        .dispatch(`MODIFY_USER`, this.changeUserObj)
        .then(this.scrollToTop())
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-outline-danger {
  color: $colorBrick;
  border-color: $colorBrick;
}
.btn-outline-danger:hover {
  color: $colorWhite;
  background-color: $colorBrick;
}
</style>