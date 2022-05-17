<template>
  <!-- Masthead-->
  <header class="masthead">
    <div class="container px-4 px-lg-5 h-100">
      <div
        class="
          row
          gx-4 gx-lg-5
          h-100
          align-items-center
          justify-content-center
          text-center
        "
      >
        <div class="col-lg-8 align-self-end">
          <h1 class="text-white font-weight-bold">
            YOUR SAFETY IS EVERYTHING TO US.
          </h1>
          <hr class="divider" />
        </div>
        <div class="col-lg-8 align-self-baseline">
          <p class="text-white-75 mb-5">
            Find out how we're continuing to be there for you on the road.
          </p>
          <button
            class="btn pt-3 pb-3 ps-5 pe-5 custom-btn text-light"
            @click="scrollToContent"
          >
            Find Out More
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    scrollToContent() {
      window.scrollTo(
        0,
        document.getElementById(`services`).getBoundingClientRect().y +
          window.scrollY -
          120
      );
    },
  },
};
</script>

<style lang="scss" scoped>
header.masthead {
  padding-top: 10rem;
  padding-bottom: calc(10rem - 4.5rem);
  background: 
  // linear-gradient(
  //     to bottom,
  //     rgba(92, 77, 66, 0.8) 0%,
  //     rgba(92, 77, 66, 0.8) 100%
  //   ),
    url($bgMainCar);
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
}
header.masthead h1,
header.masthead .h1 {
  font-size: 2.25rem;
}
@media (min-width: 992px) {
  header.masthead {
    height: 100vh;
    min-height: 40rem;
    padding-top: 4.5rem;
    padding-bottom: 0;
  }
  header.masthead p {
    font-size: 1.15rem;
  }
  header.masthead h1,
  header.masthead .h1 {
    font-size: 3rem;
  }
}
@media (min-width: 1200px) {
  header.masthead h1,
  header.masthead .h1 {
    font-size: 3.5rem;
  }
}
</style>