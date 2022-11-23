<template>
  <header>
    <nav class="menu">
      <button v-on:click="toggleMenu(); " class="menu-btn" :disabled="!store.foods.length">{{menuName}}</button>
    </nav>
    <!--<section class="logo">
      <img v-bind:src="logoPath" alt="logo.png">
    </section>-->
    <section class="rest-name">
      {{restName}}
    </section>
    <section class="lang-select">
      <template v-for="item in store.pageLanguages">
        <button :key="item.id"
                class="lang-select" v-bind:class="item.name"
                v-on:click="translatePage(item.name);">
          {{item.name.toString().toUpperCase()}}
        </button>
        <hr v-if="store.pageLanguages.length > 1 && item.id !== store.pageLanguages.length">
      </template>
    </section>
    <section class="cart">
      <img id="cart-logo" src="" alt="cart.png">
    </section>
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
      logoPath: './assets/logo.svg',
      menuName: 'Меню',
      restName: 'РЕСТОРАН',
      menuBtnDisabled: true,
      menu: [],
    }
  },

  mounted() {
    this.getLanguages();
    this.getMenuSections();
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
          });
    },

    async translatePage(lang) {
      console.log('translatePage');
      if (lang === store.pageLang)  return;

      store.pageLang = lang;

      await this.repaintMenu();
    },

    async repaintMenu()  {
      //fetch(`http://localhost:3000/foods${store.pageLang}`)
      fetch(`https://my-json-server.typicode.com/denvolk/restaurant-db/foods${store.pageLang}`)
          .then((response) => response.json())
          .then((foods) => {
            console.log(foods);
            foods.slice(1).forEach((item, index) => {
              this.$set(store.foods, index, item);
            });
            /*for (let i = 0; i < foods.length; i++) {
              this.$set(store.foods, i, foods[i]);
            }*/
            console.log(store.foods);
            this.menuName = foods[0].name;
          });
    },

    setLogo(lang) {
      console.log('lang=', lang);
      this.logoPath = `../assets/restImg${lang}.png`;
    },

    toggleMenu()  {
      this.store.menuOpened = !this.store.menuOpened;
    },

    async getMenuSections() {
      if (!this.store.foods.length) {
        //fetch(`http://localhost:3000/foods${store.pageLang}`)
        fetch(`https://my-json-server.typicode.com/denvolk/restaurant-db/foods${store.pageLang}`)
            .then((response) => response.json())
            .then((foods) => {
              console.log(foods);
              foods.slice(1).forEach(item => {
                store.foods.push(item);
              });
              /*for (let i = 0; i < foods.length; i++) {
                store.foods.push(foods[i]);
              }*/
              console.log(store.foods);
              this.menuName = foods[0].name;
            });
      };
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
  img {
    max-height: 2em;
    vertical-align: middle;
  }
  button  {
    appearance: none;
    background: none;
    border: none;
    align-items: center;
  }

  header  {
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

  .lang-select  {
    display: flex;
    flex-direction: row;
    cursor: pointer;
  }

  nav {
    margin-left: 1.5em;
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
    /*margin: 0 0 0 1.5em;*/
    font-size: 1rem;
  }

  .menu-list  {
    border: 1px solid red;
  }

  .rest-name  {
    width: 40em;
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
    padding-right: 1.5em;
  }
</style>