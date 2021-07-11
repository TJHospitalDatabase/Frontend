<template>
<el-container style="height:100%;">
 <!-- 头部 -->
    <el-header class="header" style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><i class="el-icon-copy-document"></i>个人中心</el-dropdown-item>
          <el-dropdown-item ><i class="el-icon-switch-button"></i>退出账号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span> 院长</span>
    </el-header>

    <!-- 主体部分 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <!-- 侧边栏 -->
        <el-aside width="200px">
            <el-menu router :default-openeds="['']">

            <el-submenu index="1">
                <template slot="title"><i class="el-icon-info"></i>挂号问诊管理</template>
                <el-menu-item-group>
                    <template slot="title">挂号信息</template>
                    <el-menu-item index="" >病人信息录入</el-menu-item>
                    <el-menu-item index="" >病人信息查询</el-menu-item>
                    <el-menu-item index="" >挂号</el-menu-item>
                    <el-menu-item index="" >挂号单处理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">查询挂号</template>
                    <el-menu-item index="" >挂号信息查询</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">问诊信息</template>
                    <el-menu-item index="" >问诊信息列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
                <template slot="title"><i class="el-icon-info"></i>药品管理</template>
                <el-menu-item index="" >药品库管理</el-menu-item>
                <el-menu-item index="" >开药查询</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
                <template slot="title"><i class="el-icon-info"></i>单目管理</template>
                <el-menu-item index="" >处方单管理</el-menu-item>
                <el-menu-item index="" >检查单管理</el-menu-item>
                <el-menu-item index="" >处方单开具</el-menu-item>
                <el-menu-item index="" >检查单开具</el-menu-item>
                <el-menu-item index="" >住院单开具</el-menu-item>
            </el-submenu>

            <el-submenu index="4">
                <template slot="title"><i class="el-icon-info"></i>住院管理</template>
                <el-menu-item-group>
                    <template slot="title">病人信息查询</template>
                    <el-menu-item index="" >通过姓名查询</el-menu-item>
                    <el-menu-item index="" >通过房间号查询</el-menu-item>
                    <el-menu-item index="" >通过医生查询</el-menu-item>
                    <el-menu-item index="" >通过负责护士查询</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">病房信息查询</template>
                    <el-menu-item index="" >通过科室查询</el-menu-item>
                    <el-menu-item index="" >通过负责护士查询</el-menu-item>
                    <el-menu-item index="" >通过日均费用查询</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                <template slot="title">值班信息</template>
                <el-menu-item index="" >护士值班信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>


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
export default{
  methods:{
     reset(){
            //console.log(this);
            this.$refs.search11Ref.resetFields();
            return this.$message.success('你成功重置了信息！');
        },
  }
}
</script>