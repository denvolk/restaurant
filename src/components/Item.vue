<template>
  <div class="item" v-bind:class="{opened: store.fullPageItem}" v-on:click="closeItem">
    <div class="item-data">
      <!--<img v-bind:src="store.shownItem.img" v-bind:alt="store.shownItem.img" v-on:click="closeFullPageItem">-->
      <div v-show="imgIsLoaded">
        <img v-bind:src="store.shownItem.img" v-bind:alt="store.shownItem.img" v-on:load="setImgLoadState">
      </div>
      <div v-show="!imgIsLoaded" class="lds-hourglass"></div>
      <div class="text">
        <p class="name"><span>{{store.shownItem.name}}</span></p>
        <p class="description"><span>{{store.shownItem.desc}}</span></p>
        <!--<p class="weight"><span>{{store.shownItem.weight}}g</span></p>-->
        <p class="weight"><span>{{store.shownItem.weight}}</span></p>
        <!--<p v-if="store.shownItem.ftype !== 'drinks'" class="weight"><span>{{store.shownItem.weight}} {{weightType.other}}</span></p>
        <p v-else class="weight"><span>{{store.shownItem.weight}} {{weightType.drinks}}</span></p>-->
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
      weightType: {
        drinks: 'мл',
        other: 'гр'
      },
      imgIsLoaded: false,
    }
  },

  methods:  {
    /*closeFullPageItem() {
      store.fullPageItem = store.foodItem = false;
    },*/

    setImgLoadState() {
      this.imgIsLoaded = true;
    },

    closeItem() {
      store.fullPageItem = store.foodItem = this.imgIsLoaded = false;
    },
  },
}
</script>

<style scoped>
.item {
  display: none;
}

.opened {
  /*display: block;*/
  display: block;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 99;

  background-color: #c2c2c2;
  border: 3px solid black;
  border-radius: 1em;

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
  border: 2px solid black;
  border-radius: 1em;
}

.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  align-self: center;
  margin-top: 2em;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #cef;
  border-color: #cef transparent #cef transparent;
  animation: lds-hourglass 3.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>