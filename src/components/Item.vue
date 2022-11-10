<template>
  <div class="item" v-bind:class="{opened: store.fullPageItem}">
    <div class="item-data">
      <img v-bind:src="store.shownItem.img" v-bind:alt="store.shownItem.img" v-on:click="closeFullPageItem">
      <div class="text">
        <p class="name"><span>{{store.shownItem.name}}</span></p>
        <p class="description"><span>{{store.shownItem.desc}}</span></p>
        <p class="weight"><span>{{store.shownItem.weight}}g</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from "@/store/store";

export default {
  name: "Item",

  data: function () {
    return  {
      store,
      openedItemData: {
        imgPath: '',
        id: '',
        name: '',
        desc: '',
        weight: '',
        amount: '',
      },
    }
  },

  methods:  {
    closeFullPageItem() {
      store.fullPageItem = store.foodItem = false;
    },
  },
}
</script>

<style scoped>
  .item {
    display: none;
  }

  .opened {
    display: block;
    /*position: fixed;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;*/
    z-index: 99;

    background-color: rgba(255, 255, 255, 0.1);
    border: 3px solid black;
    border-radius: 0.5em;

    /*width: 80%;
    height: 80%;*/
    margin: 2em;
    flex: 1;
  }

  .item-data  {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  img {
    max-width: 35em;
    margin: 2em auto;
  }
</style>