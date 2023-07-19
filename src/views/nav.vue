<template>
  <div class="card p-5">
      <DataView :value="allProducts" :layout="layout">
          <!-- <template #list="slotProps">
              <div class="col-12">
                  <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                      <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" :src="slotProps.data.ImageURL" :alt="slotProps.data.Name" style="width: 100px;"/>
                      <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                          <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                              <div class="text-2xl font-bold text-900">{{ slotProps.data.Name }}</div>
                              <div class="flex align-items-center gap-3">
                                  <span class="flex align-items-center gap-2">
                                      <i class="pi pi-tag"></i>
                                      <span class="font-semibold">{{ slotProps.data.Category }}</span>
                                  </span>
                              </div>
                          </div>
                          <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                              <span class="text-2xl font-semibold">${{ slotProps.data.Price }}</span>
                              <Button icon="pi pi-shopping-cart" rounded :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"></Button>
                          </div>
                      </div>
                  </div>
              </div>
          </template> -->

          <template #grid="slotProps">
                <div class="col-4 sm:col-6 lg:col-12 xl:col-4 p-2">
                    <div class="p-4 border-1 surface-border surface-card border-round">
                        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                            <div class="flex align-items-center gap-2">
                                <i class="pi pi-tag"></i>
                                <span class="font-semibold">{{ slotProps.data.Category }}</span>
                            </div>
                            <!-- <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data)"></Tag> -->
                        </div>
                        <div class="flex flex-column align-items-center gap-3 py-5">
                            <img class="w-9 shadow-2 border-round" :src="slotProps.data.ImageURL" :alt="slotProps.data.Name" />
                            <div class="text-2xl font-bold">{{ slotProps.data.Name }}</div>
                                            <!-- <Rating :modelValue="slotProps.data.rating" readonly :cancel="false"></Rating> -->
                        </div>
                        <div class="flex align-items-center justify-content-between">
                            <span class="text-2xl font-semibold">${{ slotProps.data.Price }}</span>
                            <Button icon="pi pi-shopping-cart" rounded :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"></Button>
                        </div>
                    </div>
                </div>
            </template>
      </DataView>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const layout = ref('grid');


const webApi = `${process.env.VUE_APP_WebAPI}/product`;
const allProducts = ref([]);  // 全部商品資料
// 取得全部商品資料
function getProducts(){
  $axios.get(webApi)
        .then(res=>{
          console.log(res);
          allProducts.value = res.data.data;
        })
        .catch(err=>{
          console.log(err);
        })
}

onMounted(()=>{
  getProducts();
})

</script>

<style>

</style>