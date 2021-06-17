<template>
<el-container style="height:100%;">
 <!-- 头部 -->
    <el-header class="header" style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><i class="el-icon-copy-document"></i>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout"><i class="el-icon-switch-button"></i>退出账号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span> 杨院长</span>
    </el-header>


    <!-- 主体部分 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <!-- 侧边栏 -->
        <el-aside width="200px">
            <el-menu router>
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-info"></i>基本信息查询</template>
                <el-menu-item-group>
                <template slot="title">你可以选择以下依赖信息</template>
                <el-menu-item index="1-1" >病人姓名</el-menu-item>
                <el-menu-item index="1-2" >房间号</el-menu-item>
                <el-menu-item index="1-3" >医生姓名</el-menu-item>
                <el-menu-item index="1-4" >负责护士</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-s-home"></i>病房信息查询</template>
                <el-menu-item-group>
                <template slot="title">你可以选择以下依赖信息</template>
                <el-menu-item index="2-1" @click.native="to2_1">科室</el-menu-item>
                <el-menu-item index="2-2" @click.native="to2_2">楼层</el-menu-item>
                <el-menu-item index="2-3" @click.native="to2_3">负责护士</el-menu-item>
                <el-menu-item index="2-4" @click.native="to2_4">日均费用</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
                <el-menu-item index="3" @click.native="to3"><i class="el-icon-upload"></i>增加住院信息</el-menu-item>
            </el-menu>
        </el-aside>
    <!-- 数据表单 -->
            <el-main>
              <el-container  style="height: 500px; height:100%; border: 1px solid #eee">
            <!--路由占位符-->
            <router-view></router-view>
              </el-container>
            </el-main>
    </el-container>

</el-container>
</template>


<style lang="less" scoped>
.header {
background-color: #9ac7fa;
line-height: 60px;
font-size: 13px;
}

.side {
color: rgb(204, 10, 10);
width: 10%;
}
</style>


<script>
  export default {
    data() {
      const patientItem = {
        patientID: '10001',
        patientName: '杨晶',
        phoneNumber: 18017505143,
        doctorName:'袁时金',
        nurseName:'李芷若',
        roomID: 737 ,
        inDate:'2021-3-1',
        outDate:'2021-7-18'
      };
        const roomItem = {
            roomID:'101',
            departmentName:'骨科',
            bedNum:'4',
            leftNum:'1',
            nurseName:'范冰冰',
            fee:'100'
        };
      return {
        patientData: Array(5).fill(patientItem),
        roomData: Array(5).fill(roomItem)
      };

     
    },

     

    methods:{
        logout(){
            this.$router.push("/login");
        },
        
    }
  };
</script>