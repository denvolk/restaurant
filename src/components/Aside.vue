<template>
  <aside class="aside-menu" v-bind:class="{opened: store.menuOpened}">
    <div class="aside-menu-list">
      <router-link :to="{name: 'foodSection', hash:'#'+store.foods[index].hash}" :key="item.name" class="aside-menu-item" v-for="(item, index) in store.foods">
        <div>
          {{item.name}}
        </div>
        <img class="aside-menu-img" v-bind:src="`https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/foods/icons/${item.hash}.svg`">
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
      store,
      img: '',
    }
  },

  methods: {
    imgPath()  {
      //this.img = `https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/foods/${this.img}.webp` //gh-pages
      this.img =  `../assets/foods/icons/${this.id}.png`;  //localhost
    },
  },

  mounted() {
    this.imgPath();
  },
}
</script>

<style scoped>
Aside {
  display: none;
  height: 100%;
  padding: 0.5em 0.5em 0.5em 0.5em;
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
  width: 16.25em;
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
  /*margin: 0.25em;*/
  text-align: left;
  text-decoration-line: none;
  color: #000;
  /*padding: 0.25em 0.25em 0.25em 0.25em;*/
}
a:hover {
  /*background-color: #c2c2c2;*/
  /*border-radius: 0.25em;*/
}
a:active  {
  /*background-color: #ef0a0a;*/
  background-color: rgba(66, 185, 131, 1);
  border-radius: 0.25em;
}
a:visited {
  color: #000;
}

.aside-menu-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5em;
  padding: 0.25em;
  font-size: 2rem;
  border-left: 3px solid transparent;
}

.aside-menu-item:hover {
  background-color: #c2c2c2;
  border-radius: 0.125em;
  border-left: 3px solid darkorange;
}

.aside-menu-item:active {
  background-color: rgba(66, 185, 131, 1);
}

.aside-menu-item > img {
  width: 2rem;
  transition: 0.25s ease-in;
}

.aside-menu-item:hover > img {
  transform: rotate(10deg);
}
</style>