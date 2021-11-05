<template>
  <section class="container">
    <form class="simple-login-container" @submit.prevent="login">
      <h2>Login Form</h2>
      <div class="row">
        <div class="col-md-12 form-group">
          <input
            v-model="username"
            type="text"
            class="form-control"
            placeholder="Username"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 form-group">
          <input
            v-model="password"
            type="password"
            placeholder="Enter your Password"
            class="form-control"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 form-group">
          <input
            type="submit"
            class="btn btn-block btn-login"
            placeholder="Enter your Password"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <a href="#">Download Best Theme</a>
        </div>
      </div>
    </form>
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
      this.$store.dispatch('LOGIN', { 
          username: this.username,
          password: this.password
         })
        .then(() => {
          alert(`GOOD`);
        })
        // .catch((err) => {
        //   if (err.response.status == `401`) {
        //     alert(`The email or password you entered is not valid. Please try again.`);
        //   }
        //   if (err.response.status == `500`) {
        //     alert(`Please, check your Internet connection or try again later.`);
        //   }
        // })
    },
  },
};
</script>

<style lang="scss" scoped>
.simple-login-container {
  width: 300px;
  max-width: 100%;
  margin: 50px auto;
}
.simple-login-container h2 {
  text-align: center;
  font-size: 20px;
}

.simple-login-container .btn-login {
  background-color: $mainBlue;
  color: #fff;
}
a {
  color: #fff;
}
</style>