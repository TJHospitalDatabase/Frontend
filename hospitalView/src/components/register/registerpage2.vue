<template>
<el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <el-main>
    <el-form ref="search11Ref" :model="departmentIDSearch" :rules="searchRules" label-width="0px" class="search_form">
                <!-- 搜索框 -->
                    <el-form-item prop="name">
                    <el-input v-model="departmentIDSearch.departmentID"   prefix-icon="el-icon-zoom-in" style="width:70%;"></el-input>
                    <el-button type="primary" @click="search" style="margin-left:20px;">搜索</el-button>
                    <el-button type="info" @click="reset">重置</el-button>               
                    </el-form-item>
                </el-form>
  <el-table
    :data="patientData"
    style="width: 100%">

    <el-table-column prop="registrationID"
      label="挂号单ID">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.registrationID }}</p>
        </el-popover>
      </template>
    </el-table-column>
    
    <el-table-column prop="patientID"
      label="病人ID">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.patientID }}</p>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column prop="departmentID"
      label="科室">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.departmentID }}</p>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column prop="DoctorID"
      label="医生ID">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.DoctorID }}</p>
        </el-popover>
      </template>
    </el-table-column>
    
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleDelete(scope.$index, scope.row)">选择</el-button>
          <!-- 此时应该把医生id传上去 -->
      </template>
    </el-table-column>

  </el-table>
    </el-main>
</el-container>
</template>

<script>
  export default {
    data() {
      return {
        patientData: [{
          registrationID: '1234567',
          patientID: '7654321',
          departmentID: '123',
          DoctorID:''
        },
        {
          registrationID: '1234567',
          patientID: '7654321',
          departmentID: '123',
          DoctorID:''
        },
        ],
        departmentIDSearch:{
            departmentID:''
        },
        searchRules: {
                name: [
                    { required: true, message: '请输入科室', trigger: 'blur' }
                ]
            },
      };
    },
    methods: {
      handleDelete(index, row) {
        console.log(index, row);
      }
    //   这里，删除同时应该上传doctor的id
      },
      search(){
            //this.$router.push("/home");
      },
  }
</script>