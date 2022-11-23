<template>
  <aside v-bind:class="{opened: store.menuOpened}">
    <div class="aside-menu">
      <router-link v-for="(item, index) in store.foods" :key="item.name"
                   :to="{name: 'foodSection', hash:'#'+store.foods[index].hash}">
        {{item.name}}
      </router-link>
    </div>
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

.aside-menu {
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
  position: fixed;
  top: 4em;
  min-width: 10em;
  height: 89.6vh;
  /* margin-top: 1em; */
  box-shadow: 0 8px 20px hsl(40deg 3% 45% / 20%);
}

a{
  /*margin-bottom: 1em;
  text-align: left;
  text-decoration-line: none;
  color: white;*/
  margin: 0.25em;
  text-align: left;
  text-decoration-line: none;
  color: #000;
  padding: 0 0.25em 0 0.25em;
}
a:hover {
  background-color: #c2c2c2;
  border-radius: 1em;
}
a:active  {
  background-color: #ef0a0a;
  border-radius: 1em;
}
a:visited {
  color: #000;
}
</style>