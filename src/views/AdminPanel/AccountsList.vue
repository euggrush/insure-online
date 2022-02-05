<template>
  <section class="container">
    <!-- ACCOUNTS RENDER -->
    <h3 class="mt-3">Accounts:</h3>

    <div
      class="d-flex justify-content-between flex-wrap align-items-center mt-1"
    >
      <!-- CREATE NEW ACCOUNT -->
      <button
        class="btn btn-primary create-user-btn"
        type="button"
        data-bs-target="#collapseExample1"
        aria-expanded="false"
        aria-controls="collapseExample1"
        :disabled="isBthDisabled"
        @click="
          () => {
            showCreateAccount = !showCreateAccount;
            validateForm();
          }
        "
      >
        Create account
      </button>
      <!-- SEARCH -->
      <div class="search d-flex border rounded">
        <select
          @change="makeSelection()"
          v-model="accountSearchOption"
          class="form-select search-select"
          aria-label="select"
          required
        >
          <option disabled value>Search by...</option>
          <option :value="`clientIdNumber`" selected>ID</option>
          <option :value="`firstName`">First Name</option>
          <option :value="`lastName`">Last Name</option>
          <option :value="`cellphone`">Cell</option>
          <option :value="`email`">Email</option>
        </select>
        <input
          type="text"
          class="form-control"
          placeholder="Search..."
          v-model="searchUser"
          :disabled="searchBtnInputDisabled"
          required
        />
        <button
          @click="searchAccount"
          class="btn btn-outline-light search-btn"
          type="button"
          v-if="!showAllusers"
          :disabled="searchBtnInputDisabled"
        >
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="23px"
            viewBox="0 0 24 24"
            aria-labelledby="searchIconTitle"
            stroke="#2329D6"
            stroke-width="1.7142857142857142"
            stroke-linecap="square"
            stroke-linejoin="miter"
            fill="none"
            color="#2329D6"
          >
            <title id="searchIconTitle">Search</title>
            <path d="M14.4121122,14.4121122 L20,20" />
            <circle cx="10" cy="10" r="6" />
          </svg>
        </button>
        <button
          class="btn btn-outline-light search-btn"
          v-if="showAllusers"
          @click="findAllUsers"
        >
          All
        </button>
      </div>
    </div>
    <div
      class="collapse mt-3"
      :class="{ show: showCreateAccount }"
      id="collapseExample1"
    >
      <div class="card card-body">
        <form
          class="row needs-validation estimation-form mx-auto mt-1 pb-5"
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

            <div class="invalid-feedback">
              Please provide a valid postal code
            </div>
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
            <div class="invalid-feedback">
              Please enter your previous insurer.
            </div>
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
            <div class="invalid-feedback">
              Please enter your claims history.
            </div>
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
      </div>
    </div>
    <!-- MODAL ACCOUNT INFO -->
    <div
      v-if="isInfo"
      class="w-100 bg-light account-modal p-3 position-relative"
    >
      <button
        @click="closeAccountModal"
        type="button"
        class="btn-close float-end"
        aria-label="Close"
      ></button>
      <AccountInfo :accountId="pickedAccountInfo.accountId" />
    </div>

    <!-- MODAL ACCOUNT INFO END -->
    <ul class="list-group">
      <li
        v-for="(account, index) in accountsList"
        :key="index"
        class="list-group-item shadow-lg"
      >
        <div class="row">
          <div class="col">
            <span>
              {{ account.firstName || "John" }}&nbsp;{{
                account.lastName || "Doe"
              }}
            </span>
          </div>
          <div class="col-lg-6">
            <span
              >Created:&nbsp;<span class="fst-italic">{{
                getDate(account.created)
              }}</span></span
            >
          </div>
          <div class="col">
            <span
              >Status:
              <span
                class="text-uppercase fw-bold"
                :class="{
                  'text-primary': account.role == `user`,
                  'text-danger': account.role == `admin`,
                }"
                >{{ account.role }}</span
              ></span
            >
          </div>
          <div class="col">
            <button
              type="button"
              class="btn btn-info btn-sm float-end"
              @click="showAccountInfo(account, index)"
            >
              More...
            </button>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
const dayjs = require("dayjs");

