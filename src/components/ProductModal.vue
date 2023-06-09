<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Save changes</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import { ref, onMounted } from 'vue';
export default{
  props:{
    
  },
  setup(){
    const myModal = ref(null);
    const modal = ref(null);  // ref="modal"
    
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
      modal,
      myModal,
      showModal,
      hideModal
    }
  }
}

</script>