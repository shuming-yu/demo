<i18n src="./resources/Products.json"></i18n>

<template>
  <Loading :active="isLoading"></Loading>
  <div class="m-3 text-end">
    <Button class="me-2" severity="info" size="small" @click="openModal(true)">
      <i class="me-2 pi pi-plus"></i>
      {{ t("Add") + t("Product") }}
    </Button>
    <Button
      class="me-2"
      severity="warning"
      size="small"
      @click="openModal(false)"
    >
      <i class="me-2 pi pi-pencil"></i>
      {{ t("Modify") }}
    </Button>
    <Button class="me-2" severity="danger" size="small" @click="openDelModal">
      <i class="me-2 pi pi-trash"></i>
      {{ t("Delete") }}
    </Button>
  </div>

  <div class="m-3 card">
    <!-- <DataTable v-model:selection="selectedProduct" :value="allProducts" sortField="Name" selectionMode="single" tableStyle="min-width: 50rem">
        <Column field="Name" header="Name" sortable></Column>
        <Column header="Image" sortable>
            <template #body="slotProps">
              <img :src="`${slotProps.data.ImageURL}`" :alt="slotProps.data.ImageURL" class="w-6rem shadow-2 border-round img-fluid" width="300" height="100"/>
            </template>
        </Column>
        <Column field="Price" header="Price" sortable>
            <template #body="slotProps">
                {{ formatCurrency(slotProps.data.Price) }}
            </template>
        </Column>
    </DataTable> -->
    <DataTable
      v-model:selection="selectedProduct"
      :value="filteredProducts"
      ref="dt"
      :exportFilename="today"
      selectionMode="single"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
      stripedRows
      removableSort
    >
      <template #header>
        <div style="text-align: right">
          <Button
            class="me-2"
            severity="success"
            size="small"
            @click="exportCSV"
          >
            <i class="me-2 pi pi-download"></i>
            {{ t("Export") }}
          </Button>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="globalFilter" placeholder="Search..." />
          </span>
        </div>
      </template>

      <Column
        field="Category"
        :header="t('Category')"
        style="width: 25%"
        sortable
      ></Column>
      <Column
        field="Name"
        :header="t('Product')"
        style="width: 25%"
        sortable
      ></Column>
      <Column field="Price" :header="t('Price')" style="width: 25%" sortable>
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.Price) }}
        </template>
      </Column>
      <Column field="Enabled" :header="t('Enabled')" style="width: 25%">
        <template #body="slotProps">
          <TriStateCheckbox v-model="slotProps.data.Enabled" disabled />
        </template>
      </Column>
    </DataTable>
  </div>

  <ProductModal
    ref="productModal"
    :propProduct="productList"
    @push-data="updateProduct"
  ></ProductModal>
  <!-- 元件的傳遞 ( props ) 不一定要加上 v-bind 也可以接受來至父層的資料，
  但沒有用 v-bind 的話，它只會接受「純文字」的形式 -->
  <DelModal
    ref="delModal"
    :propItem="selectedProduct"
    @del-item="delProduct"
  ></DelModal>
</template>

<script>
import { reactive, ref, computed, onMounted, inject } from "vue";
import { useI18n } from "vue-i18n";
import ProductModal from "../../components/ProductModal.vue";
import DelModal from "../../components/DelModal.vue";

