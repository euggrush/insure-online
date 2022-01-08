<template>
  <section class="container-fluid reg-wrap bg-dark">
    <div class="signup-form">
      <form autocomplete="off" @submit.prevent="login">
        <h2>Login</h2>
        <hr />
        <div class="form-group">
          <div class="row">
            <div class="col">
              <input
                v-model="username"
                type="text"
                class="form-control shadow-lg"
                name="username"
                placeholder="Username"
                required="required"
              />
            </div>
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

        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-lg">Login</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: `Login`,
  data() {
    return {
      username: ``,
      password: ``,
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("LOGIN", {
          username: this.username,
          password: this.password,
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
          alert(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.reg-wrap {
  min-height: calc(100vh - 127px);
  color: #fff;
  background-image: url($mainBg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 4em;
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
    margin: 0 auto;
  }
  @include media-breakpoint-up(md) {
    width: 500px;
  }
}
.signup-form form {
  color: #999;
  border-radius: 3px;
  // margin-bottom: 15px;
  background: #fff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
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
  border: none;
  min-width: 140px;
}
.signup-form .btn:hover,
.signup-form .btn:focus {
  background: #2389cd !important;
  outline: none;
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
</style>