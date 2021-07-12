
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
      
    </el-table-column>
    
    <el-table-column prop="patienT_NAME"
      label="名字">
      
    </el-table-column>

    <el-table-column prop="gender"
      label="性别">
      
    </el-table-column>
    
    <el-table-column prop="age"
      label="年龄">
      
    </el-table-column>
    
    <el-table-column prop="phone"
      label="联系方式">
      
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
      };
    },
    methods: {
        async search(){
          const { data: res } =await this.$http.get('outPatient', { params: { PATIENT_NAME: this.patientNameSearch.name}})
            console.log(res.data)
            // 将data属性重命名为res
            this.patientData=res.data
            // console.log(this.patientData)
            }
        }
    }
</script>
