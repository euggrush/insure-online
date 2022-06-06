<template>
  <section class="container-fluid">
    <div
      class="
        reset-wrap
        bg-dark bg-gradient
        shadow-lg
        rounded
        mx-auto
        p-3
        text-center text-light
      "
    >
      <h4 class="mt-5">Your password has been successfully changed!</h4>
      <p class="mt-3">New password:</p>
      <p class="mt-3 text-danger fs-2 fw-bold">{{ getNewPassworg }}</p>
      <button
        type="button"
        class="btn btn-outline-danger w-25"
        @click="goToLogin"
      >
        Got it!
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tokenToSend: ``,
    };
  },
  computed: {
    getNewPassworg() {
      return this.$store.state.reset_password.newPassword;
    },
  },
  mounted() {
    this.getUrlParams();
  },
  methods: {
    sendToken() {
      this.$store
        .dispatch(`RESET_PASSWORD`, {
          token: this.tokenToSend,
        })
        .then(() => {
          alert(`password reset`);
        });
    },
    getUrlParams() {
      let queryString = window.location.search;
      let params = new URLSearchParams(queryString);
      let act = params.get(`act`);
      let token = params.get(`token`);
      if (act == `resetPassword`) {
        this.tokenToSend = token;
        this.$nextTick(() => {
          this.sendToken();
        });
      }
    },
    goToLogin() {
        location.replace(`/#/login`);

    },
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  padding-top: 150px;
  padding-bottom: 150px;
  background: url($bgMainCar);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.reset-wrap {
  width: 100%;
  min-height: 300px;
  @include media-breakpoint-up(md) {
    width: 500px;
  }
}
</style>