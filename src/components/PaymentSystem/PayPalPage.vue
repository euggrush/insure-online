<template>
  <section class="container-fluid my-payment bg-light bg-gradient">
    <div id="smart-button-container" class="paypal-wrap mx-auto">
      <div style="text-align: center">
        <div id="paypal-button-container"></div>
      </div>
    </div>
  </section>
</template>

<script>
function initPayPalButton() {
  // eslint-disable-next-line no-undef
  paypal
    .Buttons({
      style: {
        shape: "rect",
        color: "gold",
        layout: "vertical",
        label: "paypal",
      },

      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{ amount: { currency_code: "USD", value: 1 } }],
        });
      },

      onApprove: function (data, actions) {
        return actions.order.capture().then(function (orderData) {
          // Full available details
          console.log(
            "Capture result",
            orderData,
            JSON.stringify(orderData, null, 2)
          );

          // Show a success message within this page, e.g.
          const element = document.getElementById("paypal-button-container");
          element.innerHTML = "";
          element.innerHTML = "<h3>Thank you for your payment!</h3>";

          // Or go to another URL:  actions.redirect('thank_you.html');
        });
      },

      onError: function (err) {
        console.log(err);
      },
    })
    .render("#paypal-button-container");
}
// initPayPalButton();
export default {
  mounted() {
    this.scrollToTop();
    initPayPalButton();
  },
};
</script>

<style lang="scss" scoped>
.my-payment {
  min-height: 100vh;
  padding-top: 15em;
}
.paypal-wrap {
  max-width: 500px;
}
</style>