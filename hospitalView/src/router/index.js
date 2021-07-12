import Vue from 'vue'
import Router from 'vue-router'

import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import Login from '../components/login'

import hospital from '../components/bills/hospital.vue'
import prescription from '../components/bills/prescription.vue'
import examine from '../components/bills/examine.vue'
import Checklist_result from '../components/bills/Checklist_result.vue'
import Checklist from '../components/bills/Checklist.vue'

import drugStore from '../components/drug/drugStore.vue'
import prescribe from '../components/drug/prescribe.vue'

import searchPatient from '../components/living/searchPatient.vue'
import searchRoom from '../components/living/searchRoom.vue'
import Nurse from '../components/living/nurse_on_duty.vue'

import registerpage2 from '../components/register/registerpage2.vue'
import registerpage11 from '../components/register/registerpage11.vue'
import registerpage12 from '../components/register/registerpage12.vue'
import registerpage13 from '../components/register/registerpage13.vue'
import registerpage14 from '../components/register/registerpage14.vue'
import Treat from '../components/register/treated.vue'


Vue.use(Router)

export default new Router({
  routes:[
    //总路由配置
    {path:'/',redirect:'/home'},
    {path:'/login',component: Login},
    {path:'/home',component: home,
        redirect:'/welcome',
        children:[
          {path:'/welcome',component: welcome},
          { path:'/checklist_result',component:Checklist_result},
          { path:'/checklist',component:Checklist}, 
          {path: '/hospital',component:hospital},
          {path:'/prescription',component:prescription },
          {path:'/examine',component:examine},

          {path:'/drugStore',component: drugStore},
          {path:'/prescribe',component:prescribe},

          {path:'/searchPatient',component: searchPatient},
          {path:'/searchRoom',component: searchRoom},
          { path: '/nurse_on_duty', component: Nurse },

          { path:'/registerpage11', component: registerpage11},
          { path:'/registerpage12', component: registerpage12},
          { path:'/registerpage13', component: registerpage13},
          { path:'/registerpage14', component: registerpage14},
          { path:'/registerpage2', component: registerpage2},
          { path:'/treated', component: Treat },
    
    ]},

   
  ]

})
