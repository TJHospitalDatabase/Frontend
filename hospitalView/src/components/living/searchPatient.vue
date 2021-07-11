<template>
<!-- 查询病人信息 --> 
       <el-container style="height: 500px; height:100%; border: 1px solid #eee">
        <!-- 数据表单 -->
            <el-main>
                <el-page-header @back="goBack" content="查询病人信息">
                </el-page-header>
                <el-form ref="searchRef" :model="queryPatient"  label-width="0px" class="search_form">
                <!-- 搜索框 -->
                    <el-form-item >
                    <el-input v-model="queryPatient.name"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入病人姓名" ></el-input>
                    </el-form-item >

                    <el-form-item >
                    <el-input v-model="queryPatient.nurse"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入护士姓名" ></el-input>
                    </el-form-item>

                    <el-form-item >
                    <el-input v-model="queryPatient.doctor"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入医生姓名" ></el-input>
                    </el-form-item>

                    <el-form-item >
                    <el-input v-model="queryPatient.room"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入房间号" ></el-input>
                    </el-form-item>

                    <el-button type="primary" @click="search" style="margin-left:20px;">搜索</el-button>
                    <el-button type="info" @click="reset">重置</el-button>   

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
                     <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          icon="el-icon-edit"
                          size="mini"
                          circle
                          @click="editPatient(scope.row.id)"
                        ></el-button>
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          size="mini"
                          circle
                          @click="removePtient(scope.row.id)"
                        ></el-button>
                      </template>
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
        queryPatient:{
            name:'',
            doctor:'',
            nurse:'',
            room:'',
        },
     
        patientList:[
         
        ],

      };
    },

    created () {
      this.getPatienList()
      },  

    methods:{
        async getPatienList () {
          const { data: res } =await this.$http.post('patientinhospital', this.queryPatient)
          console.log(res.data)
          this.patientList=res.data
        },
        search(){
            console.log(this.queryPatient)
            this.getPatienList()
        },
        reset(){
            //console.log(this);
            this.$refs.searchRef.resetFields();
            return this.$message.success('你成功重置了信息！');
        },
        goBack() {
        this.$router.push("/home");
        },
        editPatient(id){
            console.log(id)
        },
        removePatient(id){
            console.log(id)
        },
        async removePatient (id) {
          const confirmResult = await this.$confirm(
            '此操作将永久删除该用户, 是否继续?',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).catch(err => err)
          // 点击确定 返回值为：confirm
          // 点击取消 返回值为： cancel
          if (confirmResult !== 'confirm') {
            return this.$message.info('已取消删除')
          }
          const { data: res } = await this.$http.delete('patientinhospital' + id)
          // if (res.meta.status !== 0000) return this.$message.error('删除用户失败！')
          this.$message.success('删除用户成功！')
          this.getUserList()
    },
    }
  };
</script>