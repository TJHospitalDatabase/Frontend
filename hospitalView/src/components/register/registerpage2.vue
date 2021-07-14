//搜索框可以去掉                                             
<template>
<el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <el-main>
    <el-form ref="search11Ref" :model="departmentIDSearch" :rules="searchRules" label-width="0px" class="search_form">
                <!-- 搜索框 -->
                    <el-form-item prop="name">
                    <el-input v-model="departmentIDSearch.DEPT_NAME"   prefix-icon="el-icon-zoom-in" style="width:70%;"></el-input>
                    <el-button type="primary" @click="search" style="margin-left:20px;">搜索</el-button>          
                    </el-form-item>
                </el-form>
  <el-table
    :data="patientData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
    style="width: 100%">

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


    </el-main>
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
    methods: {
        async search(){
          const { data: res } =await this.$http.get('registration', { params: { DEPT_NAME: this.departmentIDSearch.DEPT_NAME}})
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
          const { data: res } = await this.$http.post('registration',
                {
                  REGISTRATION_ID: this.temp.registratioN_ID,
                  DOCTOR_ID: "ls"
                  }
                )
          console.log(res.data[0])
          // 这里是返回的信息
        }
          },
        }
</script>
