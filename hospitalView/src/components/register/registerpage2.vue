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
    :data="patientData"
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

    </el-main>
</el-container>

</template>


<script src="http://unpkg.com/axios/dist/axios.min.js"></script>
<script>
const axios = require('axios');
  export default {
    data() {
      return {
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
