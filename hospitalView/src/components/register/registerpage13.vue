<template>
<el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <el-main>
    <el-form ref="search11Ref" :model="patientNameSearch" :rules="searchRules" label-width="0px" class="search_form">
                <!-- 搜索框 -->
                    <el-form-item prop="name">
                    <el-input v-model="patientNameSearch.name"   prefix-icon="el-icon-zoom-in" style="width:70%;"></el-input>
                    <el-button type="primary" @click="search" style="margin-left:20px;">搜索</el-button>          
                    </el-form-item>
                </el-form>
  <el-table
    :data="patientData"
    style="width: 100%">

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
      <template #default="scope">
        <el-button
          size="mini"
          type="primary"
          @click="getpatientInfo(scope.$index, scope.row)">选中</el-button>
      </template>
    </el-table-column>
  </el-table>

<br/>
  <el-form ref="form" :model="forme" label-width="80px">
  <el-form-item label="科室">
    <el-select v-model="forme.departmentID" placeholder="请选择科室">
      <el-option label="内科" value="inner"></el-option>
      <el-option label="外科" value="outer"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </el-form-item>
</el-form>

    </el-main>
</el-container>

</template>


<script src="http://unpkg.com/axios/dist/axios.min.js"></script>
<script>
const axios = require('axios');
  export default {
    data() {
      return {
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
        }
      };
    },
    methods: {
        async search(){
          const { data: res } =await this.$http.get('outPatient', { params: { name: this.patientNameSearch.name}})
            console.log(res.data)
            // 将data属性重命名为res
            this.patientData=res.data
            // console.log(this.patientData)
            },
        
        getpatientInfo(index, row) {
          // console.log(index, row);
          // console.log(row.age);
          this.temp.PATIENT_NAME=row.patienT_NAME,
          this.temp.PATIENT_ID=row.patienT_ID
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
        }
        }
    }
</script>
