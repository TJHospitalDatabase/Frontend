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

const routes=[
  //总路由配置
  {path:'/',redirect:'/home'},
  {path:'/login',component: Login},
  {path:'/home',component: home, name:'63',
      redirect:'/welcome',
      children:[
        {path:'/welcome',component: welcome, name:'63'},
        { path:'/checklist_result',component:Checklist_result, name:'16'},
        { path:'/checklist',component:Checklist, name:'16'}, 
        {path: '/hospital',component:hospital, name:'4'},
        {path:'/prescription',component:prescription, name:'4' },
        {path:'/examine',component:examine, name:'4'},

        {path:'/drugStore',component: drugStore, name:'8'},
        {path:'/prescribe',component:prescribe, name:'8'},

        {path:'/searchPatient',component: searchPatient, name:'32'},
        {path:'/searchRoom',component: searchRoom, name:'32'},
        { path: '/nurse_on_duty', component: Nurse , name:'32'},

        { path:'/registerpage11', component: registerpage11, name:'2'},
        { path:'/registerpage12', component: registerpage12, name:'2'},
        { path:'/registerpage13', component: registerpage13, name:'2'},
        { path:'/registerpage14', component: registerpage14, name:'2'},
        { path:'/registerpage2', component: registerpage2, name:'4'},
        { path:'/treated', component: Treat, name:'1' },
  
  ]},

 
]

const router = new Router({
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //注册登录界面
  if (to.path === '/login') {
    window.sessionStorage.clear();
    return next();
  }
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  //无token强制跳转到登录页面
  if (!tokenStr){
    return next('/login');
  }
  //有token判断权限
  if(!((tokenStr-0)&(to.name-0))){
    return next(false);
  }

   next();
 })


export default router



