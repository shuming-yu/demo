<template>

  <ul>
    <li>盡可能使用 const 定義 reactive / ref</li>
    <li>ref 可以用在純值</li>
    <li>ref 取值時都必須加上 .value ( 不太會有被覆蓋掉的問題 )</li>
    <li>ref 比較好用, 且不會出錯的方法</li>

    <!-- <li>reactive </li> -->
    <li>reactive 取值時直接使用 點語法, 可省去 .value</li>
  </ul>


  <h2>reactive :</h2>
  <ul>
    <li>Proxy Object</li>
    <li>Handler(控制器) : 監控值的變化 ( 渲染畫面 or 重新調整原始值 )</li>
    <li>target : 值</li>
  </ul>
  <h2>ref :</h2>
  <ul>
    <li>RefImpl Object</li>
    <li>Handler(控制器) : 監控值的變化 ( 注意: 只有單純的純值時, 控制器是不存在的, 但在原型內有相同機制做運作 )</li>
    <li>rawValue : 實際上放原始值的地方</li>
    <li>value : 外層來存取所使用的</li>
    <li>寫入值, 它會把值再寫一份到 rawValue 裡面</li>
    <li>讀取值, 它會在 rawValue 裡面把值讀取出來</li>
    <li>好處 : 它的 value 不一定是 proxy 物件, 一樣可使用純值方式進行存取</li>
  </ul>

</template>

<script>
import { ref, reactive } from 'vue';

export default{
  setup(){
    // const / let

    const a = reactive({
      name: 'Benjamin'
    })
    // a.name = 'Tommy'

    let b = {
      name: 'Ted'
    }
    // a.name = b.name;
    // a = b;
    console.log('a:', a);



    const c = ref({
      name: 'Tiffany',
      family:{
        home: 'home1'
      }
    });
    const d = ref(123);
    // d.value = 321;

    // c.value = {
    //   name: 'Nicky',
    //   family:{
    //     home: 'home2'
    //   }
    // }

    let test = {
      name: 'test',
      family:{
        home: 'testhome'
      }
    }
    // c.value = test;

    console.log('c:', c);
    console.log('d:', d);

  }
}
</script>