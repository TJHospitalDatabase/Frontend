<template>
        <!-- 主体部分 -->
    <el-container style=" height:100%; border: 1px solid #eee; padding-top: 20px;
    padding-right: 20px;padding-left: 20px; padding-bottom:0px !important;  background-color: rgb(250, 250, 250);">      
    <!-- 数据表单 -->
      <el-main style="padding-bottom:0px !important;">

        <transition :name="trans">
            <div >
              <h2 class="newtext" style="margin-top:0px"> 欢迎来到医院管理系统！</h2>
          </div>
        </transition>

            <div>
            <el-card class="info-card" style="height:220px">
              <div slot="header" class="clearfix" style="margin-left:10px">
                <span class="newtext">个人信息</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="logout">退出登录</el-button>
              </div>
              <!-- 以下为具体内容 -->
              <div style="margin-left:10px">
                <div class="avatar_box" style="float:left;width:75px;height:75px" >
                  <img class="avatar_img" src="../assets/avatar.jpg" >
                </div>

                <div  style="width:400px;  margin-left:150px; color: rgb(65, 86, 145);">
                    <div style="margin-bottom:10px;">用户名: {{this.$route.query.name}}</div>
                    <div style="margin-bottom:10px;">工号：{{this.$route.query.id}}</div>
                    <div style="margin-bottom:10px;">所属科室：{{this.$route.query.dept_name}}</div>
                    <div style="margin-bottom:10px;">当前时间： {{this.getCurrentTime()}}</div>
                </div>
              </div>
              </el-card>
            </div>

              <div style="margin-top:25px">
                <el-carousel indicator-position="outside" style="float:left; width:45%;height:350px">
                   <el-carousel-item >
                       <img src='../assets/doctor.jpg' style="height: 100%; width:100%">
                    </el-carousel-item>
                    <el-carousel-item>
                        <img src='../assets/building.jpg' style="height: 100%; width:100%">
                    </el-carousel-item>  
                    <el-carousel-item>
                        <img src='../assets/host.jpg' style="height: 100%; width:100%">
                    </el-carousel-item>  
                    <el-carousel-item>
                        <img src='../assets/room.jpg' style="height: 100%; width:100%">
                    </el-carousel-item>  
                </el-carousel>
           
                <el-card class="box-card" style="float:right; width:50%; margin-top: 0px;" >
                  <div slot="header" class="clearfix">
                    <span style="color: rgb(65, 86, 145);"><i class="el-icon-info" ></i> 公告栏</span>
                  </div>
                 
                  <div>
                    <el-button type="text" @click="open1">2021年中秋节门诊安排</el-button>
                  </div>
                  <div>
                    <el-button type="text" @click="open2">医院科技成果转化公示</el-button>
                  </div>
                  <div>
                    <el-button type="text" @click="open3">我院召开干部大会，宣布汪海娅任职</el-button>
                  </div>
                  <div>
                    <el-button type="text" @click="open4">关于医院新药引进的通知</el-button>
                  </div>
                  <div>
                    <el-button type="text" @click="open5">新增儿科中医特色门诊</el-button>
                  </div>
                </el-card>
              </div>


            </el-main>
    </el-container>
</template>

<script>
  export default {
    data() {
      return {
        trans:'down',
        value: new Date(),
        show: false,
        gettime:'',
      };
    },

   created () {
    
  },    

    methods:{
    getCurrentTime() {
        //获取当前时间并打印
    　　let yy = new Date().getFullYear();
    　　let mm = new Date().getMonth()+1;
    　　let dd = new Date().getDate();
    　　let hh = new Date().getHours();
    　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
     　　this.gettime = yy+'/'+mm+'/'+dd+' '+hh+':'+mf;
        console.log(this.gettime)  
        return this.gettime;   　　
    },
      logout () {
      this.$router.push('/login')
    },
      open1() {
        this.$alert('根据上海市卫生健康委员会《关于2020年春节假期调整卫生健康系统相关工作安排的通知》要求，急诊、发热门诊24小时照常开放，其他门诊暂停。' , 
        '中秋节门诊安排', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `该公告已阅 `
            }); } });},

      open2() {
        this.$alert('今天下午，院长吴皓教授团队研发的“国产人工听觉脑干植入系统”与企业方上海汉声医疗科技有限公司完成成果转化签约，该成果以专利技术许可的方式进行转让。', 
        '科技成果转化公示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `该公告已阅 `
            }); } });},

      open3() {
        this.$alert('根据工作需要，经竞聘、考察、医院党委会讨论，同意拟任汪海娅同志为本院骨科科主任。按照干部任用有关规定，特进行公示，征求意见。 汪海娅，女，汉族，中共党员，1971年2月7日出生，1995年7月参加工作，博士研究生，主任医师，硕士生导师。', 
        '任职公告', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `该公告已阅 `
            }); } });},

      open4() {
        this.$alert('依据医院药事管理的相关规定，为满足临床科室的用药需求，医院拟开展新药引进工作。临床科室根据临床需要提出新药申请，厂方或医药公司需通过医院外网递交新药申请表，两方资料齐全方可进入新药资料审核流程。', 
        '新药引进的通知', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `该公告已阅 `
            }); } });},

      open5() {
        this.$alert('儿科“冬病夏治”敷贴治疗已得到了广大患儿和家长的认可。今年从2021年7月23日开始，门诊开设一周一次，大暑节气开始增加到每周二次（周二和周五）.', 
        '新增儿科中医特色门诊', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `该公告已阅 `
            }); } });},

    }
  };
</script>

<style>
  .newtext{
    color: rgb(65, 86, 145);
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 500px;
    margin: 0;
  }
  

   .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .info-card {
    width: 100%;
    box-shadow: 0 0 10px rgb(146, 141, 141);
  }

    .avatar_box {
    width: 100px;
    height: 100px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 5px;
    box-shadow: 0 0 10px #ddd;
    background-color: rgb(255, 255, 255);
    margin-bottom: 15px;
  }

  .avatar_img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: rgb(228, 228, 228);
    }
</style>
