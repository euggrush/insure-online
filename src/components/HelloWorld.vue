<template>
  <div class="container px-4 px-lg-5">
    <!-- Heading Row-->
    <div class="row gx-4 gx-lg-5 align-items-center my-5">
      <div class="col-lg-7">
        <img
          class="img-fluid rounded mb-4 mb-lg-0"
          src="https://jooinn.com/images/coastal-road-4.jpg"
          alt="image"
        />
      </div>
      <div class="col-lg-5">
        <h1 class="font-weight-light">Your safety is everything to us.</h1>
        <p>
          Find out how we're continuing to be there for you, at home and on the
          road.
        </p>
        <router-link class="btn btn-primary" to="/our-products">Quote online now</router-link>
      </div>
    </div>
    <!-- Call to Action-->
    <div class="card text-white bg-secondary my-5 py-4 text-center">
      <div class="card-body">
        <p class="text-white m-0">Saving you money and saving the day</p>
      </div>
    </div>
    <!-- Content Row-->
    <div class="row gx-4 gx-lg-5">
      <div class="col-md-4 mb-5">
        <div class="card h-100">
          <div class="card-body">
            <h2 class="card-title">MEMBERSHIP</h2>
            <p class="card-text">PROTECTION AND SAVINGS</p>
          </div>
          <div class="card-footer">
            <a class="btn btn-primary btn-sm" href="#!">More Info</a>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-5">
        <div class="card h-100">
          <div class="card-body">
            <h2 class="card-title">INSURANCE</h2>
            <p class="card-text">LOCAL KNOWLEDGE AND EXPERT ADVICE</p>
          </div>
          <div class="card-footer">
            <a class="btn btn-primary btn-sm" href="#!">More Info</a>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-5">
        <div class="card h-100">
          <div class="card-body">
            <h2 class="card-title">AUTOMOTIVE</h2>
            <p class="card-text">KEEPING YOU ON THE ROAD</p>
          </div>
          <div class="card-footer">
            <a class="btn btn-primary btn-sm" href="#!">More Info</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
