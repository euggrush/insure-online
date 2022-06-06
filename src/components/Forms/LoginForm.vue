<template>
  <section
    class="
      container-fluid
      d-flex
      flex-column
      align-items-center
      login-wrap
      position-relative
    "
  >
    <ModalMessage class="modal-error" />

    <div class="login-form position-relative">
      <Transition name="bounce">
        <form
          v-if="show"
          class="bg-dark bg-gradient shadow-lg rounded"
          :class="{ 'form-faded': isFormDisabled }"
          autocomplete="off"
          @submit.prevent="login"
        >
          <h4 class="text-white">Login</h4>
          <hr />

          <div class="input-group">
            <span class="input-group-text" id="inputGroupPrepend">@</span>
            <input
              v-model="email"
              type="text"
              class="form-control shadow-lg"
              name="email"
              placeholder="Email"
              required="required"
              :disabled="isFormDisabled"
            />
          </div>

          <div class="input-group mt-3">
            <label
              class="input-group-text show-password-label"
              :class="{ visible: passwordInputType == `text` }"
              style="width: 40px"
            >
              <input
                class="form-check-input mt-0 visually-hidden"
                type="checkbox"
                v-model="passwordInputType"
                :true-value="'text'"
                :false-value="'password'"
              />
            </label>
            <input
              id="user_password"
              v-model="password"
              :type="passwordInputType"
              class="form-control shadow-lg"
              name="password"
              placeholder="Password"
              required="required"
              :disabled="isFormDisabled"
            />
          </div>

          <div class="input-group mt-3">
            <button
              type="submit"
              class="btn btn-outline-danger rounded-pill login-btn"
              :class="{ shake: disabled }"
              :disabled="isFormDisabled"
            >
              Login
            </button>
            <span
              v-if="disabled"
              class="
                mt-3 mt-md-0
                ms-md-3
                text-danger
                d-block
                fw-bold
                login-err-msg
                text-break
              "
              >{{ errorMsg }}</span
            >
          </div>
          <router-link to="/reset-password" class="d-block link-light mt-3"
            >Forgot password?</router-link
          >
          <OtpInput
            v-if="requireValidation && isFormDisabled"
            class="
              position-absolute
              top-0
              start-50
              translate-middle-x
              mt-3 mt-md-0
            "
            :myProps="{ email: email }"
          />
        </form>
      </Transition>
    </div>
  </section>
</template>

<script>
import ModalMessage from "../Modals/ModalMessage.vue";
import OtpInput from "../Partials/OtpInput.vue";
export default {
  components: {
    ModalMessage,
    OtpInput,
  },
  name: `Login`,
  data() {
    return {
      passwordInputType: `password`,
      isFormDisabled: false,
      show: false,
      email: ``,
      password: ``,
      validationCode: ``,
      disabled: false,
      errorMsg: ``,
    };
  },
  watch: {
    requireValidation() {
      if (
        this.$store.state.account_validation.isRequired &&
        !this.$store.state.validation_code.isSet
      ) {
        this.isFormDisabled = true;
        this.$store.commit(`SET_MODAL`, {
          isModal: true,
          msg: `Your account required validation. We have sent confirmation code to your email`,
        });
      } else {
        this.isFormDisabled = false;
      }
    },
    isSetValidationCode() {
      this.isFormDisabled = false;
    },
  },
  computed: {
    requireValidation() {
      return this.$store.state.account_validation.isRequired;
    },
    validationCodeData() {
      return this.$store.state.validation_code.code;
    },
    isSetValidationCode() {
      return this.$store.state.validation_code.isSet;
    },
  },
  mounted() {
    this.scrollToTop();
    this.hideMenu();
    setTimeout(() => {
      this.show = true;
    }, 200);
  },
  methods: {
    warnDisabled(arg) {
      this.disabled = true;
      this.errorMsg = arg;
      setTimeout(() => {
        this.disabled = false;
        this.errorMsg = ``;
      }, 1500);
    },
    login() {
      this.$store
        .dispatch("LOGIN", {
          email: this.email,
          password: this.password,
          validationCode: this.validationCodeData,
        })
        .then(() => {
          let myRole = this.$store.state.my_role;
          if (myRole === `admin`) {
            this.$router.push(`/admin-panel`);
          } else {
            this.$router.push(`/my-account`);
          }
        })
        .catch((err) => {
          this.warnDisabled(err.response.data.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-btn {
  width: 100%;
  @include media-breakpoint-up(md) {
    width: 25%;
  }
}
.login-err-msg {
  width: 100%;
  @include media-breakpoint-up(md) {
    width: 70%;
  }
}
.login-wrap {
  min-height: 80vh;
  background: url($bgMainCar);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 150px;
  padding-bottom: 150px;
}
.form-control {
  height: 40px;
  background: #f2f2f2;
  box-shadow: none !important;
  border: none;
}
.form-control:focus {
  background: #e2e2e2;
}
.form-control {
  border-radius: 3px;
}
.login-form {
  width: 100%;
  @include media-breakpoint-up(md) {
    width: 500px;
  }
}
.login-form form {
  color: #999;
  border-radius: 3px;
  background: #fff;
  padding: 30px;
}
.login-form h2 {
  color: #333;
  margin-top: 0;
}
.login-form hr {
  margin: 0 -30px 20px;
}
.login-form input[type="checkbox"] {
  margin-top: 3px;
}
.login-form .row div:first-child {
  padding-right: 10px;
}
.login-form .row div:last-child {
  padding-left: 10px;
}
.login-form a {
  color: #fff;
  text-decoration: underline;
}
.login-form a:hover {
  text-decoration: none;
}
.login-form .hint-text {
  padding-bottom: 15px;
  text-align: center;
}
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
.show-password-label {
  width: 40px;
  height: 40px;
  background-image: url("../../assets/img/icon-eye-close.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px 20px;
  cursor: pointer;
}
.visible {
  background-image: url("../../assets/img/icon-eye.png");
}
#show-password {
  display: none;
}
.modal-error {
  width: 100%;
  margin-top: 128px;
  @include media-breakpoint-up(md) {
    width: 44%;
  }
  @include media-breakpoint-up(xl) {
    width: 34%;
  }
}
.form-faded {
  background-color: rgba(0, 0, 0, 0.6) !important;
}
</style>