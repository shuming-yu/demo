<i18n src="./resources/DelModal.json"></i18n>
<!-- script setup 參考 : https://cn.vuejs.org/api/sfc-script-setup.html -->

<script setup>
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  // 內層接收
  propItem: {
    type: Object, // 傳進來型別為 Object
    default: () => ({}) // 若外層無正確傳遞, 預設值回傳空物件
  }
});

const emits = defineEmits(['del-item']);
function delItem(){
  emits('del-item')
}


const myModal = ref(null);  // 回傳物件
const modal = ref(null);

onMounted(()=>{
  myModal.value = new Modal(modal.value);
})

function showModal(){
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
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title" id="exampleModalLabel">{{ t("Delete") + t("Product") }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body" v-if="props.propItem.Name">
          {{ t("MsgConfirmDelProduct") }} 
          <strong class="text-danger">{{ props.propItem.Name }}</strong> {{ t("MsgCannotRecover") }}
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="delItem">{{ t("OK") }}</button>
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">{{ t("Cancel") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>