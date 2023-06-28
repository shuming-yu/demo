<i18n src="./resources/ProductModal.json"></i18n>

<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document" ref="modal">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ $t("Add") + $t("Product") }}</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <!-- <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control" id="image"
                        placeholder="請輸入圖片連結">
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input type="file" id="customFile" class="form-control">
              </div>
              <img class="img-fluid" alt="">
              延伸技巧，多圖 
              <div class="mt-5">
                <div class="mb-3 input-group" >
                  <input type="url" class="form-control form-control"
                          placeholder="請輸入連結">
                  <button type="button" class="btn btn-outline-danger">
                    移除
                  </button>
                </div>
                <div>
                  <button class="btn btn-outline-primary btn-sm d-block w-100">
                    新增圖片
                  </button>
                </div>
              </div>
            </div> -->
            <div class="col-12">
              <div class="mb-3">
                <label for="title" class="form-label">商品名稱</label>
                <input type="text" class="form-control" id="name"
                        v-model="tempProduct.name"
                        placeholder="請輸入標題">
              </div>
  
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input type="text" class="form-control" id="category"
                          v-model="tempProduct.category"
                          placeholder="請輸入分類">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input type="text" class="form-control" id="sku"
                          v-model="tempProduct.sku"
                          placeholder="請輸入單位">
                </div>
              </div>
  
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">價格</label>
                  <input type="number" class="form-control" id="price"
                          v-model="tempProduct.price"
                          placeholder="請輸入價格">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">庫存</label>
                  <input type="number" class="form-control" id="stock"
                          v-model="tempProduct.stock"
                          placeholder="請輸入庫存">
                </div>
              </div>
              <hr>
  
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea type="text" class="form-control" id="description"
                          v-model="tempProduct.description"
                          placeholder="請輸入產品描述"></textarea>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control" id="imageURL"
                        v-model="tempProduct.imageURL"
                        placeholder="請輸入圖片連結">
              </div>
              <!-- <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea type="text" class="form-control" id="content"
                          placeholder="請輸入產品說明內容"></textarea>
              </div> -->
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox"
                          :true-value="1"
                          :false-value="0"
                          id="enabled"
                          v-model="tempProduct.enabled">
                  <label class="form-check-label" for="enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="pushData">確認</button>
          <button type="button" class="btn btn-outline-secondary"
                  data-bs-dismiss="modal">取消
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import { ref, onMounted, watch } from 'vue';
export default{
  props: ['propProduct', 'num'],
  // props: {
  //   propProduct: {
  //     type: Object,
  //     default: () => ({})
  //   }
  // },
  emits: ['push-data'],


  setup(props, { attrs, slots, emit }){
    console.log(props);
    const tempProduct = ref({});
    // console.log(tempProduct);

    function pushData(){
      emit('push-data', tempProduct.value);
    }
    watch(
      () => {
        tempProduct.value = props.propProduct;
      },
      { deep: true }
    )

    const myModal = ref(null);
    const modal = ref(null);  // ref="modal"
    console.log('myModal:', myModal);
    console.log('modal:', modal);
    
    onMounted(() => {
      myModal.value = new Modal(modal.value);
      // myModal.value.show();
    })
    
    function showModal(){
      myModal.value.show();
    }

    function hideModal(){
      myModal.value.hide();
    }

    return{
      tempProduct,
      pushData,
      modal,
      myModal,
      showModal,
      hideModal
    }
  }
}

</script>