import Vue from 'vue'
import Router from 'vue-router'
import comics from '../components/comics/comics'
import group from '../components/group/group'
import home from '../components/home/home'
import mine from '../components/mine/mine'
import classification from  '../components/comics/classification/Classification'
import recommend from  '../components/comics/recommend/Recommend'
import search from  '../components/comics/search/Search'

Vue.use(Router)
export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/comics',
      component: comics,
      redirect: '/comics/recommend',
      children: [
        { path: "/comics/classification", component: classification },
        { path: "/comics/recommend", component: recommend },
        { path: "/comics/search", component: search }
      ]
    },
    {
      path: '/group',
      component: group
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/mine',
      component: mine
    }

  ]
})
