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

    <div class="signup-form">
      <Transition name="bounce">
        <form
          v-if="show"
          class="bg-dark bg-gradient shadow-lg rounded"
          autocomplete="off"
          @submit.prevent="login"
        >
          <h2 class="text-white">Login</h2>
          <hr />
          <div class="form-group">
            <div class="col">
              <input
                v-model="email"
                type="text"
                class="form-control shadow-lg"
                name="email"
                placeholder="Email"
                required="required"
              />
            </div>
          </div>
          <div class="form-group position-relative">
            <input
              id="user_password"
              v-model="password"
              type="password"
              class="form-control shadow-lg"
              name="password"
              placeholder="Password"
              required="required"
            />
            <label
              class="show-password-label position-absolute top-0 end-0"
              for="show-password"
              ><input
                id="show-password"
                type="checkbox"
                @change="togglePasswordVisibility"
            /></label>
          </div>

          <div
            v-if="this.$store.state.account_validation.isRequired"
            class="form-group"
          >
            <input
              v-model="validationCode"
              type="text"
              class="form-control shadow-lg"
              placeholder="Validation Code"
              required="required"
            />
          </div>

          <div class="form-group">
            <button
              type="submit"
              class="btn btn-outline-danger btn-lg"
              :class="{ shake: disabled }"
            >
              Login
            </button>
            <span v-if="disabled" class="ms-3 text-danger fw-bold">{{
              errorMsg
            }}</span>
          </div>
        </form>
      </Transition>
    </div>
  </section>
</template>

<script>
import ModalMessage from "../Modals/ModalMessage.vue";

export default {
  components: {
    ModalMessage,
  },
  name: `Login`,
  data() {
    return {
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
      this.$store.commit(`SET_MODAL`, {
        isModal: true,
        msg: `Your account required validation. We have sent confirmation code to your email`,
      });
    },
  },
  computed: {
    requireValidation() {
      return this.$store.state.account_validation.isRequired;
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
    togglePasswordVisibility() {
      let x = document.querySelector(`#user_password`);
      let iconEye = document.querySelector(`.show-password-label`);
      iconEye.classList.toggle(`visible`);
      if (x.type === `password`) {
        x.type = `text`;
      } else {
        x.type = `password`;
      }
    },
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
          validationCode: this.validationCode,
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
.login-wrap {
  min-height: 100vh;
  background: url($bgMainCar);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.form-control {
  height: 41px;
  background: #f2f2f2;
  box-shadow: none !important;
  border: none;
}
.form-control:focus {
  background: #e2e2e2;
}
.form-control,
.btn {
  border-radius: 3px;
}
.signup-form {
  margin-top: 150px;
  margin-bottom: 150px;

  @include media-breakpoint-up(sm) {
    width: 400px;
  }
  @include media-breakpoint-up(md) {
    width: 500px;
  }
}
.signup-form form {
  color: #999;
  border-radius: 3px;
  background: #fff;
  padding: 30px;
}
.signup-form h2 {
  color: #333;
  margin-top: 0;
}
.signup-form hr {
  margin: 0 -30px 20px;
}
.signup-form .form-group {
  margin-bottom: 20px;
}
.signup-form input[type="checkbox"] {
  margin-top: 3px;
}
.signup-form .row div:first-child {
  padding-right: 10px;
}
.signup-form .row div:last-child {
  padding-left: 10px;
}
.signup-form .btn {
  min-width: 140px;
}
.signup-form a {
  color: #fff;
  text-decoration: underline;
}
.signup-form a:hover {
  text-decoration: none;
}
.signup-form form a {
  color: #3598dc;
  text-decoration: none;
}
.signup-form form a:hover {
  text-decoration: underline;
}
.signup-form .hint-text {
  padding-bottom: 15px;
  text-align: center;
}
.btn {
  border-radius: 50rem;
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
</style>