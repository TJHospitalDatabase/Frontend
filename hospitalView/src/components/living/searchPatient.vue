<template>

<!-- 通过病人姓名查询病人信息 --> 
       <el-container style="height: 500px; height:100%; border: 1px solid #eee">
        <!-- 数据表单 -->
            <el-main>
                <el-page-header @back="goBack" content="查询病人信息">
                </el-page-header>
              <el-input v-model="queryPatient.patienT_NAME"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入病人姓名" ></el-input>
            <el-button type="primary" @click="search()" style="margin-left:20px;">提 交</el-button>
              <el-button type="primary"  @click="dialog = true" 
              style="margin-top:20px; margin-bottom:20px; margin-left:20px;"
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
                    <el-input v-model="queryPatient.patienT_NAME"   prefix-icon="el-icon-zoom-in"  
                        placeholder="请输入病人姓名" ></el-input>
                    </el-form-item>

                    <el-form-item>
                    护士姓名：
                    <el-input v-model="queryPatient.nursE_NAME"   prefix-icon="el-icon-zoom-in" 
                        placeholder="请输入护士姓名" ></el-input>
                    </el-form-item>

                    <el-form-item>
                    医生姓名：
                    <el-input v-model="queryPatient.doctoR_NAME"   prefix-icon="el-icon-zoom-in" 
                        placeholder="请输入医生姓名" ></el-input>
                    </el-form-item>

                    <el-form-item>
                    所属病房：
                    <el-input v-model="queryPatient.rooM_ID"   prefix-icon="el-icon-zoom-in" 
                        placeholder="请输入房间号" ></el-input>
                    </el-form-item>
                </el-form>
                    <div class="demo-drawer__footer" style="margin-left:20px;">
                      <el-button @click="cancelForm">取 消</el-button>
                      <el-button type="primary" @click="$refs.drawer.closeDrawer()"  :loading="loading">提 交</el-button>
                    </div>
                  </div>
                </el-drawer>

                <el-table :data="patientList">
                  <el-table-column prop="index" label="序号" width="100" type="index">
                    </el-table-column>  
                    <el-table-column prop="patienT_ID" label="编号" width="140">
                    </el-table-column>  
                    <el-table-column prop="patienT_NAME" label="病人姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="phone" label="联系方式">
                    </el-table-column>
                    <el-table-column prop="rooM_ID" label="房间号">
                    </el-table-column>
                    <el-table-column prop="doctoR_NAME" label="主治医师">
                    </el-table-column>
                    <el-table-column prop="nursE_NAME" label="负责护士">
                    </el-table-column>
                    <el-table-column prop="admissioN_DATE" label="入院日期">
                    </el-table-column>
                    <el-table-column prop="aischargE_DATE" label="出院日期">
                    </el-table-column>
                     <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          icon="el-icon-edit"
                          size="mini"
                          circle
                          @click="showEditDialog(scope.row)"
                        ></el-button>
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          size="mini"
                          circle
                          @click="removePatient(scope.row.patienT_ID)"
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
            <el-form
              :model="editForm"
              ref="editFormRef"
              label-width="70px"
            >
              <el-form-item label="姓名">
                <el-input v-model="editForm.patienT_NAME" disabled></el-input>
              </el-form-item>
              <el-form-item label="房号" >
                <el-input v-model="editForm.rooM_ID"></el-input>
              </el-form-item>
              <el-form-item label="电话" >
                <el-input v-model="editForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="出院日期">
                <el-input v-model="editForm.aischargE_DATE"></el-input>
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
            patienT_ID:'',
            patienT_NAME:'',
            doctoR_NAME:'',
            nursE_NAME:'',
            rooM_ID:'',
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
        async getPatientList () {
          const { data: res } =await this.$http.post('patientinhospital', this.queryPatient)
          //console.log(res.data)
          this.patientList=res.data
        },
        search(){
            console.log(this.queryPatient)
            this.getPatientList()
        },
       
           // 出现编辑信息的对话框，展示要编辑的病人信息
        async showEditDialog (editSampleP) {
          //const { data: res } = await this.$http.post('patientinhospital', {patienT_ID: editID})
          this.editDialogVisible = true
          this.editForm = editSampleP
          //this.editForm = res.data[0]
          console.log(this.editForm)      
        },

          // 填写后修改信息
          async editPatient () {
              const { data: res } = await this.$http.put('patientinhospital', this.editForm )
              console.log(res)
              this.editDialogVisible = false
              this.$message.success('更新病人信息成功！')
              this.getPatientList()
          },

          async removePatient (removeId) {
              const confirmResult = await this.$confirm(
                '此操作将永久删除该病人, 是否继续?',
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
              const { data: res } = await this.$http.delete('patientinhospital' , {patienT_ID:removeId})
              console.log(removeId)
              console.log(res)
              // if (res.meta.status !== 0000) return this.$message.error('删除病人失败！')
              this.$message.success('删除病人成功！')
          },



        // 监听修改对话框的关闭事件
        editDialogClosed () {
          this.$refs.editFormRef.resetFields()
        },     
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
            this.search();
            })
            .catch(_ => {});
        },
        cancelForm() {
          this.loading = false;
          this.dialog = false;
          clearTimeout(this.timer);
        },        
        goBack() {
        this.$router.push("/home");
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

