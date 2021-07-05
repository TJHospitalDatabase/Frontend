<template>
        <!-- 主体部分 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">      
    <!-- 数据表单 -->
            <el-main>
              <h2><img src='../assets/hosipital.jpg' height="50px"> 欢迎来到住院管理界面！</h2>
              <h3>病人信息列表</h3>
                <el-table :data="patientData">
                    <el-table-column prop="patientID" label="编号" width="140">
                    </el-table-column>
                    <el-table-column prop="patientName" label="病人姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="phoneNumber" label="联系方式">
                    </el-table-column>
                    <el-table-column prop="roomID" label="房间号">
                    </el-table-column>
                    <el-table-column prop="doctorName" label="主治医师">
                    </el-table-column>
                    <el-table-column prop="nurseName" label="负责护士">
                    </el-table-column>
                    <el-table-column prop="inDate" label="入院日期">
                    </el-table-column>
                    <el-table-column prop="outDate" label="出院日期">
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

      return {
        patientData: Array(3).fill(patientItem),
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
    // async getPatienList () {
    //   const { data: res } = await this.$http.get('/patient')
    //   console.log(res.data)
    //   this.roomList=res.data
    // },
        logout(){
            this.$router.push("/login");
        },
    }
  };
</script>