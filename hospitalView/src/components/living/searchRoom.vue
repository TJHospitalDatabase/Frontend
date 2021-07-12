<template>
<!-- 查询病房信息 -->
<el-container>
    <!-- 主体部分 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <!-- 数据表单 -->
            <el-main>
                <el-page-header @back="goBack" content="查询病房信息">
                </el-page-header>

                <el-form ref="searchRef" :model="queryRoom"  label-width="0px" class="search_form">
                <!-- 搜索框 -->
                    <el-form-item >
                    <el-input v-model="queryRoom.nurse"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入负责护士姓名" ></el-input>
                    </el-form-item >

                    <el-form-item >
                    <el-input v-model="queryRoom.deptName"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入科室名称" ></el-input>
                    </el-form-item>

                    <el-form-item >
                    <el-input v-model="queryRoom.uB"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入最高价格" ></el-input>
                    </el-form-item>

                    <el-form-item >
                    <el-input v-model="queryRoom.lB"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入最低价格" ></el-input>
                    </el-form-item>

                    <el-button type="primary" @click="search" style="margin-left:20px;">搜索</el-button>
                    <el-button type="info" @click="reset">重置</el-button>   
                </el-form>

                <el-table :data="roomList">
                    <el-table-column prop="roomID" label="房间号">
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
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          icon="el-icon-edit"
                          size="mini"
                          circle
                          @click="showEditDialog(scope.row.id)"
                        ></el-button>
                        </template>
                      </el-table-column>
                </el-table>
            </el-main>

      <!-- 修改病房的对话框 -->
      <el-dialog
        title="修改病人信息"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed"
      >
      <!-- 内容主体 -->
      <el-form
        :model="editForm"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="病人ID">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="房号" >
          <el-input v-model="editForm.room"></el-input>
        </el-form-item>
        <el-form-item label="出院日期">
          <el-input v-model="editForm.outData"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoom">确 定</el-button>
      </span>
    </el-dialog>
          
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
        roomList:[],
        queryRoom:{
          nurse:'',
          deptName:'',
          uB:1000,
          lB:0
          },

        editDialogVisible: false,
        editForm: {},
      };
    },


    created () {
      this.getRoomList()
    },  

    methods:{
        async getRoomList () {
          const { data: res } =await this.$http.post('room', this.queryRoom)
          console.log(res.data)
          this.roomList=res.data
        },
        reset(){
            this.$refs.searchRef.resetFields();
            return this.$message.success('你成功重置了信息！');
        },
        search(){
            console.log(this.queryRoom)
        },
        goBack() {
        this.$router.push("/home");
        },
        
        // 编辑病房信息
        async showEditDialog (editId) {
          const { data: res } = await this.$http.post('patientinhospital', {id:editId})
          this.editForm = res.data
          this.editDialogVisible = true
        },


    // 监听修改病房对话框的关闭事件
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改病房信息
    async editRoom () {
        //const { data: res } = await this.$http.put('patientinhospital', this.editForm )
        // 隐藏添加病房对话框
        this.editDialogVisible = false
        this.$message.success('更新用户信息成功！')
        this.getRoomList()
      },
    }
  };
</script>