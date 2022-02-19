<template>
  <div
    class="order-modal w-100 h-100 p-3 border position-relative"
    :class="{
      'border-warning': order.orderStatus == `approved`,
      'border-danger': order.orderStatus == `rejected`,
      border: order.orderStatus == `pending`,
    }"
  >
    <button
      type="button"
      class="btn-close float-end"
      aria-label="Close"
      @click="closeOrderModal"
    ></button>
    <p
      class="fw-bold text-uppercase"
      :class="{
        'text-warning': order.orderStatus == `approved`,
        'text-danger': order.orderStatus == `rejected`,
      }"
    >
      {{ order.orderStatus }}
    </p>
    <span class="fw-bold fst-italic"
      >Created At {{ getDate(order.orderCreated) }}</span
    >
    <p class="fw-bold mt-3 mb-0">Total R{{ order.allEstimationsTotalCost }}</p>

    <div
      class="row border mt-3 p-3"
      v-for="(mainProduct, index) in order.estimations"
      :key="index"
    >
      <div class="col">
        <strong>{{ mainProduct.vehicleDetails }}</strong>
        <span> <strong>, R</strong>{{ mainProduct.vehicleRetailValue }}</span>
        <img
          src="https://www.pinclipart.com/picdir/big/118-1187597_nouvelle-porsche-911-icon-avto-podbor-bel-clipart.png"
          class="d-block vehicle-image p-5"
          alt="image"
          width="200"
          height="200"
        />
      </div>
      <div class="col">
        <strong class="d-inline-block text-uppercase mt-3 border-bottom"
          >{{ mainProduct.mainProductName }}&nbsp;R{{
            mainProduct.mainProductCost
          }}</strong
        >
        <div
          class="form-check form-switch mt-1 ms-1"
          v-for="(sub, index) in mainProduct.subProducts"
          :key="index"
        >
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            :id="`flexSwitchCheckCheckedDisabled${index}`"
            checked
            disabled
          />
          <label
            class="form-check-label"
            :for="`flexSwitchCheckCheckedDisabled${index}`"
            >{{ sub.subProductName }}&nbsp;<strong>R</strong>
            {{ sub.subProductCost }}</label
          >
        </div>
      </div>
    </div>
    <div class="d-flex flex-wrap mt-3">
      <a
        v-for="(file, index) in order.assets"
        :key="index"
        :href="`${FILE_URL}${file.path}`"
        class="btn btn-outline-dark btn-pdf text-end me-3"
        target="_blank"
      >
        {{ file.description }}
      </a>
    </div>

    <div
      class="mt-3 mb-3"
      v-if="!order.assets.some((e) => e.description === 'Banking Details')"
    >
      <label for="formFile" class="form-label fw-bold"
        >Add Your Banking Details (PDF):</label
      >
      <input
        class="form-control"
        type="file"
        id="formFile"
        name="asset"
        @change="
          uploadFile($event, order.orderId, `Banking Details`, `document`)
        "
      />
    </div>
    <div
      class="mt-3 mb-3"
      v-if="!order.assets.some((e) => e.description === 'Vehicle Invoice')"
    >
      <label for="formFile" class="form-label fw-bold"
        >Add Your Vehicle Invoice (PDF):</label
      >
      <input
        class="form-control"
        type="file"
        id="formFile"
        name="asset"
        @change="
          uploadFile($event, order.orderId, `Vehicle Invoice`, `document`)
        "
      />
    </div>
    <div
      class="mt-3 mb-3"
      v-if="!order.assets.some((e) => e.description === 'Vehicle Registration')"
    >
      <label for="formFile" class="form-label fw-bold"
        >Add Your Vehicle Registration (PDF):</label
      >
      <input
        class="form-control"
        type="file"
        id="formFile"
        name="asset"
        @change="
          uploadFile($event, order.orderId, `Vehicle Registration`, `document`)
        "
      />
    </div>
    <div
      class="mt-3 mb-3"
      v-if="!order.assets.some((e) => e.description === 'Passport Document')"
    >
      <label for="formFile" class="form-label fw-bold"
        >Add Your ID / Passport Document (PDF):</label
      >
      <input
        class="form-control"
        type="file"
        id="formFile"
        name="asset"
        @change="
          uploadFile($event, order.orderId, `Passport Document`, `document`)
        "
      />
    </div>
    <div
      class="mt-3 mb-3"
      v-if="!order.assets.some((e) => e.description === 'Drivers License')"
    >
      <label for="formFile" class="form-label fw-bold"
        >Add Your Drivers License (PDF):</label
      >
      <input
        class="form-control"
        type="file"
        id="formFile"
        name="asset"
        @change="
          uploadFile($event, order.orderId, `Drivers License`, `document`)
        "
      />
    </div>
    <div
      class="mt-3 mb-3"
      v-if="!order.assets.some((e) => e.description === 'Photo Of Vehicle')"
    >
      <label for="formFile" class="form-label fw-bold"
        >Add Photo Of Vehicle (JPEG or PNG):</label
      >
      <input
        class="form-control"
        type="file"
        id="formFile"
        name="asset"
        @change="uploadFile($event, order.orderId, `Photo Of Vehicle`, `photo`)"
      />
    </div>
    <div
      class="msg-popup position-absolute top-50 start-50 translate-middle"
      tabindex="-1"
      v-if="isUploadError"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Message:</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <p class="text-black">{{ errMsg }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="closeModal">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FILE_URL } from "../../constants";
const dayjs = require("dayjs");

export default {
  data() {
    return {
      isUploadError: false,
      FILE_URL: FILE_URL,
    };
  },
  props: {
    myProps: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    order() {
      return this.myProps.order;
    },
  },
  methods: {
    getOrder(id) {
      this.$store.dispatch(`GET_ORDERS`, `?orderId=${id}`);
    },
    getDate(date) {
      return dayjs(date).format("MMMM D, YYYY h:mm A");
    },
    closeOrderModal() {
      this.$emit(`closeOrderView`, {});
    },
    closeModal() {
      this.isUploadError = false;
    },
    uploadFile(event, id, description, fileType) {
      let asset = event.target.files[0];

      let formData = new FormData();
      formData.append(
        `meta`,
        JSON.stringify({
          fileType: fileType,
          description: description,
          relatedTo: `orders`,
          relationId: id,
        })
      );
      formData.append("asset[]", asset);

      this.$store.dispatch(`UPLOAD`, formData).then(() => {
        setTimeout(() => {
          if (
            this.$store.state.uploaded_file &&
            this.$store.state.uploaded_file.state == `ok`
          ) {
            this.getOrder(id);
          } else {
            this.isUploadError = true;
            this.errMsg =
              this.$store.state.general_errors.data.message ??
              `File upload error, please try later`;
          }
        }, 1000);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.vehicle-image {
  width: 100%;
  height: auto;
}
</style>