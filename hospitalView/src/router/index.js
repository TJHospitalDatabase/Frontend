import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import To1_1 from '../components/1-1.vue'
import To1_2 from '../components/1-2.vue'
import To1_3 from '../components/1-3.vue'
import To1_4 from '../components/1-4.vue'
import To2_1 from '../components/2-1.vue'
import To2_2 from '../components/2-2.vue'
import To2_3 from '../components/2-3.vue'
import To2_4 from '../components/2-4.vue'
import To3 from '../components/3.vue'
import Welcome from '../components/welcome.vue'
import cLogin from '../components/checklistlogin'
import cHome from '../components/checklistHome'
import Users from '../components/user/Users'
import cWelcome from '../components/checklistWelcome'
import Checklist_result from '../components/user/Checklist_result'

Vue.use(Router)

export default new Router({
  routes:[
    {path:'/',redirect:'/login'},
    {path:'/login',component: Login},
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
    {path:'/',redirect:'/checklistlogin'},
    {path:'/checklistlogin',component: cLogin},
    {path:'/checklisthome',
    component: cHome,
    redirect:'/checklistwelcome',
    children:[
      {path:'/checklistwelcome',component:cWelcome},
      {path:'/patient_imformation',component:Users},
      {path:'/checklist_result',component:Checklist_result},
    ]
    }
  ]

})
