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
       <el-input placeholder="请输入内容"
       v-model="queryInfo.query" clearable @clear="getNurseList">
       <el-button slot="append" icon="el-icon-search" @click="getNurseList"></el-button>
       </el-input>
     </el-col>
     <el-col :span="4">
         <el-button type="primary" @click="addDialogVisible=true">添加值班护士</el-button>
     </el-col>
   </el-row>

   <!--值班护士信息区域-->
   <el-table
      :data="tableData"
      style="width: 100%" border stript>
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="ID"
        label="护士ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="status"
        label="级别">
      </el-table-column>
      <el-table-column
        label="值班状态">
        <template slot-scope="scope">
            <el-switch v-model="scope.row.state" @change="nurseStateChanged(scope.row)">
            </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="bedID"
        label="负责病床号">
        <template slot-scope="scope">
         <template v-if="scope.row.edit">
          <el-input class="edit-input" size="small" v-model="scope.row.bedID"></el-input>
         </template>
      <span v-else>{{ scope.row.bedID }}</span>
      </template>
      </el-table-column>
       <el-table-column
        label="操作" width="180px">
        <template slot-scope="scope">
            <!--修改负责病床按钮-->
           <el-tooltip effect="dark" content="修改病床号" placement="top" :enterable="false">
             <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.$index, scope.row)" size="small" icon="el-icon-circle-check"></el-button>
             <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit"></el-button>
           </el-tooltip>
            <!--删除信息按钮-->
          <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
             <el-button type="danger" icon="el-icon-remove-outline" size="small" @click="removeNurseById(scope.row.ID)"></el-button>
           </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

   <!--分页区域-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1,2,5, 10, 50]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
  </el-card>

<!--添加值班护士的对话框-->
<!--！！！！待进一步修正！！！！-->
  <el-dialog
  title="添加值班护士"
  :visible.sync="addDialogVisible"
  width="30%" @close="addDialogClosed">
  <!--内容主体区-->
  <el-form :model="addForm" ref="addFormRef" label-width="70px">
  <el-form-item prop="nurseID" label="护士ID" :rules="addFormRules">
  <el-input v-model="addForm.nurseID"></el-input>
  </el-form-item>
  <el-form-item
    v-for="(bedNum, index) in addForm.bedNum"
    :label="'床位' + index"
    :key="bedNum.key"
    :prop="'bedNum.' + index + '.value'"
    :rules="{ required: true, message: '负责床号不能为空', trigger: 'blur'}"
  >
  <el-input v-model="bedNum.value"></el-input><el-button @click.prevent="removeDomain(bedNum)">删除</el-button>
  </el-form-item>
  </el-form>
  <!--底部区域-->
  <span slot="footer" class="dialog-footer">
    <el-button @click="resetForm">重 置</el-button>
    <el-button @click="addDomain">新增床号</el-button>
    <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
  </span>
</el-dialog>

</div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少数据
        pagesize: 2
      },
      tableData: [{
        ID: '01',
        name: '王1',
        state: false,
        bedID: ['101', '102'],
        status: '护士',
        edit: false
      }, {
        ID: '02',
        name: '王2',
        state: true,
        bedID: ['103', '105', '107'],
        status: '护士长',
        edit: false
      }, {
        ID: '03',
        name: '王3',
        state: false,
        bedID: [],
        status: '护士长',
        edit: false
      }, {
        ID: '04',
        name: '王4',
        state: true,
        bedID: ['108'],
        status: '护士',
        edit: false
      }],
      // 控制添加值班护士对话框的显示与隐藏
      addDialogVisible: false,
      // 添加值班护士表单数据
      addForm: {
        nurseID: '',
        bedNum: [{
          value: ''
        }]
      },
      // 添加信息的验证规则对象
      addFormRules: {
        nurseID: [
          { required: true, message: '请输入护士ID', trigger: 'blur' },
          { type: 'nurseID', message: '请输入正确的护士ID', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created () {
    this.getNurseList()
  },
  methods: {
    getNurseList () {
      return this.tableData
    },
    // 监听page size改变的事件
    handleSizeChange (newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getNurseList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getNurseList()
    },
    // 监听开关状态的改变
    nurseStateChanged (nurseInfo) {
      console.log(nurseInfo)
      this.$set(this.tableData[nurseInfo.index], 'state', nurseInfo.state)
    },
    // 删除床位框
    removeDomain (item) {
      var index = this.addForm.bedNum.indexOf(item)
      if (index !== -1) {
        this.addForm.bedNum.splice(index, 1)
      }
    },
    // 新增床位框
    addDomain () {
      this.addForm.bedNum.push({
        value: '',
        key: Date.now()
      })
    },
    // 提交表单数据
    submitForm (formName) {
      this.addDialogVisible = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('提交成功!')
        } else {
          console.log('提交失败!!')
          return false
        }
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
    confirmEdit (index, row) {
      row.edit = false
      this.$message({
        message: '床位已经成功修改',
        type: 'success'
      })
    },
    // 根据ID删除对应值班护士信息
    async removeNurseById (id) {
    // 弹框询问用户是否删除数据
      const confirmrusult = await this.$confirm('此操作将删除该值班护士信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果用户确认删除，则返回值为字符串confirm
      // 如果用户取消删除，则返回值为字符串cancle
      if (confirmrusult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      console.log('确认了删除')
    }

  }
}
</script>

<style lang="less" scoped>
</style>
