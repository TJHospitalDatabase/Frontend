<template>
  <el-container style="height:100%;">
    <!-- 头部 -->
    <el-header class="header" >
      <div>
      <img src="../assets/hosipital.jpg" style="margin-left: 15px"  alt />
      <span style=" font-weight:bold;">上海市红十字第八人民医院管理系统</span>
      </div>

      <div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="goBack"><i class="el-icon-copy-document" ></i>返回主页</el-dropdown-item>
            <el-dropdown-item @click.native="logout"><i class="el-icon-switch-button"></i>退出账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <span style="font-size: 15px">{{name}}</span>
      </div>
    </el-header>

    <!-- 主体部分 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">
      <!-- 侧边栏 -->
      <el-aside width="200px" >
        <el-menu router @select="selectRouter">
          <el-submenu index="1" v-if="(tokenStr-0)&7">
            <template slot="title" ><i class="el-icon-info"></i>门诊管理</template>

            <el-menu-item-group>
              <template slot="title" v-if="(tokenStr-0)&2">挂号信息</template>
              <el-menu-item index="registerpage11" v-if="(tokenStr-0)&2">病人信息录入</el-menu-item>
              <el-menu-item index="registerpage12" v-if="(tokenStr-0)&2">病人信息查询</el-menu-item>
              <el-menu-item index="registerpage13" v-if="(tokenStr-0)&2">挂号</el-menu-item>
              <el-menu-item index="registerpage14" v-if="(tokenStr-0)&2">挂号单处理</el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <template slot="title" v-if="(tokenStr-0)&4">查询挂号</template>
              <el-menu-item index="registerpage2" :route='{path:"registerpage2", query:{id:id,name:name,dept_name:dept_name}}' v-if="(tokenStr-0)&4">挂号信息查询</el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <template slot="title" v-if="(tokenStr-0)&1">问诊信息</template>
              <el-menu-item index="treated" v-if="(tokenStr-0)&1">问诊信息列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2" v-if="(tokenStr-0)&8">
            <template slot="title" v-if="(tokenStr-0)&8"><i class="el-icon-s-cooperation"></i>药品管理</template>
            <el-menu-item index="drugStore" v-if="(tokenStr-0)&8">药品库管理</el-menu-item>
            <el-menu-item index="prescribe" v-if="(tokenStr-0)&8">开药查询</el-menu-item>
          </el-submenu>

          <el-submenu index="3" v-if="(tokenStr-0)&20">
            <template slot="title" v-if="(tokenStr-0)&20"><i class="el-icon-s-order"></i>单目管理</template>
            <el-menu-item index="Checklist" v-if="(tokenStr-0)&16">检查单管理</el-menu-item>
            <el-menu-item index="Checklist_result" v-if="(tokenStr-0)&16">检查单结果管理</el-menu-item>
            <el-menu-item index="prescription" :route='{path:"prescription", query:{id:id,name:name}}' v-if="(tokenStr-0)&4">处方单开具</el-menu-item>
            <el-menu-item index="examine" :route='{path:"examine", query:{id:id,name:name}}' v-if="(tokenStr-0)&4">检查单开具</el-menu-item>
            <el-menu-item index="hospital" :route='{path:"hospital", query:{id:id,name:name}}' v-if="(tokenStr-0)&4">住院单开具</el-menu-item>
          </el-submenu>

          <el-submenu index="4" v-if="(tokenStr-0)&32">
            <template slot="title" v-if="(tokenStr-0)&32"><i class="el-icon-s-home"></i>住院管理</template>
            <el-menu-item index="searchPatient" v-if="(tokenStr-0)&32">住院病人信息查询</el-menu-item>
            <el-menu-item index="searchRoom" v-if="(tokenStr-0)&32">病床信息查询</el-menu-item>
            <el-menu-item index="nurse_on_duty" v-if="(tokenStr-0)&32">住院护士值班信息</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 数据表单 -->
      <el-main >
        <el-container  style="height: 500px; height:100%; width:100%; border: 1px solid #eee">
          <el-main>
            <!--面包屑导航区 -->
            <el-breadcrumb separator-class="el-icon-arrow-right" >
              <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{breadContent.first}}</el-breadcrumb-item>
              <el-breadcrumb-item>{{breadContent.second}}</el-breadcrumb-item>
            </el-breadcrumb>
            <!--路由占位符-->
            <transition :name="transitionName">
            <router-view></router-view>
            </transition>
          </el-main>
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

.el-main{
  background-color: #ffffff;
  > .el-contaniner{
  background-color: #ffffff;
  }
}


.el-header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: rgb(65, 86, 145);
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      height: 40px;
    }
    span {
      margin-left: 15px;
    }
  }
}

.el-aside{
  background-color: #e9f3fc;
  > .el-menu{
      background-color: #e9f3fc;
  }
}

</style>


<script>

export default{
  data(){
    return{
      transitionName:'fade',
      id:this.$route.query.id,
      name:this.$route.query.name,
      dept_name:this.$route.query.dept_name,
      breadContent:{
        first:'',
        second:''
      },
      isWelcome:false
    }
  },
  computed:{
    tokenStr:()=>{ return window.sessionStorage.getItem('token')},
  },
  methods:{
    selectRouter(index,indexPath){
      console.log(index);
      console.log(indexPath);
      switch (index) {
        case "registerpage11":
          this.breadContent.first='门诊管理';
          this.breadContent.second='病人信息录入';          
          break;
        case "registerpage12":
          this.breadContent.first='门诊管理';
          this.breadContent.second='病人信息查询';          
          break;
        case "registerpage13":
          this.breadContent.first='门诊管理';
          this.breadContent.second='挂号';        
          break;
        case "registerpage14":
          this.breadContent.first='门诊管理';
          this.breadContent.second='挂号单处理';        
          break;
        case "registerpage2":
          this.breadContent.first='门诊管理';
          this.breadContent.second='挂号单信息查询';        
          break;
        case "treated":
          this.breadContent.first='门诊管理';
          this.breadContent.second='问诊信息列表';        
          break;
        case "drugStore":
          this.breadContent.first='药品管理';
          this.breadContent.second='药品库管理';        
          break;
        case "prescribe":
          this.breadContent.first='药品管理';
          this.breadContent.second='开药查询';        
          break;
        case "Checklist":
          this.breadContent.first='单目管理';
          this.breadContent.second='检查单管理';        
          break;
        case "Checklist_result":
          this.breadContent.first='单目管理';
          this.breadContent.second='检查单结果管理';        
          break;
        case "examine":
          this.breadContent.first='单目管理';
          this.breadContent.second='检查单开具';        
          break;
        case "hospital":
          this.breadContent.first='单目管理';
          this.breadContent.second='住院单开具';        
          break;
        case "prescription":
          this.breadContent.first='单目管理';
          this.breadContent.second='处方单开具';        
          break;
        case "searchPatient":
          this.breadContent.first='住院管理';
          this.breadContent.second='住院病人信息查询';        
          break;
        case "searchRoom":
          this.breadContent.first='住院管理';
          this.breadContent.second='住院病房信息查询';        
          break;
        case "nurse_on_duty":
          this.breadContent.first='住院管理';
          this.breadContent.second='住院护士值班信息';        
          break;
        default:
          break;
      }
      console.log(this.breadContent);
    },
    reset(){
      //console.log(this);
      this.$refs.search11Ref.resetFields();
      return this.$message.success('你成功重置了信息！');
    },
    logout(){
        this.$router.push("/login");
    },
    goBack() {
        this.$router.push({path:"/welcome",query:{id:this.id, name:this.name, dept_name:this.dept_name}});
    },
  }
}
</script>
