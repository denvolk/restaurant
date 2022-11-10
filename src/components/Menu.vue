<template>
  <div class="menu-main" v-bind:class="{opened: !store.foodItem}">
    <!--<p>Menu begin</p>-->
    <!--<div v-for="(item, index) in store.foods" :key="item" :idx="index" class="food-item container">
      <FoodItem></FoodItem>
    </div>-->
    <FoodItem v-for="item in store.foods" :key="item.id"
              :id="item.id" :name="item.name" :desc="item.desc" :amount="item.amount" :weight="item.weight" :img="item.img"
              class="container">
              <!--v-on:food-item-opened="showFullItem">-->
      <!--<FoodItem></FoodItem>-->
    </FoodItem>
    <!--<p>Menu end</p>-->
  </div>
</template>

<script>
import {store} from "@/store/store";
import FoodItem from "@/components/FoodItem";

export default {
  name: "Menu",
  components: {FoodItem},

  data: function () {
    return  {
      store,
      opened: false,
      itemId: 0,
      imgPath: '',
    }
  },

  methods: {
    async getMenu(lang) {
      if (!this.store.foods.length)
        fetch("http://localhost:3000/foodseng")
            .then((response) => response.json())
            .then((foods) => {
              console.log(foods);
              for (let i = 0; i < foods.length; i++) {
                store.foods.push(foods[i]);
              }
              console.log(store.foods);
            });
    },

    /*setImgPath()  {
      console.log(store.foods[this.itemId]);
      const tempData = store.foods[this.itemId];
      this.openedItemData.imgPath =  `../assets/foods/${tempData.img}.png`;
      this.openedItemData.id = tempData.id;
      this.openedItemData.name = tempData.name;
      this.openedItemData.desc = tempData.desc;
      this.openedItemData.weight = tempData.weight;
      this.openedItemData.amount = tempData.amount;
    },*/

    /*showFullItem($data) {
      this.opened = $data.opened;
      this.itemId = $data.id - 1;
      this.setImgPath();
    },*/
  },

  mounted() {
    this.getMenu(store.pageLang);
  }
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

  .menu-main {
    display: none;
  }

  .menu-main.opened  {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    border: 1px solid blue;
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