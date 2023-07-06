<i18n src="./resources/Products.json"></i18n>

<template>
  <Loading :active="isLoading"></Loading>
  <div class="m-3 text-end">
    <button class="btn btn-primary mx-1" type="button" @click="openModal">
      {{ t("Add") + t("Product") }}
    </button>
    <button class="btn btn-danger" type="button" @click="openDelModal">
      {{ t("Delete") }}
    </button>
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
    <DataTable v-model:selection="selectedProduct" :value="filteredProducts" ref="dt" :exportFilename="today" selectionMode="single" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
        <template #header>
            <div style="text-align: right">
                <button type="button" class="btn btn-success mx-2" @click="exportCSV">{{ t("Export") }}</button>
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText v-model="globalFilter" placeholder="Search..." />
              </span>
              </div>
        </template>

        <Column field="Category" :header="t('Category')" style="width: 25%" sortable></Column>
        <Column field="Name" :header="t('Product')" style="width: 25%" sortable></Column>
        <Column field="Price" :header="t('Price')" style="width: 25%" sortable>
          <template #body="slotProps">
              {{ formatCurrency(slotProps.data.Price) }}
          </template>
        </Column>
        <Column field="Is_enabled" :header="t('IsEnabled')" style="width: 25%"></Column>
    </DataTable>
  </div>

  <ProductModal ref="productModal"
                :propProduct="productList"
                num="1"
                @push-data="updateProduct"></ProductModal>
  <!-- 元件的傳遞 ( props ) 不一定要加上 v-bind 也可以接受來至父層的資料，
  但沒有用 v-bind 的話，它只會接受「純文字」的形式 -->
  <DelModal ref="delModal"
            :propItem="selectedProduct"
            @del-item="delProduct"></DelModal>
</template>

<script>
import { reactive, ref, computed, onMounted, inject } from 'vue';
import $axios from 'axios';
import { useI18n } from 'vue-i18n';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProductModal from '../../components/ProductModal.vue';
import DelModal from '../../components/DelModal.vue';
import InputText from 'primevue/inputtext';
import moment from 'moment';

export default{
  components:{
    DataTable,
    Column,
    InputText,
    ProductModal,
    DelModal,
  },

  setup(){
    const webApi = `${process.env.VUE_APP_WebAPI}/product`;
    const { t } = useI18n();
    const $swal = inject('$swal');
    const isLoading = ref(false);
    const formatCurrency = (value) => {
      return value.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD', minimumFractionDigits: 0 });
    };
    const today = "Product-" + moment().format('YYYYMMDDHHmm');

    const allProducts = ref([]);  // 商品資料
    function getProducts(){
      isLoading.value = true;
      $axios.get(webApi)
            .then(res=>{
              // console.log(res);
              isLoading.value = false;
              allProducts.value = res.data.data;
            })
            .catch(err=>{
              isLoading.value = false;
              console.log(err);
            })
    }

    // 匯出excel功能
    const dt = ref(null); // ref="dt"
    function exportCSV(){
      dt.value.exportCSV();
    }

    onMounted(()=>{
      getProducts();
    })

    const productList = ref({});
    // 新增商品資料
    function updateProduct(item){
      // console.log(item);
      isLoading.value = true;
      productList.value = item;

      $axios({
        method: "post",
        url: webApi,
        data: productList.value,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(res=>{
          isLoading.value = false;
          $swal({
            icon: 'success',
            title: String.format(t("msgAddToCart", [ productList.value.name ]))
          });
          closeModal();
          getProducts();
        })
        .catch(err=>{
          isLoading.value = false;
          $swal({
            icon: 'error',
            title: err.response.data.msg,
          });
        })
    }

    const selectedProduct = ref({});  // 選取的商品
    // 刪除商品
    function delProduct(){
      isLoading.value = true;
      $axios.delete(webApi + "?id=" + selectedProduct.value.ID)
        .then(res=>{
          isLoading.value = false;
          $swal({
            icon: 'success',
            title: t("Success")
          });

          selectedProduct.value = {};
          closeDelModal();
          getProducts();
        })
        .catch(err=>{
          isLoading.value = false;
          // console.log(err);
          $swal({
            icon: 'error',
            title: err.response.data.msg,
          });
        })
    }

    // modal
    const productModal = ref(null);
    function openModal(){
      productModal.value.showModal();
    }
    function closeModal(){
      productModal.value.hideModal();
    }

    const delModal = ref(null);
    function openDelModal(){
      if(!selectedProduct.value.ID){
        $swal({
            icon: 'error',
            title: t("MsgPleaseSelectData")
          });
      }else{
        delModal.value.showModal();
      }
    }
    function closeDelModal(){
      delModal.value.hideModal();
    }

    // filter
    const filters = reactive({});
    const globalFilter = ref(''); // 輸入的文字
    const filteredProducts = computed(() => { // 篩選後的資料
      return allProducts.value.filter(product => {
        let matched = true;

        // 全局筛选
        if (globalFilter.value) {
          matched =
            matched &&
            Object.values(product).some(value =>
              String(value).toLowerCase().includes(globalFilter.value.toLowerCase())
            );
        }

        // 各个列的筛选
        if (filters) {
          Object.entries(filters).forEach(([field, filterValue]) => {
            if (filterValue !== undefined && filterValue !== null && filterValue !== '') {
              matched =
                matched &&
                String(product[field]).toLowerCase().includes(filterValue.toLowerCase());
            }
          });
        }

        return matched;
      });
    });


    return{
      t,
      isLoading,
      formatCurrency,
      today,
      allProducts,
      dt,
      exportCSV,
      selectedProduct,
      productList,
      updateProduct,
      getProducts,
      delProduct,
      productModal,
      openModal,
      delModal,
      openDelModal,
      globalFilter,
      filteredProducts
    }
  }
}

</script>