<template>
  <!-- SEARCH -->
  <div class="search d-flex border rounded">
    <select
      @change="makeSelection()"
      v-model="accountSearchOption"
      class="form-select search-select"
      aria-label="select"
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
</template>

<script>
export default {
  data() {
    return {
      searchBtnInputDisabled: true,
      accountSearchOption: ``,
      searchUser: ``,
      showAllusers: false,
    };
  },
  methods: {
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
            this.$store.commit(`SET_MODAL`, {
              msg: err.response.data.message,
              isModal: true,
            }),
              (this.showAllusers = false);
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
input,
select,
select::-webkit-input-placeholder,
input::-webkit-input-placeholder {
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
</style>