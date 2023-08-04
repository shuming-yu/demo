<template>
  <ScrollTop />

  <div class="p-5">
    <TabMenu :model="tabMenuItems" @click="handleTabClick" />

    <div v-if="isLoading" class="row row-cols-1 row-cols-md-3 g-4 p-5">
      <!-- 顯示 Skeleton 效果 -->
      <div class="col-3" v-for="i in 4" :key="i">
        <div class="card border-dark h-100">
          <div class="p-skeleton-card" style="width: 100%; height: 450px">
            <Skeleton width="100%" height="150px"></Skeleton>
            <div class="flex justify-content-between align-items-baseline p-3">
              <Skeleton width="7rem" height="2.5rem" class="mt-2"></Skeleton>
              <Skeleton width="4rem" height="2rem"></Skeleton>
            </div>
            <div class="p-3">
              <Skeleton width="5rem" class="mb-2"></Skeleton>
              <Skeleton width="10rem" class="mb-2"></Skeleton>
              <Skeleton width="15rem" class="mb-2"></Skeleton>
            </div>
            <div
              class="flex justify-content-between align-items-baseline pb-2 px-3"
            >
              <Skeleton width="4rem" height="2rem" class="mt-2"></Skeleton>
              <Skeleton width="4rem" height="2rem"></Skeleton>
            </div>
            <hr style="margin: 0" />
            <div class="flex justify-content-between align-items-baseline p-3">
              <Skeleton width="7rem" height="2rem"></Skeleton>
              <div class="flex justify-content-between">
                <Skeleton width="2rem" height="2rem" class="mx-1"></Skeleton>
                <Skeleton width="2rem" height="2rem"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="row row-cols-1 row-cols-md-3 g-4 p-5">
      <div class="col-3" v-for="item in filteredProducts" :key="item.ID">
        <div class="card border-dark h-100 image-container background-image">
          <img
            :src="item.ImageURL"
            class="card-img-top"
            :alt="item.Name"
            @error="handleImageError"
          />
          <div class="text-overlay">
            <div class="card-body">
              <div
                class="card-title d-flex justify-content-between align-items-baseline"
              >
                <h3>
                  <span class="badge text-dark bg-light">{{ item.Name }}</span>
                </h3>
                <h6>
                  <span class="badge text-white bg-pink">{{
                    item.Category
                  }}</span>
                </h6>
              </div>
              <p class="card-text">
                {{ truncatedDescription(item.Description) }}
              </p>
              <div class="d-flex justify-content-between align-items-baseline">
                <!-- <del class="h6">{{ item.origin_price | currency }}元</del>
                  <div class="h5">{{ item.price | currency }}元</div> -->
                <del class="h6">1000元</del>
                <div class="h5 text-red">
                  <strong>{{ item.Price | 100 }}元</strong>
                </div>
              </div>
            </div>
            <div
              class="card-footer d-flex justify-content-between"
              style="background-color: transparent"
            >
              <!-- <router-link :to="{path: `lesson/${item.id}`}" class="btn btn-outline-primary">詳細資料</router-link>
              <a href="#" @click.prevent="addToCart({ id: item.id })" class="btn btn-primary">加入購物車</a> -->

              <button type="button" class="btn btn-outline-secondary">
                詳細資料
              </button>
              <!-- <button type="button" class="btn btn-info">加入購物車</button> -->
              <div>
                <button type="button" class="btn btn-pink mx-1">
                  <i class="pi pi-heart"></i>
                </button>
                <button type="button" class="btn btn-info">
                  <i class="pi pi-shopping-cart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed, watch } from "vue";
import { useI18n } from "vue-i18n";

const webApi = `${process.env.VUE_APP_WebAPI}/product`;
const categoryApi = `${process.env.VUE_APP_WebAPI}/productcategory`;
const { t } = useI18n();
const $swal = inject("$swal");
const isLoading = ref(false);

// 圖片載入失敗時自動顯示預設圖片
const defaultImg = require("../img/img404.png");
function handleImageError(event) {
  event.target.src = defaultImg;
}

// 檢查傳入的文字是否超過55個字符, 若超過則添加省略號 '...'
function truncatedDescription(description) {
  if (description.length > 55) {
    return description.slice(0, 55) + "...";
  }
  return description;
}

const allProducts = ref([]); // 全部商品資料
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

// 篩選Enabled: true產品
const enabledProducts = computed(() => {
  return allProducts.value.filter((x) => x.Enabled == true);
});

const allProductCategory = ref({});
const tabMenuItems = ref([
  //   {
  //     label: "全部商品",
  //     target: "All",
  //   },
]);

function getProductCategory() {
  $axios
    .get(categoryApi)
    .then((res) => {
      allProductCategory.value = res.data.data;

      tabMenuItems.value = Object.entries(allProductCategory.value).map(
        (Category) => {
          return {
            label: Category[1], // 全部商品
            target: Category[0], // All
          };
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

// 篩選後的產品資料
const filteredProducts = ref([]);
function handleTabClick(event) {
  console.log(event);
  console.log(event.target.target);
  console.log(event.target.getAttribute("target"));
  // console.log(event.target.attributes[2].nodeValue);
  const text = event.target.innerText;
  if (text === "全部商品") {
    filteredProducts.value = enabledProducts.value;
  } else {
    filteredProducts.value = enabledProducts.value.filter(
      (item) => item.Category === text
    );
  }
}

// 監聽 enabledProducts 變化
watch(enabledProducts, (newValue) => {
  filteredProducts.value = newValue;
});

onMounted(() => {
  getProducts();
  getProductCategory();
  filteredProducts.value = enabledProducts.value;
});
</script>

<style>
.image-container {
  width: 100%;
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.image-container img {
  /* width: 100%;height: 250px; object-fit: cover; */
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

/* 移除 TabMenu 選項點選時的 box-shadow */
.p-tabmenu
  .p-tabmenu-nav
  .p-tabmenuitem
  .p-menuitem-link:not(.p-disabled):focus {
  box-shadow: none !important;
}

/* .background-image{
  background-image: linear-gradient( 103.3deg,  rgba(252,225,208,1) 30%, rgba(255,173,214,1) 55.7%, rgba(162,186,245,1) 81.8% );
  background-image: radial-gradient( circle farthest-corner at 5.3% 17.2%,  rgba(255,208,253,1) 0%, rgba(255,237,216,1) 90% );
} */
</style>
