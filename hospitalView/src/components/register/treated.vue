<template>
<!-- 问诊信息 -->
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
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
             </el-col>
             <el-col :span="6">
               <el-autocomplete
                class="inline-input"
                v-model="state1"
                :fetch-suggestions="querySearch"
                placeholder="请输入科室"
                @select="handleSelect"
               ></el-autocomplete>
             </el-col>
             <el-col :span="6">
             <el-input
              size="large"
              placeholder="请输入患者ID"
              v-model="input2" label="患者ID">
              </el-input>
             </el-col>
             <el-col span="2">
              <el-button type="primary" icon="el-icon-search">搜 索</el-button>
             </el-col>
         </el-row>

         <!--问诊信息列表-->
         <el-table
      :data="tableData"
      style="width: 100%" border stript>
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="pID"
        label="患者ID">
      </el-table-column>
      <el-table-column
        prop="pName"
        label="患者姓名">
      </el-table-column>
      <el-table-column
        prop="dName"
        label="医生姓名">
      </el-table-column>
      <el-table-column
        prop="content"
        label="问诊内容">
      </el-table-column>
      <el-table-column
        prop="price"
        label="问诊费用">
      </el-table-column>
      <el-table-column
        label="缴费状态">
        <template slot-scope="scope">
            <el-switch v-model="scope.row.state" @change="stateChanged(scope.row)">
            </el-switch>
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
      :total="treat.length">
    </el-pagination>
     </el-card>

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
      department: [],
      treat: [{
        pID: '',
        pName: '',
        dID: '',
        dName: '',
        price: '',
        content: '',
        date: '',
        state: ''
      }]
    }
  },
  methods: {
    getTreatList () {
      return this.treat
    },
    querySearch (queryString, cb) {
      var departments = this.department
      var results = queryString ? departments.filter(this.createFilter(queryString)) : departments
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (department) => {
        return (department.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [
        { value: '骨科' },
        { value: '眼科' },
        { value: '妇科' },
        { value: '神经科' }
      ]
    },
    handleSelect (item) {
      console.log(item)
    },
    mounted () {
      this.departments = this.loadAll()
    },
    // 监听开关状态的改变
    stateChanged (Info) {
      console.log(Info)
      this.$set(this.tableData[Info.index], 'state', Info.state)
    },
    // 监听page size改变的事件
    handleSizeChange (newSize) {
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getTreatList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getTreatList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
