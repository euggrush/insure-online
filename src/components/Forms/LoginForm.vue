<template>
  <section
    class="
      container-fluid
      d-flex
      flex-column
      justify-content-center
      align-items-center
      reg-wrap
      bg-secondary bg-gradient
      position-relative
    "
  >
    <ModalMessage />
    <div class="signup-form">
      <form
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
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            class="form-control shadow-lg"
            name="password"
            placeholder="Password"
            required="required"
          />
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
            class="btn btn-outline-warning btn-lg"
            :class="{ shake: disabled }"
          >
            Login
          </button>
          <span v-if="disabled" class="ms-3 text-danger fw-bold">{{
            errorMsg
          }}</span>
        </div>
      </form>
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
    this.hideMenu();
  },
  methods: {
    warnDisabled(arg) {
      this.disabled = true;
      this.errorMsg = arg;
      setTimeout(() => {
        this.disabled = false;
        this.warnDisabled = ``;
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
          // this.$store.commit(`SET_MODAL`, {
          //   isModal: true,
          //   msg: err.response.data.message,
          // });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.reg-wrap {
  min-height: calc(100vh - 127px);
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
  font-weight: bold;
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
  font-size: 16px;
  font-weight: bold;
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
</style>