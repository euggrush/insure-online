<template>
  <section class="container categories-list-wrapper">
    <!-- ACCOUNTS RENDER -->
    <div class="d-flex justify-content-between">
      <h3 class="mt-3">Accounts:</h3>
      <!-- SEARCH -->
      <div class="search mt-3">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Search by username"
            v-model="searchUsername"
          />
          <button
            @click="searchAccount"
            class="btn btn-outline-light"
            type="button"
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
        </div>
      </div>
    </div>
    <ul class="list-group mt-3">
      <li
        v-for="(account, index) in accountsList"
        :key="index"
        class="list-group-item d-flex justify-content-between"
        :class="{ active: index == pickedAccountIndex }"
        @click="pickAccount(account, index)"
      >
        <span>
          <span class="fw-bold">firts and last name:</span>
          {{ account.firstName || "John" }}&nbsp;{{ account.lastName || "Doe" }}
          <br />
          <span class="fw-bold">username: </span
          ><span>{{ account.username }}</span>
        </span>

        <button
          type="button"
          class="btn btn-info btn-sm"
          @click="showAccountInfo(account, index)"
        >
          Account Info
        </button>
      </li>
    </ul>

    <!-- CREATE NEW ACCOUNT -->
    <div>
      <button
        class="btn btn-primary mt-5"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample1"
        aria-expanded="false"
        aria-controls="collapseExample1"
        :disabled="isBthDisabled"
      >
        Create account
      </button>
    </div>

    <div class="collapse" id="collapseExample1">
      <div class="card card-body">
        <form
          class="account-change-form mt-3 p-3"
          @submit.prevent="createAccount"
        >
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Username:</label>
            <input type="text" class="form-control" v-model="username" />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Password:</label>
            <input type="password" class="form-control" v-model="password" />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email:</label>
            <input type="email" class="form-control" v-model="email" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >First name:</label
            >
            <input type="text" class="form-control" v-model="firstName" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Last name:</label
            >
            <input type="text" class="form-control" v-model="lastName" />
          </div>
          <!-- <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Age:</label>
            <input type="number" class="form-control" v-model="age" />
          </div> -->
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Date of birth:</label>
            <input type="date" class="form-control" v-model="age" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Address:</label
            >
            <input type="text" class="form-control" v-model="address" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Phone:</label>
            <input type="tel" class="form-control" v-model="phoneNumber" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Cellphone:</label
            >
            <input type="tel" class="form-control" v-model="cellphone" />
          </div>
          <button type="submit" class="btn btn-primary mt-5">Submit</button>
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
  </section>
</template>

<script>
import AccountInfo from "./AccountInfo.vue";
export default {
  components: {
    AccountInfo,
  },
  data() {
    return {
      pickedAccountIndex: ``,
      pickedAccountInfo: [],
      username: ``,
      password: ``,
      email: ``,
      firstName: ``,
      lastName: ``,
      age: ``,
      dateOfBirth: ``,
      address: ``,
      cellphone: ``,
      phoneNumber: ``,
      isInfo: false,
      isBthDisabled: false,
      searchUsername: ``,
    };
  },
  computed: {
    accountsList() {
      return this.$store.state.users_array.accounts;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_USERS`, ``);
  },
  methods: {
    createAccount() {
      this.$store
        .dispatch(`MODIFY_USER`, {
          username: this.username,
          password: this.password,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          age: this.age,
          address: this.address,
          cellphone: this.cellphone,
          phoneNumber: this.phoneNumber,
        })
        .then(() => {
          this.$store.dispatch(`GET_USERS`, ``);
        })
        .catch((error) => {
          alert(error);
        });
    },
    pickAccount(account, index) {
      this.pickedAccountIndex = index;
      this.pickedAccountInfo = account;
    },
    showAccountInfo(account, index) {
      this.isInfo = true;
      this.pickedAccountInfo = account;
      this.pickedAccountIndex = ``;
      this.isBthDisabled = true;

      console.log(index);
    },
    closeAccountModal() {
      this.isInfo = false;
      this.isBthDisabled = false;
      this.$store.dispatch(`GET_USERS`, ``);
    },
    searchAccount() {
      this.$store
        .dispatch(`GET_USERS`, `?username=${this.searchUsername}`)
        .then((this.searchUsername = ``));
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
}
.account-modal {
  margin-top: -11.5em;
}
.active {
  z-index: 0;
}
</style>