<template>
  <div class="menu-main" v-bind:class="{menuOpened: store.menuOpened && !store.cartOpened, cartOpened: store.cartOpened && !store.menuOpened, bothOpened: store.menuOpened && store.cartOpened}">
    <FoodSection v-for="item in store.foods" :key="item.id"
                 v-bind:id="item.id" :name="item.name" :hash="item.hash" :items="item.data" :sectionId="item.id">
    </FoodSection>
  </div>
</template>

<script>
import {store} from "@/store/store";
import FoodSection from "@/components/FoodSection";
import FoodItem from "@/components/FoodItem";

export default {
  name: "Menu",
  components: {FoodSection, FoodItem},

  data: function () {
    return  {
      store,
      opened: false,
      itemId: 0,
      imgPath: '',
    }
  },

  mounted() {
    this.getMenuSections();
  },

  methods: {
    async getMenuSections() {
      if (!this.store.foods.length) {
        if (this.$cookies.isKey(store.cookieName)) {
          let tempCookieData = this.$cookies.get(store.cookieName);
          store.pageLang = tempCookieData.lang;
        }
        //fetch(`http://localhost:3000/foods${store.pageLang}`)
        fetch(`https://my-json-server.typicode.com/denvolk/restaurant-db/foods${store.pageLang}`)
            .then((response) => response.json())
            .then((foods) => {
              console.log(foods);
              foods.forEach(item => {
                //foods.slice(1).forEach(item => {
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
  },
}
</script>

<style scoped>
.item {
  display: none;
  width: 90%;
  padding-top: 4em;
  padding-bottom: 1em;
  backdrop-filter: blur(12px);
}

/*.menu-main {
  display: none;
}*/

.menu-main  {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  /*border: 1px solid blue;*/
  width: 100%;
  margin-top: 4em;
  margin-left: 17.75em;
}

/*@media (-webkit-device-pixel-ratio: 1.25) {*/
/*  .menu-main {*/
/*    margin-left: 1em;*/
/*  }*/
/*}*/

.menuOpened {
  margin-left: 17.75em;
}

/*@media (-webkit-device-pixel-ratio: 1.25) {*/
/*  .menuOpened {*/
/*    !*margin-left: 2.5em;*!*/
/*    margin-left: 15.5em;*/
/*  }*/
/*}*/

.cartOpened {
  /*margin-left: 2.75em;*/
  margin-left: 1em;
  /*margin-right: 17em;*/
}

/*@media (-webkit-device-pixel-ratio: 1.25) {*/
/*  .cartOpened {*/
/*    margin-left: 7em;*/
/*  }*/
/*}*/

.bothOpened {
  /*margin-left: 16em;
  margin-right: 17.5em;*/
  /*margin-left: 4.25em;*/
  margin-left: 17.25em;
  margin-right: 21.25em;
}

/*@media (-webkit-device-pixel-ratio: 1.25) {*/
/*  .bothOpened {*/
/*    !*margin-left: 1.25em;*!*/
/*    margin-left: 14.5em;*/
/*    margin-right: 18.5em;*/
/*  }*/
/*}*/

/*@media screen and (min-width: 2500px) {*/
/*  .menu-main {*/
/*    margin-left: 13.75em;*/
/*  }*/

/*  .menuOpened {*/
/*    margin-left: 13.75em;*/
/*  }*/

/*  .cartOpened {*/
/*    margin-left: 6em;*/
/*  }*/

/*  .bothOpened {*/
/*    margin-left: 21.25em;*/
/*    margin-right: 25.5em;*/
/*  }*/
/*}*/

@media (-webkit-device-pixel-ratio: 1.25) {

  @media screen and (min-width: 1500px) {
    .menuOpened {
      margin-left: 15.5em;
    }

    .bothOpened {
      margin-left: 14.5em;
      margin-right: 18em;
    }
  }

  @media screen and (min-width: 2000px) {
    .menuOpened {
      margin-left: 16.25em;
    }

    .bothOpened {
      margin-left: 15.5em;
      margin-right: 19em;
    }
  }
}

@media (-webkit-device-pixel-ratio: 1) {

  @media screen and (min-width: 1800px) {
    .menuOpened {
      margin-left: 18em;
    }

    .bothOpened {
      margin-left: 17.25em;
    }
  }

  @media screen and (min-width: 2500px) {
    .menuOpened {
      margin-left: 22em;
    }

    .bothOpened {
      margin-left: 21.25em;
    }
  }
}

.container{
  padding: 1.5em 3em 0.5em 3em;
  max-width: 8em;
  border: 2px solid black;
  border-radius: 0.5em;
}

/*.opened {
  display: block;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 99;

  background-color: rgba(255, 255, 255, 0.1);
  border: 3px solid black;
  border-radius: 0.5em;
}

.opened img {
  transform: scale(2);
  margin-top: 2em;
}

.opened .text  {
  margin-top: 4em;
}

.item-data  {
  display: flex;
  flex-direction: column;
  align-items: center;
}*/
</style>