<template>
  <!--<div class="food-item" v-on:mouseenter="isMouseOver = !isMouseOver" v-on:mouseleave="isMouseOver = !isMouseOver">-->
  <div class="food-item" v-on:mouseenter="costIsHovered = true" v-on:mouseleave="costIsHovered = false">
    <div class="img-container"
         v-show="imgIsLoaded"
         v-on:mouseenter="imgIsHovered = !imgIsHovered" v-on:mouseleave="imgIsHovered = !imgIsHovered"
         v-on:click="!store.foodItem ? openItem() : null"
    >
      <img v-bind:src="logoPath" v-bind:alt="name" v-on:load="setImgLoadState">
      <!--<span class="material-symbols-rounded imgBtn" v-show="imgIsHovered">
        expand_content
      </span>-->
      <div class="svg-container" v-show="imgIsHovered">
        <img class="imgBtn" src="https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/svg/expand_content_FILL0_wght400_GRAD0_opsz20.svg">
      </div>
      <!--<div class="imgBtn" v-show="imgIsHovered"><span>Состав</span></div>-->
    </div>
    <div v-show="!imgIsLoaded" class="lds-hourglass"></div>
    <div class="name">{{name}}</div>
    <!--<div v-show="isMouseOver" class="desc">{{desc}}</div>-->
    <div class="add-btn-container">
      <div class="amount" v-show="amount > 0">{{amount}}</div>
      <div class="remove-from-cart" v-bind:class="{'cost-is-hovered': costIsHovered, 'disabled': !amount}" v-on:click="removeFromCart">
<!--      <div class="remove-from-cart cost-is-hovered" v-on:click="removeFromCart">-->
        <!--<span class="material-symbols-outlined remove">
          remove
        </span>-->
        <img class="remove" src="https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/svg/remove_FILL0_wght700_GRAD200_opsz48.svg">
      </div>
      <div class="weight">{{weight}}</div>
      <div class="add-to-cart" v-bind:class="{'cost-is-hovered': costIsHovered}" v-on:click="addToCart">
<!--      <div class="add-to-cart cost-is-hovered" v-on:click="addToCart">-->
        <!--<span class="material-symbols-outlined add">
          add
        </span>-->
        <img src="https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/svg/add_FILL0_wght700_GRAD200_opsz48.svg">
      </div>
      <!--<button v-bind:class="{'cost-is-hovered': costIsHovered}" class="add-to-cart" v-on:click="addToCart">+</button>-->
    </div>
  </div>
</template>

<script>
import {store} from "@/store/store";

