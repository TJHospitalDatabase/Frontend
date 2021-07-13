<template>
<div>
    <!--面包屑导航区-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
     <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>护士值班信息</el-breadcrumb-item>
     <el-breadcrumb-item>值班信息列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
  <el-card>
   <!--搜索与添加区域-->
   <el-row :gutter="20">
     <el-col :span="7">
       <el-input placeholder="请输入科室"
       v-model="queryInfo.DEPT_NAME" clearable @clear="getNurseList">
       <el-button slot="append" icon="el-icon-search" @click="getNurseList"></el-button>
       </el-input>
     </el-col>
   </el-row >
   <el-row :gutter="20">
     <el-col :span="7">
       <el-input placeholder="请输入护士ID"
       v-model="queryInfo.NURSE_ID" clearable @clear="getNurseList">
       <el-button slot="append" icon="el-icon-search" @click="getNurseList"></el-button>
       </el-input>
     </el-col>
     <el-col :span="4">
         <el-button type="primary" @click="addDialogVisible=true">添加值班护士</el-button>
     </el-col>
   </el-row>

   <!--值班护士信息区域-->
   <el-table
      :data="nurselist.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100%" border stript>
      <el-table-column type="index"></el-table-column>
      <el-table-column
        sortable
        prop="nursE_ID"
        label="护士ID">
      </el-table-column>
      <el-table-column
        prop="nursE_NAME"
        label="姓名">
      </el-table-column>
       <el-table-column
        prop="depT_NAME"
        label="科室">
      </el-table-column>
      <el-table-column
        sortable
        prop="nursE_LEVEL"
        label="级别">
      </el-table-column>
      <el-table-column
        label="值班状态">
        <template slot-scope="scope">
            <el-switch v-model="scope.row.iS_ON_DATE" @change="nurseStateChanged(scope.row)">
            </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="beD_ID"
        label="负责病床号">
        <template slot-scope="scope">
         <template v-if="scope.row.edi">
          <el-input class="edit-input" size="small" v-model="scope.row.beD_ID"></el-input>
         </template>
      <span v-else>{{ scope.row.beD_ID }}</span>
      </template>
      </el-table-column>
       <el-table-column
        label="操作" width="180px">
        <template slot-scope="scope">
            <!--修改负责病床按钮-->
          <!-- <el-tooltip effect="dark" content="修改病床号" placement="top" :enterable="false" > -->
            <el-button v-show="scope.row.edi" type="success" @click="confirmEdit(scope.$index,scope.row)" size="small" icon="el-icon-circle-check"></el-button>
            <el-button v-show="!scope.row.edi" type="primary" @click='test(scope.$index,scope.row)' size="small" icon="el-icon-edit"></el-button>
          <!-- </el-tooltip> -->
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

<!--添加值班护士的对话框-->
<!--！！！！待进一步修正！！！！-->
  <el-dialog
  title="添加值班护士"
  :visible.sync="addDialogVisible"
  width="30%" @close="addDialogClosed">
  <!--内容主体区-->
  <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
  <el-form-item prop="nurseID" label="护士ID">
  <el-input v-model="addForm.nurseID"></el-input>
  </el-form-item>
  <el-form-item prop="bedNum" label="病床号">
  <el-input v-model="addForm.bedNum"></el-input>
  </el-form-item>
  <el-form-item prop="state" label="值班状态">
   <el-switch v-model="addForm.state"></el-switch>
  </el-form-item>
  </el-form>
  <!--底部区域-->
  <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm">重 置</el-button>
    <el-button @click="addDialogVisible=false">取 消</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
  </span>
</el-dialog>

</div>
</template>

