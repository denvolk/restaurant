<template>
  <div class="food-item" v-on:click="!store.foodItem ? openItem() : null">
    <div v-show="imgIsLoaded">
      <img v-bind:src="logoPath" v-bind:alt="name" v-on:load="setImgLoadState">
    </div>
    <div v-show="!imgIsLoaded" class="lds-hourglass"></div>
    <div class="name">{{name}}</div>
    <!--<p class="desc"><span>{{desc}}</span></p>-->
    <!--<p class="amount"><span>{{amount}}</span></p>-->
    <div class="weight">{{weight}}</div>
    <!--<p v-if="ftype !== 'drinks'" class="weight"><span>{{weight}} {{weightType.other}}</span></p>
    <p v-else class="weight"><span>{{weight}} {{weightType.drinks}}</span></p>-->
    <!--<p v-if="ftype !== 'drinks'" class="weight"><span>{{weight}}g</span></p>-->
    <!--<p v-else class="weight"><span>{{weight}}ml</span></p>-->
  </div>
</template>
<!--v-bind:class="{opened: opened}"-->
<script>
import {store} from "@/store/store";

export default {
  name: "FoodItem",

  props: ["id", "name", "desc", "amount", "weight", "img", "ftype"],

  data: function () {
    return  {
      logoPath: '',
      opened: false,
      store,
      weightType: {
        drinks: 'мл',
        other: 'гр'
      },
      imgIsLoaded: false,
    }
  },

  methods:  {
    imgPath()  {
      this.logoPath = `https://raw.githubusercontent.com/denvolk/restaurant-test/gh-pages/assets/foods/${this.img}.webp`  //gh-pages
      //this.logoPath =  `../assets/foods/${this.img}.webp`;  localhost
    },

    setImgLoadState() {
      this.imgIsLoaded = true;
    },

    openItem()  {
      /*this.opened = !this.opened;
      console.log(this.opened);

      const response = {
        opened: this.opened,
        id: this.id,
      };*/
      /*this.$emit("food-item-opened", response);*/
      store.foodItem = true;

      store.shownItem.id = this.id;
      store.shownItem.name = this.name;
      store.shownItem.desc = this.desc;
      store.shownItem.weight = this.weight;
      store.shownItem.amount = this.amount;
      store.shownItem.img = this.logoPath;
      store.shownItem.ftype = this.ftype;

      store.fullPageItem = true;
      console.log('openItem ' + store.shownItem.id + ' ' + store.foodItem);
    },
  },

  /*setWeightType() {
    if (store.pageLang === 'ru') {
      this.weightType.drinks = 'мл';
      this.weightType.other = 'гр';
      return;
    }
    if (store.pageLang === 'eng') {
      this.weightType.drinks = 'ml';
      this.weightType.other = 'g';
    }
  },*/

  mounted() {
    this.imgPath();
  },
}
</script>

<style scoped>
.food-item  {
  display: flex;
  flex-direction: column;
  margin: 1em;
  border: 2px solid black;
  /*border: 1px solid red;*/
  border-radius: 1em;
  background-color: #ffffff;
  /*max-width: 10em;*/
  width: 8em;
  min-height: 14em;
  padding: 0.5em;
  justify-content: space-between;
}

img {
  max-width: 8em;
  border-radius: 1em;
  border: 1px solid black;
}
p {
  max-width: 8em;
}
.weight {
  justify-content: flex-end;
}
/*.opened {
  position: absolute;
  max-width: 80%;
  margin: 20em auto 20em auto;
  vertical-align: center;
}*/

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