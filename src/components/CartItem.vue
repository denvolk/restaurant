<template>
  <div class="cart-item">
    <!--<div class="cart-item data" v-bind:class="{overflowed: store.cartItems.length > 9}">-->
    <div class="cart-item data">
      <div class="cart-item name">
        {{store.foods[sectionId - 1].data[foodId].name}}
      </div>
      <div class="cart-item cost">
        {{cost}} ₽
      </div>
    </div>
    <div class="cart-item amount">
      <span class="material-symbols-outlined add" v-on:click="$emit('inc-amount')">
        add
      </span>
      <!--<button class="inc-cart-item-btn" v-on:click="$emit('inc-amount')">+</button>-->
      {{amount}}
      <span class="material-symbols-outlined remove" v-on:click="$emit('dec-amount')">
        remove
      </span>
      <!--<button class="dec-cart-item-btn" v-on:click="$emit('dec-amount')">-</button>-->
    </div>
    <span class="material-symbols-outlined delete" v-on:click="deleteFromCart">
      delete
    </span>
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
      let index = store.cartItems.findIndex(x => x.name === this.name);

      store.cartItems.splice(index, 1);
    },
  },

  computed: {
    /*incAmount: function ()  {
      return this.amount++;
    },
    decAmount: function ()  {
      return this.amount--;
    },*/
  }
}
</script>

<style scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  margin: 0.5em 0.25em 0 0.25em;
  text-align: left;
  color: #000;
  padding: 0.25em 0.25em 0.25em 0.25em;
  background-color: #c2c2c2;
  border-radius: 0.25em;
  width: 14.5em;
  /*box-shadow: 2px 2px 10px hsl(40deg 3% 45% / 20%);*/
}

.cart-item:first-child {
  margin-top: 0;
}

.cart-item .data {
  display: flex;
  flex-direction: column;
  /*justify-content: flex-end;*/
  min-width: 10.75em;
  font-size: 1rem;
  /*align-items: center;*/
  padding: 0;
  margin: 0;
  /*white-space: nowrap;*/
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}

.cart-item .name {
  padding: 0;
  margin: 0;
  background: none;
  box-shadow: none;
}

.cart-item .cost {
  font-size: 0.75em;
  align-self: flex-start;
  padding: 0;
  margin: 0;
}

.data.overflowed {
  min-width: 9.75em;
}

.cart-item .amount {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 1rem;
  padding: 0;
  margin: 0;
  user-select: none;
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

.material-symbols-outlined:hover  {
  color: red
}
</style>