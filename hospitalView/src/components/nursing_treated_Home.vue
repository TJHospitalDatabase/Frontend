<template>
 <el-container class="home-container">
     <!--头部区域-->
  <el-header>
      <div>
          <img src="../assets/medical.png" alt="">
          <span>医疗系统</span>
      </div>
  </el-header>

  <!--页面主体区域-->
   <el-container>
       <!--侧边栏-->
    <el-aside :width="isCollapse ? '64px' :' 200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
         <!--侧边栏菜单区域-->
         <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF" unique-opened :collapse="isCollapse"
      :collapse-transition="false"
      router>

      <!--1级菜单区域-->
      <el-submenu index="1">
          <!--1级菜单模板区域-->
        <template slot="title">
            <!--图标-->
          <i class="el-icon-s-order"></i>
          <!--文本-->
          <span>护士值班信息</span>
        </template>

        <!--2级菜单区域-->
        <el-menu-item index="1-4-1">
         <template slot="title">
            <!--图标-->
          <i class="el-icon-menu"></i>
          <!--文本-->
          <span>值班信息列表</span>
         </template>
        </el-menu-item>
       </el-submenu>

        <!--1级菜单区域-->
      <el-submenu index="2">
          <!--1级菜单模板区域-->
        <template slot="title">
            <!--图标-->
          <i class="el-icon-notebook-1"></i>
          <!--文本-->
          <span>问诊信息</span>
        </template>

        <!--2级菜单区域-->
        <el-menu-item index="2-4-1">
         <template slot="title">
            <!--图标-->
          <i class="el-icon-menu"></i>
          <!--文本-->
          <span>问诊信息列表</span>
         </template>
        </el-menu-item>
       </el-submenu>

    </el-menu>
    </el-aside>

    <!--右侧主体内容-->
    <el-main>
        <!--路由占位符-->
      <router-view></router-view>
    </el-main>
   </el-container>
 </el-container>
</template>

<script>
export default {
  data () {
    return {
    // 是否折叠
      isCollapse: false
    }
  },
  methods: {
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
height: 100%;
}

.el-header {
background-color:#373D41;
display:flex;
justify-content: space-between;
padding-left: 0;
align-items:center;
color:#fff;
font-size:20px;
> div {
    display:flex;
    align-items:center;
    span{
        margin-left:15px;
    }
}
}

.el-aside {
background-color:#333744;
.el-menu{
    border-right:none;
}
}

.el-main {
background-color:#EAEDF1;
}

.toggle-button{
    background-color: #4A5064;
    font-size:10px;
    line-height:24px;
    color:#fff;
    text-align:center;
    letter-spacing:0.2em;
    cursor:pointer;
}
</style>
