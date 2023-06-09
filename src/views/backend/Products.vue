<template>
  <Loading :active="isLoading"></Loading>

  <div class="card">
    <DataTable :value="allProducts" tableStyle="min-width: 50rem">
        <!-- <template #header>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <span class="text-xl text-900 font-bold">Products</span>
                <Button icon="pi pi-refresh" rounded raised />
            </div>
        </template> -->
        <Column field="Name" header="Name"></Column>
        <Column header="Image">
            <template #body="slotProps">
              <img :src="`${slotProps.data.ImageURL}`" :alt="slotProps.data.ImageURL" class="w-6rem shadow-2 border-round img-fluid" width="300" height="100"/>
            </template>
        </Column>
        <Column field="Price" header="Price">
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

  <ProductModal ref="productModal"></ProductModal>
</template>

<script>
import { ref, onMounted } from 'vue';
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
    const webApi = process.env.VUE_APP_WebAPI;
    const isLoading = ref(false);
    const formatCurrency = (value) => {
      return value.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' });
    };

    const allProducts = ref();
    const columns = [
      { field: 'Name', header: 'Name' },
      { field: 'ImageURL', header: 'ImageURL' },
      { field: 'Price', header: 'Price' },
      { field: 'Stock', header: 'Stock' }
    ];
    function getProducts(){
      $axios.get(`${webApi}/product`)
            .then(res=>{
              allProducts.value = res.data.data;
              console.log(allProducts.value);
            })
    }

    onMounted(()=>{
      getProducts();
    })

    const productModal = ref(null);
    function openModal(){
      productModal.value.showModal();
    }

    return{
      isLoading,
      formatCurrency,
      allProducts,
      columns,
      getProducts,
      productModal,
      openModal
    }
  }
}

</script>