<template>
  <!-- Portfolio-->

  <section id="portfolio">
    <div class="container">
      <div class="card">
        <img src="../../assets/img/car-small1.jpg" />
        <div class="card__head">Sport Utility Vehicles (SUVs)</div>
      </div>
      <div class="card">
        <img src="../../assets/img/car-small2.jpg" />
        <div class="card__head">4x4's</div>
      </div>
      <div class="card">
        <img src="../../assets/img/car-small3.jpg" />
        <div class="card__head">Lifestyle Utility Vehicles (LUVs)</div>
      </div>
      <div class="card">
        <img src="../../assets/img/car-small5.jpg" />
        <div class="card__head">Sport Utility Vehicles</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#portfolio {
  margin: 0;
  min-height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -4vmin;
  overflow: hidden;
  transform: skew(5deg);
  @include media-breakpoint-up(sm) {
    margin: 4vmin;
  }
  @include media-breakpoint-up(md) {
    margin: 10vmin;
  }
  .card {
    flex: 1;
    transition: all 1s ease-in-out;
    height: 75vmin;
    position: relative;
    .card__head {
      color: black;
      background: rgba(24, 23, 24, 0.75);
      padding: 0.5em;
      transform: rotate(-90deg);
      transform-origin: 0% 0%;
      transition: all 0.5s ease-in-out;
      min-width: 100%;
      text-align: center;
      position: absolute;
      bottom: 0;
      left: 0;
      white-space: nowrap;
    }

    &:hover {
      flex-grow: 10;
      img {
        filter: grayscale(0);
      }
      .card__head {
        text-align: center;
        top: calc(100% - 2em);
        color: white;
        background: rgba(0, 0, 0, 0.5);
        transform: rotate(0deg) skew(-5deg);
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 1s ease-in-out;
      filter: grayscale(100%);
    }
    &:not(:nth-child(5)) {
      margin-right: 1em;
    }
  }
}
</style>