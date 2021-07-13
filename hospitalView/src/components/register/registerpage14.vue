<template>
<el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <el-main>
    <el-form ref="search11Ref" :model="registrationIDSearch" :rules="searchRules" label-width="0px" class="search_form">
                <!-- 搜索框 -->
                    <el-form-item prop="name">
                    <el-input v-model="registrationIDSearch.REGISTRATION_ID"   prefix-icon="el-icon-zoom-in" style="width:70%;"></el-input>
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
      <template #default="scope">
          <p>{{ scope.row.patienT_ID }}</p>
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
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
          registratioN_ID: '',
          patienT_ID: '',
          depT_NAME: '',
          date:''
        }
        ],
        registrationIDSearch:{
            REGISTRATION_ID:''
        },
        searchRules: {
                name: [
                    { required: true, message: '请输入挂号单编号', trigger: 'blur' }
                ]
            },
      };
    },
    methods: {
      handleDelete(index, row) {
        console.log(index, row);
      },
      async search(){
          const { data: res } =await this.$http.get('registration/find', { params: { REGISTRATION_ID: this.registrationIDSearch.REGISTRATION_ID}})
            console.log(res.data)
            // 将data属性重命名为res
            this.patientData=res.data
            // console.log(this.patientData)
            },
      async handleDelete(index, row)
      {
            const { data: res } = await this.$http.delete('registration',
                {
                  REGISTRATION_ID: this.registratioN_ID,
                  }
                )
          console.log(res)
          // 这里是返回的信息
      }
    },
  }
</script>