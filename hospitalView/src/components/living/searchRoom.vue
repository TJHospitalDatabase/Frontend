<template>
<!-- 查询病房信息 -->
<el-container>
    <!-- 主体部分 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <!-- 数据表单 -->
            <el-main>
                <el-page-header @back="goBack" content="查询病房信息">
                </el-page-header>

 <el-button type="primary"  @click="dialog = true" 
              style="margin-top:20px; margin-bottom:20px;"
              >高级搜索</el-button>

              <el-drawer
                  title="可选搜索依赖项"
                  :before-close="handleClose"
                  :visible.sync="dialog"
                  direction="ltr"
                  custom-class="demo-drawer"
                  ref="drawer"
                  >
                  <div class="demo-drawer__content">
                     <el-form ref="searchRef" :model="queryRoom"  label-width="0px" class="search_form">
                <!-- 搜索框 -->
                    <el-form-item >
                      负责护士：
                    <el-input v-model="queryRoom.nurse"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入负责护士姓名" ></el-input>
                    </el-form-item >

                    <el-form-item >
                      所属科室：
                    <el-input v-model="queryRoom.deptName"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入科室名称" ></el-input>
                    </el-form-item>

                    <el-form-item >
                      价格上限：
                    <el-input v-model="queryRoom.uB"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入最高价格" ></el-input>
                    </el-form-item>

                    <el-form-item >
                      价格下限：
                    <el-input v-model="queryRoom.lB"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入最低价格" ></el-input>
                    </el-form-item> 
                </el-form>
                    <div class="demo-drawer__footer" style="margin-left:20px;">
                      <el-button @click="cancelForm">取 消</el-button>
                      <el-button type="primary" @click="$refs.drawer.closeDrawer(),search()"  :loading="loading">提 交</el-button>
                    </div>
                  </div>
                </el-drawer>



              

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

           <!-- 修改病人的对话框 -->
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




<script>
  export default {
    data() {
      return {
      table: false,
      dialog: false,
      loading: false,

      formLabelWidth: '80px',
      timer: null,
  
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
        handleClose(done) {
          if (this.loading) {
            return;
          }
          this.$confirm('确定要提交搜索信息吗？')
            .then(_ => {
              this.loading = true;
              this.timer = setTimeout(() => {
                done();
                // 动画关闭需要一定的时间
                setTimeout(() => {
                  this.loading = false;
                }, 0);
              }, 0);
            })
            .catch(_ => {});
        },

        cancelForm() {
          this.loading = false;
          this.dialog = false;
          clearTimeout(this.timer);
        },
        
        async getRoomList () {
          const { data: res } =await this.$http.post('room', this.queryRoom)
          console.log(res.data)
          this.roomList=res.data
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


    // 监听修改用户对话框的关闭事件
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息
    async editRoom () {
        //const { data: res } = await this.$http.put('patientinhospital', this.editForm )
        // 隐藏添加用户对话框
        this.editDialogVisible = false
        this.$message.success('更新用户信息成功！')
        this.getRoomList()
      },
    }
  };
</script>

<style lang="less" scoped>
  .search_form{
      width:100%;
      margin-top: 30px;
      margin-left: 30px;
  }
  .el-input{
    width:50%;
  }
</style>
