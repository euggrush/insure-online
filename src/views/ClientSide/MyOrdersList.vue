<template>
  <section class="my-orders-list">
    <ul class="list-group">
      <li
        v-for="(order, index) in ordersList"
        :key="index"
        class="list-group-item"
      >
        <div class="container">
          <div class="row border p-1 order-item">
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Order status:</span
              >
              <span
                class="fw-bold text-uppercase"
                :class="{
                  'text-primary': order.orderStatus == `approved`,
                  'text-danger': order.orderStatus == `rejected`,
                }"
                >{{ order.orderStatus }}</span
              >
            </div>

            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Customer:</span
              >
              <span>{{ order.firstName }}</span>
              <span>&nbsp;{{ order.lastName }}</span>
            </div>

            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Car:</span
              >
              <span>{{ order.vehicleDetails }}</span>
            </div>
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Car value:</span
              >
              <span>{{ order.vehicleRetailValue }}</span>
            </div>
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Category:</span
              >
              <span>{{ order.categoryName }}</span>
            </div>
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Product:</span
              >
              <span>{{ order.mainProductName }}</span>
            </div>
            <div class="col border-bottom border-start">
              <span class="d-block fw-bold text-decoration-underline"
                >Total:</span
              >
              <span>R{{ order.totalCost }}</span>
            </div>
            <div class="col">
              <button
                type="button"
                class="btn btn-primary float-end mt-3"
                @click="getOrder(order.orderId)"
              >
                View order
              </button>
            </div>
          </div>
        </div>
        <div
          v-if="isOrderModal == order.orderId"
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
          <h5>Order details:</h5>
          <span class="fw-bold text-decoration-underline">Product:</span>
          <p>{{ order.mainProductName }}</p>
          <span class="fw-bold text-decoration-underline"
            >The Minimum Premium is:</span
          >
          <span>&nbsp;R{{ order.mainProductCost }}</span>
          <h6 class="fw-bold text-decoration-underline mt-3">
            Coverages Included:
          </h6>
          <ul class="list-group pb-3">
            <li
              v-for="(sub, index) in order.subProducts"
              :key="index"
              class="list-group-item"
            >
              <span>{{ sub.subProductName }}:</span>
              <span class="fw-bold">&nbsp;R{{ sub.subProductCost }}</span>
            </li>
          </ul>
          <span class="fw-bold text-decoration-underline">Total:</span>
          <p>R{{ order.totalCost }}</p>
          <span class="fw-bold text-decoration-underline">Order created:</span>
          <p>{{ getDate(order.orderCreated) }}</p>
          <span class="fw-bold text-decoration-underline">Order status:</span>
          <p
            class="fw-bold text-uppercase"
            :class="{
              'text-warning': order.orderStatus == `approved`,
              'text-danger': order.orderStatus == `rejected`,
            }"
          >
            {{ order.orderStatus }}
          </p>

          <span class="fw-bold text-decoration-underline">Vehicle:</span>
          <p>{{ order.vehicleDetails }}</p>
          <span class="fw-bold text-decoration-underline">Vehicle value:</span>
          <p>R{{ order.vehicleRetailValue }}</p>
          <a
            v-for="(file, index) in order.documents"
            :key="index"
            :href="`${FILE_URL}${file}`"
            class="btn btn-light btn-pdf text-end"
            target="_blank"
          >
            Banking Details
          </a>
          <div class="mt-3 mb-3" v-if="order.documents.length == 0">
            <label for="formFile" class="form-label fw-bold"
              >Add your banking details:</label
            >
            <input
              class="form-control"
              type="file"
              id="formFile"
              name="asset"
              @change="uploadFile($event, order.orderId)"
            />
          </div>
          <!-- MODAL ERROR -->
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
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="closeModal"
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- MODAL ERROR END -->
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
const dayjs = require("dayjs");
import { FILE_URL } from "../../constants";
export default {
  data() {
    return {
      myId: ``,
      isOrderModal: false,
      errMsg: ``,
      isUploadError: false,
      documentsArray: [],
      FILE_URL: FILE_URL,
    };
  },
  computed: {
    ordersList() {
      return this.$store.state.orders.orders;
    },
  },
  mounted() {
    this.$store
      .dispatch(`GET_ORDERS`, `?order=desc`)
      .catch((err) => console.log(err));
  },
  methods: {
    uploadFile(event, id) {
      const asset = event.target.files[0];
      const formData = new FormData();
      formData.append(
        `meta`,
        JSON.stringify({ fileType: `document`, description: `` })
      );
      formData.append("asset", asset);
      this.$store.dispatch(`UPLOAD`, formData).then(() => {
        setTimeout(() => {
          if (
            this.$store.state.uploaded_file &&
            this.$store.state.uploaded_file.state == `ok`
          ) {
            this.documentsArray.push(this.$store.state.uploaded_file.path);
            setTimeout(() => {
              this.$store
                .dispatch(`CREATE_ORDER`, {
                  orderId: id,
                  documents: this.documentsArray,
                })
                .then(() => {
                  this.getOrder(id);
                })
                .catch((err) => console.log(err))
                .then(() => {
                  this.getOrder(id);
                });
            }, 1000);
          } else {
            this.isUploadError = true;
            this.errMsg =
              this.$store.state.uploaded_file.data.message ||
              `File upload error, please try later`;
          }
        }, 1000);
      });
    },
    getDate(date) {
      return dayjs(date).format("MMMM D, YYYY h:mm A");
    },
    getOrder(id) {
      this.$store
        .dispatch(`GET_ORDERS`, `?orderId=${id}`)
        .then((this.isOrderModal = id));
    },
    closeOrderModal() {
      this.isOrderModal = false;
      this.$store.dispatch(`GET_ORDERS`, `?order=desc`);
    },
    closeModal() {
      this.isUploadError = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  min-width: 10em;
}
.btn-pdf {
  min-width: 11em;
  border-radius: 0;
  background-image: url("../../assets/img/icon-pdf.png");
  background-size: 27px 27px;
  background-repeat: no-repeat;
  background-position: 5% center;
}
</style>