export default {
  components: {
    ProductModal,
    DelModal,
  },

  setup() {
    const webApi = `${process.env.VUE_APP_WebAPI}/product`;
    const { t } = useI18n();
    const $swal = inject("$swal");
    const isLoading = ref(false);
    const formatCurrency = (value) => {
      return value.toLocaleString("zh-TW", {
        style: "currency",
        currency: "TWD",
        minimumFractionDigits: 0,
      });
    };
    const today = "Product-" + moment().format("YYYYMMDDHHmm");

    const allProducts = ref([]); // 全部商品資料
    const isNew = ref(null); // true: 新增 / false: 修改
    const productList = ref({}); // 送出商品資料
    const selectedProduct = ref({}); // 選取的商品
    const dt = ref(null); // ref="dt"
    const productModal = ref(null); // ref="productModal"
    const delModal = ref(null); // ref="delModal"

    // 取得全部商品資料
    function getProducts() {
      isLoading.value = true;
      $axios
        .get(webApi)
        .then((res) => {
          // console.log(res);
          isLoading.value = false;
          allProducts.value = res.data.data;
        })
        .catch((err) => {
          isLoading.value = false;
          console.log(err);
        });
    }

    onMounted(() => {
      getProducts();
    });

    // 匯出excel功能
    function exportCSV() {
      dt.value.exportCSV();
    }

    // Modal
    function openModal(status) {
      isNew.value = status;

      if (status) {
        productList.value = {}; // 清空欄位
      } else {
        if (!selectedProduct.value.ID) {
          $swal({
            icon: "error",
            title: t("MsgPleaseSelectData"),
          });
          return;
        } else {
          productList.value = { ...selectedProduct.value }; // 淺層拷貝
        }
      }

      productModal.value.showModal();
    }
    function closeModal() {
      productModal.value.hideModal();
    }

    // 新增/修改 商品資料
    function updateProduct(item) {
      isLoading.value = true;
      productList.value = item;
      let httpMethod = "post";
      // 若為 false 則 put
      if (!isNew.value) {
        httpMethod = "put";
      }

      $axios({
        method: httpMethod,
        url: webApi,
        headers: { "Content-Type": "multipart/form-data" },
        data: productList.value,
      })
        .then((res) => {
          isLoading.value = false;
          $swal({
            icon: "success",
            // title: String.format(t("msgAddToCart", [ productList.value.name ]))
            title: t("Success"),
          });
          closeModal();
          getProducts();
        })
        .catch((err) => {
          isLoading.value = false;
          $swal({
            icon: "error",
            title: err.response.data.msg,
          });
        });
    }

    function openDelModal() {
      if (!selectedProduct.value.ID) {
        $swal({
          icon: "error",
          title: t("MsgPleaseSelectData"),
        });
      } else {
        delModal.value.showModal();
      }
    }
    function closeDelModal() {
      delModal.value.hideModal();
    }

    // 刪除商品
    function delProduct() {
      isLoading.value = true;
      $axios
        .delete(webApi + "?id=" + selectedProduct.value.ID)
        .then((res) => {
          isLoading.value = false;
          $swal({
            icon: "success",
            title: t("Success"),
          });

          selectedProduct.value = {};
          closeDelModal();
          getProducts();
        })
        .catch((err) => {
          isLoading.value = false;
          // console.log(err);
          $swal({
            icon: "error",
            title: err.response.data.msg,
          });
        });
    }

    // filter
    const filters = reactive({});
    const globalFilter = ref(""); // 輸入的文字
    const filteredProducts = computed(() => {
      // 篩選後的資料
      return allProducts.value.filter((product) => {
        let matched = true;

        // 全局筛选
        if (globalFilter.value) {
          matched =
            matched &&
            Object.values(product).some((value) =>
              String(value)
                .toLowerCase()
                .includes(globalFilter.value.toLowerCase())
            );
        }

        // 各个列的筛选
        if (filters) {
          Object.entries(filters).forEach(([field, filterValue]) => {
            if (
              filterValue !== undefined &&
              filterValue !== null &&
              filterValue !== ""
            ) {
              matched =
                matched &&
                String(product[field])
                  .toLowerCase()
                  .includes(filterValue.toLowerCase());
            }
          });
        }

        return matched;
      });
    });

    return {
      t,
      isLoading,
      formatCurrency,
      today,
      allProducts,
      dt,
      exportCSV,
      selectedProduct,
      isNew,
      productList,
      updateProduct,
      getProducts,
      delProduct,
      productModal,
      openModal,
      delModal,
      openDelModal,
      globalFilter,
      filteredProducts,
    };
  },
};
</script>
