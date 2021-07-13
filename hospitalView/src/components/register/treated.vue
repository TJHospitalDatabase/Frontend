<template>
    <div>
        <!--面包屑导航区-->
     <el-breadcrumb separator-class="el-icon-arrow-right">
     <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>问诊信息</el-breadcrumb-item>
     <el-breadcrumb-item>问诊信息列表</el-breadcrumb-item>
     </el-breadcrumb>

     <!--卡片视图区-->
     <el-card>
         <el-row>
             <el-col :span="6">
               <div>患者ID：
              <el-input
              size="large"
              placeholder="请输入患者ID"
              v-model="queryInfo.PATIENT_ID" 
              clearable
              @clear="getTreatList">
              </el-input>
              <el-button type="primary" icon="el-icon-search" @click="getTreatList">搜 索</el-button><!--事件还未定义-->
               </div>
             </el-col>
         </el-row>

         <!--问诊信息列表(表单内容待根据postman中内容进行更改)-->
         <el-table
            :data="treatlist.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%" border stript>
            <el-table-column type="index"></el-table-column>
            <el-table-column
              prop="patienD_NAME"
              label="患者姓名">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别">
            </el-table-column>
            <el-table-column
              sortable
              prop="prescriptioN_ID"
              label="处方单ID">
            </el-table-column>
            <el-table-column
              prop="depT_NAME"
              label="科室">
            </el-table-column>
            <el-table-column
              sortable
              prop="sigN_DATE"
              label="开具日期">
            </el-table-column>
            <el-table-column
              prop="doctoR_ID"
              label="医生ID">
            </el-table-column>
            <el-table-column
              prop="doctoR_NAME"
              label="医生姓名">
            </el-table-column>
            <el-table-column
              prop="toprice"
              label="问诊费用(元)">
            </el-table-column>
            <el-table-column
              sortable
              label="缴费状态">
              <template slot-scope="scope">
                  <el-switch v-model="scope.row.state" @change="stateChanged(scope.row)">
                  </el-switch>
              </template>
            </el-table-column>
         </el-table>
         
<!-- 分页器 -->
        <div class="block" style="margin-top:15px;">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" 
            :current-page="currentPage" 
            :page-sizes="[2,5,10,20]" 
            :page-size="pageSize" 
            layout="total, sizes, prev, pager, next, jumper" 
            :total="total">
            </el-pagination>
        </div>
     </el-card>

    </div>
</template>

<script>
export default {
  data () {
    return {
        
        currentPage: 1, // 当前页码
        total: 0, // 总条数
        pageSize: 2, // 每页的数据条数

      queryInfo: {
        //查询对象
        PATIENT_ID: '',
      },
      
      //问诊信息列表
      treatlist:[]
    }
  },
  created(){
  this.getTreatList() 
   },


  methods: {
    //获取问诊历史数据
    async getTreatList () {
    const {data: res } = await this.$http.get('findPrescription',{ params: this.queryInfo})
    
    if(res.err_code !== "0000"){
       return this.$message.error('获取问诊信息失败！')
     }
    this.$message.success('获取问诊信息成功！')
    console.log(res.data)
      this.treatlist = res.data.data
    // 为总数据条数赋值
     this.total = res.data.totaL_PAGE
    },


    // 监听开关状态的改变
    async stateChanged (Info) {
      console.log(Info)
      const {data:res} = await this.$http.put('findPrescription',{
        PRESCRIPTION_ID: Info.prescriptioN_ID,
        STATE: Info.state
      })
    
    if(res.err_code !== "0000"){
      Info.state = !Info.state
      return this.$message.error('更新支付状态失败！')
    }
    this.$message.success('更新支付状态成功！')
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
    
  }
}
</script>

<style lang="less" scoped>
</style>
