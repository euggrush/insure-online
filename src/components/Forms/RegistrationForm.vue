<template>
  <section
    class="
      container-fluid
      position-relative
      registration
      bg-secondary bg-gradient
      pb-5
    "
  >
    <div
      class="msg-popup position-absolute top-50 start-50 translate-middle"
      tabindex="-1"
      v-if="isModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Message:</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <p>{{ modalMsg }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="closeModal">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
    <h1 class="fs-3 text-center">Create Account</h1>
    <form
      class="
        row
        needs-validation
        estimation-form
        mx-auto
        mt-5
        p-3
        bg-dark bg-gradient
        shadow-lg
        rounded
      "
      novalidate
      @submit.prevent="createUserAccount"
    >
      <p class="fw-bold text-white">Account Details:</p>
      <div class="col-md-6">
        <label for="validationCustom01" class="form-label mt-1 text-white"
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
        <div class="invalid-feedback">Please enter first name</div>
      </div>
      <div class="col-md-6">
        <label for="validationCustom02" class="form-label mt-1 text-white"
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
        <div class="invalid-feedback">Please enter last name</div>
      </div>
      <div class="col-md-6">
        <label for="validationCustom03" class="form-label mt-1 text-white"
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
        <div class="invalid-feedback">Please provide a valid postal code</div>
      </div>
      <div class="col-md-3">
        <label for="validationCustom04" class="form-label mt-1 text-white"
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
      <div class="col-md-3">
        <label for="validationCustom05" class="form-label mt-1 text-white"
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
      <div class="col-md-4">
        <label for="validationCustom06" class="form-label mt-1 text-white"
          >Cell number</label
        >
        <input
          type="tel"
          class="form-control"
          id="validationCustom06"
          v-model="userPayload.cellphone"
          required
        />
      </div>
      <div class="col-md-4">
        <label for="validationCustom07" class="form-label mt-1 text-white"
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
      </div>
      <div class="col-md-4">
        <label for="validationCustom08" class="form-label mt-1 text-white"
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
      <div class="col-md-4">
        <label for="validationCustom09" class="form-label mt-1 text-white"
          >Year of issue of driver's license</label
        >
        <input
          type="number"
          class="form-control"
          id="validationCustom09"
          v-model="userPayload.yearOfIssueDriverLicense"
          required
        />
        <div class="invalid-feedback">Please enter a year.</div>
      </div>
      <div class="col-md-4">
        <label for="validationCustom11" class="form-label mt-1 text-white"
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
        <div class="invalid-feedback">Please enter your previous insurer.</div>
      </div>
      <div class="col-md-4">
        <label for="validationCustom111" class="form-label mt-1 text-white"
          >Date Of Birth</label
        >
        <input
          type="date"
          pattern=""
          class="form-control"
          id="validationCustom111"
          v-model="birth"
          placeholder="DD.MM.YYYY"
          required
        />
        <div class="invalid-feedback">Please enter your date of birth</div>
      </div>
      <div class="col-md-12">
        <label for="validationCustom10" class="form-label mt-1 text-white"
          >Claims History over the immediate past 3 years</label
        >
        <textarea
          class="form-control"
          id="validationCustom10"
          maxlength="1000"
          v-model="userPayload.claimsHistory"
          required
        />
        <div class="invalid-feedback">Please enter your claims history.</div>
      </div>
      <div class="col-md-6">
        <label for="validationCustomUsername" class="form-label mt-1 text-white"
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
      <div class="col-md-6">
        <label
          for="validationCustomUsername0202"
          class="form-label mt-1 text-white"
          >Password</label
        >
        <div class="input-group has-validation">
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
        <button class="btn btn-outline-warning" type="submit">Create</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isModal: false,
      modalMsg: ``,
      isUserCreated: false,
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
    };
  },
  mounted() {
    this.validateForm();
    this.scrollToTop();
    this.hideMenu();
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    closeModal() {
      this.isModal = false;
      if (this.isUserCreated) {
        setTimeout(() => {
          this.isUserCreated = false;
          this.$router.push(`/login`);
        }, 500);
      }
    },
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
        this.userPayload.birthDate = this.getTimeStamp(this.birth);

        this.$store.dispatch(`CREATE_USER`, this.userPayload).then(() => {
          setTimeout(() => {
            if (this.$store.state.new_user.accountId) {
              this.modalMsg = `Account created, please login with your email and password`;
              this.isModal = true;
              this.resetForm();
              this.isUserCreated = true;
            } else {
              setTimeout(() => {
                this.modalMsg =
                  this.$store.state.new_user.response.data.message ??
                  `Oops, something went wrong`;
                this.isModal = true;
                this.isUserCreated = false;
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
.registration {
  padding-top: 10em;
  // background-image: url($mainBg);
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
}
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
.msg-popup {
  min-width: 60%;
}
.btn {
  min-width: 10em;
}
</style>