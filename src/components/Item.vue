<template>
  <div class="item" v-bind:class="{opened: store.fullPageItem, 'closing-disabled': closingIsDisabled}"
       v-on:click="closeItem">
    <div class="item-data" v-on:mouseenter="closingIsDisabled = !closingIsDisabled" v-on:mouseleave="closingIsDisabled = !closingIsDisabled">
      <div class="img-container">
        <img v-bind:src="store.shownItem.img" v-bind:alt="store.shownItem.img" v-on:load="setImgLoadState">
      </div>
      <div class="text">
        <div class="name">{{store.shownItem.name}}</div>
        <div class="description">{{store.shownItem.desc}}</div>
        <div class="weight">{{store.shownItem.weight}}</div>
      </div>
      <div class="close-btn">
        <span class="material-symbols-outlined close" v-on:mouseenter="closingIsDisabled = !closingIsDisabled" v-on:mouseleave="closingIsDisabled = !closingIsDisabled"
              v-on:click="closeItem">
          close
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from "@/store/store";

export default {
  name: "Item",

  data: function () {
    return  {
      store,
      openedItemData: {
        imgPath: '',
        id: '',
        name: '',
        desc: '',
        weight: '',
      },
      imgLoaded: false,
      closingIsDisabled: false,
    }
  },

  methods:  {

    setImgLoadState() {
      this.imgLoaded = true;
    },

    closeItem() {
      if (this.closingIsDisabled)
        return;

      store.fullPageItem = store.foodItem = this.imgLoaded = store.itemOpened = false;
      //document.getElementsByTagName('html')[0].classList.remove("noscroll");
    },
  },
}
</script>

<style scoped>
.item {
  display: none;
}

.opened {
  /*display: flex;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 48.5%;
  top: 50%;
  z-index: 99;
  overflow: hidden;
  background-color: #fff;
  border: 3px solid black;
  border-radius: 1em;
  margin: 2em;
  padding: 2em;
  min-width: 30em;*/
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  padding: 20px 0;
  background: rgba(0,0,0,.4);
  transition: opacity .5s ease,visibility .5s ease;
}

.item-data  {
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  background-color: #fff;
  /*border: 3px solid black;*/
  border-radius: 1em;
  /*padding: 0 1em;*/
  padding-right: 1em;
  width: 46em;
  height: 20em;
}

@media (-webkit-device-pixel-ratio: 1.25) {
  .item-data {
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    background-color: #fff;
    /*border: 2px solid black;*/
    border-radius: 0.9em;
    /* padding: 0 1em; */
    padding-right: 1em;
    width: 46em;
    height: 19.6em;
  }
}

.name, .description, .weight  {
  text-align: left;
}

img {
  width: 23em;
  border-radius: 0.75em 0 0 0.75em;
}

.img-container  {
  width: 23em;
  height: 20em;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 5px 0 20px rgb(117 115 111 / 20%);
}

.text {
  width: 23em;
  /* height: 36em; */
  display: flex;
  justify-content: space-evenly;
  /* align-items: center; */
  flex-direction: column;
  padding-left: 1em;
  font-size: 1.25rem;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0,
  'wght' 700,
  'GRAD' 200,
  'opsz' 48
}

.close {
  user-select: none;
  cursor: pointer;
  margin-top: 0.75em;
}

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