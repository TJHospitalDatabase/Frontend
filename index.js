import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import hospital from '../components/hospital.vue'
import prescription from '../components/prescription.vue'
import examine from '../components/examine.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/hospital',
        name: 'Hospital',
        component:hospital
      },
      {
        path:'/prescription',
        name:"prescription",
        component:prescription
      },
      {
        path:'/examine',
        name:'examine',
        component:examine
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
