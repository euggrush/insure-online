
<template>
  <footer
    class="text-center text-lg-start text-white"
    style="background-color: #45526e"
  >
    <div class="container p-4 pb-0">
      <section class="">
        <!--Grid row-->
        <div class="row">
          <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 class="text-uppercase mb-4">
              {{ COMPANY_NAME }}
            </h6>
            <p>
              {{ COMPANY_FOOTER_CONTENT }}
            </p>
          </div>

          <hr class="w-100 clearfix d-md-none" />

          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 class="text-uppercase mb-4">GO TO OUR</h6>
            <p>
              <a class="text-white" :href="LINK_GALLERIES" target="_blank"
                >Galleries</a
              >
            </p>
            <p>
              <a class="text-white" :href="LINK_EVENTS" target="_blank"
                >Events
              </a>
            </p>
            <p>
              <a class="text-white" :href="LINK_BLOG" target="_blank">Blog</a>
            </p>
          </div>

          <hr class="w-100 clearfix d-md-none" />

          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h6 class="text-uppercase mb-4">Useful links</h6>
            <p>
              <a class="text-white" :href="LINK_GET_QUOTE" target="_blank"
                >Get a Quote</a
              >
            </p>
            <p>
              <a
                class="text-white"
                :href="LINK_RENT_SATELITE_PHONE"
                target="_blank"
                >Rent a Satelite phone</a
              >
            </p>
            <p>
              <a
                class="text-white"
                :href="LINK_CARBON_FOOTPRINT"
                target="_blank"
                >Your Carbon Footprint</a
              >
            </p>
            <p>
              <a class="text-white" :href="LINK_PRIVACY_POLICY" target="_blank"
                >Website Privacy Policy</a
              >
            </p>
          </div>

          <hr class="w-100 clearfix d-md-none" />

          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h6 class="text-uppercase mb-4">Contact</h6>
            <p>
              <i class="fas fa-home mr-3"></i
              ><a :href="LINK_GOOGLE_MAPS" target="_blank" class="link-light"
                >&nbsp;{{ CORPORATE_ADDRESS }}</a
              >
            </p>
            <p>
              <i class="fas fa-envelope mr-3"></i
              ><a :href="`mailto:${CORPORATE_EMAIL}`" class="link-light"
                >&nbsp;{{ CORPORATE_EMAIL }}</a
              >
            </p>
            <p>
              <i class="fas fa-phone mr-3"></i
              ><a :href="`tel:${CORPORATE_PHONE}`" class="link-light"
                >&nbsp;{{ CORPORATE_PHONE }}</a
              >
            </p>
            <p>
              <i class="fas fa-print mr-3"></i
              ><a :href="`fax:${CORPORATE_FAX}`" class="link-light"
                >&nbsp;{{ CORPORATE_FAX }}</a
              >
            </p>
          </div>
        </div>
      </section>

      <hr class="my-3" />

      <section class="p-3 pt-0">
        <div class="row d-flex align-items-center">
          <div class="col-md-7 col-lg-8 text-center text-md-start">
            <div class="p-3">
              © 2022 Copyright:
              <a class="text-white" href="#">Insurance Online</a>
            </div>
          </div>

          <div class="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
            <a
              class="btn btn-outline-light btn-floating m-1 text-white"
              role="button"
              ><i class="fab fa-facebook-f"></i
            ></a>

            <a
              class="btn btn-outline-light btn-floating m-1 text-white"
              role="button"
              ><i class="fab fa-twitter"></i
            ></a>

            <a
              class="btn btn-outline-light btn-floating m-1 text-white"
              role="button"
              ><i class="fab fa-google"></i
            ></a>

            <a
              class="btn btn-outline-light btn-floating m-1 text-white"
              role="button"
              ><i class="fab fa-instagram"></i
            ></a>
          </div>
        </div>
      </section>
    </div>
  </footer>
</template>

<script>
import {
  CORPORATE_ADDRESS,
  CORPORATE_CELLPHONE,
  CORPORATE_PHONE,
  CORPORATE_EMAIL,
  CORPORATE_FAX,
  COMPANY_NAME,
  COMPANY_FOOTER_CONTENT,
  LINK_GET_QUOTE,
  LINK_RENT_SATELITE_PHONE,
  LINK_CARBON_FOOTPRINT,
  LINK_PRIVACY_POLICY,
  LINK_GALLERIES,
  LINK_EVENTS,
  LINK_BLOG,
  LINK_GOOGLE_MAPS,
} from "../../constants";
export default {
  data() {
    return {
      CORPORATE_ADDRESS,
      CORPORATE_CELLPHONE,
      CORPORATE_PHONE,
      CORPORATE_EMAIL,
      CORPORATE_FAX,
      COMPANY_NAME,
      COMPANY_FOOTER_CONTENT,
      LINK_GET_QUOTE,
      LINK_RENT_SATELITE_PHONE,
      LINK_CARBON_FOOTPRINT,
      LINK_PRIVACY_POLICY,
      LINK_GALLERIES,
      LINK_EVENTS,
      LINK_BLOG,
      LINK_GOOGLE_MAPS,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>