<template>
  <div class="cart-item">
    <!--<div class="cart-item data" v-bind:class="{overflowed: store.cartItems.length > 9}">-->
    <!--<img v-bind:src="imgPath" v-bind:alt="store.foods[sectionId - 1].data[foodId].name">-->
    <!--<img v-bind:src="`https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/foods/${store.foods[this.sectionId - 1].data[this.foodId].img}.webp`"
         v-bind:alt="store.foods[sectionId - 1].data[foodId].name"
         v-on:click="!store.foodItem ? openItem() : null">-->
    <img v-bind:src="`https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/foods/${store.foods[this.sectionId].data[this.foodId].img}.webp`"
         v-bind:alt="store.foods[sectionId].data[foodId].name"
         v-on:click="!store.foodItem ? openItem() : null">
    <div class="data">
      <div class="name">
        <!--{{ store.foods[sectionId - 1].data[foodId].name }}-->
        {{store.foods[sectionId].data[foodId].name}}
      </div>
      <!--<span class="tooltip-text">
          {{store.foods[sectionId - 1].data[foodId].name}}
      </span>-->
      <div class="cost">
        {{ cost }} ₽
      </div>
    </div>
    <div class="amount">
      <!--<span class="material-symbols-outlined add" v-on:click="$emit('inc-amount')">
        add
      </span>-->
      <img src="https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/svg/add_FILL0_wght400_GRAD0_opsz20.svg"
           v-on:click="$emit('inc-amount')"
      >
      <!--<button class="inc-cart-item-btn" v-on:click="$emit('inc-amount')">+</button>-->
      <div class="amount-text">
        {{amount}}
      </div>
      <!--span class="material-symbols-outlined remove" v-on:click="$emit('dec-amount')">
        remove
      </span>-->
      <img src="https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/svg/remove_FILL0_wght400_GRAD0_opsz20.svg"
           v-on:click="$emit('dec-amount')"
      >
      <!--<button class="dec-cart-item-btn" v-on:click="$emit('dec-amount')">-</button>-->
    </div>
    <!--<span class="material-symbols-outlined delete" v-on:click="deleteFromCart">
      delete
    </span>-->
    <img class="delete" src="https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/svg/delete_FILL0_wght300_GRAD0_opsz20.svg"
         v-on:click="deleteFromCart"
    >
    <!--<button class="delete-cart-item-btn" v-on:click="deleteFromCart">X</button>-->
  </div>
</template>

<script>
import {store} from "@/store/store";

export default {
  name: "CartItem",

  props: ["foodId", "sectionId", "name", "amount", "cost"],

  data: function () {
    return  {
      store,
      //imgPath: '',
      /*amount: 1,*/
      /*amountOf: this.amount,*/
    }
  },

  watch:  {
    amount(newAmount)  {
      if (newAmount < 1)  {
        this.deleteFromCart();
      }
    }
  },

  methods:  {

    setImgPath() {
      this.imgPath = `https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/foods/${store.foods[this.sectionId - 1].data[this.foodId].img}.webp`
    },

    openItem() {
      //let tempFoodData = store.foods[this.sectionId - 1].data[this.foodId];
      let tempFoodData = store.foods[this.sectionId].data[this.foodId];

      store.foodItem = true;

      store.shownItem.id = tempFoodData.id;
      store.shownItem.name = tempFoodData.name;
      store.shownItem.desc = tempFoodData.desc;
      store.shownItem.weight = tempFoodData.weight;
      //store.shownItem.img = this.imgPath;
      //store.shownItem.img = `https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/foods/${store.foods[this.sectionId - 1].data[this.foodId].img}.webp`;
      store.shownItem.img = `https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/foods/${store.foods[this.sectionId].data[this.foodId].img}.webp`;

      store.fullPageItem = true;
      store.itemOpened = true;

      console.log('openItem ' + store.shownItem.id + ' ' + store.foodItem);
    },
    /*incAmount() {
      return this.amountOf++;
    },

    decAmount() {
      if (this.amountOf === 1)  {
        this.deleteFromCart();
        return;
      }

      this.amountOf--;
    },*/

    deleteFromCart()  {
      //let index = store.cartItems.findIndex(x => x.name === this.name);
      /*let tempFoodId = this.foodId;
      tempFoodId--;*/
      //let index = store.cartItems.findIndex(x => x.sectionId === this.sectionId && x.foodId === tempFoodId);
      //let index = store.cartItems[this.sectionId - 1]
      //console.log("deleteFromCart: sectionId: " + this.sectionId + " foodId: " + this.foodId);
      let index = store.cartItems.findIndex(x => x.sectionId === this.sectionId && x.foodId === this.foodId);
      /*console.log("index: " + index);
      console.log(store.cartItems[index]);*/
      store.cartItems.splice(index, 1);

      if (store.cookieExists) {
        //let tempCookie = {"data": store.cartItems};
        let tempCookie = {"lang": store.pageLang, "data": store.cartItems};
        this.$cookies.set(store.cookieName, tempCookie, store.cookieTime);
      }

      //this.$delete;
    },
  },

  computed: {
    /*incAmount: function ()  {
      return this.amount++;
    },
    decAmount: function ()  {
      return this.amount--;
    },*/
  },

  mounted() {
    //this.setImgPath();
  }
}
</script>

