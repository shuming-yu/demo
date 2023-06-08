<template>
  <Navbar></Navbar>
  <router-view/>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.bundle';
import Navbar from '../../components/Navbar.vue';

export default{
  components:{
    Navbar
  },

  setup(){
    
  }
}


</script>