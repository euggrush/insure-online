<template>
  <section class="container-fluid text-center">
    <form
      class="
        reset-form
        bg-dark bg-gradient
        shadow-lg
        rounded
        p-3
        mx-auto
        text-light
      "
      @submit.prevent="getResetLink"
    >
      <div v-if="isEmailed" class="alert alert-success" role="alert">
        We have emailed your password reset link. You can close this page now.
      </div>
      <div v-else-if="isError" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <h3><i class="fa fa-lock fa-4x"></i></h3>
      <h2 class="text-center">Forgot Password?</h2>
      <p>You can reset your password here.</p>
      <fieldset>
        <div class="form-group ms-md-5 me-md-5">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">@</span>
            <input
              id="emailInput"
              placeholder="email address"
              class="form-control"
              type="email"
              v-model="email"
              required
              :disabled="isEmailed"
            />
          </div>
        </div>
        <div class="form-group">
          <button
            class="btn btn-outline-danger mt-3"
            type="submit"
            :disabled="isEmailed"
          >
            Send my password
          </button>
        </div>
      </fieldset>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isEmailed: false,
      isError: false,
      errorMessage: `Something went wrong please try again later.`,
      email: ``,
    };
  },
  mounted() {
    this.scrollToTop();
  },
  methods: {
    getResetLink() {
      this.$store
        .dispatch(`RESET_PASSWORD`, {
          email: this.email,
        })
        .then(() => {
          this.scrollToTop();
          setTimeout(() => {
            if (this.$store.state.general_errors.isError) {
              this.isError = true;
              this.isEmailed = false;
              this.errorMessage =
                this.$store.state.general_errors.errorData.data.message;
            } else {
              this.isEmailed = true;
              this.email = ``;
            }
          }, 1000);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  background: url($bgMainCar);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 150px;
  padding-bottom: 150px;
}
.reset-form {
  width: 100%;
  @include media-breakpoint-up(md) {
    width: 500px;
  }
}
</style>