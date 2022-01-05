<template>
  <section class="container pt-5">
    <form
      class="row needs-validation estimation-form mx-auto pb-5"
      novalidate
      @submit.prevent="getEstimation"
    >
      <!-- BLOCK 01 -->
      <p class="fw-bold">Account Details:</p>
      <div class="col-md-4">
        <label for="validationCustom01" class="form-label mt-1">First name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom01"
          value="Mark"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <!-- BLOCK 02 -->

      <div class="col-md-4">
        <label for="validationCustom02" class="form-label mt-1">Last name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom02"
          value="Otto"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <!-- BLOCK 020 -->

      <div class="col-md-4">
        <label for="validationCustomUsername" class="form-label mt-1">Email</label>
        <div class="input-group has-validation">
          <span class="input-group-text" id="inputGroupPrepend">@</span>
          <input
            type="text"
            class="form-control"
            id="validationCustomUsername"
            aria-describedby="inputGroupPrepend"
            required
          />
          <div class="invalid-feedback">Please choose a username.</div>
        </div>
      </div>
      <!-- BLOCK 03 -->

      <div class="col-md-6">
        <label for="validationCustom03" class="form-label mt-1"
          >Area & Postal Code</label
        >
        <input
          type="text"
          class="form-control"
          id="validationCustom03"
          required
        />
        <div class="invalid-feedback">Please provide a valid city.</div>
      </div>
      <!-- BLOCK 04 -->

      <div class="col-md-3">
        <label for="validationCustom04" class="form-label mt-1"
          >Country of Residence
        </label>
        <select class="form-select" id="validationCustom04" required>
          <option selected disabled value="">Choose...</option>
          <option>South Africa</option>
        </select>
        <div class="invalid-feedback">Please select a valid state.</div>
      </div>
      <!-- BLOCK 05 -->

      <div class="col-md-3">
        <label for="validationCustom05" class="form-label mt-1"
          >Telephone number</label
        >
        <input
          type="tel"
          class="form-control"
          id="validationCustom05"
          required
        />
        <div class="invalid-feedback">Please provide a valid number.</div>
      </div>
      <!-- BLOCK 06 -->

      <div class="col-md-4">
        <label for="validationCustom06" class="form-label mt-1">Cell number</label>
        <input
          type="tel"
          class="form-control"
          id="validationCustom06"
          value="Mark"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <!-- BLOCK 07 -->

      <div class="col-md-4">
        <label for="validationCustom07" class="form-label mt-1">ID Number</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom07"
          value="Mark"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <!-- BLOCK 08 -->

      <div class="col-md-4">
        <label for="validationCustom08" class="form-label mt-1"
          >Marital Status</label
        >
        <select class="form-select" id="validationCustom08" required>
          <option selected disabled value="">Choose...</option>
          <option>Single</option>
          <option>MArried</option>
        </select>
        <div class="invalid-feedback">Please select a marital status.</div>
      </div>
      <!-- BLOCK 09 -->

      <div class="col-md-4">
        <label for="validationCustom09" class="form-label mt-1"
          >Year of issue of driver's license (YYYY)</label
        >
        <input
          type="number"
          class="form-control"
          id="validationCustom09"
          value=""
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <!-- BLOCK 10 -->

      <div class="col-md-4">
        <label for="validationCustom10" class="form-label mt-1"
          >Claims History over the immediate past 3 years</label
        >
        <textarea
          type="text"
          class="form-control"
          id="validationCustom10"
          value=""
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <!-- BLOCK 11 -->

      <div class="col-md-4">
        <label for="validationCustom11" class="form-label mt-1"
          >Previous Insurer</label
        >
        <input
          type="text"
          class="form-control"
          id="validationCustom11"
          value=""
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <!-- BLOCK 12 -->
      <p class="mt-5 fw-bold">Vehicle Details:</p>
      <div class="col-md-4">
        <label for="validationCustom12" class="form-label mt-1">First name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom12"
          value="Mark"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>

      <!-- BLOCK 13 -->

      <div class="col-md-4">
        <label for="validationCustom13" class="form-label mt-1">First name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom13"
          value="Mark"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <!-- BLOCK 14 -->

      <div class="col-md-4">
        <label for="validationCustom14" class="form-label mt-1">First name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom14"
          value="Mark"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <!-- BLOCK 15 -->

      <div class="col-md-4">
        <label for="validationCustom15" class="form-label mt-1">First name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom15"
          value="Mark"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <!-- BLOCK 16 -->

      <div class="col-md-4">
        <label for="validationCustom16" class="form-label mt-1">First name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom16"
          value="Mark"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>

      <!-- BLOCK 17 -->

      <div class="col-md-4">
        <label for="validationCustom17" class="form-label mt-1">First name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom17"
          value="Mark"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <!-- BLOCK 18 -->

      <div class="col-md-4">
        <label for="validationCustom18" class="form-label mt-1">First name</label>
        <input
          type="text"
          class="form-control"
          id="validationCustom18"
          value="Mark"
          required
        />
        <div class="valid-feedback">Looks good!</div>
      </div>
      <!-- BLOCK 19 -->

      <div class="col-12 mt-5">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="invalidCheck"
            required
          />
          <label class="form-check-label" for="invalidCheck">
            Agree to terms and conditions
          </label>
          <div class="invalid-feedback">You must agree before submitting.</div>
        </div>
      </div>
      <div class="col-12 mt-5">
        <button class="btn btn-primary" type="submit">Submit form</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isCalculateBtnDisabled: true,
      estimationPayloadObj: {},
    };
  },
  methods: {
    validateForm() {
      let forms = document.querySelectorAll(".needs-validation");

      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    getEstimation() {
      this.validateForm();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: calc(100vh - 7.3em);

  outline: solid 4px red;
}
.estimation-form {
  width: 100%;
  outline: solid 4px blue;

  @include media-breakpoint-up(md) {
    width: 600px;
  }
  @include media-breakpoint-up(lg) {
    width: 900px;
  }
}
</style>