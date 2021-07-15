<template>
          <el-card>
          <el-form ref="search11Ref" :model="registrationIDSearch" :rules="searchRules" label-width="0px" class="search_form">
                <!-- 搜索框 -->
                    <el-form-item prop="name">
                    <el-input v-model="registrationIDSearch.patienT_NAME"   prefix-icon="el-icon-zoom-in" style="width:70%;"></el-input>
                    <el-button type="primary" @click="search" style="margin-left:20px;">搜索</el-button>            
                    </el-form-item>
                </el-form>
  <el-table
    :data="patientData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    style="width: 100%" stripe border>

    <el-table-column prop="registratioN_ID"
      label="挂号单ID">
      <template #default="scope">
          <p>{{ scope.row.registratioN_ID }}</p>
      </template>
    </el-table-column>
    
    <el-table-column prop="patienT_ID"
      label="病人ID">
      <template #default="scope">
          <p>{{ scope.row.patienT_ID }}</p>
      </template>
    </el-table-column>

    <el-table-column prop="patienT_NAME"
      label="病人姓名">
      <template #default="scope">
          <p>{{ scope.row.patienT_NAME }}</p>
      </template>
    </el-table-column>

    <el-table-column prop="depT_NAME"
      label="科室">
      <template #default="scope">
          <p>{{ scope.row.depT_NAME }}</p>
      </template>
    </el-table-column>
    
    <el-table-column prop="date"
      label="开具日期">
      <template #default="scope">
        <!-- <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span> -->
        <p>{{ scope.row.date }}</p>
      </template>
    </el-table-column>
    
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="mini"
          type="danger"
          @click="showEditDialog(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <div class="block" style="margin-top:15px;">
              <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                :current-page="currentPage" 
                :page-sizes="[1,2,5,10,20]" 
                :page-size="pageSize" 
                layout="total, sizes, prev, pager, next, jumper" 
                :total="patientData.length">
              </el-pagination>
            </div>

  
        <el-dialog
            title="提示"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editDialogClosed"
            :append-to-body = true>
            <el-form>
              <el-form-item>
            <div>此操作将删除该挂号单，是否继续？</div> 
             </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">否</el-button>
            <el-button @click="handleDelete" type="primary" >是</el-button>
              </span>
        </el-dialog>

  </el-card>

</template>

<script>
  export default {
    data() {
      return {
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 5, // 每页的数据条数
        editDialogVisible: false,
        patientData: [{
          registratioN_ID: '',
          patienT_ID: '',
          depT_NAME: '',
          date:'',
          patienT_NAME:'',
          doctoR_ID:''
        }
        ],
        registrationIDSearch:{
            patienT_NAME:''
        },
        searchRules: {
                name: [
                    { required: true, message: '请输入病人姓名', trigger: 'blur' }
                ]
            },
        temp:{
          registratioN_ID:''
        }
      };
    },
    created(){
        this.search()
    },
    methods: {
      editDialogClosed () {
          // this.$refs.editFormRef.resetFields()
        },
      // handleDelete(index, row) {
      //   console.log(index, row);
      // },
      showEditDialog (index, row) {
          this.editDialogVisible = true
          this.temp.registratioN_ID=row.registratioN_ID
          console.log(this.temp.registratioN_ID)
          },
       // 监听修改对话框的关闭事件
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
      async search(){
          const { data: res } =await this.$http.get('registration/find', { params: { PATIENT_NAME: this.registrationIDSearch.patienT_NAME}})
            console.log(res.data)
            // 将data属性重命名为res
            this.patientData=res.data
            // console.log(this.patientData)
            },
      async handleDelete()
      {
          const { data: res } = await this.$http.delete('registration',
            {
              params:{REGISTRATION_ID: this.temp.registratioN_ID}})
          console.log(res)
          // 这里是返回的信息
          if(res.err_code=="0000")
          {
            alert("删除成功")
            const { data: res } =await this.$http.get('registration/find', { params: { PATIENT_NAME: this.registrationIDSearch.patienT_NAME}})
            console.log(res.data)
            // 将data属性重命名为res
            this.patientData=res.data
            // console.log(this.patientData)
            }
          else
          {
            alert("删除失败")
          }
      }
    },
  }
</script>




