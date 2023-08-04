<i18n src="./resources/ProductModal.json"></i18n>

<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document" ref="modal">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ t("Add") + t("Product") }}</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control" id="image"
                        placeholder="請輸入圖片連結">
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input type="file" id="customFile" class="form-control">
              </div>
              <img class="img-fluid" alt="">
              延伸技巧，多圖 
              <div class="mt-5">
                <div class="mb-3 input-group" >
                  <input type="url" class="form-control form-control"
                          placeholder="請輸入連結">
                  <button type="button" class="btn btn-outline-danger">
                    移除
                  </button>
                </div>
                <div>
                  <button class="btn btn-outline-primary btn-sm d-block w-100">
                    新增圖片
                  </button>
                </div>
              </div>
            </div> -->
            <div class="col-12">
              <div class="mb-3">
                <label for="title" class="form-label">{{
                  t("Product") + t("Name")
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="tempProduct.Name"
                  :placeholder="t('MsgPleaseInput', [t('Product') + t('Name')])"
                />
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">{{
                    t("Category")
                  }}</label>
                  <!-- <input
                    type="text"
                    class="form-control"
                    id="category"
                    v-model="tempProduct.Category"
                    :placeholder="t('MsgPleaseInput', [t('Category')])"
                  /> -->

                  <Dropdown
                    v-model="tempProduct.Category"
                    :options="categoryItems"
                    :optionLabel="name"
                    :placeholder="t('MsgPleaseInput', [t('Category')])"
                    class="w-full md:w-14rem"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">{{ t("Sku") }}</label>
                  <input
                    type="text"
                    class="form-control"
                    id="sku"
                    v-model="tempProduct.SKU"
                    :placeholder="t('MsgPleaseInput', [t('Sku')])"
                  />
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">{{
                    t("Price")
                  }}</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    v-model="tempProduct.Price"
                    :placeholder="t('MsgPleaseInput', [t('Price')])"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">{{ t("Stock") }}</label>
                  <input
                    type="number"
                    class="form-control"
                    id="stock"
                    v-model="tempProduct.Stock"
                    :placeholder="t('MsgPleaseInput', [t('Stock')])"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">{{
                  t("Product") + t("Description")
                }}</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="tempProduct.Description"
                  :placeholder="
                    t('MsgPleaseInput', [t('Product') + t('Description')])
                  "
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">{{
                  t("Input") + t("ImageURL")
                }}</label>
                <input
                  type="text"
                  class="form-control"
                  id="imageURL"
                  v-model="tempProduct.ImageURL"
                  :placeholder="t('MsgPleaseInput', [t('ImageURL')])"
                />
              </div>
              <!-- <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea type="text" class="form-control" id="content"
                          placeholder="請輸入產品說明內容"></textarea>
              </div> -->
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="enabled"
                    v-model="tempProduct.Enabled"
                  />
                  <label class="form-check-label" for="enabled">
                    {{ t("IsEnabled") }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="pushData">
            {{ t("OK") }}
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            {{ t("Cancel") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
import { ref, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import Dropdown from "primevue/dropdown";

export default {
  components: {
    Dropdown,
  },

  // 基礎版
  props: ["propProduct"],
  emits: ["push-data"],
  // 詳細版
  // props: {
  //   propProduct: {
  //     type: Object,
  //     default: () => ({})
  //   }
  // },

  setup(props, { attrs, slots, emit }) {
    const webApi = `${process.env.VUE_APP_WebAPI}/productcategory`;
    const { t } = useI18n();
    const tempProduct = ref({});
    const allProductCategory = ref({});
    const categoryItems = ref([
      //   {
      //     name: "全部商品",
      //     code: "All",
      //   },
    ]);
    const cities = ref([
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" },
    ]);

    function pushData() {
      emit("push-data", tempProduct.value);
    }

    function getProductCategory() {
      $axios
        .get(webApi)
        .then((res) => {
          allProductCategory.value = res.data.data;
          delete allProductCategory.value.All; // 刪除 "All": "全部商品"
          categoryItems.value = Object.entries(allProductCategory.value).map(
            (Category) => {
              return {
                name: Category[1], // 全部商品
                code: Category[0], // All
              };
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }

    watch(
      () => {
        tempProduct.value = props.propProduct;
      },
      { deep: true }
    );

    const myModal = ref(null);
    const modal = ref(null); // ref="modal"

    onMounted(() => {
      myModal.value = new Modal(modal.value);
      // myModal.value.show();
      getProductCategory();
    });

    function showModal() {
      myModal.value.show();
    }

    function hideModal() {
      myModal.value.hide();
    }

    return {
      webApi,
      t,
      tempProduct,
      cities,
      pushData,
      allProductCategory,
      categoryItems,
      getProductCategory,
      modal,
      myModal,
      showModal,
      hideModal,
    };
  },
};
</script>
