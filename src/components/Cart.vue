<template>
  <aside class="aside-cart" v-bind:class="{opened: store.cartOpened/*, overflowed: store.cartItems.length > 9*/}">
    <div class="aside-cart-list empty" v-if="!store.cartItems.length">Корзина пуста</div>
    <div class="aside-cart-list" v-else>
      <div class="empty-cart-btn" v-on:click="clearCart">
        Очистить корзину
      </div>
      <!--<div class="full-cost">
        {{fullCost}} ₽
      </div>-->
      <CartItem v-for="item in store.cartItems" :key="item.id"
                :foodId="item.foodId" :sectionId="item.sectionId" :name="item.name" :amount="item.amount" :cost="item.cost"
                v-on:inc-amount="item.amount++" v-on:dec-amount="item.amount--"
      >

      </CartItem>
      <!--<template v-for="item in store.cartItems">

      </template>-->
      <!----------------
      {{store.cartItems}}-->
    </div>
    <div class="order-btn">
      <div class="order-text" v-if="store.pageLang === 'ru'">
        Оформить заказ
      </div>
      <div class="order-text" v-else>
        Make order
      </div>
      <div class="full-cost">
        {{fullCost}} ₽
      </div>
    </div>
    <!--<div class="cart-items">
      <div class="empty" v-if="!store.cartItems.length">Пусто</div>
      <div class="empty" v-else>
        <template v-for="item in store.cartItems">
          <div class="cart-item" :key="item.name">
            <div class="cart-item name">
              {{item.name}}
            </div>
            <div class="cart-item amount">
              {{item.amount}}
            </div>
            <button class="delete-cart-item-btn">X</button>
          </div>
        </template>
      </div>
    </div>-->
  </aside>
</template>

<script>
import {store} from "@/store/store";
import CartItem from "@/components/CartItem";

export default {
  name: "Cart",
  components: {CartItem},
  data: function () {
    return  {
      store,
      thisId: 0,
      //fullCost: 0,
    }
  },

  methods:  {
    clearCart() {
      store.cartItems = [];
    }
  },

  computed: {

    fullCost() {
      let fCost = 0;
      store.cartItems.forEach(item => {
        fCost += item.cost * item.amount;
      });

      return fCost;
    },


    thisIdGet: function ()  {
      console.log("this.name: " + key);
      let itemIndexInCart = store.cartItems.findIndex(x => x.foodName === key);
      if (itemIndexInCart === -1)
        itemIndexInCart = store.cartItems.length -1;
      console.log("itemIndexInCart: " + itemIndexInCart);

      let sectionId = store.cartItems[itemIndexInCart].sectionId - 1;
      console.log("sectionId: " + sectionId);

      //let itemIndex = store.cartItems.findIndex(x => x.foodName === this.name);
      let itemIndex = store.foods[sectionId].data.findIndex(x => x.name === key);
      console.log("itemIndex: " + itemIndex);
      return itemIndex;
      //return store.cartItems.findIndex(x => x.foodName === this.item.name);
      //return store.cartItems[itemIndex].foodName;
    },
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
}
</script>

<style scoped>
.aside-cart {
  display: none;
  height: 100%;
  padding: 0.5em 0.5em 0.5em 0.5em;
  /*overflow-x: hidden;*/
}

.opened {
  /*overflow-y: hidden;*/
  /*display: block;*/
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 4em;
  width: 23em;
  /*max-width: 16em;
  min-width: 16em;*/
  /*height: 92vh;*/
  height: calc(100vh - 82px);
  box-shadow: 0 8px 20px hsl(40deg 3% 45% / 20%);
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
}

@media (-webkit-device-pixel-ratio: 1.25) {
  .opened {
    max-width: 25em;
  }
}

/*@media (-webkit-device-pixel-ratio: 1.25) {
  .opened {
    top: 4.25em;
    height: calc(100vh - 46px);
  }
}*/

.overflowed {
  overflow-y: scroll;
}

.aside-cart-list {
  display: flex;
  flex-direction: column;
  /*font-size: 1.5rem;*/
  /*overflow: auto;*/
  overflow-y: scroll;
  flex-grow: 1;
}

button {
  appearance: none;
  background: none;
  border: none;
  align-items: center;
  font-family: Rubik, sans-serif;
  text-align: center;
}

.empty  {
  padding-top: 0.5em;
}

.empty-cart-btn {
  user-select: none;
  cursor: pointer;
  width: 15em;
  margin-left: 0.25em;
  margin-top: 0.25em;
  border-radius: 0.25em;
  padding: 0.25em 0;
}

.empty-cart-btn:hover {
  background-color: #c2c2c2;
}

.order-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #c2c2c2;
  min-height: 3em;
  border-radius: 0.5em;
  /*margin-top: 0.5em;*/
  padding: 0 0.5em;
  align-items: center;
  margin: 0.5em 0.25em 0 0.25em;
}

::-webkit-scrollbar-track {
  background: rgba(194, 194, 194, 0.2);
  border: none;
}

::-webkit-scrollbar-thumb {
  background: #c2c2c2;
}
</style>