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
                  <div class="text item">
                    这是第一条公告
                  </div>
                  <div class="text item">
                    这是第二条公告
                  </div>
                  <div class="text item">
                    这是第三条公告
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