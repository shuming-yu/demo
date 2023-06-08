<template>
  <Loading :active="isLoading"></Loading>
  <button class="btn btn-primary" @click="openModal">{{ $t("Add") }}</button>
  <ProductModal ref="productModal"></ProductModal>

</template>

<script>
import ProductModal from '../../components/ProductModal.vue';
import { ref } from 'vue';

export default{
  components:{
    ProductModal
  },

  setup(){
    const isLoading = ref(false);
    const productModal = ref(null);

    function openModal(){
      productModal.value.showModal();
    }

    return{
      isLoading,
      productModal,
      openModal
    }
  }
}

</script>