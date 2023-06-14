<i18n src="./resources/Products.json"></i18n>

<template>
  <Loading :active="isLoading"></Loading>

  <div class="m-3 text-end">
    <button class="btn btn-primary" type="button" @click="openModal">
      {{ $t("Add") + $t("Product") }}
    </button>
  </div>
  <div class="m-3 card">
    <DataTable v-model:selection="selectedProduct" :value="allProducts" sortField="Name" selectionMode="single" tableStyle="min-width: 50rem">
        <!-- <template #header>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <span class="text-xl text-900 font-bold">Products</span>
                <Button icon="pi pi-refresh" rounded raised />
            </div>
        </template> -->
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
        <!-- <Column field="category" header="Category"></Column> -->
        <!-- <Column field="rating" header="Reviews">
            <template #body="slotProps">
                <Rating :modelValue="slotProps.data.rating" readonly :cancel="false" />
            </template>
        </Column>
        <Column header="Status">
            <template #body="slotProps">
                <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data)" />
            </template>
        </Column> -->
        <!-- <template #footer> In total there are {{ products ? products.length : 0 }} products. </template> -->
    </DataTable>
  </div>

  <ProductModal ref="productModal"
                :propProduct="productList"
                @push-data="updateProduct"></ProductModal>
</template>

<script>
import { ref, onMounted, inject } from 'vue';
import $axios from 'axios';
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
    const $swal = inject('$swal');
    const isLoading = ref(false);
    const formatCurrency = (value) => {
      return value.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' });
    };

    const allProducts = ref([]);
    const selectedProduct = ref({});
    const columns = [
      { field: 'Name', header: 'Name' },
      { field: 'ImageURL', header: 'ImageURL' },
      { field: 'Price', header: 'Price' },
      { field: 'Stock', header: 'Stock' }
    ];
    function getProducts(){
      $axios.get(webApi)
            .then(res=>{
              allProducts.value = res.data.data;
            })
    }

    onMounted(()=>{
      getProducts();
    })

    const productList = ref({});
    function updateProduct(item){
      productList.value = item;
      // $axios.post(webApi, productList.value)
      //       .then(res=>{
      //         console.log(res);
      //       })
      //       .catch(err=>{
      //         console.log(err);
      //       })

      $axios({
        method: "post",
        url: webApi,
        data: productList.value,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(res=>{
            console.log(res);
          })
        .catch(err=>{
            console.log(err);
          })
    }


    const productModal = ref(null);
    function openModal(){
      productModal.value.showModal();
    }

    return{
      isLoading,
      formatCurrency,
      allProducts,
      selectedProduct,
      productList,
      updateProduct,
      columns,
      getProducts,
      productModal,
      openModal
    }
  }
}

</script>