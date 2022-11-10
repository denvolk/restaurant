<template>
  <main>
    <Aside></Aside>
    <Item></Item>
    <Menu></Menu>
  </main>
</template>

<script>
import Aside from "@/components/Aside";
import Menu from "@/components/Menu";
import Item from "@/components/Item";
export default {
  name: "Main",
  components: {Menu, Aside, Item}
}
</script>

<style scoped>
  main{
    display: flex;
    flex-direction: row;
  }
</style>