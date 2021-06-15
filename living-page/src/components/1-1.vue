<template>

<!-- 通过病人姓名查询病人信息 --> 
       <el-container style="height: 500px; height:100%; border: 1px solid #eee">
        <!-- 数据表单 -->
            <el-main>
                <el-page-header @back="goBack" content="通过病人姓名查询病人信息">
                </el-page-header>
                <el-form ref="search11Ref" :model="patientNameSearch" :rules="searchRules" label-width="0px" class="search_form">
                <!-- 搜索框 -->
                    <el-form-item prop="name">
                    <el-input v-model="patientNameSearch.name"   prefix-icon="el-icon-zoom-in"></el-input>             
                    </el-form-item>
                    <!-- 按钮 -->
                    <el-form-item class="btns">
                        <el-button type="primary" @click="search">搜索</el-button>
                        <el-button type="info" @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>

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
        patientNameSearch:{
            name:''
        },
        searchRules: {
                name: [
                    { required: true, message: '请输入病人姓名', trigger: 'blur' }
                ]
            }
      };
    },

     

    methods:{
        reset(){
            //console.log(this);
            this.$refs.search11Ref.resetFields();
            return this.$message.success('你成功重置了信息！');
        },
        search(){
            //this.$router.push("/home");
        },
        goBack() {
        console.log('go back');
      }
    }
  };
</script>