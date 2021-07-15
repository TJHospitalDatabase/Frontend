
<template>
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
    created(){
      this.search()
    },
    methods: {
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
          const { data: res } =await this.$http.get('outPatient', { params: { PATIENT_NAME: this.patientNameSearch.name}})
            console.log(res.data)
            // 将data属性重命名为res
            this.patientData=res.data
            // console.log(this.patientData)
            }
        }
    }
</script>
