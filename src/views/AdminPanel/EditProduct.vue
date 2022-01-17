<template>
  <section>
    <p class="fw-bold">Product details:</p>
    <!-- <span class="fw-bolder text-decoration-underline mt-1"
      >Product name:&nbsp;</span
    > -->
    <span class="d-block fw-bold pb-3">{{ product.mainProductName }}</span
    ><br />
    <span class="d-inline-block fw-bolder text-decoration-underline mt-1"
      >Description:&nbsp;</span
    >
    <span>{{ product.mainProductDescription }}</span
    ><br />
    <span class="d-inline-block fw-bolder text-decoration-underline mt-1"
      >Cost:&nbsp;</span
    >
    <span>{{ product.mainProductCost }}</span
    ><br />
    <span class="d-inline-block fw-bolder text-decoration-underline mt-1"
      >Category:&nbsp;</span
    >
    <span>{{ product.categoryName }}</span
    ><br />

    <span class="d-inline-block fw-bolder text-decoration-underline mt-1"
      >Created:&nbsp;</span
    >
    <span>{{getDate( product.created) }}</span
    ><br />

    <p class="mt-3 fw-bold">Included:</p>
    <ul class="list-group">
      <li
        v-for="(coverage, index) in product.subProducts"
        :key="index"
        class="list-group-item"
      >
        {{ coverage.subProductName }}
        <span class="fw-bold">R{{ coverage.subProductCost }}</span>
      </li>
    </ul>
    <!-- CHANGE PRODUCT -->
    <p class="mt-5">
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample2"
        aria-expanded="false"
        aria-controls="collapseExample2"
      >
        Change Product
      </button>
    </p>
    <div class="collapse" id="collapseExample2">
      <div class="card card-body">
        <form class="mt-1" @submit.prevent="changeProduct(product)">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product name</label
            >
            <input
              type="text"
              class="form-control"
              v-model="mainProductName"
              :placeholder="product.mainProductName"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product description</label
            >
            <input
              type="text"
              class="form-control"
              v-model="mainProductDescription"
              :placeholder="product.mainProductDescription"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Product cost</label
            >
            <input
              type="number"
              class="form-control"
              v-model="cost"
              :placeholder="product.mainProductCost"
            />
          </div>

          <button type="submit" class="btn btn-info">Submit</button>
        </form>
      </div>
    </div>
    <button
      class="btn btn-primary mt-3"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample"
      aria-expanded="false"
      aria-controls="collapseExample"
    >
      Create Or Add Coverage
    </button>
    <div class="collapse mt-3" id="collapseExample">
      <div class="card card-body">
        <!-- FIRST FORM -->
        <form
          class="coverages-checkboxes"
          @submit.prevent="addSelectedCoverages(product)"
        >
          <div class="container">
            <div class="row row-cols-auto">
              <div
                v-for="(cover, index) in coveragesList"
                :key="index"
                v-show="
                  product.subProducts.every((item) => {
                    if (item.subProductName == cover.subProductName) {
                      return false;
                    }
                    return true;
                  })
                "
                class="
                  col
                  mt-3
                  me-5
                  border-bottom border-end
                  coverages-checkboxes__item
                "
              >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="cover"
                    v-model="checkedCoverages"
                    :id="`defaultCheck${index}`"
                  />
                  <label class="form-check-label" :for="`defaultCheck${index}`">
                    {{ cover.subProductName
                    }}<span class="fw-bold"
                      >&nbsp;R{{ cover.subProductCost }}</span
                    >
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary mt-5">Add</button>
        </form>
        <!-- FIST FORM END -->
        <!-- SECOND FORM -->
        <form class="mt-3" @submit.prevent="createSubProduct(product)">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Coverage name:</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="subProductName"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Coverage description:</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              v-model="subProductDescription"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword2" class="form-label"
              >Coverage cost:</label
            >
            <input
              type="number"
              class="form-control"
              id="exampleInputPassword2"
              v-model="coverageCost"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <!-- SECOND FORM END -->
      </div>
    </div>
  </section>
</template>

<script>
const dayjs = require("dayjs");

