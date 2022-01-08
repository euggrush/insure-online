<template>
  <section class="container pt-5">
    <h1 class="fs-3 text-center">Create Account</h1>
    <form
      class="row needs-validation estimation-form mx-auto mt-5 pb-5"
      novalidate
      @submit.prevent="createUserAccount"
    >
      <!-- BLOCK 01 -->
      <p class="fw-bold">Account Details:</p>
      <div class="col-md-6">
        <label for="validationCustom01" class="form-label mt-1"
          >First name</label
        >
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
        <label for="validationCustom02" class="form-label mt-1"
          >Last name</label
        >
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
        <label for="validationCustom07" class="form-label mt-1"
          >ID Number</label
        >
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

      <!-- BLOCK 12 -->
      <!-- Vehicle Details -->
      <!-- <p class="mt-5 fw-bold">Vehicle Details:</p>
      <div class="col-md-4">
        <label for="validationCustom12" class="form-label mt-1"
          >Make And Model</label
        >
        <input
          type="text"
          class="form-control"
          id="validationCustom12"
          minlength="5"
          maxlength="30"
          v-model="vehiclePayload.details"
          required
        />
        <div class="invalid-feedback">Please enter vehicle make and model</div>
      </div>

      <div class="col-md-4">
        <label for="validationCustom121" class="form-label mt-1"
          >Vehicke Year</label
        >
        <input
          type="number"
          class="form-control"
          id="validationCustom121"
          v-model="vehiclePayload.year"
          required
        />
        <div class="invalid-feedback">Please enter vehicle year</div>
      </div>

      <div class="col-md-4">
        <label for="validationCustom13" class="form-label mt-1"
          >Registration No.</label
        >
        <input
          type="text"
          class="form-control"
          id="validationCustom13"
          minlength="2"
          maxlength="10"
          v-model="vehiclePayload.regNumber"
          required
        />
        <div class="invalid-feedback">
          Please enter vehicle registration No.
        </div>
      </div>

      <div class="col-md-4">
        <label for="validationCustom14" class="form-label mt-1">VIN</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom14"
          minlength="17"
          maxlength="17"
          v-model="vehiclePayload.vin"
          required
        />
        <div class="invalid-feedback">Please enter vehicle VIN</div>
      </div>

      <div class="col-md-4">
        <label for="validationCustom15" class="form-label mt-1">Engine</label>
        <input
          type="number"
          class="form-control"
          id="validationCustom15"
          step="0.1"
          v-model="vehiclePayload.engine"
          required
        />
        <div class="invalid-feedback">Please enter vehicle engine size</div>
      </div>

      <div class="col-md-4">
        <label for="validationCustom16" class="form-label mt-1"
          >Retail Value</label
        >
        <input
          type="number"
          class="form-control"
          id="validationCustom16"
          v-model="vehiclePayload.retailValue"
          required
        />
        <div class="invalid-feedback">Please enter vehicle retail value</div>
      </div>

      <div class="col-md-6 mt-5">
        <span>Tracking Device</span>
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            id="validationFormCheck2"
            name="radio-stacked"
            value="Yes"
            v-model="vehiclePayload.trackingDevice"
            required
          />
          <label class="form-check-label" for="validationFormCheck2">Yes</label>
        </div>
        <div class="form-check mb-3">
          <input
            type="radio"
            class="form-check-input"
            id="validationFormCheck3"
            name="radio-stacked"
            value="No"
            v-model="vehiclePayload.trackingDevice"
            required
          />
          <label class="form-check-label" for="validationFormCheck3">No</label>
          <div class="invalid-feedback">
            Please check if you have tracking device
          </div>
        </div>
      </div>

      <div class="col-md-6 mt-5">
        <span>Use</span>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault2"
            id="validationFormCheck4"
            value="Private"
            v-model="vehiclePayload.useCase"
            required
          />
          <label class="form-check-label" for="validationFormCheck4">
            Private
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault2"
            id="validationFormCheck5"
            value="Business"
            v-model="vehiclePayload.useCase"
            required
          />
          <label class="form-check-label" for="validationFormCheck5">
            Business
          </label>
          <div class="invalid-feedback">Please check vehicle use case</div>
        </div>
      </div>

      <div class="col-12 mt-5">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="invalidCheck"
            required
          />
          <label class="form-check-label" for="invalidCheck">
            Agree to terms and conditions
          </label>
          <div class="invalid-feedback">You must agree before submitting.</div>
        </div>
      </div> -->
      <div class="col-12 mt-5">
        <button class="btn btn-primary" type="submit">Create</button>
      </div>
    </form>
  </section>
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
      birth: ``,
      isCalculateBtnDisabled: true,
      estimationPayloadObj: {},
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
      // vehiclePayload: {
      //   userId: ``,
      //   details: ``,
      //   year: ``,
      //   regNumber: ``,
      //   vin: ``,
      //   engine: ``,
      //   retailValue: ``,
      //   trackingDevice: ``,
      //   useCase: ``,
      // },
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
        // &&
        // this.vehiclePayload.details !== `` &&
        // this.vehiclePayload.year !== `` &&
        // this.vehiclePayload.regNumber !== `` &&
        // this.vehiclePayload.vin !== `` &&
        // this.vehiclePayload.engine !== `` &&
        // this.vehiclePayload.retailValue !== `` &&
        // this.vehiclePayload.trackingDevice !== `` &&
        // this.vehiclePayload.useCase !== ``
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
              alert(
                `Account created, please login with your email and password`
              );
              this.resetForm();
              setTimeout(() => {
                this.$router.push(`/login`);
              }, 1000);
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
.container {
  min-height: calc(100vh - 7.3em);
}
.estimation-form {
  width: 100%;

  @include media-breakpoint-up(md) {
    width: 600px;
  }
  @include media-breakpoint-up(lg) {
    width: 900px;
  }
}
</style>