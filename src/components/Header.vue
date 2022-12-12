<template>
  <header>
    <nav class="menu">
      <!--<button v-on:click="toggleMenu(); " class="menu-btn" :disabled="!store.foods.length">{{menuName}}</button>-->
      <!--<div v-on:click="toggleMenu" class="menu-btn">{{menuName}}</div>-->
      <!--<div class="menu-btn">{{menuName}}</div>-->
      <img src="https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/pizza.png" alt="pizza logo">
    </nav>
    <!--<section class="logo">
      <img v-bind:src="logoPath" alt="logo.png">
    </section>-->
    <section class="header-data">
      <div class="header-phone-number">
        +7 (XXX) XXX-XX-XX
      </div>
      <div class="header-address" v-if="store.pageLanguages.length">
        {{store.pageLanguages[currLang]['restaurant-address']}}
      </div>
    </section>
    <section class="rest-name">
      {{restName}}
    </section>
    <div class="right">
      <div class="full-cost">
        {{fullCost}} ₽
      </div>
      <section class="cart" v-on:click="toggleCart">
      <!--<span class="material-symbols-outlined">
        shopping_cart
      </span>-->
        <img src="https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/svg/shopping_cart_FILL0_wght400_GRAD0_opsz48.svg">
        <div class="cart-counter" v-show="store.cartItems.length">
          {{store.cartItems.length}}
        </div>
        <!--<img id="cart-logo" src="" alt="cart.png">-->
      </section>
      <section class="lang-select" v-if="store.pageLanguages.length > 1" v-on:mouseenter="showLanguages = true" v-on:mouseleave="showLanguages = false">
        <div class="curr-lang">
          {{store.pageLang.toUpperCase()}}
        </div>
        <div class="languages" v-bind:class="{opened: showLanguages, 'more-than-two': store.pageLanguages.length === 3, 'more-then-three': store.pageLanguages.length > 3, 'even': store.pageLanguages.length > 3 && store.pageLanguages.length % 2 === 0}">
          <!--<span class="material-symbols-rounded" v-on:click="showLanguages = !showLanguages" v-if="showLanguages">
            expand_less
          </span>-->
          <img src="https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/svg/expand_less_FILL0_wght400_GRAD0_opsz48.svg"
               v-show="showLanguages"
          >
          <!--<span class="material-symbols-rounded" v-on:click="showLanguages = !showLanguages" v-else>
            expand_more
          </span>-->
          <img src="https://raw.githubusercontent.com/denvolk/restaurant/gh-pages/assets/svg/expand_more_FILL0_wght400_GRAD0_opsz48.svg"
               v-show="!showLanguages"
          >
          <div class="languages-container" v-if="store.pageLanguages.length > 2">
            <div class="lang-select-btn" v-show="showLanguages" v-for="item in filteredPageLanguages" :key="item.id" v-bind:class="item.name" v-on:click="translatePage(item.name);">
              {{item.name.toString().toUpperCase()}}
            </div>
          </div>
          <div v-else class="lang-select-btn" v-show="showLanguages" v-for="item in filteredPageLanguages" :key="item.id" v-bind:class="item.name" v-on:click="translatePage(item.name);">
            {{item.name.toString().toUpperCase()}}
          </div>
        </div>
        <!--<template v-for="item in store.pageLanguages">
          <button :key="item.id"
                  class="lang-select-btn" v-bind:class="item.name"
                  v-on:click="translatePage(item.name);">
            {{item.name.toString().toUpperCase()}}
          </button>
        </template>-->
      </section>
      <section class="lang-select" v-else>
        <div class="curr-lang">
          {{store.pageLang.toUpperCase()}}
        </div>
      </section>
    </div>
  </header>
</template>

<script>
import {ref} from "vue";
import {store} from "@/store/store";

