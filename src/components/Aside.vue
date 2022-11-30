<template>
  <aside class="aside-menu" v-bind:class="{opened: store.menuOpened}">
    <div class="aside-menu-list">
      <router-link v-for="(item, index) in store.foods" :key="item.name"
                   :to="{name: 'foodSection', hash:'#'+store.foods[index].hash}">
        {{item.name}}
      </router-link>
    </div>
    <!--<div class="aside-menu">

    </div>-->
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
  padding: 0.5em 1.5em 1em 1.5em;
}
ul  {
  padding-left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.aside-menu-list {
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
}

.opened {
  /*display: block;
  position: sticky;
  top: 5em;
  min-width: 15em;
  height: 88vh;
  margin-top: 1em;
  box-shadow: 0 8px 20px hsl(40deg 3% 45% / 20%);*/
  display: block;
  /*position: sticky;*/
  position: fixed;
  /*top: 4em;*/
  top: 0;
  margin: 4em 0 0 0;
  min-width: 10em;
  /*height: 91vh;*/
  /* margin-top: 1em; */
  box-shadow: 0 8px 20px hsl(40deg 3% 45% / 20%);
  height: calc(100vh - 80px);
  background-color: rgba(255, 255, 255, 0.8);
}

/*@media (-webkit-device-pixel-ratio: 1.25) {
  .opened {
    top: 4.25em;
    height: calc(100vh - 54px);
  }
}*/

a{
  /*margin-bottom: 1em;
  text-align: left;
  text-decoration-line: none;
  color: white;*/
  margin: 0.25em;
  text-align: left;
  text-decoration-line: none;
  color: #000;
  padding: 0.25em 0.25em 0.25em 0.25em;
}
a:hover {
  background-color: #c2c2c2;
  border-radius: 0.25em;
}
a:active  {
  background-color: #ef0a0a;
  border-radius: 0.25em;
}
a:visited {
  color: #000;
}
</style>