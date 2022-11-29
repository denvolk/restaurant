<template>
  <div id="app" v-bind:class="{itemOpened: store.itemOpened}">
    <Header></Header>
    <Main></Main>
    <!--<button v-on:click="getapi">Click</button>-->
    <!--<div>
      <span>{{x}}</span>
    </div>-->
    <!--<router-view/>-->
  </div>
</template>

<script>
import {store} from "@/store/store"
import Vue, {ref} from 'vue';
import Header from "@/components/Header";
import Main from "@/components/Main";
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
    }
  },

  mounted() {
    //this.$nextTick(this.setLangOnLoad, this.changeRestName);
    //this.setLangOnLoad();
    //this.$nextTick(this.changeRestName);
    //this.getLanguages();
    //document.querySelector("meta[name=viewport]").setAttribute('content', 'width=device-width, initial-scale='+(1/window.devicePixelRatio)+', maximum-scale=1.0, user-scalable=0');
  },

  methods:  {
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
  background-color: #F5F4F2;
  margin: 0;
  padding: 0;
}
/*.noscroll {
  position: fixed;
  overflow-y: scroll;
  width: 100%;
}*/
body  {
  margin: 0;
  padding: 0;
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

/* width */
::-webkit-scrollbar {
  width: 0.5em;
  border: 1px black solid;
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
