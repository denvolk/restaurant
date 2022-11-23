<template>
  <!--<div class="food-item" v-on:mouseenter="isMouseOver = !isMouseOver" v-on:mouseleave="isMouseOver = !isMouseOver">-->
  <div class="food-item">
    <div class="img-container" v-show="imgIsLoaded" v-on:mouseenter="imgIsHovered = !imgIsHovered" v-on:mouseleave="imgIsHovered = !imgIsHovered" v-on:click="!store.foodItem ? openItem() : null">
      <img v-bind:src="logoPath" v-bind:alt="name" v-on:load="setImgLoadState">
      <div class="imgBtn" v-show="imgIsHovered"><span>Состав</span></div>
    </div>
    <div v-show="!imgIsLoaded" class="lds-hourglass"></div>
    <div class="name">{{name}}</div>
    <!--<div v-show="isMouseOver" class="desc">{{desc}}</div>-->
    <div class="add-btn-container" v-on:mouseenter="costIsHovered = !costIsHovered" v-on:mouseleave="costIsHovered = !costIsHovered">
      <div class="weight">{{weight}}</div>
      <button v-bind:class="{'cost-is-hovered': costIsHovered}" class="add-to-cart">+</button>
    </div>
  </div>
</template>

<script>
import {store} from "@/store/store";

export default {
  name: "FoodItem",

  props: ["id", "name", "desc", "weight", "img"],

  data: function () {
    return  {
      logoPath: '',
      opened: false,
      store,
      imgIsLoaded: false,
      //isMouseOver: false,
      imgIsHovered: false,
      costIsHovered: false,
    }
  },

  methods:  {
    imgPath()  {
      this.logoPath = `https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/foods/${this.img}.webp` //gh-pages
      //this.logoPath =  `../assets/foods/${this.img}.webp`;  //localhost
    },

    setImgLoadState() {
      this.imgIsLoaded = true;
    },

    openItem()  {
      store.foodItem = true;

      store.shownItem.id = this.id;
      store.shownItem.name = this.name;
      store.shownItem.desc = this.desc;
      store.shownItem.weight = this.weight;
      store.shownItem.img = this.logoPath;

      store.fullPageItem = true;
      store.itemOpened = true;
      //document.getElementsByTagName('html')[0].classList.add("noscroll");
      //document.getElementsByTagName('html')[0].style.scroll = "no";
      //document.getElementsByTagName('html')[0].style['padding-right'] = "1em";
      console.log('openItem ' + store.shownItem.id + ' ' + store.foodItem);
    },
  },

  mounted() {
    this.imgPath();
  },
}
</script>

<style scoped>
.food-item  {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 1em;
  border: 2px solid #000;
  border-radius: 1em;
  background-color: #fff;
  width: 8em;
  min-height: 14em;
  padding: 0.5em;
  justify-content: space-between;
  box-shadow: 0 0 20px hsl(40deg 3% 45% / 20%);
}

/*.food-item:active {
  box-shadow: 2px 2px 10px hsl(40deg 3% 45% / 20%);
}*/

/*.food-item:hover  {
  min-height: 16em;
}*/

.img-container  {
  position: relative;
  cursor: pointer;
}

img {
  max-width: 8em;
  border-radius: 1em;
  /*border: 1px solid black;*/
  /*position: relative;*/
}
.imgBtn {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  bottom: 3.25em;
  z-index: 99;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  width: 8.1em;
  cursor: pointer;
}
p {
  max-width: 8em;
}
.weight {
  justify-content: flex-end;
}

.add-btn-container  {

}

.add-to-cart  {
  display: none;
  opacity: 0;
  transition: all 2s ease-in;
}

.cost-is-hovered  {
  display: block;
  opacity: 1;
  position: absolute;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;
  border: none;
  background-color: rgba(66, 185, 131, 1);
  height: 3em;
  width: 3em;
  line-height: 0.9em;
  bottom: 0;
  right: 0;
  border-radius: 1em 0 1.2em 0;
  font-size: 0.75em;
}

.desc {
  font-size: 0.5em;
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