<template>
  <section class="container-fluid">
    <!-- <button
      class="btn btn-primary"
      type="button"
      id="checkout-button"
      @click="payByYoco"
    >
      Pay by YOCO
    </button> -->
  </section>
</template>

<script>
export default {
  // data() {
  //   return {
  //     amount: this.amountCharge * 100,
  //   };
  // },
  computed: {
    amountCharge() {
      return this.$store.state.orders.orders[0].allEstimationsTotalCost;
    },
  },
  mounted() {
    this.payByYoco();
  },
  methods: {
    payByYoco() {
      var yoco = new window.YocoSDK({
        publicKey: "pk_test_ed3c54a6gOol69qa7f45",
      });
      yoco.showPopup({
        amountInCents: this.amountCharge * 100,
        currency: "ZAR",
        name: "Your Store or Product",
        description: "Awesome description",
        callback: function (result) {
          // This function returns a token that your server can use to capture a payment
          if (result.error) {
            const errorMessage = result.error.message;
            alert("error occured: " + errorMessage);
          } else {
            alert("card successfully tokenised: " + result.id);
          }
          // In a real integration - you would now pass this chargeToken back to your
          // server along with the order/basket that the customer has purchased.
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  min-height: 90vh;
  padding-top: 10em;
}
</style>