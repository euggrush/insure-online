<template>
  <section class="container orders-list-wrapper pb-3">
    <h3 class="mt-3">Orders:</h3>
    <div class="d-flex justify-content-end flex-wrap align-items-center">
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
          class="btn btn-outline-dark"
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
          class="btn btn-outline-dark"
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
          class="btn btn-outline-dark"
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
          class="btn btn-outline-dark"
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
    };
  },
};
</script>

<style lang="scss" scoped>
.btn-outline-dark {
  margin-top: 1em;
  border-radius: 0;
  @include media-breakpoint-up(lg) {
    margin-top: 0.25rem;
    border-radius: 50px;
  }
}
.orders-list-wrapper {
  min-height: 53vh;
}
.btn {
  min-width: 12em;
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
</style>