<style scoped>
.cart-item {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.5em 0.25em 0 0;
  text-align: left;
  color: #000;
  padding: 0.25em 0.25em 0.25em 0.25em;
  background-color: #c2c2c2;
  border-radius: 0.25em;
  width: 15em;
  /*box-shadow: 2px 2px 10px hsl(40deg 3% 45% / 20%);*/
}

.cart-item:first-child {
  margin-top: 0;
}

.cart-item .data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /*justify-content: flex-end;*/
  /*min-width: 10.75em;*/
  font-size: 1rem;
  /*align-items: center;*/
  padding: 0;
  /*margin: 0;*/
  /*white-space: nowrap;*/
  overflow: hidden;
  /*text-overflow: ellipsis;*/
  text-align: left;
  /*margin-left: 0.5em;*/
}

.cart-item img {
  max-width: 5em;
  border-radius: 0.25em;
  cursor: pointer;
}

.cart-item .text {
  display: flex;
  flex-direction: column;
}

.cart-item .name {
  position: relative;
  padding: 0;
  /*margin-top: 0.25em;*/
  background: none;
  box-shadow: none;
  width: 7em;
  /*word-break: break-word;*/
  font-size: 0.8rem;
  display: -webkit-box;
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 30px;
}

.tooltip-text {
  /*display: none;*/
  visibility: hidden;
  opacity: 0;
  /* width: 120px
px
; */
  background-color: #fff;
  color: #000;
  text-align: center;
  /* padding: 5px 0; */
  padding: 0 2px 0 2px;
  border-radius: 0.25em;
  position: absolute;
  z-index: 9999;
  /* bottom: 0; */
  top: 0.35em;
  /* left: 15%; */
  left: 7.25em;
  /* bottom: 1em; */
  /* margin-left: -60px; */
  /* opacity: 0; */
  overflow: auto;
  max-width: 10em;
  font-size: 0.75rem;
  transition-delay: 0.25s;
  transition-duration: 0.25s;
  transition-property: opacity;
}

.data:hover .tooltip-text {
  visibility: visible;
  opacity: 0.7;
}

.cart-item .cost {
  font-size: 1em;
  align-self: flex-start;
  padding: 0;
  margin: 0;
}

.data.overflowed {
  min-width: 9.75em;
}

.cart-item .amount {
  display: flex;
  flex-direction: row-reverse;
  text-align: center;
  font-size: 1rem;
  padding: 0;
  margin: 0;
  user-select: none;
}

.cart-item .amount > img {
  width: 1.25em;
  height: 1.25em;
  align-self: center;
  border-radius: 0;
}

.cart-item .amount > img:hover {
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 0.25em;
}

.amount-text {
  align-self: center;
  width: 1.25em;
}

button {
  appearance: none;
  background: none;
  border: none;
  align-items: center;
  font-family: Rubik, sans-serif;
  text-align: center;
}

.material-symbols-outlined {
  align-self: center;
  user-select: none;
  cursor: pointer;
  font-variation-settings: 'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

.add {
  font-variation-settings: 'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 20
}

.remove {
  font-variation-settings: 'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 20
}

.delete {
  position: absolute;
  bottom: 0.1em;
  right: 0.1em;
  width: 1.5em;
  height: 1.5em;
}

.delete:hover {
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 0.25em;
}

.material-symbols-outlined.delete {
  font-variation-settings: 'FILL' 0,
  'wght' 300,
  'GRAD' 0,
  'opsz' 20
}

.material-symbols-outlined:hover  {
  color: red
}
</style>