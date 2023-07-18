<!-- <template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
        </ul>
        <span class="navbar-text">
          Navbar text with an inline element
        </span>
      </div>
    </div>
  </nav>
</template> -->
<template>
  <Sidebar v-model:visible="visible" :full-screen="true">
    <PanelMenu :model="panelMenuItems"></PanelMenu>
  </Sidebar>

  <div class="card relative z-2" style="border: none;">
      <Menubar class="custom-menubar" :model="menubarItems">
        <template #start>
          <!-- <img alt="logo" src="https://primefaces.org/cdn/primevue/images/logo.svg" height="40" class="mr-2" /> -->
          <Button class="mx-2" icon="pi pi-ellipsis-v" severity="secondary" text raised rounded aria-label="Ellipsis" @click="visible = true" />
        </template>
        <!-- <template #end>
          <InputText placeholder="Search" type="text" />
        </template> -->
      </Menubar>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const visible = ref(false);
const panelMenuItems = ref([
  {
    label: '主頁',
    icon: 'pi pi-home',
    to: '/dashboard'
  },
  {
    label: '商品管理',
    icon: 'pi pi-globe',
    to: '/dashboard/products'
    // items: [
    //   {
    //     label: '新增國家',
    //     icon: 'pi pi-plus',
    //     to: '/countries/add'
    //   },
    //   {
    //     label: '國家列表',
    //     icon: 'pi pi-list',
    //     to: '/countries/list'
    //   }
    // ]
  },
  {
    label: '訂單資訊',
    icon: 'pi pi-shopping-cart',
    // items: [
    //   {
    //     label: '新增使用者',
    //     icon: 'pi pi-plus',
    //     to: '/nav'
    //   },
    //   {
    //     label: '使用者列表',
    //     icon: 'pi pi-list',
    //     to: '/users/list'
    //   }
    // ]
  },
  {
    label: '使用者管理',
    icon: 'pi pi-users',
    // items: [
    //   {
    //     label: '新增使用者',
    //     icon: 'pi pi-plus',
    //     to: '/users/add'
    //   },
    //   {
    //     label: '使用者列表',
    //     icon: 'pi pi-list',
    //     to: '/users/list'
    //   }
    // ]
  },
  {
    label: '登出',
    icon: 'pi pi-sign-out',
    to: '/login'
  }
])

const menubarItems = ref([
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    to: '/dashboard'
    // items: [
    //     {
    //         label: 'New',
    //         icon: 'pi pi-fw pi-plus',
    //         items: [
    //             {
    //                 label: 'Bookmark',
    //                 icon: 'pi pi-fw pi-bookmark'
    //             },
    //             {
    //                 label: 'Video',
    //                 icon: 'pi pi-fw pi-video'
    //             }
    //         ]
    //     },
    //     {
    //         label: 'Delete',
    //         icon: 'pi pi-fw pi-trash'
    //     },
    //     {
    //         separator: true
    //     },
    //     {
    //         label: 'Export',
    //         icon: 'pi pi-fw pi-external-link'
    //     }
    // ]
  },
  // {
  //   label: 'Edit',
  //   icon: 'pi pi-fw pi-pencil',
  //   items: [
  //       {
  //           label: 'Left',
  //           icon: 'pi pi-fw pi-align-left'
  //       },
  //       {
  //           label: 'Right',
  //           icon: 'pi pi-fw pi-align-right'
  //       },
  //       {
  //           label: 'Center',
  //           icon: 'pi pi-fw pi-align-center'
  //       },
  //       {
  //           label: 'Justify',
  //           icon: 'pi pi-fw pi-align-justify'
  //       }
  //   ]
  // },
  {
    label: 'Users',
    icon: 'pi pi-fw pi-user',
    // items: [
    //     {
    //         label: 'New',
    //         icon: 'pi pi-fw pi-user-plus'
    //     },
    //     {
    //         label: 'Delete',
    //         icon: 'pi pi-fw pi-user-minus'
    //     },
    //     {
    //         label: 'Search',
    //         icon: 'pi pi-fw pi-users',
    //         items: [
    //             {
    //                 label: 'Filter',
    //                 icon: 'pi pi-fw pi-filter',
    //                 items: [
    //                     {
    //                         label: 'Print',
    //                         icon: 'pi pi-fw pi-print'
    //                     }
    //                 ]
    //             },
    //             {
    //                 label: 'List',
    //                 icon: 'pi pi-fw pi-bars'
    //             }
    //         ]
    //     }
    // ]
  },
  // {
  //   label: 'Events',
  //   icon: 'pi pi-fw pi-calendar',
  //   items: [
  //       {
  //           label: 'Edit',
  //           icon: 'pi pi-fw pi-pencil',
  //           items: [
  //               {
  //                   label: 'Save',
  //                   icon: 'pi pi-fw pi-calendar-plus'
  //               },
  //               {
  //                   label: 'Delete',
  //                   icon: 'pi pi-fw pi-calendar-minus'
  //               }
  //           ]
  //       },
  //       {
  //           label: 'Archieve',
  //           icon: 'pi pi-fw pi-calendar-times',
  //           items: [
  //               {
  //                   label: 'Remove',
  //                   icon: 'pi pi-fw pi-calendar-minus'
  //               }
  //           ]
  //       }
  //   ]
  // },
  {
      label: 'Quit',
      icon: 'pi pi-fw pi-sign-out',
      to: '/login'
  }
]);

// 在路由切換完成後隱藏 Sidebar
router.afterEach(() => {
  visible.value = false;
});
</script>

<style>
.custom-menubar {
  display: flex;
  justify-content: flex-end;
  border: none;
}
</style>