const getTimeStamp = (date) => {
  let myDate = date;
  myDate = myDate.split("-");
  const timestamp = +new Date(
    Date.UTC(myDate[0], myDate[1] - 1, myDate[2])
  ).getTime();
  return timestamp;
};
import AccountInfo from "./AccountInfo.vue";
export default {
  components: {
    AccountInfo,
  },
  data() {
    return {
      searchBtnInputDisabled: true,
      accountSearchOption: ``,
      searchUser: ``,
      isInfo: false,
      isBthDisabled: false,
      pickedAccountIndex: ``,
      pickedAccountInfo: [],
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
      showAllusers: false,
      showCreateAccount: false,
    };
  },
  computed: {
    accountsList() {
      return this.$store.state.users_array.accounts;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_USERS`, `?order=desc`);
  },
  methods: {
    getDate(date) {
      return dayjs(date).format("MMMM D, YYYY h:mm A");
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

    showAccountInfo(account, index) {
      this.showCreateAccount = false;
      this.isInfo = true;
      this.pickedAccountInfo = account;
      this.pickedAccountIndex = ``;
      this.isBthDisabled = true;

      console.log(index);
    },
    closeAccountModal() {
      this.isInfo = false;
      this.isBthDisabled = false;
      this.$store.dispatch(`GET_USERS`, `?order=desc`);
    },
    makeSelection() {
      if (this.accountSearchOption != ``) {
        this.searchBtnInputDisabled = false;
      }
    },
    searchAccount() {
      if (this.searchUser != `` && this.accountSearchOption != ``) {
        this.$store
          .dispatch(
            `GET_USERS`,
            `?${this.accountSearchOption}=${this.searchUser}`
          )
          .then(
            (this.searchUser = ``),
            (this.showAllusers = true),
            (this.accountSearchOption = ``),
            (this.searchBtnInputDisabled = true)
          )
          .catch((err) => {
            alert(err.response.data.message), (this.showAllusers = false);
          });
      }
    },
    findAllUsers() {
      this.$store
        .dispatch(`GET_USERS`, `?order=desc`)
        .then(
          (this.searchUser = ``),
          (this.showAllusers = false),
          (this.searchBtnInputDisabled = true)
        );
    },
  },
};
</script>

<style lang="scss" scoped>
.list-group {
  margin-top: 12px;
}
li {
  cursor: pointer;
}
.account-modal {
  margin-top: -13em;
  @include media-breakpoint-up(sm) {
    margin-top: -9em;
  }
  @include media-breakpoint-up(xl) {
    margin-top: -8em;
  }
  @include media-breakpoint-up(xxl) {
    margin-top: -8em;
  }
}
.active {
  z-index: 0;
}
.search {
  width: 100%;
  margin-top: 18px;
  padding: 3px;
  background-color: $colorWhite;
  @include media-breakpoint-up(md) {
    margin-top: 0;
    width: 310px;
  }
  @include media-breakpoint-up(lg) {
    width: 330px;
  }
}
.search-select {
  width: 66px;
  border: none;
  @include media-breakpoint-up(md) {
    width: auto;
  }
}
.search-btn {
  border: none;
  border-radius: 0;
  color: $colorDark;
}
.create-user-btn {
  min-width: 12em !important;
  // margin-top: 8px;
  // @include media-breakpoint-up(sm) {
  //   margin-top: 9px;
  // }
  // @include media-breakpoint-up(md) {
  //   margin-top: 9px;
  // }
  // @include media-breakpoint-up(lg) {
  //   margin-top: 9px;
  // }
  // @include media-breakpoint-up(xl) {
  //   margin-top: 11px;
  // }
  // @include media-breakpoint-up(xxl) {
  //   margin-top: 12px;
  // }
}
input,
select,
select::-webkit-input-placeholder,
input::-webkit-input-placeholder {
  border: none;
  font-size: $font-size-micro;
  @include media-breakpoint-up(sm) {
    font-size: $font-size-mobile;
  }
  @include media-breakpoint-up(md) {
    font-size: $font-size-medium;
  }
  @include media-breakpoint-up(lg) {
    font-size: $font-size-medium;
  }
}
input:focus,
select:focus,
input:active,
select:active {
  outline: 0px !important;
  -webkit-appearance: none;
  box-shadow: none !important;
}
.btn-primary {
  min-width: 10em;
}
.btn-info {
  @include media-breakpoint-up(md) {
    min-width: 12em;
  }
}
</style>