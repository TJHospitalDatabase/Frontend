<template>
<!-- 通过费用查询信息 -->
<el-container>
    <!-- 主体部分 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <!-- 数据表单 -->
            <el-main>
                <el-page-header @back="goBack" content="通过费用查询病房信息" style="margin:10px;">
                </el-page-header>
                <div style="margin:10px; margin-top:30px;">请选择费用范围（单位：元/天）</div>
                 <div class="block">
                    <el-slider
                    v-model="value"
                    range
                    show-stops
                    :step="50"
                    :max="800">
                    </el-slider>
                 </div>
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
        },
         value: [100, 400],
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