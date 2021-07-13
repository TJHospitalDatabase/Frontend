<template>
<!-- 查询病人信息 -->
<el-container style="height: 500px; height:100%; border: 1px solid #eee">
  <!-- 数据表单 -->
      <el-main>
          <el-page-header @back="goBack" content="查询病人信息">
          </el-page-header>
        <el-input v-model="searchGoal"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                  placeholder="请输入搜索信息" ></el-input>
      <el-button icon="el-icon-search" circle @click="frontSearch" style="margin-left:20px;"></el-button>
        <el-button type="primary" plain  @click="dialog = true" 
        style="margin-top:20px; margin-bottom:20px; margin-left:20px;"
        >高级筛选</el-button>

      <el-drawer
          title="可选搜索依赖项"
          :before-close="handleClose"
          :visible.sync="dialog"
          direction="ltr"
          custom-class="demo-drawer"
          ref="drawer"
        >
          <div class="demo-drawer__content">
            <el-form ref="searchRef" :model="queryPatient" 
            :rules="searchPatientFormRules"
            label-width="0px" class="search_form">
          <!-- 搜索框 -->
            <el-form-item prop="patient_name">
            病人姓名：
            <el-input v-model="queryPatient.patienT_NAME"   prefix-icon="el-icon-zoom-in"  
                placeholder="请输入病人姓名" ></el-input>
            </el-form-item>

            <el-form-item prop="nurse_name">
            护士姓名：
            <el-input v-model="queryPatient.nursE_NAME"   prefix-icon="el-icon-zoom-in" 
                placeholder="请输入护士姓名" ></el-input>
            </el-form-item>

            <el-form-item prop="doctor_name">
            医生姓名：
            <el-input v-model="queryPatient.doctoR_NAME"   prefix-icon="el-icon-zoom-in" 
                placeholder="请输入医生姓名"></el-input>
            </el-form-item>

            <el-form-item prop="room_id">
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

      <el-table :data="patientList.slice((currentPage-1)*pageSize,currentPage*pageSize)">
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

      <!-- 分页器 -->
      <div class="block" style="margin-top:15px;">
          <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" 
          :current-page="currentPage" 
          :page-sizes="[2,5,10,20]" 
          :page-size="pageSize" 
          layout="total, sizes, prev, pager, next, jumper" 
          :total="patientList.length">
          </el-pagination>
        </div>
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
        :rules="editPatientFormRules"
      >
        <el-form-item label="编号" prop="patienT_ID">
          <el-input v-model="editForm.patienT_ID" disabled></el-input>
        </el-form-item>
        <el-form-item label="房号" prop="rooM_ID">
          <el-input v-model="editForm.rooM_ID" @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editForm.phone" @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item label="出院日期" prop="aischargE_DATE">
          <el-date-picker type="date" placeholder="选择日期" @input="change($event)"
           v-model="editForm.aischargE_DATE"   value-format="yyyy-MM-dd"
          style="width: 100%;"></el-date-picker>
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
      // 自定义手机号规则
      var checkMobile = (rule, value, callback) => {
        const regMobile = /^1[34578]\d{9}$/
        if (regMobile.test(value)) {
          return callback()
        }
        // 返回一个错误提示
        callback(new Error('请输入合法的手机号码'))
      }  

      return {
        fmt:'',
        searchGoal:'',
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 2, // 每页的数据条数

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
        editForm: {},

        //表单输入验证
        searchPatientFormRules:{
          patienT_NAME:[
            { min: 2, max: 5, message: '请输入合法姓名', trigger: 'blur'},
            { type:'string', message: '请输入合法姓名', trigger: 'blur'},
          ],
          nursE_NAME:[
            { min: 2, max: 5, message: '请输入合法姓名', trigger: 'blur'},
            { type:'string', message: '请输入合法姓名', trigger: 'blur'},
          ],
          doctoR_NAME:[
            { min: 2, max: 5, message: '请输入合法姓名', trigger: 'blur'},
            { type:'string', message: '请输入合法姓名', trigger: 'blur'},
          ],
          rooM_ID:[
            { min: 2, max: 4, message: '请输入正确的房间号', trigger: 'blur'},
          ]
        },

        editPatientFormRules:{
          rooM_ID:[
            { required: true, message: '请输入房间号', trigger: 'blur' },
            { min: 2, max: 4, message: '请输入正确的房间号', trigger: 'blur'},
          ],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: checkMobile, trigger: 'blur' }
          ],
        },

      };
    },

    created () {
      this.getPatientList()
      },  

    methods:{
      // 模糊搜索
      frontSearch () {
        const searchGoal = this.searchGoal
        if (searchGoal) {
          // filter() 方法过滤
          this.patientList = this.patientList.filter(data => {
              return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置
              return String(data[key]).toLowerCase().indexOf(searchGoal) > -1
            })
          })
        }
        console.log(this.patientList)
      },

        async getPatientList () {
          const { data: res } =await this.$http.post('patientinhospital', this.queryPatient)
          //console.log(res.data)
          this.patientList=res.data
        },
        search(){
          console.log('搜索病人的依赖项为：')
            console.log(this.queryPatient)
            this.getPatientList()
        },
       
          // 出现编辑信息的对话框，展示要编辑的病人信息
        async showEditDialog (editSampleP) {
          //const { data: res } = await this.$http.post('patientinhospital', {patienT_ID: editID})
          this.editDialogVisible = true
          this.editForm.patienT_ID = editSampleP.patienT_ID
          this.editForm.phone = editSampleP.phone
          this.editForm.rooM_ID = editSampleP.rooM_ID
          this.editForm.aischargE_DATE = editSampleP.aischargE_DATE
          //this.editForm = editSampleP
          console.log('要编辑的病人的原信息为：')
          console.log(this.editForm)      
        },

          // 填写后修改信息
          async editPatient () {
            //this.editForm.aischargE_DATE = fmt
            console.log('填写的新信息信息为：')
            console.log(this.editForm)
            const { data: res } = await this.$http.put('patientinhospital', this.editForm)
            console.log('后端对此put请求的返回结果：')
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
              const { data: res } = await this.$http.delete('patientinhospital' , {params:{patienT_ID:removeId}} )
              console.log('要删除的病人id是：')
              console.log(removeId)
              console.log('后端对此delete请求的返回结果：')
              console.log(res)
              // if (res.meta.status !== 0000) return this.$message.error('删除病人失败！')
              this.$message.success('删除病人成功！')
          },

        change(e){
          this.$forceUpdate()
        },
        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
            this.currentPage = 1;
            this.pageSize = val;
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.currentPage = val;
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

