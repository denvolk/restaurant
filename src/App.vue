<template>
  <div id="app" v-bind:class="{itemOpened: store.itemOpened}">
    <Header></Header>
    <Main></Main>
    <!--<button v-on:click="getapi">Click</button>-->
    <!--<div>
      <span>{{x}}</span>
    </div>-->
    <!--<router-view/>-->
    <div class="yandex-map-container" v-show="store.mapIsOpened" v-on:click="closeMap">
      <div class="map-img-container" v-on:mouseenter="closingDisabled = true" v-on:mouseleave="closingDisabled = false">
<!--        <img src="https://static-maps.yandex.ru/1.x/?ll=30.20170170632518,59.988578443034804&spn=0.002,0.002&size=650,450&l=map&pt=30.20170170632518,59.988578443034804,round100" alt="yandex static map">-->
<!--        <img v-bind:src="`https://static-maps.yandex.ru/1.x/?ll=30.20170170632518,59.988578443034804&spn=0.002,0.002&size=650,450&l=map&pt=30.20170170632518,59.988578443034804,round100&lang=${mapLang}`">-->
        <img v-bind:src="`${mapLang}`" v-bind:alt="`${mapLang}`">
        <span v-if="store.pageLanguages.length > 0" class="map-text">{{store.pageLanguages[currLang]['restaurant-address']}}</span>
      </div>
<!--      <div class="address-data-map">-->
<!--        <div class="hole"></div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import {store} from "@/store/store"
import Vue, {ref} from 'vue';
import Header from "@/components/Header";
import Main from "@/components/Main";
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);
/*var data = {
  x: {},
  lang: '',
  restName: '',
  isHidden: true
}*/

export default {
  components: {Header, Main},
  data: function (){
    return{
      x: '',
      store,
      closingDisabled: false,
    }
  },

  mounted() {
    this.setBodyImg();
    this.checkCookieExist();
    //this.$nextTick(this.setLangOnLoad, this.changeRestName);
    //this.setLangOnLoad();
    //this.$nextTick(this.changeRestName);
    //this.getLanguages();
    //document.querySelector("meta[name=viewport]").setAttribute('content', 'width=device-width, initial-scale='+(1/window.devicePixelRatio)+', maximum-scale=1.0, user-scalable=0');
  },

  computed: {

    currLang() {
      if (!store.pageLanguages)
        return -1;

      let index = store.pageLanguages.findIndex(x => x.name === store.pageLang);
      if (index === -1)
        return;

      return index;
    },

    mapLang() {
      if (store.pageLang === 'ru')
        return 'ru_RU'

      return 'en_RU';
    },
  },

  methods:  {

    closeMap() {
      if (!this.closingDisabled)
        store.mapIsOpened = false;
    },

    checkCookieExist() {
      store.cookieExists = this.$cookies.isKey("denvolkpizza");
      console.log(store.cookieExists);

      if (store.cookieExists) {
        this.getCookie();
        console.log("store.cookie.length: " + store.cookie.length);
        /*store.cookie.data.forEach(item => {
          store.cartItems.push(item);
        });*/
        /*for (let iter = 0; iter < store.cookie.length; iter++) {
          store.cartItems.push(store.cookie.data[iter]);
        }*/
        //store.cartItems = store.cookie.data;
        store.cartItems = store.cookie.data.map(x => x);///
        console.log("store.cartItems" + store.cartItems);

        if (store.cartItems.length)
          store.cartOpened = true;
        //let tempCookieData = store.cookie.data;
        //console.log("tempCookieData" + tempCookieData[0].name);
        //store.cartItems = store.cookie.data;
      }
    },

    getCookie() {
      store.cookie = this.$cookies.get("denvolkpizza");
      store.pageLang = store.cookie.lang;
      //console.log("getCookie() store.cookie.data: " + store.cookie.data[0].name);
      //console.log("getCookie() store.cartItems: " + store.cartItems);
    },

    setBodyImg() {
      document.getElementsByTagName('body')[0].classList.add('body_img', 'body');
    },
    /*getLanguages()  {
      fetch(`http://localhost:3000/lang`)
          .then((response) => response.json())
          .then((lang) => {lang.forEach((item, index) => {
            store.pageLanguages.push(item.name)});
          })
      console.log("store.pageLanguages: "+store.pageLanguages);
    },*/

    /*setLangOnLoad() {
      document.location.hash = "#eng";
      console.log('setLangOnLoad');
    },*/

    async getRestName(lang) {
      //const response = await fetch(`http://localhost:3000/lang?name=${lang}`)
      //this.restName = await response;
      //console.log(response);
      //console.log(data['name']);
      //return (await fetch(`http://localhost:3000/lang/1`)).json();
      fetch(`https://my-json-server.typicode.com/denvolk/restaurant-db/lang?name=${lang}`)
          .then((response) => response.json())
          .then((lang) => {this.restName = lang[0].restname;})
      //.then((lang) => {lang[0].name === 'ru' ? this.restName = lang[0].restname
      //: this.restName = lang});
    },

    changeRestName(lang)  {

      if (lang !== 'ru' && lang !== 'eng')  {
        alert('Lang not provided, changeRestName(lang)')
      }
      else  {
        //this.restName = this.getRestName(lang).toString();
        //console.log(this.restName.toString());
      }
    }

    /*changeRestName() {
      if (window.location.hash) {
        console.log('changeRestName');
        if (window.location.hash === '#eng'){
          //this.restName.value = this.getRestName('eng')[0];
          //console.log(this.restName.value)
          let xx = this.getRestName('eng');
          console.log('eng\n', xx);
        }
        else{
          //this.restName.value = this.getRestName('ru')[0];
          //console.log(this.restName.value)
          let xx = this.getRestName('eng');
          console.log('ru\n', xx);
        }
          //this.restName.value = this.getRestName('ru').toString();
          //console.log(this.getRestName('eng'))

        //console.log(this.restName.value);
      }
      else  {
        alert('lang hash not set!');
        window.location.hash = '#eng';
      }
    },*/
  }
}
</script>

<style lang="less">
html  {
  overflow-y: scroll;
  /*background-color: #F5F4F2;*/
  margin: 0;
  padding: 0;
}
.noscroll {
  /*position: fixed;*/
  overflow-y: scroll;
  width: 100%;
}
body  {
  margin: 0;
  padding: 0;
}

.body {
  background-attachment: fixed !important;
}

.body_img {
  background: url("../public/assets/pizzabckgr.webp") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

@media (-webkit-device-pixel-ratio: 1.25) {
  * {
    zoom: 1;
  }
  html {
    /*background-color: red;*/
  }
}

#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: Rubik, sans-serif;
}

.itemOpened {
  overflow-y: hidden;
}

.yandex-map-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,.4);
  width: 100%;
  /* height: 100%; */
  height: 101vh;
  z-index: 99;
}

.yandex-map-container > img {
  transform: translateY(50%);
}

.address-data-map {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -85%);
  width: 100px;
  height: 100px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  mix-blend-mode: hard-light;
  z-index: 100;
}

.hole {
  width: 20px;
  height: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: grey;
}

.map-text {
  visibility: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -160%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0.5em;
  border-radius: 0.25em;
  z-index: 100;
}

.map-img-container {
  transform: translate(100%, 50%);
  width: 650px;
}

.map-img-container:hover .map-text {
  visibility: visible;
}

/* width */
::-webkit-scrollbar {
  width: 0.5em;
  /*border: 1px black solid;*/
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
