<template>
<el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <el-main>
    <el-form ref="search11Ref" :model="patientNameSearch" :rules="searchRules" label-width="0px" class="search_form">
                <!-- 搜索框 -->
                    <el-form-item prop="name">
                    <el-input v-model="patientNameSearch.name"   prefix-icon="el-icon-zoom-in" style="width:70%;"></el-input>
                    <el-button type="primary" @click="search" style="margin-left:20px;">搜索</el-button>
                    <el-button type="info" @click="reset">重置</el-button>               
                    </el-form-item>
                </el-form>
  <el-table
    :data="patientData"
    style="width: 100%">

    <el-table-column prop="patientID"
      label="病人ID">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.patientID }}</p>
        </el-popover>
      </template>
    </el-table-column>
    
    <el-table-column prop="name"
      label="名字">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.name }}</p>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column prop="gender"
      label="性别">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.gender }}</p>
        </el-popover>
      </template>
    </el-table-column>
    
    <el-table-column prop="age"
      label="年龄">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.age }}</p>
        </el-popover>
      </template>
    </el-table-column>
    
    <el-table-column prop="contact"
      label="联系方式">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.contact }}</p>
        </el-popover>
      </template>
    </el-table-column>
    
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="getpatientInfo(scope.$index, scope.row)">选中</el-button>
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
           patientNameSearch:{
            name:''
        },
        searchRules: {
                name: [
                    { required: true, message: '请输入病人姓名', trigger: 'blur' }
                ]
            },
        patientData: [{
          
        },
        ],
      };
    },
    methods: {
      search(){
            //this.$router.push("/home");
      },
      getpatientInfo(index, row) {
        console.log(index, row);
      }
    }
  }
</script>