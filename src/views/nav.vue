<template>
  <div class="card flex justify-content-center">
    <!-- <Sidebar v-model:visible="visible"> -->
    <!-- <Sidebar visible="true" :full-screen="true">
        <h2>Sidebar</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <template #header>
            <div class="flex">
                <button class="p-sidebar-icon p-link mr-2">
                    <span class="pi pi-print" />
                </button>
                <button class="p-sidebar-icon p-link mr-2">
                    <span class="pi pi-search" />
                </button>
            </div>
        </template>

      <PanelMenu v-model:expandedKeys="expandedKeys" :model="items" class="w-full md:w-25rem"  />
    </Sidebar>

    <div class="content">
      <Button icon="pi pi-plus" @click="visible = true" />
    </div> -->
  </div>
  
  <div>
    <Sidebar v-model:visible="visible" :full-screen="true">
      <PanelMenu :model="menuItems"></PanelMenu>
    </Sidebar>
  
    <Menubar :model="menubarItems"></Menubar>
  
    <div class="content">
      <!-- 其他頁面內容 -->
      <Button icon="pi pi-plus" @click="visible = true" />
    </div>
    
  </div>
</template>

<script setup>
import Sidebar from 'primevue/sidebar';
import PanelMenu from 'primevue/panelmenu';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import { ref } from "vue";

const visible = ref(true);

// const expandedKeys = ref({});
// const items = ref([
//   {
//       key: '0',
//       label: 'File',
//       icon: 'pi pi-fw pi-file',
//       items: [
//           {
//               key: '0_0',
//               label: 'New',
//               icon: 'pi pi-fw pi-plus',
//               items: [
//                   {
//                       key: '0_0_0',
//                       label: 'Bookmark',
//                       icon: 'pi pi-fw pi-bookmark'
//                   },
//                   {
//                       key: '0_0_1',
//                       label: 'Video',
//                       icon: 'pi pi-fw pi-video'
//                   }
//               ]
//           },
//           {
//               key: '0_1',
//               label: 'Delete',
//               icon: 'pi pi-fw pi-trash'
//           },
//           {
//               key: '0_2',
//               label: 'Export',
//               icon: 'pi pi-fw pi-external-link'
//           }
//       ]
//   },
//   {
//       key: '1',
//       label: 'Edit',
//       icon: 'pi pi-fw pi-pencil',
//       items: [
//           {
//               key: '1_0',
//               label: 'Left',
//               icon: 'pi pi-fw pi-align-left'
//           },
//           {
//               key: '1_1',
//               label: 'Right',
//               icon: 'pi pi-fw pi-align-right'
//           },
//           {
//               key: '1_2',
//               label: 'Center',
//               icon: 'pi pi-fw pi-align-center'
//           },
//           {
//               key: '1_3',
//               label: 'Justify',
//               icon: 'pi pi-fw pi-align-justify'
//           }
//       ]
//   },
//   {
//       key: '2',
//       label: 'Users',
//       icon: 'pi pi-fw pi-user',
//       items: [
//           {
//               key: '2_0',
//               label: 'New',
//               icon: 'pi pi-fw pi-user-plus'
//           },
//           {
//               key: '2_1',
//               label: 'Delete',
//               icon: 'pi pi-fw pi-user-minus'
//           },
//           {
//               key: '2_2',
//               label: 'Search',
//               icon: 'pi pi-fw pi-users',
//               items: [
//                   {
//                       key: '2_2_0',
//                       label: 'Filter',
//                       icon: 'pi pi-fw pi-filter',
//                       items: [
//                           {
//                               key: '2_2_0_0',
//                               label: 'Print',
//                               icon: 'pi pi-fw pi-print'
//                           }
//                       ]
//                   },
//                   {
//                       key: '2_2_1',
//                       icon: 'pi pi-fw pi-bars',
//                       label: 'List'
//                   }
//               ]
//           }
//       ]
//   },
//   {
//       key: '3',
//       label: 'Events',
//       icon: 'pi pi-fw pi-calendar',
//       items: [
//           {
//               key: '3_0',
//               label: 'Edit',
//               icon: 'pi pi-fw pi-pencil',
//               items: [
//                   {
//                       key: '3_0_0',
//                       label: 'Save',
//                       icon: 'pi pi-fw pi-calendar-plus'
//                   },
//                   {
//                       key: '3_0_0',
//                       label: 'Delete',
//                       icon: 'pi pi-fw pi-calendar-minus'
//                   }
//               ]
//           },
//           {
//               key: '3_1',
//               label: 'Archieve',
//               icon: 'pi pi-fw pi-calendar-times',
//               items: [
//                   {
//                       key: '3_1_0',
//                       label: 'Remove',
//                       icon: 'pi pi-fw pi-calendar-minus'
//                   }
//               ]
//           }
//       ]
//   }
// ]);


// const expandAll = () => {
//   for (let node of items.value) {
//       expandNode(node);
//   }

//   expandedKeys.value = {...expandedKeys.value};
// };

// const collapseAll = () => {
//   expandedKeys.value = {};
// };

// const expandNode = (node) => {
//   if (node.items && node.items.length) {
//       expandedKeys.value[node.key] = true;

//       for (let child of node.items) {
//           expandNode(child);
//       }
//   }
// };

const menuItems = ref([
  {
    label: '主頁',
    icon: 'pi pi-home',
    to: '/'
  },
  {
    label: '使用者管理',
    icon: 'pi pi-users',
    items: [
      {
        label: '新增使用者',
        icon: 'pi pi-plus',
        to: '/users/add'
      },
      {
        label: '使用者列表',
        icon: 'pi pi-list',
        to: '/users/list'
      }
    ]
  },
  {
    label: '國家管理',
    icon: 'pi pi-globe',
    items: [
      {
        label: '新增國家',
        icon: 'pi pi-plus',
        to: '/countries/add'
      },
      {
        label: '國家列表',
        icon: 'pi pi-list',
        to: '/countries/list'
      }
    ]
  }
])

const menubarItems = ref([
  {
    label: '首頁',
    icon: 'pi pi-home',
    to: '/'
  },
  {
    label: '關於',
    icon: 'pi pi-info',
    to: '/about'
  },
  {
    label: '聯絡我們',
    icon: 'pi pi-envelope',
    to: '/contact'
  }
])
</script>

<style>
/* 跟 Sidebar 的寬度保持一致 */
/* .content {
  margin-left: 350px; 
} */

.content {
  margin-top: 60px; /* 跟 Menubar 的高度保持一致 */
  margin-left: 250px; /* 跟 Sidebar 的寬度保持一致 */
}
</style>