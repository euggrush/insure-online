<template>
  <section class="container pt-5">
    <form
      class="row needs-validation estimation-form mx-auto pb-5"
      novalidate
      @submit.prevent="getEstimation"
    >
      <!-- BLOCK 01 -->
      <p class="fw-bold">Account Details:</p>
      <div class="col-md-4">
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

      <div class="col-md-4">
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
      <!-- BLOCK 020 -->

      <div class="col-md-4">
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
          v-model="userPayload.birthDate"
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

      <!-- BLOCK 12 -->
      <!-- Vehicle Details -->
      <p class="mt-5 fw-bold">Vehicle Details:</p>
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
        <!-- <div class="valid-feedback">Looks good!</div> -->
        <div class="invalid-feedback">Please enter vehicle make and model</div>
      </div>
      <!-- BLOCK 121 -->

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
        <!-- <div class="valid-feedback">Looks good!</div> -->
        <div class="invalid-feedback">Please enter vehicle year</div>
      </div>

      <!-- BLOCK 13 -->

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
        <!-- <div class="valid-feedback">Looks good!</div> -->
        <div class="invalid-feedback">
          Please enter vehicle registration No.
        </div>
      </div>
      <!-- BLOCK 14 -->

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
        <!-- <div class="valid-feedback">Looks good!</div> -->
        <div class="invalid-feedback">Please enter vehicle VIN</div>
      </div>
      <!-- BLOCK 15 -->

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
        <!-- <div class="valid-feedback">Looks good!</div> -->
        <div class="invalid-feedback">Please enter vehicle engine size</div>
      </div>
      <!-- BLOCK 16 -->

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
        <!-- <div class="valid-feedback">Looks good!</div> -->
        <div class="invalid-feedback">Please enter vehicle retail value</div>
      </div>

      <!-- BLOCK 17 -->

      <div class="col-md-6 mt-5">
        <span>Tracking Device</span>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value="Yes"
            v-model="vehiclePayload.trackingDevice"
          />
          <label class="form-check-label" for="flexRadioDefault1"> Yes </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            value="No"
            v-model="vehiclePayload.trackingDevice"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault2"> No </label>
        </div>
        <!-- <div class="valid-feedback">Looks good!</div> -->
      </div>
      <!-- BLOCK 18 -->

      <div class="col-md-6 mt-5">
        <span>Use</span>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault2"
            id="flexRadioDefault3"
            value="Private"
            v-model="vehiclePayload.useCase"
          />
          <label class="form-check-label" for="flexRadioDefault3">
            Private
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault2"
            id="flexRadioDefault4"
            value="Business"
            v-model="vehiclePayload.useCase"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault4">
            Business
          </label>
        </div>
        <!-- <div class="valid-feedback">Looks good!</div> -->
      </div>
      <!-- BLOCK 19 -->

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
      </div>
      <div class="col-12 mt-5">
        <button class="btn btn-primary" type="submit">Calculate</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isFormValidated: false,
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
      vehiclePayload: {
        accountId: ``,
        details: ``,
        year: ``,
        regNumber: ``,
        vin: ``,
        engine: ``,
        retailValue: ``,
        trackingDevice: ``,
        useCase: ``,
      },
    };
  },
  methods: {
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
      if (document.querySelector(`.was-validated`)) {
        return true
      }
      return false;
    },
    getEstimation() {
      this.validateForm();
      if(this.validateForm()) {
        this.userPayload.username = this.userPayload.email;
        this.userPayload.password = this.userPayload.email;
        
        console.log(this.userPayload);
        console.log(this.vehiclePayload);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: calc(100vh - 7.3em);

  outline: solid 4px red;
}
.estimation-form {
  width: 100%;
  outline: solid 4px blue;

  @include media-breakpoint-up(md) {
    width: 600px;
  }
  @include media-breakpoint-up(lg) {
    width: 900px;
  }
}
</style>