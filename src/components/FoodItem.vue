<template>
  <div class="food-item">
    <img v-bind:src="logoPath" v-bind:alt="name" v-on:click="!store.foodItem ? openItem() : null">
    <p class="name"><span>{{name}}</span></p>
    <p class="desc"><span>{{desc}}</span></p>
    <!--<p class="amount"><span>{{amount}}</span></p>-->
    <p class="weight"><span>{{weight}}g</span></p>
  </div>
</template>
<!--v-bind:class="{opened: opened}"-->
<script>
import {store} from "@/store/store";

export default {
  name: "FoodItem",

  props: ["id", "name", "desc", "amount", "weight", "img"],

  data: function () {
    return  {
      logoPath: '',
      opened: false,
      store,
    }
  },

  methods:  {
    imgPath()  {
      this.logoPath =  `../assets/foods/${this.img}.png`;
    },

    openItem()  {
      /*this.opened = !this.opened;
      console.log(this.opened);

      const response = {
        opened: this.opened,
        id: this.id,
      };*/
      /*this.$emit("food-item-opened", response);*/
      store.foodItem = true;

      store.shownItem.id = this.id;
      store.shownItem.name = this.name;
      store.shownItem.desc = this.desc;
      store.shownItem.weight = this.weight;
      store.shownItem.amount = this.amount;
      store.shownItem.img = this.logoPath;

      store.fullPageItem = true;
      console.log('openItem ' + store.shownItem.id + ' ' + store.foodItem);
    },
  },

  mounted() {
    this.imgPath();
  },
}
</script>

<style scoped>
  .food-item  {
    margin: 1em;
    border: 1px solid red;
    background-color: #ffffff;
  }

  img {
    max-width: 8em;
  }

  /*.opened {
    position: absolute;
    max-width: 80%;
    margin: 20em auto 20em auto;
    vertical-align: center;
  }*/
</style>