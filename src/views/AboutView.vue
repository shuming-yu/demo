<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button class="btn btn-lg btn-block" type="submit" @click="singIn">{{ $t("Login") }}</button>
    <button class="btn btn-lg btn-block" type="submit" @click="add">{{ $t("Add") }}</button>

    <Button label="Link" link />

    <div class="card flex justify-content-center">
        <!-- <Toast /> -->
        <div class="flex flex-wrap gap-2">
            <Button label="Success" severity="success" @click="showSuccess" rounded/>
            <Button label="Info" severity="info" @click="showInfo" />
            <Button label="Warn" severity="warning" @click="showWarn" />
            <Button label="Error" severity="danger" @click="showError" />
        </div>
    </div>

    <div class="card">
        <DataTable v-model:selection="selectedProduct" :value="products" dataKey="id" tableStyle="min-width: 50rem">
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
        </DataTable>
    </div>

  </div>
</template>

<script>
import { ref, inject } from 'vue';
import $axios from 'axios';
import { useToast } from 'primevue/usetoast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
export default{
  components:{
    DataTable,
    Column
  },

  setup(){
    const toast = useToast();
    const showSuccess = () => {
        toast.add({ severity: 'success', summary: 'Success Message', detail: '', life: 3000 });
    };

    const showInfo = () => {
        toast.add({ severity: 'info', summary: 'Info Message', detail: 'Message Content', life: 3000 });
    };

    const showWarn = () => {
        toast.add({ severity: 'warn', summary: 'Warn Message', detail: 'Message Content', life: 3000 });
    };

    const showError = () => {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });
    };

    // const $axios = inject('axios');
    const $swal = inject('$swal');
    const user = ref({
      username: "",
      password: ""
    });

    function singIn(){
      // let api = `${process.env.VUE_APP_WebAPI}shumingyu/example`;
      let api = "https://randomuser.me/api/";
      console.log(api);

      $axios.get(api)
        .then((res) => {
          $swal({
            icon: 'success',
            title: `將 xxx 加入購物車！`,
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }

    function add(){

    }

    const selectedProduct = ref(null);
    const metaKey = ref(false);
    const products = ref([
      {
        id: "1000",
        code: "f230fh0g3",
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        price: 65,
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
      {
        id: "1001",
        code: "nvklal433",
        name: "Black Watch",
        description: "Product Description",
        image: "black-watch.jpg",
        price: 72,
        category: "Accessories",
        quantity: 61,
        inventoryStatus: "INSTOCK",
        rating: 4,
      },
      {
        id: "1002",
        code: "zz21cz3c1",
        name: "Blue Band",
        description: "Product Description",
        image: "blue-band.jpg",
        price: 79,
        category: "Fitness",
        quantity: 2,
        inventoryStatus: "LOWSTOCK",
        rating: 3,
      },
      {
        id: "1003",
        code: "244wgerg2",
        name: "Blue T-Shirt",
        description: "Product Description",
        image: "blue-t-shirt.jpg",
        price: 29,
        category: "Clothing",
        quantity: 25,
        inventoryStatus: "INSTOCK",
        rating: 5,
      },
      {
        id: "1004",
        code: "h456wer53",
        name: "Bracelet",
        description: "Product Description",
        image: "bracelet.jpg",
        price: 15,
        category: "Accessories",
        quantity: 73,
        inventoryStatus: "INSTOCK",
        rating: 4,
      },
    ]);




    return{
      user,
      singIn,
      add,
      showSuccess,
      showInfo,
      showWarn,
      showError,
      products,
      selectedProduct,
      metaKey
    }
  }
}

</script>