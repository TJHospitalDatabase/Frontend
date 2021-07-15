
<template>
<el-container>
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">
        <el-main>
          
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>门诊管理</el-breadcrumb-item>
          <el-breadcrumb-item>挂号</el-breadcrumb-item>
          </el-breadcrumb>
          <el-card>
            <el-form ref="search11Ref" :model="patientNameSearch" :rules="searchRules" label-width="0px" class="search_form">
                        <!-- 搜索框 -->
                            <el-form-item prop="name">
                            <el-input v-model="patientNameSearch.name"   prefix-icon="el-icon-zoom-in" style="width:70%;"></el-input>
                            <el-button type="primary" @click="search" style="margin-left:20px;">搜索</el-button>          
                            </el-form-item>
                        </el-form>
            <el-table
              :data="patientData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              style="width: 100%" stripe border>

              <el-table-column prop="patienT_ID"
                label="病人ID">
                <template #default="scope">
                    <p>{{ scope.row.patienT_ID }}</p>
                </template>
              </el-table-column>
              
              <el-table-column prop="patienT_NAME"
                label="名字">
                <template slot-scope="scope">
                    <p>{{ scope.row.patienT_NAME }}</p>
                </template>
              </el-table-column>

              <el-table-column prop="gender"
                label="性别">
                <template slot-scope="scope">
                    <p>{{ scope.row.gender }}</p>
                </template>
              </el-table-column>
              
              <el-table-column prop="age"
                label="年龄">
                <template slot-scope="scope">
                    <p>{{ scope.row.age }}</p>
                </template>
              </el-table-column>
              
              <el-table-column prop="phone"
                label="联系方式">
                <template slot-scope="scope">
                    <p>{{ scope.row.phone }}</p>
                </template>
              </el-table-column>
              
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="showEditDialog(scope.$index, scope.row)">选中</el-button>
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
          </el-card>
        </el-main>

         <el-dialog
            title="挂号单"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editDialogClosed"
            :append-to-body = true>
            <el-form >
            <el-form-item label="病人ID:"  >
              {{temp.PATIENT_ID}}
            </el-form-item>
            <el-form-item label="姓名:"  >
              {{temp.PATIENT_NAME}}
            </el-form-item>
            <el-form-item label="科室选择" >
              <el-select v-model="forme.departmentID" placeholder="请选择科室">
              <el-option label="内科" value="inner"></el-option>
              <el-option label="外科" value="outer"></el-option>
            </el-select>
            </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button @click="onSubmit" type="primary" >确 定</el-button>
          </span>
        </el-dialog>
        
    </el-container>
</el-container>
</template>


<script src="http://unpkg.com/axios/dist/axios.min.js"></script>
<script>
const axios = require('axios');
  export default {
    data() {
      return {
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        pageSize: 5, // 每页的数据条数
        editDialogVisible: false,
        patientNameSearch:{
              name:''
            },
        searchRules: {
                name: [
                    { required: true, message: '请输入病人姓名', trigger: 'blur' }
                ]
            },
        patientData: [{
          
        },
        ],
        forme:{
          departmentID:''
        },
        // temp临时存放选中的数据
        temp:{
            PATIENT_NAME:"",
            PATIENT_ID:""
        },
      };
    },
    methods: {
      // 监听修改对话框的关闭事件
        editDialogClosed () {
          this.$refs.editFormRef.resetFields()
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
       // 编辑信息
        showEditDialog (index, row) {
          this.editDialogVisible = true
          console.log(index, row)
          this.temp.PATIENT_NAME=row.patienT_NAME,
          this.temp.PATIENT_ID=row.patienT_ID
        },
        async search(){
          const { data: res } =await this.$http.get('outPatient', { params: { name: this.patientNameSearch.name}})
            console.log(res.data)
            // 将data属性重命名为res
            this.patientData=res.data
            // console.log(this.patientData)
            },
        
        async onSubmit()
        {
            this.forme.AGE=this.forme.AGE-0;
            const { data: res } = await this.$http.put('registration',
                {
                  PATIENT_NAME: this.temp.PATIENT_NAME,
                  PATIENT_ID: this.temp.PATIENT_ID,
                  DEPT_NAME: this.forme.departmentID,
                  }
                )
          console.log(res.data[0])
          // 这里是返回的信息
          this.$alert('提交成功', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
            });
        }
        }
    }
</script>




