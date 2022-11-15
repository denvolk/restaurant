<template>
  <div class="food-section">
    <!--<router-view></router-view>-->
    <div class="food-section-name" v-bind:id="hash">
      <p><span>{{name}}</span></p>
    </div>
    <div class="food-items">
      <FoodItem v-for="item in items" :key="items.id"
                :id="item.name" :name="item.name" :desc="item.desc" :amount="item.amount" :weight="item.weight" :img="item.img">

      </FoodItem>
    </div>
    <!--<div class="temp" v-for="(item, i) in store.foods" :key="i">
      <FoodItem v-for="(f, index) in item.data" :key="index"

                class="container">

      </FoodItem>
    </div>-->
  </div>
</template>

<script>
import {store} from "@/store/store"
import FoodItem from "@/components/FoodItem";
export default {
  name: "FoodSection",
  components: {FoodItem},
  props: ["id", "name", "hash", "items"],

  data: function () {
    return  {
      store,
    }
  },

  mounted() {

  },

  methods:  {

  }
}
</script>

<style scoped>
  .food-section  {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .food-items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>