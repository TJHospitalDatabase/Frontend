<template>
<!-- 通过房间号查询病人信息 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <!-- 数据表单 -->
            <el-main>
                <el-page-header @back="goBack" content="通过房间号查询病人信息">
                </el-page-header>
                <el-form ref="search12Ref" :model="patientRoomSearch" :rules="searchRules" label-width="0px" class="search_form">
                    <!-- 搜索框 -->
                    <el-form-item prop="ID">
                    <el-input v-model="patientRoomSearch.ID"   prefix-icon="el-icon-zoom-in" style="width:70%;"></el-input>
                    <el-button type="primary" @click="search" style="margin-left:20px;">搜索</el-button>
                    <el-button type="info" @click="reset">重置</el-button>               
                    </el-form-item>
                </el-form>

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
            </el-main>
    </el-container>
</template>


<style lang="less" scoped>
.header {
background-color: #9ac7fa;
line-height: 60px;
text-align: right; 
font-size: 13px;
}

.btns{
    display: flex;
    justify-content: flex-end;
}

.side {
color: rgb(204, 10, 10);
width: 10%;
}
.search_form{
    width:100%;
    margin-top: 30px;
}
</style>


<script>
  export default {
    data() {
      return {
        patientRoomSearch:{
            ID:''
        },
        searchRules: {
                ID: [
                    { required: true, message: '请输入房间号', trigger: 'blur' },
                ]
            },
            patientList:[],
      };
    },

     created () {
    this.getPatienList()
  },  

    methods:{
        async getPatienList () {
         const { data: res } = await this.$http.get('/patientinhospital')
          console.log(res.data)
          this.patientList=res.data
        },
        reset(){
            //console.log(this);
            this.$refs.search12Ref.resetFields();
            return this.$message.success('你成功重置了信息！');
        },
        search(){
            //this.$router.push("/home");
        },
        goBack() {
        this.$router.push("/home");
      }
    }
  };
</script>