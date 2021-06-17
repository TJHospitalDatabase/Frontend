<template>
<!-- 通过负责护士查询病房信息 -->
<el-container>
    <!-- 主体部分 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <!-- 数据表单 -->
            <el-main>
                <el-page-header @back="goBack" content="通过负责护士查询病房信息">
                </el-page-header>
                <el-form ref="search14Ref" :model="patientNameSearch" :rules="searchRules" label-width="0px" class="search_form">
                <!-- 搜索框 -->
                    <el-form-item prop="name">
                    <el-input v-model="patientNameSearch.name"   prefix-icon="el-icon-zoom-in" style="width:70%;"></el-input> 
                    <el-button type="primary" @click="search" style="margin-left:20px;">搜索</el-button>
                    <el-button type="info" @click="reset">重置</el-button>            
                    </el-form-item>
                </el-form>

               <el-table :data="roomData" style="margin-top:20px;">
                    <el-table-column prop="roomID" label="房间号">
                    </el-table-column>
                    <el-table-column prop="departmentName" label="所属科室">
                    </el-table-column>
                    <el-table-column prop="nurseName" label="负责护士">
                    </el-table-column>
                    <el-table-column prop="bedNum" label="总床位数">
                    </el-table-column>
                    <el-table-column prop="leftNum" label="剩余床位数">
                    </el-table-column>
                    <el-table-column prop="fee" label="日均费用">
                    </el-table-column>
                    <el-table-column prop="operate" label="操作">
                    </el-table-column>
                </el-table>
            </el-main>
    </el-container>
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
                    { required: true, message: '请输入护士姓名', trigger: 'blur' }
                ]
            }
      };
    },

     

    methods:{
        reset(){
            //console.log(this);
            this.$refs.search14Ref.resetFields();
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