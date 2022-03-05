<template>
  <section>
    <h2 class="d-block fw-bold text-capitalize fs-4 mb-0">
      {{ product.mainProductName }}
    </h2>

    <strong class="d-block text-capitalize mt-3">{{
      product.mainProductDescription
    }}</strong>


    <span class="d-block mt-3"><strong>R</strong>{{ product.mainProductCost }}</span
    ><br />

    <em class="d-block mt-3">Created At&nbsp;{{ getDate(product.created) }}</em
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
        <button
          type="button"
          class="btn btn-outline-info"
          @click="
            toggleEditCoverageModal(
              product.mainProductId,
              coverage.subProductId
            )
          "
        >
          Edit
        </button>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="removeCoverage(product.mainProductId, coverage.subProductId)"
        >
          Remove
        </button>
        <Transition>
          <div v-if="show === coverage.subProductId">
            <form
              class="mt-5 mb-5 p-3 border border-secondary border-2"
              @submit.prevent="editCoverage"
            >
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                  >Coverage Name</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="name"
                  v-model="editCoveragePayload.subProductName"
                  :placeholder="coverage.subProductName"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >Coverage Premium</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputPassword1"
                  v-model="editCoveragePayload.cost"
                  :placeholder="coverage.subProductCost"
                />
              </div>
              <button type="submit" class="btn btn-info">Submit</button>
            </form>
          </div>
        </Transition>
      </li>
    </ul>

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
          v-show="availableCoveragesToAdd > product.subProducts.length"
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
    <!-- CHANGE PRODUCT -->
    <button
      class="btn btn-primary d-block mt-3"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample2"
      aria-expanded="false"
      aria-controls="collapseExample2"
    >
      Change Product
    </button>
    <div class="collapse" id="collapseExample2">
      <div class="card card-body mt-3">
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
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="isRequiredCoverages"
              id="flexCheckDefault"
              :checked="product.isRequiredCoverages"
            />
            <label class="form-check-label" for="flexCheckDefault">
              Coverages in this product are required (Recommended)
            </label>
          </div>
          <button type="submit" class="btn btn-info mt-3">Submit</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      isSubProductsError: false,
      checkedCoverages: [],
      pickedProductId: ``,
      mainProductName: ``,
      mainProductDescription: ``,
      cost: ``,
      isRequiredCoverages: ``,
      mainProductId: ``,
      subProductName: ``,
      subProductId: ``,
      subProductDescription: ``,
      coverageCost: ``,
      availableCoveragesToAdd: [],
      editCoveragePayload: {
        subProductId: ``,
        subProductName: ``,
        cost: ``,
      },
    };
  },
  computed: {
    product() {
      return this.$store.state.main_products.mainProducts[0] || [];
    },
    coveragesList() {
      if (this.isSubProductsError) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.availableCoveragesToAdd = 0;
        return [];
      } else {
        return (
          this.getUniqueArr(this.$store.state.sub_products.subProducts) || []
        );
      }
    },
  },
  mounted() {
    this.$store
      .dispatch(`GET_SUB_PRODUCTS`, `?categoryId=${this.product.categoryId}`)
      .catch((error) => {
        console.log(error), (this.isSubProductsError = true);
      });
  },
  methods: {
    getUniqueArr(arr) {
      if (!arr) {
        this.availableCoveragesToAdd = 0;
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
      this.availableCoveragesToAdd = Array.from(new Set(newArr)).length;

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
          isRequiredCoverages: this.isRequiredCoverages,
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
    removeCoverage(productId, coverageId) {
      this.$store
        .dispatch(`CREATE_SUB_PRODUCT`, {
          subProductId: coverageId,
          deleted: true,
        })
        .then(
          this.$store.dispatch(
            `GET_MAIN_PRODUCTS`,
            `?mainProductId=${productId}`
          ),
          this.$store.dispatch(
            `GET_SUB_PRODUCTS`,
            `?categoryId=${this.product.categoryId}`
          )
        )
        .catch((err) => console.log(err))
        .then(
          this.$store.dispatch(
            `GET_MAIN_PRODUCTS`,
            `?mainProductId=${productId}`
          ),
          this.$store.dispatch(
            `GET_SUB_PRODUCTS`,
            `?categoryId=${this.product.categoryId}`
          )
        );
    },
    toggleEditCoverageModal(productId, coverageId) {
      this.pickedProductId = productId;
      if (!this.show) {
        this.show = coverageId;
      } else {
        this.show = false;
      }
      this.editCoveragePayload.subProductId = coverageId;
    },
    editCoverage() {
      this.$store
        .dispatch(`CREATE_SUB_PRODUCT`, this.editCoveragePayload)
        .then(() => {
          this.show = false;
          this.$store.dispatch(
            `GET_MAIN_PRODUCTS`,
            `?mainProductId=${this.pickedProductId}`
          );
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
}
.coverages-checkboxes__item label {
  cursor: pointer;
}
.coverages-checkboxes__item label:hover {
  color: $bgOrange;
}
.btn-outline-info,
.btn-outline-danger {
  min-width: 100%;
  margin-top: 1em;
  @include media-breakpoint-up(md) {
    float: right;
    min-width: 7em;
    margin-top: 0;
    margin-left: 1em;
  }
}
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>