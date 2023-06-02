<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button class="btn btn-lg btn-block" type="submit" @click="singIn">{{ $t("Login") }}</button>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
export default{
  setup(){
    const $axios = inject('axios');

    const user = ref({
      username: "",
      password: ""
    });

    function singIn(){
      let api = `${process.env.VUE_APP_WebAPI}shumingyu`;
      // let api = "https://randomuser.me/api/";
      console.log(api);


      $axios.get(api)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }

    return{
      user,
      singIn
    }
  }
}

</script>