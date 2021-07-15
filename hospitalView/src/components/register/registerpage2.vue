<template>
  <el-card>
  <el-table
    :data="patientData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    style="width: 100%;" stripe border>

    <el-table-column prop="registratioN_ID"
      label="挂号单ID">
      <template #default="scope">
          <p>{{ scope.row.registratioN_ID }}</p>
      </template>
    </el-table-column>
    
    <el-table-column prop="patienT_ID"
      label="病人ID">
      <template slot-scope="scope">
          <p>{{ scope.row.patienT_ID }}</p>
      </template>
    </el-table-column>

    <el-table-column prop="depT_NAME"
      label="科室">
      <template slot-scope="scope">
          <p>{{ scope.row.depT_NAME }}</p>
      </template>
    </el-table-column>
    
    <el-table-column prop="doctoR_ID"
      label="医生ID">
      <template slot-scope="scope">
          <p>{{ scope.row.doctoR_ID }}</p>
      </template>
    </el-table-column>
    
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="mini"
          type="primary"
          @click="select_this(scope.$index, scope.row)">选中</el-button>
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
        departmentIDSearch:{
              DEPT_NAME:''
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
        temp:{

        }
      };
    },
    created(){
      this.search()
    },
    methods: {
        async search(){
          const { data: res } =await this.$http.get('registration', { params: { DEPT_NAME: this.$route.query.dept_name}})
            console.log(res.data)
            // 将data属性重命名为res
            this.patientData=res.data
            // console.log(this.patientData)
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
        async select_this(index, row) {
          console.log(index, row);
          this.temp.registratioN_ID=row.registratioN_ID
          const { data: res } = await this.$http.get('registration/set',
                {
                  params:{
                  REGISTRATION_ID: this.temp.registratioN_ID,
                  DOCTOR_ID: this.$route.query.id}
                  }
                )          
          console.log(this.$route.query.id)
          console.log(res)
          alert("选中操作成功")
          this.search()
          // 这里是返回的信息
        }
          },
        }
</script>

<style lang="less" scoped>
.el-table{
  width:100%;
}
</style>