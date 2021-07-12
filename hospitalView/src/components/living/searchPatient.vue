<template>

<!-- 通过病人姓名查询病人信息 --> 
       <el-container style="height: 500px; height:100%; border: 1px solid #eee">
        <!-- 数据表单 -->
            <el-main>
                <el-page-header @back="goBack" content="查询病人信息">
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
                   <el-form ref="searchRef" :model="queryPatient"  label-width="0px" class="search_form">
                <!-- 搜索框 -->
                    <el-form-item>
                    病人姓名：
                    <el-input v-model="queryPatient.name"   prefix-icon="el-icon-zoom-in"  
                        placeholder="请输入病人姓名" ></el-input>
                    </el-form-item>

                    <el-form-item>
                    护士姓名：
                    <el-input v-model="queryPatient.nurse"   prefix-icon="el-icon-zoom-in" 
                        placeholder="请输入护士姓名" ></el-input>
                    </el-form-item>

                    <el-form-item>
                    医生姓名：
                    <el-input v-model="queryPatient.doctor"   prefix-icon="el-icon-zoom-in" 
                        placeholder="请输入医生姓名" ></el-input>
                    </el-form-item>

                    <el-form-item>
                    所属病房：
                    <el-input v-model="queryPatient.room"   prefix-icon="el-icon-zoom-in" 
                        placeholder="请输入房间号" ></el-input>
                    </el-form-item>
                </el-form>
                    <div class="demo-drawer__footer" style="margin-left:20px;">
                      <el-button @click="cancelForm">取 消</el-button>
                      <el-button type="primary" @click="$refs.drawer.closeDrawer(),search()"  :loading="loading">提 交</el-button>
                    </div>
                  </div>
                </el-drawer>

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
                          @click="showEditDialog(scope.row.name)"
                        ></el-button>
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          size="mini"
                          circle
                          @click="removePatient(scope.row.id)"
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
              <el-form-item label="病人姓名">
                <el-input v-model="editForm.name" disabled></el-input>
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
              <el-button type="primary" @click="editPatient">确 定</el-button>
            </span>
          </el-dialog>


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

        queryPatient:{
            name:'',
            doctor:'',
            nurse:'',
            room:'',
        },
     
        patientList:[],

        editDialogVisible: false,
        editForm: { },

      };
    },

    created () {
      this.getPatientList()
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



        async getPatientList () {
          const { data: res } =await this.$http.post('patientinhospital', this.queryPatient)
          console.log(res.data)
          this.patientList=res.data
        },
        search(){
            console.log(this.queryPatient)
            this.getPatientList()
        },

        goBack() {
        this.$router.push("/home");
        },
        
           // 编辑用户信息
    async showEditDialog (editName) {
      const { data: res } = await this.$http.post('patientinhospital', {name:editName})
      this.editForm = res.data
      this.editDialogVisible = true
    },


    // 监听修改用户对话框的关闭事件
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息
    async editPatient () {
        //const { data: res } = await this.$http.put('patientinhospital', this.editForm )
        // 隐藏添加用户对话框
        this.editDialogVisible = false
        this.$message.success('更新用户信息成功！')
        this.getPatientList()

    },

        async removePatient (removeId) {
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
          const { data: res } = await this.$http.delete('patientinhospital' , {id:removeId})
          console.log(removeId)
          console.log(res)
          // if (res.meta.status !== 0000) return this.$message.error('删除用户失败！')
          this.$message.success('删除用户成功！')

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

