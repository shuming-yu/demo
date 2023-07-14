<!-- router 參考 : https://router.vuejs.org/guide/advanced/composition-api.html#vue-router-and-the-composition-api -->

<template>
  <Loading :active="isLoading"></Loading>
  <div id="wrapper">
    <div class="loginbox container mt-5">
      <form class="form" @submit.prevent="register">
        <!-- <div class="col-md-6"> -->
        <h2 class="mb-3" style="text-align: center">{{ $t("BackendSystem") }}</h2>
        <div class="group mb-2">
          <label for="inputEmail" class="sr-only">Name</label>
          <input
            type="text"
            id="inputEmail"
            class="form-control"
            required
            autofocus
            v-model="user.Name"
          />
        </div>
        <div class="group mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            required
            v-model="user.Password"
          />
        </div>

        <div class="text-end btn-group mt-4">
          <button class="btn btn-lg btn-block" type="submit" @click="singIn">
            {{ $t("Login") }}
          </button>
          <button class="btn btn-lg btn-block" type="submit" disabled>
            {{ $t("Register") }}
          </button>
        </div>
        <!-- </div> -->
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue';
import router from '@/router';

const $swal = inject('$swal');
const isLoading = ref(null);
const webApi = `${process.env.VUE_APP_WebAPI}/login`;
const user = reactive({
  Name: "",
  Password: ""
});

function singIn(){
  isLoading.value = true;
  $axios({
    method: 'post',
    url: webApi,
    headers: { "Content-Type": "multipart/form-data" },
    data: user,
  })
    .then(res=>{
      isLoading.value = false;
      router.push("/dashboard/products");
    })
    .catch(err=>{
      isLoading.value = false;
      $swal({
        icon: 'error',
        title: err.response.data.errmsg,
      });
    })
}
</script>

<style scoped lang="css" src="@/assets/css/login.css"></style>