export default {
  name: "FoodItem",

  props: ["id", "name", "desc", "weight", "img", "foodId", "sectionId"],

  data: function () {
    return  {
      logoPath: '',
      opened: false,
      store,
      imgIsLoaded: false,
      //isMouseOver: false,
      imgIsHovered: false,
      costIsHovered: false,
      /*amount: 0,*/
    }
  },

  computed: {
    amount() {
      //let index = store.cartItems.findIndex(x => x.name === this.name);
      //let tempFoodId = this.foodId;
      //tempFoodId--;
      //let index = store.cartItems.findIndex(x => x.sectionId === this.sectionId && x.foodId === tempFoodId)
      let index = store.cartItems.findIndex(x => x.sectionId === this.sectionId && x.foodId === this.foodId);
      if (index === -1)
        return;

      return store.cartItems[index].amount;
    },
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
      store.shownItem.isOrder = false;
      //document.getElementsByTagName('html')[0].classList.add("noscroll");
      //document.getElementsByTagName('html')[0].style.scroll = "no";
      //document.getElementsByTagName('html')[0].style['padding-right'] = "1em";
      console.log('openItem ' + store.shownItem.id + ' ' + store.foodItem);
    },

    /*addItemToCart() {

      if (store.cartItems.length) {

        let itemIndex = store.cartItems.findIndex(x => x.foodName === this.name);
        //console.log("itemIndex: " + itemIndex);

        if (typeof itemIndex === "undefined") {
          alert('itemIndex undefined');
          return;
        }

        if (itemIndex !== -1) {
          store.cartItems[itemIndex]["amount"]++;
          return;
        }
      }

      let item = {};
      item["foodId"] = this.foodId;
      item["sectionId"] = this.sectionId;
      item["foodName"] = this.name;
      item["amount"] = 1;
      store.cartItems.push(item);
    },*/

    removeFromCart() {
      console.log("removeFromCart");

      if (!store.cartItems.length)
        return;

      let index = store.cartItems.findIndex(x => x.sectionId === this.sectionId && x.foodId === this.foodId);

      if (index === -1)
        return;

      store.cartItems[index].amount--;
      let cookieData = {"lang": store.pageLang, "data": store.cartItems};
      this.$cookies.set(store.cookieName, cookieData, store.cookieTime);
    },

    addToCart() {

      console.log("addToCart");

      if (store.cartItems.length) {
        console.log("cartItems.length > 0");
        //let cartIndex = store.cartItems.findIndex(x => x.name === this.name);
        //let tempFoodId = this.foodId;
        //tempFoodId--;
        //let cartIndex = store.cartItems.findIndex(x => x.sectionId === this.sectionId && x.foodId === tempFoodId);
        let cartIndex = store.cartItems.findIndex(x => x.sectionId === this.sectionId && x.foodId === this.foodId);
        console.log("cartIndex1: " + cartIndex);

        if (cartIndex !== -1) {
          store.cartItems[cartIndex].amount++;
          console.log(store.cartItems[cartIndex] + " amount: " + store.cartItems[cartIndex].amount);
          //let cookieData = {"id": "1", "user-name": "denvolk", "data": store.cartItems};
          //let cookieData = {"data": store.cartItems};
          let cookieData = {"lang": store.pageLang, "data": store.cartItems};
          /*let cookieData = [];
          store.cartItems.forEach(item => {
            let tempItem = {};
            tempItem["name"] = item.name;
            tempItem["sectionId"] = item.sectionId;
            tempItem["foodId"] = item.foodId;
            tempItem["amount"] = item.amount;
            tempItem["cost"] = item.cost;
            cookieData.push(item);
          });*/
          /*cookieData = store.cartItems.map(item => {
            let tempItem = {};
            tempItem["name"] = item.name;
            tempItem["sectionId"] = item.sectionId;
            tempItem["foodId"] = item.foodId;
            tempItem["amount"] = item.amount;
            tempItem["cost"] = item.cost;
          });*/
          this.$cookies.set(store.cookieName, cookieData, store.cookieTime);
          return;
        }
      }

      let index = -1;
      let sectionIndex = -1;

      /*for (let iter = 0; iter < store.foods.length; iter++) {
        //index = store.foods[iter].data.findIndex(x => x.name === this.name);
        let tempFoodId1 = this.foodId;
        //index = store.foods[iter].data.findIndex(x => x.sectionId === this.sectionId && x.foodId === tempFoodId1);
        index = store.foods[iter].data.findIndex(x => x.id === tempFoodId1);
        sectionIndex = iter;

        if (index !== -1)
          break;
      }*/

      //let tempFoodId1 = this.foodId;
      //let tempSectionId = this.sectionId;
      //tempSectionId--;
      //index = store.foods[tempSectionId].data.findIndex(x => x.id === tempFoodId1);
      index = store.foods[this.sectionId].data.findIndex(x => x.id === this.foodId);

      if (index === -1)
        return;

      //sectionIndex++;
      //sectionIndex = tempSectionId;
      //sectionIndex++;
      //console.log("sectionId: " + sectionIndex + ", foodId: " + index);
      console.log("sectionId: " + this.sectionId + ", foodId: " + index);
      let item = {};
      item["name"] = this.name;
      //item["sectionId"] = sectionIndex;
      item["sectionId"] = this.sectionId;
      item["foodId"] = index;
      item["amount"] = 1;
      item["cost"] = this.weight.slice(0, -2);
      console.log("item: " + item.name + " " + item.sectionId + " " + item.foodId + " " + item.amount);
      store.cartItems.push(item);

      /*if (!store.cookieExists) {
        let cookieData = {"id": "1", "user-name": "denvolk", "data": store.cartItems};
        this.$cookies.set(store.cookieName, cookieData, 60);
      }*/
      //let cookieData = {"id": "1", "user-name": "denvolk", "data": store.cartItems};
      //let cookieData = {"data": store.cartItems};
      let cookieData = {"lang": store.pageLang, "data": store.cartItems};
      /*let cookieData = [];
      store.cartItems.forEach(item => {
        let tempItem = {};
        tempItem["name"] = item.name;
        tempItem["sectionId"] = item.sectionId;
        tempItem["foodId"] = item.foodId;
        tempItem["amount"] = item.amount;
        tempItem["cost"] = item.cost;
        cookieData.push(item);
      });*/
      /*let cookieData = [];
      cookieData = store.cartItems.map(item => {
        let tempItem = {};
        tempItem["name"] = item.name;
        tempItem["sectionId"] = item.sectionId;
        tempItem["foodId"] = item.foodId;
        tempItem["amount"] = item.amount;
        tempItem["cost"] = item.cost;
      });*/
      this.$cookies.set(store.cookieName, cookieData, store.cookieTime);
      store.cookieExists = true;
    },

    addItemToCart() {
      console.log("addItemToCart");
      if (store.cartItems.length) {
        let cartIndex = store.cartItems.findIndex(x => x.name === this.name);

        if (cartIndex !== -1) {
          store.cartItems[cartIndex].amount++;
          return;
        }
      }

      let index = -1;
      let sectionIndex = -1;
      for (let iter = 0; iter < store.foods.length; iter++) {
        index = store.foods[iter].data.findIndex(x => x.name === this.name);
        sectionIndex = iter;
        if (index !== -1)
          break;
      }

      if (index === -1)
        return;

      sectionIndex++;
      let item = {};
      item["name"] = this.name;
      item["sectionId"] = sectionIndex;
      item["foodId"] = index;
      item["amount"] = 1;
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
  overflow: hidden;
  /*flex-grow: 1;*/
  position: relative;
  margin: 1em 0.8em 1em 0.8em;
  border: 2px solid rgba(0, 0, 0, 0.35);
  /*border-radius: 1em;*/
  border-radius: 0.75em;
  background-color: #fff;
  width: 9em;
  height: 13.5em;
  padding: 0.5em 0 0 0;
  justify-content: space-between;
  box-shadow: 0 0 20px hsl(40deg 3% 45% / 20%);
}

@media (-webkit-device-pixel-ratio: 1.25) {
  .food-item {
    margin: 1em 0.75em 1em 0.5em;
  }
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
  /*padding: 0.25em 0.25em 0 0.25em;*/
}

.img-container img {
  max-width: 8em;
  /*border-radius: 1em;*/
  border-radius: 0.5em;
  /*border: 1px solid black;*/
  /*position: relative;*/
  user-select: none;
  box-shadow: 0 0 20px hsl(40deg 3% 45% / 20%);
}

.svg-container {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  bottom: 3.2em;
  right: 0;
  z-index: 99;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  width: 9em;
  cursor: pointer;
  height: 1em;
  line-height: 1.2em;
  box-shadow: 0 0 10px hsl(40deg 3% 45% / 20%);
}

.svg-container:hover > img {
  height: 1em;
  width: 1em;
}

.imgBtn {
  /*position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  bottom: 3.25em;
  z-index: 99;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  width: 8.1em;
  cursor: pointer;*/
}

.material-symbols-rounded.imgBtn {
  font-variation-settings: 'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 20
}

.material-symbols-rounded.imgBtn:hover {
  font-variation-settings: 'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

p {
  max-width: 8em;
}

.name {
  padding: 0 0.5em;
}

.weight {
  /*justify-content: flex-end;*/
  align-self: center;
  user-select: none;
}

.add-btn-container  {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.add-to-cart  {
  /*display: none;*/
  /*position: absolute;*/
  visibility: hidden;
  /*opacity: 0;*/
  background-color: rgba(66, 185, 131, 0.85);
  height: 3em;
  width: 3em;
  line-height: 0.9em;
  bottom: 0;
  right: 0;
  border-radius: 1em 0 0 0;
  font-size: 0.75em;
  /*transition: all 2s ease-in;*/
  cursor: pointer;
  /*border-right: 2px solid rgba(0, 0, 0, 0.35);
  border-bottom: 2px solid rgba(0, 0, 0, 0.35);*/
}

.remove-from-cart {
  /*display: none;*/
  /*position: absolute;*/
  visibility: hidden;
  /*opacity: 0;*/
  background-color: rgba(66, 185, 131, 0.85);
  height: 3em;
  width: 3em;
  line-height: 0.9em;
  border-radius: 0 1em 0 0;
  font-size: 0.75em;
  /*transition: all 2s ease-in;*/
  cursor: pointer;
  /*border-left: 2px solid rgba(0, 0, 0, 0.35);
  border-bottom: 2px solid rgba(0, 0, 0, 0.35);*/
}

.cost-is-hovered  {
  /*display: block;*/
  visibility: visible;
  /*opacity: 1;*/
  /*-webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;*/
  /*border: none;*/
  /*bottom: -0.1em;
  right: -0.1em;*/
}

.remove-from-cart.cost-is-hovered {
  /*left: -0.1em;
  bottom: -0.1em;*/
}

.remove-from-cart > img,
.add-to-cart > img {
  width: 1.75em;
  margin-top: 0.65em;
  border-radius: 0;
}

.disabled {
background-color: #c2c2c2;
cursor: default;
  opacity: 0.85;
}

@media (-webkit-device-pixel-ratio: 1.25) {
.cost-is-hovered {
left: 9.03em;
}
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

.material-symbols-outlined {
  align-self: center;
  user-select: none;
  /*cursor: pointer;*/
  font-variation-settings: 'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

.add {
  font-variation-settings: 'FILL' 0,
  'wght' 700,
  'GRAD' 200,
  'opsz' 48;
  text-align: center;
  line-height: 2.25em;
}

.remove {
  font-variation-settings: 'FILL' 0,
  'wght' 700,
  'GRAD' 200,
  'opsz' 48;
  text-align: center;
  line-height: 2.25em;
}

.amount {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  height: 3em;
  width: 3em;
  line-height: 3em;
  top: 0;
  left: 9em;
  /* right: 9em; */
  /* border-radius: 1em 0 1.2em 0; */
  border-radius: 0 1.2em 0 1.2em;
  font-size: 0.75em;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  box-shadow: 0 0 10px hsl(40deg 3% 45% / 20%);
}

@media (-webkit-device-pixel-ratio: 1.25) {
  .amount {
    right: 9.01em;
  }
}

.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  align-self: center;
  margin: 2em;
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