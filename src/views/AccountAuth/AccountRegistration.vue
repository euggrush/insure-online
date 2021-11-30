<template>
  <section class="container-fluid reg-wrap pt-5 pb-5">
    <div class="signup-form">
      <form autocomplete="off" @submit.prevent="signUp">
        <h2>Sign Up</h2>
        <p>Please fill in this form to create an account!</p>
        <hr />
        <div class="form-group">
          <div class="row">
            <div class="col">
              <input
                v-model="username"
                type="text"
                class="form-control"
                name="username"
                placeholder="Username"
                required="required"
              />
            </div>
            <!-- <div class="col">
            <input
              type="text"
              class="form-control"
              name="last_name"
              placeholder="Last Name"
              required="required"
            />
          </div> -->
          </div>
        </div>
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            class="form-control"
            name="email"
            placeholder="Email"
            required="required"
          />
        </div>
        <div class="form-group">
          <input
            v-model="password"
            type="password"
            class="form-control"
            name="password"
            placeholder="Password"
            required="required"
          />
        </div>
        <!-- <div class="form-group">
        <input
          type="password"
          class="form-control"
          name="confirm_password"
          placeholder="Confirm Password"
          required="required"
        />
      </div> -->
        <div class="form-group">
          <label class="form-check-label"
            ><input type="checkbox" required="required" /> I accept the
            <a href="#">Terms of Use</a> &amp;
            <a href="#">Privacy Policy</a></label
          >
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-info btn-lg">Sign Up</button>
        </div>
      </form>
      <div class="hint-text">
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: `SignUp`,
  data() {
    return {
      username: ``,
      password: ``,
      email: ``,
    };
  },
  methods: {
    signUp() {
      this.$store
        .dispatch(`REGISTRATION`, {
          username: this.username,
          password: this.password,
          email: this.email,
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
  min-height: calc(100vh - 7em);
  color: #fff;
  background-image: url($mainBg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
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
  width: 400px;
  margin: 0 auto;
}
.signup-form form {
  color: #999;
  border-radius: 3px;
  margin-bottom: 15px;
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