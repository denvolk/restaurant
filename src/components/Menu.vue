<template>
  <div class="menu-main" v-bind:class="{menuOpened: store.menuOpened && !store.cartOpened, cartOpened: store.cartOpened && !store.menuOpened, bothOpened: store.menuOpened && store.cartOpened}">
    <FoodSection v-for="item in store.foods" :key="item.id"
                 v-bind:id="item.id" :name="item.name" :hash="item.hash" :items="item.data" :sectionId="item.id">
    </FoodSection>
  </div>
</template>

<script>
import {store} from "@/store/store";
import FoodSection from "@/components/FoodSection";
import FoodItem from "@/components/FoodItem";

export default {
  name: "Menu",
  components: {FoodSection, FoodItem},

  data: function () {
    return  {
      store,
      opened: false,
      itemId: 0,
      imgPath: '',
    }
  },

  mounted() {

  },

  methods: {

  },
}
</script>

<style scoped>
.item {
  display: none;
  width: 90%;
  padding-top: 4em;
  padding-bottom: 1em;
  backdrop-filter: blur(12px);
}

/*.menu-main {
  display: none;
}*/

.menu-main  {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  /*border: 1px solid blue;*/
  width: 100%;
  margin-top: 4em;
  margin-left: 17.75em;
}

@media (-webkit-device-pixel-ratio: 1.25) {
  .menu-main {
    margin-left: 1em;
  }
}

.menuOpened {
  margin-left: 17.75em;
}

@media (-webkit-device-pixel-ratio: 1.25) {
  .menuOpened {
    /*margin-left: 2.5em;*/
    margin-left: 15.5em;
  }
}

.cartOpened {
  /*margin-left: 2.75em;*/
  margin-left: 1em;
  /*margin-right: 17em;*/
}

@media (-webkit-device-pixel-ratio: 1.25) {
  .cartOpened {
    margin-left: 7em;
  }
}

.bothOpened {
  /*margin-left: 16em;
  margin-right: 17.5em;*/
  /*margin-left: 4.25em;*/
  margin-left: 17.25em;
  margin-right: 21.25em;
}

@media (-webkit-device-pixel-ratio: 1.25) {
  .bothOpened {
    /*margin-left: 1.25em;*/
    margin-left: 14.5em;
    margin-right: 18.5em;
  }
}

.container{
  padding: 1.5em 3em 0.5em 3em;
  max-width: 8em;
  border: 2px solid black;
  border-radius: 0.5em;
}

/*.opened {
  display: block;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 99;

  background-color: rgba(255, 255, 255, 0.1);
  border: 3px solid black;
  border-radius: 0.5em;
}

.opened img {
  transform: scale(2);
  margin-top: 2em;
}

.opened .text  {
  margin-top: 4em;
}

.item-data  {
  display: flex;
  flex-direction: column;
  align-items: center;
}*/
</style>