<script>
export default {
  data () {
    //验证护士ID的规则
  var checkNurseID= (rule, value,cb) =>{
   for(let i=0;i<nurselist.length;i++)
   {if(value==nurselist[i].nursE_ID) return cb()}
   cb(new Erro('请正确输入存在的护士ID'))

  }

   //验证床号的规则
  var checkBedID= (rule,value,cb) =>{
    for(let i=0;i<nurselist.length;i++)
   {if(value==nurselist[i].beD_ID) return cb()}
   cb(new Erro('请正确输入存在的床号'))
  }

    return {

     currentPage: 1, // 当前页码
        total: 0, // 总条数
        pageSize: 2, // 每页的数据条数


      queryInfo: {
        //查询科室
        DEPT_NAME: '',
         //查询护士ID
        NURSE_ID:'',
        
      },
      total:0,
      nurselist: [],
      department:'',
      // 控制添加值班护士对话框的显示与隐藏
      addDialogVisible: false,
      // 添加值班护士表单数据
      addForm: {
        nurseID: '',
        bedNum: '',
        state: '',
      },
      // 添加信息的验证规则对象
      addFormRules: {
        nurseID: [
          { required: true, message: '请输入护士ID', trigger: 'blur' },
          { validator: checkNurseID,type:'number', max:20,message: '长度最多 20 个字符', trigger: 'blur' }
        ],
        bedNum: [
          { required: true, message: '请输入病床号', trigger: 'blur' },
          { validator: checkBedID,type:'number',min:1, max:4,message: '长度在 1 到 4 个字符', trigger: 'blur' }
        ]

      }
    }
  },
  created () {
    this.getNurseList()
  },

  methods: {
    test(index,row){
      console.log(row.edi);
      row.edi=!row.edi;
      console.log(row.edi);
      console.log(this.nurselist);
    },
    async getNurseList () {
    const {data: res } = await this.$http.get('onDate',{ params: this.queryInfo})
    
    if(res.err_code !== "0000"){
      return this.$message.error('获取值班护士信息失败！')
    }
    this.$message.success('获取值班护士信息成功！')
    console.log(res.data)
      this.nurselist = res.data.data
      //编辑操作按钮操作值
     for(let  i=0;i<this.nurselist.length;i++){
      this.nurselist[i].edi=false;
     }
     console.log(this.nurselist)
    // 为总数据条数赋值
     this.total = res.data.totaL_PAGE
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

    // 监听开关状态的改变
    async nurseStateChanged (nurseInfo) {
      console.log(nurseInfo)
      const { data:res } = await this.$http.put('onDate',{
        NURSE_ID: nurseInfo.nursE_ID,
        BED_ID: nurseInfo.beD_ID,
        STATE: nurseInfo.iS_ON_DATE

      })
    
    if(res.err_code !== "0000"){
      nurseInfo.iS_ON_DATE = !nurseInfo.iS_ON_DATE
      return this.$message.error('更新护士值班状态失败！')
    }
    this.$message.success('更新护士值班状态成功！')
    },
    // 修改值班护士信息并提交
    submitForm (nurseInfo) {
      this.addDialogVisible = false
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
           
        const { data:res } = await this.$http.put('onDate',{
        NURSE_ID: nurseInfo.nursE_ID,
        BED_ID: nurseInfo.beD_ID,
        STATE: nurseInfo.iS_ON_DATE

      })

        if(res.err_code!=="0000")
        {return this.$message.error('修改值班护士信息失败！')}
       
          //关闭对话窗口
          this.addDialogVisible = false
          //双薪数据列表
          this.getNurseList()
          //提示修改成功
          this.$message.success('更新值班护士信息成功！')
        
      })
    },
    // 监听对话框关闭事件(有问题)
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 重置对话框(有问题待解决)
    resetForm () {
      this.$refs.addFormRef.resetFields()
    },
    // 修改对话框中病床号
   async confirmEdit (index,row) {
     
      row.edi=false
      console.log(row)
      const { data:res } = await this.$http.put('onDate',{
        NURSE_ID: row.nursE_ID,
        BED_ID: row.beD_ID,
        STATE: row.iS_ON_DATE
      })
    
    if(res.err_code !== "0000"){
      row.iS_ON_DATE = !row.iS_ON_DATE
      return this.$message.error('更新床号失败！')
    }
    this.$message.success('更新床号成功！')
    
    }

  }
}
</script>

<style lang="less" scoped>
</style>
