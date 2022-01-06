<template>
  <section class="container my-account">
    <div class="row mt-5 my-account_info">
      <div class="col-md-4 col-xs-12 col-sm-6 col-lg-4">
        <img
          src="https://www.svgimages.com/svg-image/s5/man-passportsize-silhouette-icon-256x256.png"
          alt="stack photo"
          class="img"
        />
      </div>
      <div class="col-md-8 col-xs-12 col-sm-6 col-lg-8">
        <div class="container" style="border-bottom: 1px solid black">
          <h2 class="mt-3">{{ myInfo.firstName }} {{ myInfo.lastName }}</h2>
        </div>
        <hr />
        <p>
          <span class="fw-bold">Cellphone:&nbsp;</span>{{ myInfo.cellphone }}
        </p>
        <p>
          <span class="fw-bold">Phone number:&nbsp;</span
          >{{ myInfo.phoneNumber }}
        </p>
        <p><span class="fw-bold">Email:&nbsp;</span>{{ myInfo.email }}</p>
        <p><span class="fw-bold">Age:&nbsp;</span> {{ myInfo.age }}</p>
        <p><span class="fw-bold">Address:&nbsp;</span>{{ myInfo.address }}</p>
        <p>
          <span class="fw-bold">Client ID:&nbsp;</span
          >{{ myInfo.clientIdNumber }}
        </p>
        <p>
          <span class="fw-bold">Marital status:&nbsp;</span
          >{{ myInfo.maritalStatus }}
        </p>
        <p>
          <span class="fw-bold">Country of residence:&nbsp;</span
          >{{ myInfo.countryOfResidence }}
        </p>
        <p>
          <span class="fw-bold">Year of issue driver license:&nbsp;</span
          >{{ myInfo.yearOfIssueDriverLicense }}
        </p>
        <p>
          <span class="fw-bold">Claims history:&nbsp;</span
          >{{ myInfo.claimsHistory }}
        </p>
        <p>
          <span class="fw-bold">Previous insurer:&nbsp;</span
          >{{ myInfo.previousInsurer }}
        </p>
        <p>
          <span class="fw-bold">Account created:&nbsp;</span
          >{{ getDate(myInfo.created) }}
        </p>
      </div>
    </div>
    <p class="mt-5">
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Edit my account details
      </button>
    </p>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        <form @submit.prevent="changeAccount">
          
        </form>
      </div>
    </div>
  </section>
</template>

<script>
const dayjs = require("dayjs");

export default {
  data() {
    return {
      myInfo: {},
    };
  },
  // computed: {
  //   myInfo() {
  //     return this.$store.state.users_array.accounts[0] || [];
  //   },
  // },
  mounted() {
    let accountId = this.$store.state.user.accountId;
    this.$store.dispatch(`GET_USERS`, `?accountId=${accountId}`).then(() => {
      this.myInfo = this.$store.state.users_array.accounts[0];
    });
  },
  methods: {
    getDate(date) {
      return dayjs(date).format("MMMM D, YYYY h:mm A");
    },
    changeAccount() {
      alert(`haha`);
    }
  },
};
</script>

<style lang="scss" scoped>
.my-account {
  min-height: calc(100vh - 10em);
  outline: solid 3px orangered;
}
.details li {
  list-style: none;
}
li {
  margin-bottom: 10px;
}
.my-account_info {
  outline: solid 3px blue;
}
</style>