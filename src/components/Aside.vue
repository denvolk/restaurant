<template>
  <!--<aside v-show="store.menuOpened">-->
  <aside v-bind:class="{opened: store.menuOpened}">
    <!--<p>Aside begin</p>-->
    <ul>
      <li v-for="item in store.menuItems" :key="item">
        <button class="menu-list item" v-bind:class="item">{{item}}</button>
      </li>
    </ul>
    <!--<p>Aside end</p>-->
  </aside>
</template>

<script>
import {store} from "@/store/store";
export default {
  name: "Aside",

  data: function () {
    return{
      store
    }
  }
}
</script>

<style scoped>
  Aside {
    display: none;
    height: 100%;
  }
  ul  {
    padding-left: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .opened {
    display: block;
  }
</style>