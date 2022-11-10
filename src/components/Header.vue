<template>
  <header>
    <nav class="menu">
      <button v-on:click="toggleMenu(); fillMenu();" class="menu-btn" :disabled="!menu.length">{{menuName}}</button>
      <!--<ul v-show="store.menuOpened" class="menu-list">
        <li v-for="item in store.menuItems" :key="item">
          <button class="menu-list item" v-bind:class="item">{{item}}</button>
        </li>
      </ul>-->
    </nav>
    <section class="logo">
      <img v-bind:src="logoPath" alt="logo.png">
    </section>
    <section class="rest-name">
      {{restName}}
    </section>
    <section class="lang-select">
      <button class="lang-select btn-ru" v-on:click="getRestName('ru'); toggleLangBtn();" :disabled="!engBtnDisabled">RU</button> |
      <button class="lang-select btn-eng" v-on:click="getRestName('eng'); toggleLangBtn();" :disabled="engBtnDisabled">ENG</button>
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
      //pageLang: 'eng',
      logoPath: './assets/logo.svg',
      menuName: 'Menu',
      restName: 'RESTAURANT',
      //menuOpened: false,
      menuBtnDisabled: true,
      engBtnDisabled: true,
      menu: [],
      //menuItems:  ref([]),
  }
  },

  methods:  {
    setLogo(lang) {
      console.log('lang=', lang);
      this.logoPath = `../assets/restImg${lang}.png`;
    },

    toggleMenu()  {
      this.store.menuOpened = !this.store.menuOpened;
    },

    toggleLangBtn() {
      this.engBtnDisabled = !this.engBtnDisabled;
    },

    async getRestMenu() {
      if (!this.menu.length)
        fetch('http://localhost:3000/menu')
            .then((response) => response.json())
            .then((menu) => {
              console.log(menu);
              for (let i = 0; i < menu.length; i++) {
                this.menu.push(menu[i].name);
              }
              console.log(this.menu);
              /*for (let i = 0; i < menu.length; i++)
                console.log(this.menu[i].ru);*/
            });
    },

    fillMenu()  {
      if (!store.menuItems.length) {
        if (store.pageLang === 'eng')  {
          for (let i = 0; i < this.menu.length; i++)  {
            store.menuItems.push(this.menu[i].eng);
          }

          console.log('fillMenuEng'); return;
        }

        for (let i = 0; i < this.menu.length; i++)  {
          store.menuItems.push(this.menu[i].ru);
        }
        console.log('fillMenuRu');
      }
    },

    repaintMenu() {
      if (store.pageLang === 'eng')  {
        for (let i = 0; i < this.menu.length; i++)  {
          //store.menuItems[i] = this.menu[i].eng;
          this.$set(store.menuItems, i, this.menu[i].eng);
        }
      }
      else if (store.pageLang === 'ru')  {
        for (let i = 0; i < this.menu.length; i++)  {
          store.menuItems[i] = this.menu[i].ru;
          this.$set(store.menuItems, i, this.menu[i].ru);
        }
      }
    },

    async getRestName(lang) {
      //const response = await fetch(`http://localhost:3000/lang?name=${lang}`)
      //this.restName = await response;
      //console.log(response);
      //console.log(data['name']);
      //return (await fetch(`http://localhost:3000/lang/1`)).json();
      fetch(`http://localhost:3000/lang?name=${lang}`)
          .then((response) => response.json())
          .then((lang) => {this.restName = lang[0].restname;
                          this.menuName = lang[0].menu;
                          store.pageLang = lang[0].name;
                          this.repaintMenu();
                          /*this.menuItems = [];*/
                          /*if (this.menuOpened)  this.toggleMenu()*/});

      //this.setLogo(lang);
      //.then((lang) => {lang[0].name === 'ru' ? this.restName = lang[0].restname
      //: this.restName = lang});
    },
  },

  mounted() {
    this.getRestMenu();
  }
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
}

header  {
  position: sticky;
  top: 0.5em;
  display: flex;
  margin: 0 auto 0 auto;
  justify-content: space-between;
  border: 1px red solid;
  line-height: 3em;
}

nav {
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
</style>