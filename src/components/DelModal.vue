<script setup>
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({

});
const emits = defineEmits([]);

const myModal = ref(null);  // 回傳物件
const modal = ref(null);

onMounted(()=>{
  myModal.value = new Modal(modal.value);
  console.log(myModal.value);
})

// function showModal(){
//   myModal.value.show();
// }
const showModal = () => {
  myModal.value.show();
}

function hideModal(){
  myModal.value.hide();
}

defineExpose({
  showModal,
  hideModal
})
</script>

<template>
  <div
    class="modal fade"
    id="delModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <!-- <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header text-white bg-danger">
          <h5 class="modal-title">刪除警示!!</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="item.Name">
          您確定要刪除產品名稱為
          <strong class="text-danger">{{ item.Name }}</strong> (刪除後無法復原)
        </div>
        <div class="modal-body" v-else>
          您確定要刪除此筆訂單嗎? (刪除後無法復原)
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="$emit('delProdcut')"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div> -->
  </div>
</template>