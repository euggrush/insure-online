<template>
  <!-- Portfolio-->
  <div id="portfolio">
    <div class="container-fluid pb-0 ps-0 pe-0 pt-0">
      <div class="row g-0">
        <div class="col-lg-4 col-sm-6">
          <a class="portfolio-box" href="#" title="Project Name">
            <img
              class="img-fluid"
              src="https://i.ibb.co/hgcQFfg/11.jpg"
              alt="photo"
            />
          </a>
        </div>
        <div class="col-lg-4 col-sm-6">
          <a class="portfolio-box" href="#" title="Project Name">
            <img
              class="img-fluid"
              src="https://i.ibb.co/BLcgtqF/10.jpg"
              alt="photo"
            />
          </a>
        </div>
        <div class="col-lg-4 col-sm-6">
          <a class="portfolio-box" href="#" title="Project Name">
            <img
              class="img-fluid"
              src="https://i.ibb.co/5sM3CNg/9.jpg"
              alt="photo"
            />
          </a>
        </div>
        <div class="col-lg-4 col-sm-6">
          <a class="portfolio-box gradient" href="#" title="Project Name">
            <img
              class="img-fluid"
              src="https://i.ibb.co/X4rm2Y4/8.jpg"
              alt="photo"
            />
          </a>
        </div>
        <div class="col-lg-4 col-sm-6">
          <a class="portfolio-box gradient" href="#" title="Project Name">
            <img
              class="img-fluid"
              src="https://i.ibb.co/rMrc6JK/7.jpg"
              alt="photo"
            />
          </a>
        </div>
        <div class="col-lg-4 col-sm-6">
          <a class="portfolio-box gradient" href="#" title="Project Name">
            <img
              class="img-fluid"
              src="https://i.ibb.co/4Kz5xDg/12.webp"
              alt="photo"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#portfolio .container-fluid,
#portfolio .container-sm,
#portfolio .container-md,
#portfolio .container-lg,
#portfolio .container-xl,
#portfolio .container-xxl {
  max-width: 1920px;
}
#portfolio .container-fluid .portfolio-box,
#portfolio .container-sm .portfolio-box,
#portfolio .container-md .portfolio-box,
#portfolio .container-lg .portfolio-box,
#portfolio .container-xl .portfolio-box,
#portfolio .container-xxl .portfolio-box {
  position: relative;
  display: block;
}
#portfolio .container-fluid .portfolio-box .portfolio-box-caption,
#portfolio .container-sm .portfolio-box .portfolio-box-caption,
#portfolio .container-md .portfolio-box .portfolio-box-caption,
#portfolio .container-lg .portfolio-box .portfolio-box-caption,
#portfolio .container-xl .portfolio-box .portfolio-box-caption,
#portfolio .container-xxl .portfolio-box .portfolio-box-caption {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  opacity: 0;
  color: #fff;
  background: rgba(244, 98, 58, 0.9);
  transition: opacity 0.25s ease;
  text-align: center;
}
#portfolio
  .container-fluid
  .portfolio-box
  .portfolio-box-caption
  .project-category,
#portfolio
  .container-sm
  .portfolio-box
  .portfolio-box-caption
  .project-category,
#portfolio
  .container-md
  .portfolio-box
  .portfolio-box-caption
  .project-category,
#portfolio
  .container-lg
  .portfolio-box
  .portfolio-box-caption
  .project-category,
#portfolio
  .container-xl
  .portfolio-box
  .portfolio-box-caption
  .project-category,
#portfolio
  .container-xxl
  .portfolio-box
  .portfolio-box-caption
  .project-category {
  font-family: var(--bs-body-font-family);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
}
#portfolio .container-fluid .portfolio-box .portfolio-box-caption .project-name,
#portfolio .container-sm .portfolio-box .portfolio-box-caption .project-name,
#portfolio .container-md .portfolio-box .portfolio-box-caption .project-name,
#portfolio .container-lg .portfolio-box .portfolio-box-caption .project-name,
#portfolio .container-xl .portfolio-box .portfolio-box-caption .project-name,
#portfolio .container-xxl .portfolio-box .portfolio-box-caption .project-name {
  font-size: 1.2rem;
}
#portfolio .container-fluid .portfolio-box:hover .portfolio-box-caption,
#portfolio .container-sm .portfolio-box:hover .portfolio-box-caption,
#portfolio .container-md .portfolio-box:hover .portfolio-box-caption,
#portfolio .container-lg .portfolio-box:hover .portfolio-box-caption,
#portfolio .container-xl .portfolio-box:hover .portfolio-box-caption,
#portfolio .container-xxl .portfolio-box:hover .portfolio-box-caption {
  opacity: 1;
}
</style>