<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="#" alt="">
                <span>医院数据库管理系统</span>
            </div>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
      <el-menu>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>挂号</span>
            </template>
            <el-menu-item-group>
                <el-menu-item @click.native="to11">病人信息录入</el-menu-item>
                <el-menu-item @click.native="to12">病人信息查询</el-menu-item>
                <el-menu-item @click.native="to13">挂号</el-menu-item>
                <el-menu-item @click.native="to14">挂号单处理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>查询挂号</span>
            </template>
            <el-menu-item-group>
                <el-menu-item @click.native="to2">挂号信息查询</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

    </el-menu>
            </el-aside>
            <!-- 右侧主体部分 -->
            <el-main>
                <el-container  style="height: 500px; height:100%; border: 1px solid #eee">
            <!--路由占位符-->
            <router-view></router-view>
              </el-container>
            </el-main>
        </el-container>
    </el-container>   
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      to11(){
        this.$router.push("/register/registerpage11");
      },
      to12(){
        this.$router.push("/register/registerpage12");
      },
      to13(){
        this.$router.push("/register/registerpage13");
      },
      to14(){
        this.$router.push("/register/registerpage14");
      },
      to2(){
        this.$router.push("/register/registerpage2");
      }
    }
  }
</script>

<style lang="less" scoped>

.home-container{
    height: 100%;
}

.el-header{
    background-color: #0c8bad;
    display: flex;
    justify-content: space-between;
    // padding-left: 0;靠左贴边
    align-items: center;
    color: #ffffff;
    font-size: 30px;
    /* div{
        display: flex;
        align-items: center;
        span {
            margin-left: 15px;
        }
     }
     实例中左边有个图，这里跟图隔开*/
}

.el-aside{
    background-color: #54a9bf;
}

.el-main{
    background-color: #ffffff;
}

</style>
