<template>


        <!-- 主体部分 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">      
    <!-- 数据表单 -->
            <el-main>
              <h2><img src='../assets/hosipital.jpg' style="height:50px; "> 
              欢迎来到医院管理系统！</h2>

              <div>
                <el-carousel indicator-position="outside" style="position: absolute; width:40%">
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
           
                <el-card class="box-card" style="float:right; width:45%; " >
                  <div slot="header" class="clearfix">
                    <span><i class="el-icon-info"></i> 公告栏</span>
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
        
      };
    },

   created () {
    
  },    

    methods:{
      open1() {
        this.$alert('根据上海市卫生健康委员会《关于2020年春节假期调整卫生健康系统相关工作安排的通知》要求，急诊、发热门诊24小时照常开放，其他门诊暂停。' , 
        '中秋节门诊安排', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `已阅 `
            }); } });},

      open2() {
        this.$alert('今天下午，院长吴皓教授团队研发的“国产人工听觉脑干植入系统”与企业方上海汉声医疗科技有限公司完成成果转化签约，该成果以专利技术许可的方式进行转让。', 
        '科技成果转化公示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `已阅 `
            }); } });},

      open3() {
        this.$alert('根据工作需要，经竞聘、考察、医院党委会讨论，同意拟任汪海娅同志为本院骨科科主任。按照干部任用有关规定，特进行公示，征求意见。 汪海娅，女，汉族，中共党员，1971年2月7日出生，1995年7月参加工作，博士研究生，主任医师，硕士生导师。', 
        '任职公告', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `已阅 `
            }); } });},

      open4() {
        this.$alert('依据医院药事管理的相关规定，为满足临床科室的用药需求，医院拟开展新药引进工作。临床科室根据临床需要提出新药申请，厂方或医药公司需通过医院外网递交新药申请表，两方资料齐全方可进入新药资料审核流程。', 
        '新药引进的通知', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `已阅 `
            }); } });},

      open5() {
        this.$alert('儿科“冬病夏治”敷贴治疗已得到了广大患儿和家长的认可。今年从2021年7月23日开始，门诊开设一周一次，大暑节气开始增加到每周二次（周二和周五）.', 
        '新增儿科中医特色门诊', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `已阅 `
            }); } });},

    }
  };
</script>

<style>

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 500px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>