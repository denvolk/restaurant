import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import App from "@/App";
import Aside from "@/components/Aside";
import FoodSection from "@/components/FoodSection";
import Menu from "@/components/Menu";

Vue.use(VueRouter)

const routes = [
  {
    path: '/:id',
    component: Menu,
    name: 'foodSection',
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior: function (to, from, savedPosition)  {
    if (to.hash)  {
      return  {
        selector: to.hash,
        offset: {x: 0, y: 64},
        behavior: 'smooth',
      }
    }
  },
  /*scrollBehavior: function (to, from, savedPosition)  {
    if (to.hash)  {
      return {selector: to.hash}
    }
    else  {
      return {x: 0, y: 0}
    }
  },*/
})

export default router
