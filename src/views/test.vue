<!-- JavaScript 陣列中兩個冷門的方法：Every、Some : https://noob.tw/js-every-some/ -->
<!-- JavaScript 之旅 (4) : https://ithelp.ithome.com.tw/articles/10239942 -->

<template>
    <InputText v-model="globalFilter" placeholder="全局筛选" />

    <DataTable :value="filteredProducts">
      <Column field="name" header="产品名称" sortable />
      <Column field="category" header="产品分类" sortable />
      <Column field="price" header="价格" sortable />

      <Column field="stock" header="库存" :filter="true" />
    </DataTable>
</template>

<script>
import { ref, computed, reactive } from 'vue';

export default {
  setup() {
    const products = reactive([
      { name: '产品 A', category: '分类 A', price: 10, stock: 100 },
      { name: '产品 B', category: '分类 B', price: 20, stock: 50 },
      { name: '产品 C', category: '分类 A', price: 30, stock: 200 }
    ]);

    const filters = reactive({});
    const globalFilter = ref('');
    const filteredProducts = computed(() => {
      return products.filter(product => {
        let matched = true;

        // 全局筛选
        if (globalFilter.value) {
          matched =
            matched &&
            Object.values(product).some(value =>
              String(value).toLowerCase().includes(globalFilter.value.toLowerCase())
            );
            console.log(matched);
        }

        // 各个列的筛选
        if (filters) {
          Object.entries(filters).forEach(([field, filterValue]) => {
            if (filterValue !== undefined && filterValue !== null && filterValue !== '') {
              matched =
                matched &&
                String(product[field]).toLowerCase().includes(filterValue.toLowerCase());
            }
          });
        }

        return matched;
      });
    });

    return {
      globalFilter,
      filteredProducts
    };
  }
};
</script>