export default {
  data() {
    return {
      checkedCoverages: [],
      productName: ``,
      pickedProductIndex: ``,
      pickedProductInfo: [],
      pickedProductId: ``,
      productCategoryId: ``,
      productNewName: ``,
      isBtnDisabled: true,
      mainProductName: ``,
      mainProductDescription: ``,
      cost: ``,
      isCategorySelected: false,
      mainProductId: ``,
      productInfo: {},
      subProductName: ``,
      subProductId: ``,
      subProductDescription: ``,
      coverageCost: ``,
    };
  },
  computed: {
    product() {
      return this.$store.state.main_products.mainProducts[0] || [];
    },
    coveragesList() {
      return (
        this.getUniqueArr(this.$store.state.sub_products.subProducts) || []
      );
    },
  },
  mounted() {
    this.$store.dispatch(`GET_SUB_PRODUCTS`, `?categoryId=${this.product.categoryId}`);
  },
  methods: {
    getDate(date) {
      return dayjs(date).format("MMMM D, YYYY h:mm A");
    },
    getUniqueArr(arr) {
      if (!arr) {
        return [];
      }
      let newArr = [];

      arr.map((item) => {
        let sortedObj = {
          subProductName: ``,
          subProductDescription: ``,
          subProductCost: ``,
          isRequiredCoverages: ``,
        };
        sortedObj.subProductName = item.subProductName;
        sortedObj.subProductDescription = item.subProductDescription;
        sortedObj.subProductCost = item.subProductCost;
        sortedObj.isRequiredCoverages = item.isRequiredCoverages;

        newArr.push(JSON.stringify(sortedObj));
      });

      return Array.from(new Set(newArr)).map((item) => {
        return JSON.parse(item);
      });
    },
    closeModal() {
      this.isEditProductModal = false;
    },
    changeProduct(product) {
      this.$store
        .dispatch(`CREATE_MAIN_PRODUCT`, {
          mainProductId: product.mainProductId,
          mainProductName: this.mainProductName,
          mainProductDescription: this.mainProductDescription,
          cost: this.cost,
        })
        .then(() => {
          this.$store.dispatch(
            `GET_MAIN_PRODUCTS`,
            `?mainProductId=${product.mainProductId}`
          );
          this.mainProductName = ``;
          this.mainProductDescription = ``;
          this.cost = ``;
        })
        .catch((error) => {
          alert(error);
        })
        .then(() => {
          this.$store.dispatch(
            `GET_MAIN_PRODUCTS`,
            `?mainProductId=${product.mainProductId}`
          );
        });
    },
    createSubProduct(product) {
      this.$store
        .dispatch(`CREATE_SUB_PRODUCT`, {
          mainProductId: product.mainProductId,
          subProductName: this.subProductName,
          subProductDescription: this.subProductDescription,
          cost: this.coverageCost,
        })
        .then(() => {
          this.subProductName = ``;
          this.subProductDescription = ``;
          this.coverageCost = ``;
          this.$store.dispatch(
            `GET_MAIN_PRODUCTS`,
            `?mainProductId=${product.mainProductId}`
          );
        })
        .catch((error) => {
          alert(error);
        })
        .then(() => {
          this.$store.dispatch(
            `GET_MAIN_PRODUCTS`,
            `?mainProductId=${product.mainProductId}`
          );
        });
    },
    addSelectedCoverages(product) {
      this.checkedCoverages.map((item) => {
        this.$store
          .dispatch(`CREATE_SUB_PRODUCT`, {
            mainProductId: product.mainProductId,
            subProductName: item.subProductName,
            subProductDescription: item.subProductDescription,
            cost: item.subProductCost,
          })
          .then(() => {
            this.$store.dispatch(
              `GET_MAIN_PRODUCTS`,
              `?mainProductId=${product.mainProductId}`
            );
          })
          .catch((error) => {
            alert(error);
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
br {
  display: block;
  content: "";
  margin-top: 0;
}
.btn-primary {
  min-width: 13em;
  max-width: 13em;
}
.coverages-checkboxes {
  width: 100%;
  min-height: 100px;
  // outline: solid 3px red;
}
.coverages-checkboxes__item label {
  cursor: pointer;
}
.coverages-checkboxes__item label:hover {
  color: $bgOrange;
}
</style>