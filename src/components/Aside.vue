<template>
  <!--<aside v-show="store.menuOpened">-->
  <aside v-bind:class="{opened: store.menuOpened}">
    <!--<p>Aside begin</p>-->
    <router-link v-for="(item, index) in store.foods" :key="item.name"
                 :to="{name: 'foodSection', hash:'#'+store.foods[index].hash}">
      {{item.name}}
    </router-link>
    <!--<a v-for="(item, index) in store.foods" :key="item.name"
    v-bind:href="store.foods[index].name">
      {{item.name}}
    </a>-->
    <!--<a v-for="(item, index) in store.foods" :key="item.name"
       v-bind:href="store.foods[index].name">
      {{item.name}}
    </a>-->
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
  padding: 1em;
}
ul  {
  padding-left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.opened {
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 4em;
  min-width: 4em;
}

a{
  margin-bottom: 1em;
  text-align: left;
  text-decoration-line: none;
  color: white;
}
a:visited {
  color: white;
}
</style>