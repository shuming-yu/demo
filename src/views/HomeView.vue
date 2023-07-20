<template>
  <header class="header" style="background-image: url(https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80)">
    <div class="container d-flex align-items-center h-100">
      <div class="row">
        <h1 class="text-white">Ben<br>複合工作室</h1>
        <!-- <button class="btn btn-primary btn-lg col-md-5 offset-md-2" @click="location.href=('')">立即體驗</button> -->
        <router-link :to="{path: `/products`}" class="btn btn-primary btn-lg col-md-5 offset-md-2">立即體驗</router-link>
      </div>
    </div>
  </header>

  <section class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <!-- <img class="height-s5 w-100 object-fit-cover" src="../assets/logo.png" alt=""> -->
        <img class="height-s5 w-100 object-fit-cover" src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" alt="" srcset="">
      </div>
      <div class="col-md-5 d-flex align-items-center">
        <div>
        <h2>一對一訓練</h2>
        <p>想踏入健身運動，又不知該如何開始嗎? 跟著我們的教練，從根本打好基礎，一步步帶您成為更棒的自己。若您已是有經驗者，想調整更好的動作，我們的專業教練也能快速找到您的問題點。</p>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mt-4 flex-row-reverse">
      <div class="col-md-5">
        <!-- <img class="height-s5 w-100 object-fit-cover" src="../assets/logo.png" alt=""> -->
        <img class="height-s5 w-100 object-fit-cover" src="https://images.unsplash.com/photo-1644612105654-b6b0a941ecde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" srcset="">
      </div>
      <div class="col-md-5 d-flex align-items-center">
        <div>
        <h2>團課訓練</h2>
        <p>若您下班下課，或者有任何時間不知該如何打發，歡迎參與我們的團課活動。我們有不同的主題，阻力動作或是有氧活動，讓您運動不無聊，也能認識同好。 阻力將有專業教練帶您認識各種阻力器材，並教您基礎動作。有氧活動目前有有氧拳擊與瑜珈課程可供選擇。</p>
        </div>
      </div>
    </div>
  </section>

  <!-- <section class="py-5 mt-5" style="background-image: url(https://images.unsplash.com/22/brick-wall.JPG?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4 text-center">
          <img src="../assets/logo.png" style="width: 400px" class="img-fluid" alt="" @error="handleImageError">
        </div>
        <div class="col-md-4 d-flex align-items-center">
          <div>
          <p class="text-white">YMCA ( Young Men's Christian Association ) 亦即基督教青年會，西元1844年創立於英國倫敦，而後再逐漸擴展至全世界各地。一百七十多年來，YMCA一直本著基督服務的精神，透過教育、文化、技藝、體育、露營、社團服務等有關事工的推行，培養青少年德、智、體、群、美之均衡發展；同時透過世界各地青年的交流活動，擴展國際友誼的領域，以促進世界人類的和平。</p>
          <button type="button" class="btn-primary btn w-100">訂閱</button>
          </div>
        </div>
      </div>
    </div>
  </section> -->

  <footer class="bg-dark py-2 mt-5">
    <div class="container text-white">
      <div class="text-center">Copyright &copy; 2022 All Rights Reserved. Designed by ShuMingYU</div>
    </div>
  </footer>
</template>

<script setup>



</script>
