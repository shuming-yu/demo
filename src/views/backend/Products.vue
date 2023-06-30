<i18n src="./resources/Products.json"></i18n>

<template>
  <Loading :active="isLoading"></Loading>
  <div class="m-3 text-end">
    <button class="btn btn-primary" type="button" @click="openModal">
      {{ t("Add") + t("Product") }}
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
    <DataTable v-model:selection="selectedProduct" :value="allProducts" ref="dt" selectionMode="single" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
        <template #header>
            <div style="text-align: right">
                <!-- <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" /> -->
                <button type="button" class="btn btn-success" @click="exportCSV($event)">Export</button>
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
</template>

<script>
import { ref, onMounted, inject } from 'vue';
import $axios from 'axios';
import { useI18n } from 'vue-i18n';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ProductModal from '../../components/ProductModal.vue';

export default{
  components:{
    DataTable,
    Column,
    ProductModal
  },

  setup(){
    const webApi = `${process.env.VUE_APP_WebAPI}/product`;
    const { t } = useI18n();
    const $swal = inject('$swal');
    const isLoading = ref(false);
    const formatCurrency = (value) => {
      return value.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD', minimumFractionDigits: 0 });
    };

    const allProducts = ref([]);  // 商品資料
    const selectedProduct = ref({});  // 選取的商品
    function getProducts(){
      $axios.get(webApi)
            .then(res=>{
              // console.log(res);
              allProducts.value = res.data.data;
            })
            .catch(err=>{
              console.log(err);
            })
    }
    const dt = ref(null); // ref="dt"
    const exportCSV = () => {
      dt.value.exportCSV();
    };

    onMounted(()=>{
      getProducts();
    })

    const productList = ref({});  // 新增商品資料
    function updateProduct(item){
      console.log(item);
      productList.value = item;

      $axios({
        method: "post",
        url: webApi,
        data: productList.value,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(res=>{
          $swal({
            icon: 'success',
            title: String.format(t("msgAddToCart", [ productList.value.name ]))
          });
          closeModal();
          getProducts();
        })
        .catch(err=>{
          $swal({
            icon: 'error',
            title: err.response.data.msg,
          });
        })
    }


    const productModal = ref(null);
    function openModal(){
      productModal.value.showModal();
    }
    function closeModal(){
      productModal.value.hideModal();
    }

    return{
      t,
      isLoading,
      formatCurrency,
      allProducts,
      dt,
      exportCSV,
      selectedProduct,
      productList,
      updateProduct,
      getProducts,
      productModal,
      openModal
    }
  }
}

</script>