<template>
  <form
    class="row needs-validation estimation-form mx-auto mt-1 pb-5"
    novalidate
    @submit.prevent="createUserAccount"
  >
    <!-- BLOCK 01 -->
    <p class="fw-bold">Account Details:</p>
    <div class="col-md-6">
      <label for="validationCustom01" class="form-label mt-1">First name</label>
      <input
        type="text"
        class="form-control"
        id="validationCustom01"
        minlength="2"
        maxlength="15"
        v-model="userPayload.firstName"
        required
      />
      <!-- <div class="valid-feedback">Looks good!</div> -->
      <div class="invalid-feedback">Please enter first name</div>
    </div>
    <!-- BLOCK 02 -->

    <div class="col-md-6">
      <label for="validationCustom02" class="form-label mt-1">Last name</label>
      <input
        type="text"
        class="form-control"
        id="validationCustom02"
        minlength="2"
        maxlength="15"
        v-model="userPayload.lastName"
        required
      />
      <!-- <div class="valid-feedback">Looks good!</div> -->
      <div class="invalid-feedback">Please enter last name</div>
    </div>

    <!-- BLOCK 03 -->

    <div class="col-md-6">
      <label for="validationCustom03" class="form-label mt-1"
        >Area & Postal Code</label
      >
      <input
        type="text"
        class="form-control"
        id="validationCustom03"
        minlength="5"
        maxlength="100"
        v-model="userPayload.address"
        required
      />
      <!-- <div class="valid-feedback">Looks good!</div> -->

      <div class="invalid-feedback">Please provide a valid postal code</div>
    </div>
    <!-- BLOCK 04 -->

    <div class="col-md-3">
      <label for="validationCustom04" class="form-label mt-1"
        >Country of Residence
      </label>
      <select
        class="form-select"
        id="validationCustom04"
        required
        v-model="userPayload.countryOfResidence"
      >
        <option selected disabled value="">Choose...</option>
        <option value="South Africa">South Africa</option>
      </select>
      <div class="invalid-feedback">Please select a valid state.</div>
    </div>
    <!-- BLOCK 05 -->

    <div class="col-md-3">
      <label for="validationCustom05" class="form-label mt-1"
        >Telephone number</label
      >
      <input
        type="tel"
        class="form-control"
        id="validationCustom05"
        v-model="userPayload.phoneNumber"
        required
      />
      <div class="invalid-feedback">Please provide a valid number.</div>
    </div>
    <!-- BLOCK 06 -->

    <div class="col-md-4">
      <label for="validationCustom06" class="form-label mt-1"
        >Cell number</label
      >
      <input
        type="tel"
        class="form-control"
        id="validationCustom06"
        v-model="userPayload.cellphone"
        required
      />
      <!-- <div class="valid-feedback">Looks good!</div> -->
    </div>
    <!-- BLOCK 07 -->

    <div class="col-md-4">
      <label for="validationCustom07" class="form-label mt-1">ID Number</label>
      <input
        type="text"
        class="form-control"
        id="validationCustom07"
        minlength="10"
        maxlength="15"
        v-model="userPayload.clientIdNumber"
        required
      />
      <!-- <div class="valid-feedback">Looks good!</div> -->
    </div>
    <!-- BLOCK 08 -->

    <div class="col-md-4">
      <label for="validationCustom08" class="form-label mt-1"
        >Marital Status</label
      >
      <select
        class="form-select"
        id="validationCustom08"
        required
        v-model="userPayload.maritalStatus"
      >
        <option selected disabled value="">Choose...</option>
        <option value="Single">Single</option>
        <option value="Married">Married</option>
      </select>
      <div class="invalid-feedback">Please select a marital status.</div>
    </div>
    <!-- BLOCK 09 -->

    <div class="col-md-4">
      <label for="validationCustom09" class="form-label mt-1"
        >Year of issue of driver's license</label
      >
      <input
        type="number"
        class="form-control"
        id="validationCustom09"
        v-model="userPayload.yearOfIssueDriverLicense"
        required
      />
      <!-- <div class="valid-feedback">Looks good!</div> -->
      <div class="invalid-feedback">Please enter a year.</div>
    </div>
    <!-- BLOCK 11 -->

    <div class="col-md-4">
      <label for="validationCustom11" class="form-label mt-1"
        >Previous Insurer</label
      >
      <input
        type="text"
        class="form-control"
        id="validationCustom11"
        maxlength="50"
        v-model="userPayload.previousInsurer"
        required
      />
      <!-- <div class="valid-feedback">Looks good!</div> -->
      <div class="invalid-feedback">Please enter your previous insurer.</div>
    </div>
    <!-- BLOCK 111 -->

    <div class="col-md-4">
      <label for="validationCustom111" class="form-label mt-1"
        >Date Of Birth</label
      >
      <input
        type="date"
        class="form-control"
        id="validationCustom111"
        v-model="birth"
        required
      />
      <!-- <div class="valid-feedback">Looks good!</div> -->
      <div class="invalid-feedback">Please enter your date of birth</div>
    </div>
    <!-- BLOCK 10 -->

    <div class="col-md-12">
      <label for="validationCustom10" class="form-label mt-1"
        >Claims History over the immediate past 3 years</label
      >
      <textarea
        class="form-control"
        id="validationCustom10"
        maxlength="1000"
        v-model="userPayload.claimsHistory"
        required
      />
      <!-- <div class="valid-feedback">Looks good!</div> -->
      <div class="invalid-feedback">Please enter your claims history.</div>
    </div>
    <!-- BLOCK 020 -->

    <div class="col-md-6">
      <label for="validationCustomUsername" class="form-label mt-1"
        >Email</label
      >
      <div class="input-group has-validation">
        <span class="input-group-text" id="inputGroupPrepend">@</span>
        <input
          type="text"
          class="form-control"
          id="validationCustomUsername"
          aria-describedby="inputGroupPrepend"
          v-model="userPayload.email"
          required
        />
        <div class="invalid-feedback">Please enter email</div>
      </div>
    </div>
    <!-- BLOCK 0202 -->

    <div class="col-md-6">
      <label for="validationCustomUsername0202" class="form-label mt-1"
        >Password</label
      >
      <div class="input-group has-validation">
        <!-- <span class="input-group-text" id="inputGroupPrepend">@</span> -->
        <input
          type="password"
          class="form-control"
          id="validationCustomUsername0202"
          aria-describedby="inputGroupPrepend"
          v-model="userPayload.password"
          minlength="8"
          required
        />
        <div class="invalid-feedback">
          Please create password, it must be 8 characters long
        </div>
      </div>
    </div>

    <div class="col-12 mt-5">
      <button class="btn btn-primary" type="submit">Create</button>
    </div>
  </form>
