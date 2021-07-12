<template>
    <div>

        <!--面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" >
        <el-breadcrumb-item :to="{ path: '/checklisthome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>病人相关信息查询</el-breadcrumb-item>
        <el-breadcrumb-item>项目检查单</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区 -->
        <el-card >

            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入病人姓名" v-model="queryInfo.query" clearable 
                    @clear="getChecklist()">
                    <el-button slot="append" icon="el-icon-search" @click="getChecklist()"></el-button>
                    </el-input>  
                </el-col>
            </el-row>
            
            <!-- 项目检查单列表区域 -->
            <el-table :data="checklist_current" border style="width: 100%" stripe>

                <!-- 表头区域 -->
                <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="patientName" label="病人姓名" width="100"></el-table-column>
                 <el-table-column prop="patientID" label="病人ID" width="100"></el-table-column>
                <el-table-column prop="prescriptionName" label="项目检查单名称" width="150"></el-table-column>
                <el-table-column prop="prescriptionID" label="项目检查单ID" width="120"></el-table-column>
                <el-table-column prop="date" label="开具日期" width="120"></el-table-column>               
                <el-table-column prop="doctorName" label="医生姓名" width="100"></el-table-column>
                <el-table-column prop="diagnosis" label="临床诊断" width="120"></el-table-column>    

                <!-- 修改和删除按钮区域 -->
                <el-table-column  label="操作" width="150">
                   <template slot-scope="scope">
                       <!-- 修改 -->
                         <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="showeditdialog(scope.row.prescriptionID)"></el-button>
                         <!-- 删除 -->
                         <el-button type="danger" icon="el-icon-delete" size="mini" circle  @click="deleteVisible(scope.row.prescriptionID)"></el-button>
                   </template>
                </el-table-column>
           
            </el-table>
             
            <!-- 分页效果  -->
            <el-pagination
            :current-page.sync="queryInfo.pagenum"
            :page-size="queryInfo.pagesize"
            layout="total,prev, pager, next,jumper"
            :total="checklist.length">
            </el-pagination>

        </el-card>

        <!--修改项目检查单的对话框 -->
        <el-dialog title="修改项目检查单" 
        :visible.sync="editDialogVisible" width="50%" 
        @close="editDialogClosed"
        center>

<!-- ref是表单的引用 -->
<!-- prop校验规则 -->
<!-- model绑定数据 -->
        <!--内容主体-->
        <el-form
        :model=" editChecklistForm"
        ref="editChecklistFormRef"
        :rules="editChecklistFormRules"
        label-width="70px">
        <el-form-item label="病人姓名" >
          <el-input v-model="editChecklistForm.patientName" disabled></el-input>
        </el-form-item>
        <el-form-item label="项目检查单ID" >
          <el-input v-model="editChecklistForm.prescriptionID" disabled></el-input>
        </el-form-item>       
         <el-form-item label="开具日期"  >
          <el-input v-model="editChecklistForm.date" disabled></el-input>
        </el-form-item>
         <el-form-item label="病人ID" >
          <el-input v-model="editChecklistForm.patientID" disabled></el-input>
        </el-form-item>
         <el-form-item label="医生姓名" >
          <el-input v-model="editChecklistForm.doctorName" disabled></el-input>
        </el-form-item>
         <el-form-item label="项目检查单名称" prop="prescriptionName">
          <el-input v-model="editChecklistForm.prescriptionName" ></el-input>
        </el-form-item>
         <el-form-item label="临床诊断" prop="diagnosis">
          <el-input v-model="editChecklistForm.diagnosis"></el-input>
        </el-form-item>
      </el-form>

        <!-- 页脚 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editChecklist">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    methods: {
        // async promise
        // get(地址 get请求参数)
        // 获取项目检查单列表接口
       async getChecklist(){
           const{data:res}=await this.$http.get('patient/examination',
           {params:this.queryInfo})
        // 打印
        console.log(res.data)
        console.log(res.data[0].totalpage)
        console.log(res.data[0].prescriptions)        
        // 返回数据
        this.checklist=res.data[0].prescriptions
        this.total=res.data[0]       
       },


        // 编辑项目检查单 
        // 只是一个查询
        async showeditdialog(prescriptionID){
             this.editDialogVisible=true
            console.log(prescriptionID)
            const{data:res}=await this.$http.get('patient/examination/'+prescriptionID)
            // 打印
            console.log(res.data)
            console.log(this.editChecklistForm)
            this.editChecklistForm=res.data
            // this.editDialogVisible=true
        },


        // 监听修改用户对话框的直接关闭事件
        editDialogClosed(){
            this.$refs.editChecklistFormRef.resetFields()
        },

        // 修改信息并提交
        editChecklist(){
            // 提交请求之前表单预验证
            this.$refs.editChecklistFormRef.validate(async valid=>{
                consloe.log(valid)
                // 校验失败
                if(!valid)return
                // 发起修改检查单信息请求
                const{data:res}=await this.$http.put(
                    'patient/examination/'+this.editChecklistForm.prescriptionID,
                    // 修改的信息
                    {
                        prescriptionName:this.editChecklistForm.prescriptionName,
                        diagnosis:this.editChecklistForm.diagnosis
                    }
                )
                // 隐藏添加检查项目对话框
                this.editDialogVisible=false
                this.$message.success('更新用户信息成功')
                this.getChecklist()
            })
        },

        // 删除检查项目
        async deleteVisible(prescriptionID){
             const confirmResult=await this.$confirm('此操作将永久删除该检查项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).catch(err=>err)
                // 点击确定 返回值为confirm
                // 点击取消 返回值为cancel
                if(confirmResult!=='confirm'){
                    return this.$message.info('已取消删除')
                }
                const {data :res}=await this.$http.delete(''+prescriptionID)
                this.$$message.success('删除用户成功')
                this.getChecklist()
        },

    },

    created(){
        this.getChecklist()
    },
    computed:{
        checklist_current:function(){
            return this.checklist.slice((this.queryInfo.pagenum-1)*this.queryInfo.pagesize,Math.min(this.queryInfo.pagenum*this.queryInfo.pagesize,this.checklist.length));
        }
    },

    // 病人信息数据
    data() {
      return {
        //获取用户列表的参数对象
        queryInfo:{
            query:'',
            // 当前的页数
            pagenum:1,
            // 当前每页显示多少条数据
            pagesize:4
        },
        //总页面
        total:0,

        //用户列表
        checklist: [],

        // 控制修改对话框的显示与隐藏
        editDialogVisible:false,

        // 查询到的用户信息
        editChecklistForm:{},

        // 编辑用户表单验证
        editChecklistFormRules:{
            prescriptionName:[
            {required: true, message: '请输入检查项目名称', trigger: 'blur'},
            ],
            diagnosis:[
            { required: true, message: '请输入临床诊断信息', trigger: 'blur' },
            ]
        }
      }
    }
}
</script>

<style lang="less" scoped>
</style>