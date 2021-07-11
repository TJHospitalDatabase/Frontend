import Vue from 'vue'
import Router from 'vue-router'
import main_home from '../components/main_home.vue'
import main_welcome from '../components/main_welcome.vue'
import Home from '../components/living/home.vue'
import To1_1 from '../components/living/1-1.vue'
import To1_2 from '../components/living/1-2.vue'
import To1_3 from '../components/living/1-3.vue'
import To1_4 from '../components/living/1-4.vue'
import To2_1 from '../components/living/2-1.vue'
import To2_2 from '../components/living/2-2.vue'
import To2_3 from '../components/living/2-3.vue'
import To2_4 from '../components/living/2-4.vue'
import To3 from '../components/living/3.vue'
import Welcome from '../components/living/welcome.vue'
import cLogin from '../components/checklistlogin'
import cHome from '../components/checklistHome'
import Users from '../components/user/Users'
import cWelcome from '../components/checklistWelcome'
import Checklist_result from '../components/user/Checklist_result'

import Home_nt from '@/components/nursing_treated_Home.vue'
import Welcome_nt from '@/components/Welcome.vue'
import Nurse from '@/components/nurse/nurse_on_duty.vue'
import Treat from '@/components/treat/treated.vue'
import drugStore from '../components/drugStore.vue'
import prescribe from '../components/prescribe.vue'

import home_register from '../components/register/home_register.vue'
import registerpage2 from '../components/register/registerpage2.vue'
import registerpage11 from '../components/register/registerpage11.vue'
import registerpage12 from '../components/register/registerpage12.vue'
import registerpage13 from '../components/register/registerpage13.vue'
import registerpage14 from '../components/register/registerpage14.vue'

Vue.use(Router)

export default new Router({
  routes:[
    //总路由配置
    {path:'/',redirect:'/main_home'},
    {path:'/main_home',component: main_home,
    redirect:'/main_welcome',
    children:[
      {path:'/main_welcome',component: main_welcome},
    ]},



    //住院界面相关路由开始
    {path:'/',redirect:'/home'},//这一行后续可以删了
    {path:'/home',component: Home,
    redirect:'/welcome',
    children:[
      {path:'/1-1',component: To1_1},
      {path:'/1-2',component: To1_2},
      {path:'/1-3',component: To1_3},
      {path:'/1-4',component: To1_4},
      {path:'/2-1',component: To2_1},
      {path:'/2-2',component: To2_2},
      {path:'/2-3',component: To2_3},
      {path:'/2-4',component: To2_4},
      {path:'/3',component: To3},
      {path:'/welcome',component: Welcome},
    ]},
    //住院界面相关路由结束

    { path: '/register/home_register', component: home_register,
    redirect:'/register/registerpage11',
    children:[
    { path:'/register/registerpage11', component: registerpage11},
    { path:'/register/registerpage12', component: registerpage12},
    { path:'/register/registerpage13', component: registerpage13},
    { path:'/register/registerpage14', component: registerpage14},
    { path:'/register/registerpage2', component: registerpage2},
  ]},

    {path:'/',redirect:'/checklistlogin'},
    {path:'/checklistlogin',component: cLogin},
    {path:'/checklisthome',component: cHome,
        redirect:'/checklistwelcome',
        children:[
          {path:'/checklistwelcome',component:cWelcome},
          {path:'/patient_imformation',component:Users},
          {path:'/checklist_result',component:Checklist_result},
        ]
    },
    { path: '/', redirect: '/home_nt' },
    {
      path: '/home_nt',
      component: Home_nt,
      redirect: '/welcome_nt',
      children: [{ path: '/welcome_nt', component: Welcome_nt },
        { path: '/1-4-1', component: Nurse },
        { path: '/2-4-1', component: Treat }]
    },
    {
      path:'/drugStore',
      component: drugStore
    },
    {
      path:'/prescribe',
      component:prescribe
    }
  ]

})