</template>

<script>
const getTimeStamp = (date) => {
  let myDate = date;
  myDate = myDate.split("-");
  const timestamp = +new Date(
    Date.UTC(myDate[0], myDate[1] - 1, myDate[2])
  ).getTime();
  return timestamp;
};
export default {
  data() {
    return {
      userPayload: {
        username: ``,
        password: ``,
        email: ``,
        firstName: ``,
        lastName: ``,
        birthDate: ``,
        address: ``,
        countryOfResidence: ``,
        cellphone: ``,
        phoneNumber: ``,
        clientIdNumber: ``,
        maritalStatus: ``,
        yearOfIssueDriverLicense: ``,
        claimsHistory: ``,
        previousInsurer: ``,
      },
      birth: ``,
    };
  },
  mounted() {
    this.validateForm();
  },
  methods: {
    resetForm() {
      this.userPayload.username = ``;
      this.userPayload.password = ``;
      this.userPayload.email = ``;
      this.userPayload.firstName = ``;
      this.userPayload.lastName = ``;
      this.birth = ``;
      this.userPayload.address = ``;
      this.userPayload.countryOfResidence = ``;
      this.userPayload.cellphone = ``;
      this.userPayload.phoneNumber = ``;
      this.userPayload.clientIdNumber = ``;
      this.userPayload.maritalStatus = ``;
      this.userPayload.yearOfIssueDriverLicense = ``;
      this.userPayload.claimsHistory = ``;
      this.userPayload.previousInsurer = ``;
      document
        .querySelector(`.needs-validation`)
        .classList.remove(`was-validated`);
    },
    validateForm() {
      let forms = document.querySelectorAll(".needs-validation");

      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    validatePayloads() {
      if (
        this.userPayload.email !== `` &&
        this.userPayload.password !== `` &&
        this.userPayload.firstName !== `` &&
        this.userPayload.lastName !== `` &&
        this.birth !== `` &&
        this.userPayload.address !== `` &&
        this.userPayload.countryOfResidence !== `` &&
        this.userPayload.cellphone !== `` &&
        this.userPayload.phoneNumber !== `` &&
        this.userPayload.clientIdNumber !== `` &&
        this.userPayload.maritalStatus !== `` &&
        this.userPayload.yearOfIssueDriverLicense !== `` &&
        this.userPayload.claimsHistory !== `` &&
        this.userPayload.previousInsurer !== ``
      ) {
        return true;
      }
      return false;
    },
    createUserAccount() {
      if (this.validatePayloads()) {
        this.userPayload.username = this.userPayload.email;
        this.userPayload.birthDate = getTimeStamp(this.birth);

        this.$store.dispatch(`CREATE_USER`, this.userPayload).then(() => {
          setTimeout(() => {
            if (this.$store.state.new_user.accountId) {
              this.resetForm();
              this.$store.dispatch(`GET_USERS`, `?order=desc`);
            } else {
              console.log(`Oops, something went wrong`);
              setTimeout(() => {
                alert(this.$store.state.new_user.response.data.message);
              }, 1000);
            }
          }, 1000);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>