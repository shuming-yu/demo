<template>
  <Loading :active="isLoading"></Loading>

  <div class="row p-5">
    <div class="col-3">
      <div class="card flex align-items-center justify-content-center" style="border: none;">
        <TieredMenu :model="tieredMenuItems" />
      </div>
    </div>
    <div class="col-9">
      <div class="row">
        <div class="col-md-4" v-for="item in allProducts" :key="item.ID">
            <!-- <Card style="width: 25em">
              <template #header>
                <img alt="image" src="https://primefaces.org/cdn/primevue/images/usercard.png" style="max-width: 100%;" />
              </template>
              <template #title>{{ item.Name }}</template>
              <template #subtitle>{{ item.Category }}</template>
              <template #content>
                <p>{{ item.Description }}</p>
              </template>
              <template #footer>
                <div class="d-flex justify-content-between">
                  <Button icon="pi pi-search" label="詳細資料" severity="secondary" outlined rounded raised />
                  <Button icon="pi pi-shopping-cart" label="加入購物車" severity="info" rounded raised />
                </div>
              </template>
            </Card> -->
            <!-- onerror="this.src='./img/img404.png'" -->
            <div class="card ">
              <img :src="item.ImageURL" class="card-img-top" :alt="item.Name" @error="handleImageError">
              <div class="card-body">
                  <h5 class="card-title">{{ item.Name }}<span class="badge badge-light float-right text-muted">{{ item.Category }}</span></h5>
                  <p class="card-text">{{ truncatedDescription(item.Description) }}</p>
                  <div class="d-flex justify-content-between align-items-baseline">
                      <!-- <del class="h6">{{ item.origin_price | currency }}元</del>
                      <div class="h5">{{ item.price | currency }}元</div> -->
                      <del class="h6">1000元</del>
                      <div class="h5">{{ item.Price | 100 }}元</div>
                  </div>
              </div>
              <div class="card-footer d-flex justify-content-between">
                  <!-- <router-link :to="{path: `lesson/${item.id}`}" class="btn btn-outline-primary">詳細資料</router-link>
                  <a href="#" @click.prevent="addToCart({ id: item.id })" class="btn btn-primary">加入購物車</a> -->

                  <button type="button" class="btn btn-outline-secondary">詳細資料</button>
                  <button type="button" class="btn btn-info">加入購物車</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const webApi = `${process.env.VUE_APP_WebAPI}/product`;
const { t } = useI18n();
const $swal = inject('$swal');
const isLoading = ref(false);

// 圖片載入失敗時自動顯示預設圖片
const defaultImg = require('../img/img404.png');
function handleImageError(event){
  event.target.src = defaultImg;
}

// 檢查傳入的文字是否超過45個字符, 若超過則添加省略號 '...'
function truncatedDescription(description) {
  if (description.length > 45) {
    return description.slice(0, 45) + '...';
  }
  return description;
}

const tieredMenuItems = ref([
  {
    label: '全部商品',
    icon: 'pi pi-fw pi-power-off'
  },
  {
    separator: true
  },
  {
    label: '體驗課程',
    icon: 'pi pi-fw pi-power-off'
  },
  {
    separator: true
  },
  {
    label: '有氧',
    icon: 'pi pi-fw pi-power-off'
  },
  {
    separator: true
  },
  {
    label: '瑜珈',
    icon: 'pi pi-fw pi-power-off'
  },
  {
    separator: true
  },
  {
    label: '肌力訓練',
    icon: 'pi pi-fw pi-power-off'
  }
])

const allProducts = ref([]);  // 全部商品資料
// 取得全部商品資料
function getProducts(){
  isLoading.value = true;
  $axios.get(webApi)
        .then(res=>{
          console.log(res);
          isLoading.value = false;
          allProducts.value = res.data.data;
        })
        .catch(err=>{
          isLoading.value = false;
          console.log(err);
        })
}

onMounted(()=>{
  getProducts();
})

const first = computed(()=>{
  return allProducts.value.filter(x=>{
    // console.log(x);
  })
});

console.log(first);

</script>