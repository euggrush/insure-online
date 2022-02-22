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
          }
        "
      >
        Create account
      </button>
      <DateRange />
      <SearchAccount />
    </div>
    <div
      class="collapse mt-3"
      :class="{ show: showCreateAccount }"
      id="collapseExample1"
    >
      <div class="card card-body">
        <CreateAccountForm />
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
import AccountInfo from "./AccountInfo.vue";
import DateRange from "../../components/Forms/DateRange.vue";
import SearchAccount from "../../components/Forms/SearchAccount.vue";
import CreateAccountForm from "../../components/Forms/CreateAccountForm.vue";

export default {
  components: {
    AccountInfo,
    DateRange,
    SearchAccount,
    CreateAccountForm,
  },
  data() {
    return {
      date: new Date(2016, 9, 16),
      isInfo: false,
      isBthDisabled: false,
      pickedAccountIndex: ``,
      pickedAccountInfo: [],
      showCreateAccount: false,
    };
  },
  watch: {
    getTimeRange() {
      this.$store.dispatch(
        `GET_USERS`,
        `?order=desc&createdFrom=${this.$store.state.date_range.createdFrom}&createdTo=${this.$store.state.date_range.createdTo}`
      );
    },
  },
  computed: {
    accountsList() {
      return this.$store.state.users_array.accounts;
    },
    getTimeRange() {
      return this.$store.state.date_range;
    },
  },
  mounted() {
    this.$store.dispatch(`GET_USERS`, `?order=desc`);
  },
  methods: {
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
    width: 310px;
  }
  @include media-breakpoint-up(lg) {
    width: 330px;
  }
  @include media-breakpoint-up(xl) {
    margin-top: 0;
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