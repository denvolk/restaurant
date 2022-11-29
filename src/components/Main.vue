<template>
  <main>
    <Aside></Aside>
    <Item></Item>
    <Menu></Menu>
    <Cart></Cart>
  </main>
</template>

<script>
import Aside from "@/components/Aside";
import Menu from "@/components/Menu";
import Item from "@/components/Item";
import Cart from "@/components/Cart";
export default {
  name: "Main",
  components: {Cart, Menu, Aside, Item}
}
</script>

<style scoped>
main{
  display: flex;
  flex-direction: row;
  position: relative;
}
</style>