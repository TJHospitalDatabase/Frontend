<template>
        <!-- 主体部分 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">      
    <!-- 数据表单 -->
            <el-main>
              <h2><img src='../../assets/hosipital.jpg' height="50px"> 欢迎来到住院管理界面！</h2>
              <h3>病人信息列表</h3>
                <el-table :data="patientList">
                    <el-table-column prop="id" label="编号" width="140">
                    </el-table-column>
                    <el-table-column prop="name" label="病人姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="phone" label="联系方式">
                    </el-table-column>
                    <el-table-column prop="room" label="房间号">
                    </el-table-column>
                    <el-table-column prop="doctor" label="主治医师">
                    </el-table-column>
                    <el-table-column prop="nurse" label="负责护士">
                    </el-table-column>
                    <el-table-column prop="inData" label="入院日期">
                    </el-table-column>
                    <el-table-column prop="outData" label="出院日期">
                    </el-table-column>
                </el-table>
              <h3>病房信息列表</h3>
                <el-table :data="roomList">
                    <el-table-column prop="room" label="房间号">
                    </el-table-column>
                    <el-table-column prop="deptName" label="所属科室">
                    </el-table-column>
                    <el-table-column prop="nurse" label="负责护士">
                    </el-table-column>
                    <el-table-column prop="allBed" label="总床位数">
                    </el-table-column>
                    <el-table-column prop="remainBed" label="剩余床位数">
                    </el-table-column>
                    <el-table-column prop="dailyCost" label="日均费用">
                    </el-table-column>
                </el-table>
            </el-main>
    </el-container>
</template>

<script>
  export default {
    data() {
      return {
        patientList:[],
        roomList:[],
      };
    },

   created () {
    this.getRoomList(),
    this.getPatienList()
  },    

    methods:{
      async getRoomList () {
      const { data: res } = await this.$http.get('/room')
      console.log(res.data)
      this.roomList=res.data
    },
     async getPatienList () {
         const { data: res } = await this.$http.get('/patientinhospital')
          console.log(res.data)
          this.patientList=res.data
        },
        logout(){
            this.$router.push("/login");
        },
    }
  };
</script>