export default {
  name: "Header",

  data: function ()  {
    return{
      store,
      // logoPath: './assets/logo.svg',
      menuName: 'Меню',
      restName: 'Пиццерия',
      menuBtnDisabled: true,
      menu: [],
      showLanguages: false,
    }
  },

  mounted() {
    this.getLanguages();
    //this.getMenuSections();
  },

  computed: {

    currLang() {
      let index = store.pageLanguages.findIndex(x => x.name === store.pageLang);
      if (index === -1)
        return;

      return index;
    },

    fullCost() {
      let fCost = 0;
      store.cartItems.forEach(item => {
        fCost += item.cost * item.amount;
      });

      return fCost;
    },

    filteredPageLanguages() {
      return store.pageLanguages.filter(x => x.name !== store.pageLang);
    },
  },

  methods:  {

    async getLanguages()  {
      //fetch(`http://localhost:3000/langs`)
      fetch(`https://my-json-server.typicode.com/denvolk/restaurant-db/langs`)
          .then((response) => response.json())
          .then((langs) =>  {
            langs.forEach(lang => {
              store.pageLanguages.push(lang);
            });
            let index = store.pageLanguages.findIndex(x => x.name === store.pageLang);
            store.orderBtn = store.pageLanguages[index]["order-btn"];
            store.cartEmptyText = store.pageLanguages[index]["cart-empty"];
            store.clearCartBtn = store.pageLanguages[index]["clear-cart-btn"];
            console.log("1store.orderBtn: " + store.orderBtn + ", store.cartEmptyText: " + store.cartEmptyText + ", store.clearCartBtn: " + store.clearCartBtn);
          });
    },

    async translatePage(lang) {
      console.log('translatePage');
      store.translationFinished = false;
      if (lang === store.pageLang)  return;

      store.pageLang = lang;

      let tempCookieData = {"lang": store.pageLang, "data": store.cartItems};
      this.$cookies.set(store.cookieName, tempCookieData, store.cookieTime);

      this.showLanguages = false;

      await this.repaintMenu();

      store.translationFinished = true;
    },

    async repaintMenu()  {
      //fetch(`http://localhost:3000/foods${store.pageLang}`)
      fetch(`https://my-json-server.typicode.com/denvolk/restaurant-test/foods${store.pageLang}`)
          .then((response) => response.json())
          .then((foods) => {
            console.log(foods);
            foods.forEach((item, index) => {
            //foods.slice(1).forEach((item, index) => {
              this.$set(store.foods, index, item);
            });
            /*for (let i = 0; i < foods.length; i++) {
              this.$set(store.foods, i, foods[i]);
            }*/
            //console.log(store.foods);
            //this.menuName = foods[0].name;
            let index = store.pageLanguages.findIndex(x => x.name === store.pageLang);
            store.orderBtn = store.pageLanguages[index]["order-btn"];
            store.cartEmptyText = store.pageLanguages[index]["cart-empty"];
            store.clearCartBtn = store.pageLanguages[index]["clear-cart-btn"];
            console.log("store.orderBtn: " + store.orderBtn + ", store.cartEmptyText: " + store.cartEmptyText + ", store.clearCartBtn: " + store.clearCartBtn);
          });
    },

    // setLogo(lang) {
    //   console.log('lang=', lang);
    //   this.logoPath = `../assets/restImg${lang}.png`;
    // },

    toggleMenu()  {
      this.store.menuOpened = !this.store.menuOpened;
    },

    toggleCart()  {
      this.store.cartOpened = !this.store.cartOpened;
    },

    fillMenu()  {
      if (!store.foods.length) {
        if (store.pageLang === 'eng')  {
          for (let i = 0; i < store.foods.length; i++)  {
            store.menuItems.push(store.foods[i].name);
          }

          console.log('fillMenuEng'); return;
        }

        for (let i = 0; i < this.menu.length; i++)  {
          store.menuItems.push(store.foods[i].name);
        }
        console.log('fillMenuRu');
      }
    },
  },
}
</script>

