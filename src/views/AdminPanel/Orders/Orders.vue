<template>
  <section class="container orders-list-wrapper pb-3">
    <h3 class="mt-3 text-center">Orders</h3>
    <div class="d-flex justify-content-between flex-wrap mt-3">
      <!-- SEARCH -->
      <div class="input-group w-auto">
        <button
          class="btn btn-outline-secondary btn-search rounded"
          type="button"
          @click="searchOrder"
          :disabled="orderReferenceNumber.length == 0"
        ></button>
        <button
          class="btn btn-outline-secondary rounded"
          type="button"
          @click="fetchAllOrders"
        >
          All
        </button>
        <input
          type="text"
          class="form-control"
          placeholder="Order number #"
          aria-label="Example text with two button addons"
          v-model="orderReferenceNumber"
        />
      </div>
      <!--SEARCH END -->
      <div
        class="btn-group d-flex flex-wrap"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio0"
          autocomplete="off"
          value=""
          v-model="orderStatus"
          checked
        />
        <label
          class="btn btn-outline-dark btn-width mt-3 mt-lg-0"
          :class="{ active: orderStatus == '' }"
          for="btnradio0"
          >All</label
        >
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio1"
          autocomplete="off"
          value="pending"
          v-model="orderStatus"
        />
        <label
          class="btn btn-outline-dark btn-width mt-3 mt-lg-0"
          for="btnradio1"
          :class="{ active: orderStatus == 'pending' }"
          >Pending</label
        >

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio2"
          value="approved"
          v-model="orderStatus"
          autocomplete="off"
        />
        <label
          class="btn btn-outline-dark btn-width mt-3 mt-lg-0"
          for="btnradio2"
          :class="{ active: orderStatus == 'approved' }"
          >Approved</label
        >

        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio3"
          value="rejected"
          v-model="orderStatus"
          autocomplete="off"
        />
        <label
          class="btn btn-outline-dark btn-width mt-3 mt-lg-0"
          for="btnradio3"
          :class="{ active: orderStatus == 'rejected' }"
          >Rejected</label
        >
      </div>
    </div>

    <OrdersList
      :myProps="{
        orderStatus,
      }"
    />
  </section>
</template>

<script>
import OrdersList from "./OrdersList.vue";

export default {
  components: {
    OrdersList,
  },
  data() {
    return {
      orderStatus: ``,
      orderReferenceNumber: ``,
    };
  },
  methods: {
    fetchAllOrders() {
      this.orderStatus = ``;
      if (this.orderStatus) {
        this.$store.dispatch(`GET_ORDERS`, `?orderStatus=${this.orderStatus}`);
      } else {
        this.$store.dispatch(`GET_ORDERS`, ``);
      }
    },
    searchOrder() {
      this.$store
        .dispatch(`GET_ORDERS`, `?referenceNumber=${this.orderReferenceNumber}`)
        .then(() => {
          this.orderReferenceNumber = ``;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.orders-list-wrapper {
  min-height: 53vh;
}
#button-addon2 {
  min-width: auto;
  width: auto;
}
#collapseExample {
  @include media-breakpoint-up(lg) {
    max-width: 40%;
  }
}
.btn-width {
  min-width: 150px;
}
.btn {
  border-radius: 0 !important;
}
.btn-search {
  min-width: 40px;
  background-image: url($iconSearch);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px 20px;
}
</style>