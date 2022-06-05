<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="position-relative">
      <div class="card text-center p-1">
        <h6>
          Please enter the code <br />
          to verify your account
        </h6>
        <div>
          <span>A code has been sent to</span>
          <small>{{ myProps.email }}</small>
        </div>
        <div
          id="otp"
          class="inputs d-flex flex-row justify-content-center mt-2"
        >
          <input
            v-for="(item, index) in 6"
            :key="index"
            class="m-2 text-center form-control rounded"
            type="number"
            :id="`input${index}`"
            required
          />
        </div>
        <div class="mt-4">
          <button class="btn btn-danger px-4 validate" @click="getOtpValue">
            Validate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let arr1 = [];
const returnNumber = (arg) => {

  if (arg == ``) {
    arr1.pop(arg);
  } else {
    arr1.push(arg);
    if (arr1.length >= 6) {
      document.querySelector(`.validate`).focus();
    }
  }
  return arg;
};
export default {
  data() {
    return {
      otpCode: [],
    };
  },
  props: {
    myProps: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.getOtpInput();
  },
  methods: {
    getOtpValue(e) {
      this.otpCode = [];
      e.preventDefault();
      this.otpCode = arr1.join(``);
      if (this.otpCode.length > 0) {
        this.$store.commit(`SET_VALIDATION_CODE`, {
          isSet: true,
          code: this.otpCode,
        });
      }
    },
    getOtpInput() {
      const inputs = document.querySelectorAll("#otp > *[id]");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("keydown", function (event) {
          if (event.key === "Backspace") {
            inputs[i].value = "";
            returnNumber(inputs[i].value);
            if (i !== 0) inputs[i - 1].focus();
          } else {
            if (i === inputs.length - 1 && inputs[i].value !== "") {
              return true;
            } else if (event.keyCode > 47 && event.keyCode < 58) {
              inputs[i].value = event.key;
              this;
              if (i !== inputs.length - 1) inputs[i + 1].focus();
              event.preventDefault();
              returnNumber(inputs[i].value);
            } else if (event.keyCode > 64 && event.keyCode < 91) {
              inputs[i].value = String.fromCharCode(event.keyCode);
              if (i !== inputs.length - 1) inputs[i + 1].focus();
              event.preventDefault();
              returnNumber(inputs[i].value);
            }
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  z-index: 2;
}
.card {
  width: 310px;
  border: none;
  height: 300px;
  box-shadow: 0px 5px 20px 0px #d2dae3;
  display: flex;
  justify-content: center;
  align-items: center;
  @include media-breakpoint-up(sm) {
    width: 510px;
  }
  @include media-breakpoint-up(md) {
    width: 500px;
  }
}
.card h6 {
  color: $colorBrick;
}
.inputs input {
  width: 36px;
  height: 36px;
  @include media-breakpoint-up(md) {
    width: 40px;
    height: 40px;
  }
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
.form-control:focus {
  box-shadow: none;
  border: 2px solid $colorBrick;
}
.validate {
  border-radius: 20px;
  height: 40px;
  background-color: $colorBrick;
  border: 1px solid $colorBrick;
  width: 140px;
}
</style>