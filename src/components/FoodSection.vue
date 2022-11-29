<template>
  <div class="food-section" v-bind:id="hash">
    <!--<div class="food-section-name" v-bind:id="hash">-->
    <div class="food-section-name">
      {{name}}
    </div>
    <div class="food-items">
      <FoodItem v-for="item in items" :key="items.id"
                :id="item.name" :name="item.name" :desc="item.desc" :weight="item.weight" :img="item.img" :ftype="hash" :foodId="item.id" :sectionId="sectionId">

      </FoodItem>
    </div>
  </div>
</template>

<script>
import {store} from "@/store/store"
import FoodItem from "@/components/FoodItem";
export default {
  name: "FoodSection",
  components: {FoodItem},
  props: ["id", "name", "hash", "items", "sectionId"],

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
  font-size: 1.5rem;
}

.food-items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.food-section-name  {
  margin-left: 0.7em;
  margin-top: 0.5em;
  font-weight: bold;
  font-size: 2rem;
}
</style>