<style scoped lang="less">

  .material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48
  }

  img {
    max-height: 2em;
    vertical-align: middle;
  }
  button  {
    appearance: none;
    background: none;
    border: none;
    align-items: center;
    font-family: Rubik, sans-serif;
  }

  header  {
    /*position: sticky;*/
    position: fixed;
    z-index: 2;
    top: 0em;
    display: flex;
    margin: 0 auto 0 auto;
    justify-content: space-between;
    /* border: 1px red solid; */
    line-height: 4em;
    height: 4em;
    background-color: #fff;
    /* padding: 0; */
    /* padding-left: 1.5em; */
    /* padding-right: 21.5em; */
    /* margin-right: 1.5em; */
    box-shadow: 0 8px 20px rgb(117 115 111 / 20%);
    width: 100%;
    right: 0;
  }

  .header-data {
    left: 17.25em;
  }

  @media (-webkit-device-pixel-ratio: 1.25) {
    .header-data {
      //left: 14%;
    }
  }

  @media (-webkit-device-pixel-ratio: 1.0) {
    .header-data {
      //left: 17.25em;
    }
  }

  .header-data {
    //display: flex;
    //flex-direction: column;
    //line-height: 2em;
    //margin-left: -68em;
    //text-align: left;
    position: fixed;
    line-height: 2em;
    text-align: left;
  }

  //.header-phone-number, .header-address {
  //  width: 20em;
  //}

  .right {
    display: flex;
    flex-direction: row;

  }

  .lang-select  {
    position: relative;
    /*display: flex;*/
    /*flex-direction: row;*/
    /*margin-left: 69.5em;*/
    user-select: none;
    margin-right: 1.5em;
    text-align: center;
    width: 2em;
    line-height: 3.5em;
  }

  .languages > .lang-select-btn,
  .languages-container > .lang-select-btn {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .languages > .lang-select-btn  {
    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
  }

  .languages-container {
    display: flex;
    flex-direction: row;
    width: 4.8em;
    flex-wrap: wrap;
    box-shadow: 0 8px 20px rgb(117 115 111 / 20%);
  }

  .languages-container > .lang-select-btn {
    padding: 0 0.2em;
    width: 2em;
  }

  .languages-container > .lang-select-btn:first-child {
    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0;
  }

  .languages-container > .lang-select-btn:last-child {
    border-bottom-right-radius: 0.5em;
    border-bottom-left-radius: 0;
  }

  .languages {
    position: absolute;
    display: flex;
    flex-direction: column;
    user-select: none;
    cursor: pointer;
    //width: 2em;
    top: 2em;
    left: 0;
    width: 2em;
  }

  .languages > img {
    width: 2em;
    align-self: center;
  }

  .languages.opened {
    left: 0;
    width: 2em;
  }

  .languages.opened.more-than-two,
  .languages.opened.more-then-three {
    left: -24px;
    width: 5em;
  }

  //.languages.opened.more-then-three {
  //  left: -24px;
  //  width: 5em;
  //}

  .languages.opened.more-then-three > .languages-container > .lang-select-btn:nth-last-child(2) {
    border-bottom-left-radius: 0.5em;
  }

  //.languages.opened.more-then-three.even > .languages-container > .lang-select-btn:nth-last-child(2) {
  //  border-bottom-left-radius: 0;
  //}

  .languages.opened.more-then-three.even > .languages-container > .lang-select-btn:last-child {
    width: 4.5em;
    border-bottom-left-radius: 0.5em;
  }

  .languages.opened.more-then-three > .languages-container > .lang-select-btn:first-child,
  .languages.opened.more-then-three.even > .languages-container > .lang-select-btn:nth-last-child(2) {
    border-bottom-left-radius: 0;
  }

   /*.material-symbols-rounded {
     font-variation-settings:
         'FILL' 0,
         'wght' 300,
           'GRAD' -25,
         'opsz' 20
   }

  .check {
    position: absolute;
    top: 1em;
    left: 1em;
  }*/

  nav {
    margin-left: 2.25em;
    user-select: none;
    /*position: absolute;
    left: 0.5em;
    margin-right: 1em;*/
  }

  nav ul{
    padding: 0;
    margin: 0;
    /*left: 1em;
    top: 2em;*/
    list-style: none;
    display: flex;
    flex-direction: column;
    position: absolute;
  }

  nav {
    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .menu-btn {
    width: 3em;
    margin: 0 0 0 0.2em;
    font-size: 1rem;
    cursor: pointer;
  }

  .menu-list  {
    border: 1px solid red;
  }

  .rest-name  {
    position: fixed;
    top: 1em;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 400;
    font-size: 2rem;
    /*font-family: Caveat, sans-serif;
    font-family: Lobster, sans-serif;*/
    font-family: Pacifico, sans-serif;
    font-kerning: normal;
  }

  .hidden {
    display: none;
  }

  .disabled {
    color: red;
  }

  .item {
    border: 1px solid blue;
  }

  .cart {
    position: relative;
    margin-right: 3.75em;
    line-height: 4.75;
    user-select: none;
    cursor: pointer;
  }

  .cart > img {
    max-height: 1.5em;
    vertical-align: unset;
}

.cart-counter {
  position: absolute;
  top: 2.5em;
  left: 1em;
  width: 1.25em;
  height: 1.25em;
  text-align: center;
  line-height: 1.34em;
  background-color: rgba(50, 205, 50, 0.8);
  border-radius: 50%;
  font-size: 0.75rem;
  padding: 0.25em;
  color: black;
}

.full-cost {
  margin-right: 0.25em;
}

hr {
  margin: 0.75em;
  border-width: 2px;
}
</style>