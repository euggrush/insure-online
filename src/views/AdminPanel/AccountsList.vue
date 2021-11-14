<template>
  <section class="container categories-list-wrapper">
    <!-- SEARCH -->
    <div class="search">
      <input type="text" placeholder="Search.." />
    </div>
    <!-- ACCOUNTS RENDER -->
    <h3 class="mt-3">Accounts:</h3>
    <ul class="list-group mt-3">
      <li
        v-for="(account, index) in accountsList"
        :key="index"
        class="list-group-item"
        :class="{ active: index === pickedAccountIndex }"
        @click="pickAccount(account, index)"
      >
        {{ account.username }}
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
      >
        Create account
      </button>
    </div>

    <div class="collapse" id="collapseExample1">
      <div class="card card-body">
        <form class="account-change-form mt-3 p-3" @submit.prevent="createAccount">
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
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Age:</label>
            <input type="number" class="form-control" v-model="age" />
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

    <!-- CHANGE ACCOUNT  -->

    <div>
      <button
        class="btn btn-primary mt-5"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample2"
        aria-expanded="false"
        aria-controls="collapseExample2"
      >
        Change account
      </button>
    </div>
    <div class="collapse" id="collapseExample2">
      <div class="card card-body">
        <form class="account-change-form mt-3 p-3">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Username:</label>
            <input
              type="text"
              class="form-control"
              v-model="pickedAccountInfo.username"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >First name:</label
            >
            <input
              type="text"
              class="form-control"
              v-model="pickedAccountInfo.firstName"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Last name:</label
            >
            <input
              type="text"
              class="form-control"
              v-model="pickedAccountInfo.lastName"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Age:</label>
            <input
              type="number"
              class="form-control"
              v-model="pickedAccountInfo.age"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Address:</label
            >
            <input
              type="text"
              class="form-control"
              v-model="pickedAccountInfo.address"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Phone:</label>
            <input
              type="tel"
              class="form-control"
              v-model="pickedAccountInfo.phoneNumber"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Cellphone:</label
            >
            <input
              type="tel"
              class="form-control"
              v-model="pickedAccountInfo.cellphone"
            />
          </div>
          <button type="submit" class="btn btn-primary mt-5">Submit</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
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
      address: ``,
      cellphone: ``,
      phoneNumber: ``,
    };
  },
  computed: {
    accountsList() {
      return this.$store.state.users_array.accounts;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_USERS`);
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
          this.$store.dispatch(`GET_USERS`);
        }).catch((error) => {
          alert(error);
        })
    },
    pickAccount(account, index) {
      this.pickedAccountIndex = index;
      this.pickedAccountInfo = account;
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
}
// .categories-list-wrapper {
//   outline: solid 4px red;
// }
// .account-change-form {
//   outline: solid 4px orange;
// }
</style>