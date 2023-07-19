<template>
  <Loading :active="isLoading"></Loading>
  <div class="p-5">
    <TabMenu :model="tabMenuItems" @click="handleItemClick" />
  </div>

  <div class="row p-5">
    <div class="col-3">
      <div class="card flex align-items-center justify-content-center" style="border: none;">
        <TieredMenu :model="tieredMenuItems" />
      </div>
    </div>
    <div class="col-9">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col-4" v-for="item in allProducts" :key="item.ID">
          <div class="card border-dark h-100 image-container background-image">
            <img :src="item.ImageURL" class="card-img-top" :alt="item.Name" @error="handleImageError">
            <div class="text-overlay">
              <div class="card-body">
                <div class="card-title d-flex justify-content-between align-items-baseline">
                  <h3><span class="badge text-dark bg-light">{{ item.Name }}</span></h3>
                  <h6><span class="badge text-white bg-pink">{{ item.Category }}</span></h6>
                </div>
                <p class="card-text">{{ truncatedDescription(item.Description) }}</p>
                <div class="d-flex justify-content-between align-items-baseline">
                    <!-- <del class="h6">{{ item.origin_price | currency }}元</del>
                    <div class="h5">{{ item.price | currency }}元</div> -->
                    <del class="h6">1000元</del>
                    <div class="h5 text-red"><strong>{{ item.Price | 100 }}元</strong></div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between" style="background-color: transparent;">
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

const handleItemClick = (item) => {
  console.log(item);
  const highlightedItems = document.querySelectorAll('.p-highlight');
  highlightedItems.forEach(item => item.classList.remove('p-highlight'));
};

const tabMenuItems = ref([
{
    label: '全部商品',
    exact: false
    // icon: 'pi pi-fw pi-power-off'
  },
  {
    label: '體驗課程',
    exact: false
    // icon: 'pi pi-fw pi-power-off'
  },
  {
    label: '有氧',
    // icon: 'pi pi-fw pi-power-off'
  },
  {
    label: '瑜珈',
    // icon: 'pi pi-fw pi-power-off'
  },
  {
    label: '肌力訓練',
    // icon: 'pi pi-fw pi-power-off'
  }
])

const tieredMenuItems = ref([
  {
    label: '全部商品',
    // icon: 'pi pi-fw pi-power-off'
  },
  {
    separator: true
  },
  {
    label: '體驗課程',
    // icon: 'pi pi-fw pi-power-off'
  },
  {
    separator: true
  },
  {
    label: '有氧',
    // icon: 'pi pi-fw pi-power-off'
  },
  {
    separator: true
  },
  {
    label: '瑜珈',
    // icon: 'pi pi-fw pi-power-off'
  },
  {
    separator: true
  },
  {
    label: '肌力訓練',
    // icon: 'pi pi-fw pi-power-off'
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

</script>

<style>
.image-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.image-container img {
  transition: transform 0.3s ease;
}

.image-container:hover img {
  transform: scale(1.2);
  z-index: 1;
}

.image-container .text-overlay {
  position: relative;
  z-index: 2;
}

/* .background-image{
  background-image: linear-gradient( 103.3deg,  rgba(252,225,208,1) 30%, rgba(255,173,214,1) 55.7%, rgba(162,186,245,1) 81.8% );
  background-image: radial-gradient( circle farthest-corner at 5.3% 17.2%,  rgba(255,208,253,1) 0%, rgba(255,237,216,1) 90% );
} */
</style>