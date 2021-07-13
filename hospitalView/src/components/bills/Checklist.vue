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
                    <el-input placeholder="请输入病人姓名" v-model="queryInfo.PATIENT_NAME" clearable 
                    @clear="getChecklist">
                    <el-button slot="append" icon="el-icon-search" @click="getChecklist"></el-button>
                    </el-input>  
                </el-col>
            </el-row>
            
            <!-- 项目检查单列表区域 -->
            <el-table :data="checklist_current" border style="width: 100%" stripe>

                <!-- 表头区域 -->
                <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="patienT_NAME" label="病人姓名" width="100"></el-table-column>
                 <el-table-column prop="patienT_ID" label="病人ID" width="100"></el-table-column>
                <el-table-column prop="examinatioN_NAME" label="项目检查单名称" width="150"></el-table-column>
                <el-table-column prop="prescriptioN_ID" label="项目检查单ID" width="120"></el-table-column>
                <el-table-column prop="examinatioN_DATE" label="开具日期" width="120"></el-table-column>               
                <el-table-column prop="doctoR_NAME" label="医生姓名" width="100"></el-table-column>
                <el-table-column prop="diagnosis" label="临床诊断" width="120"></el-table-column>    

                <!-- 修改和删除按钮区域 -->
                <el-table-column  label="操作" width="150">
                   <template slot-scope="scope">
                       <!-- 修改 -->
                         <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="showeditdialog(scope.row)"></el-button>
                         <!-- 删除 -->
                         <el-button type="danger" icon="el-icon-delete" size="mini" circle  @click="deleteVisible(scope.row.prescriptioN_ID)"></el-button>
                   </template>
                </el-table-column>
           
            </el-table>
             
            <!-- 分页效果  -->
            <el-pagination
            :current-page.sync="queryInfo.PAGE_NUM"
            :page-size="queryInfo.PAGE_SIZE"
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
        label-width="140px">
        <el-form-item label="病人姓名" >
          <el-input v-model="editChecklistForm.patienT_NAME" disabled></el-input>
        </el-form-item>
        <el-form-item label="项目检查单ID" >
          <el-input v-model="editChecklistForm.prescriptioN_ID" disabled></el-input>
        </el-form-item>       
         <el-form-item label="开具日期"  >
          <el-input v-model="editChecklistForm.examinatioN_DATE" disabled></el-input>
        </el-form-item>
         <el-form-item label="病人ID" >
          <el-input v-model="editChecklistForm.patienT_ID" disabled></el-input>
        </el-form-item>
         <el-form-item label="医生姓名" >
          <el-input v-model="editChecklistForm.doctoR_NAME" disabled></el-input>
        </el-form-item>
         <el-form-item label="项目检查单名称" prop="examinatioN_NAME">
          <el-input v-model="editChecklistForm.examinatioN_NAME" ></el-input>
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
           const{data:res}=await this.$http.get('examination/listPage',
           {params:this.queryInfo})
        // 打印
        console.log(res.data)
        console.log(res.data.totaL_PAGE)
        console.log(res.data.data)        
        // 返回数据
        this.checklist=res.data.data
        this.total=res.data.totaL_PAGE      
       },


        // 编辑项目检查单 
        // 只是一个查询
        async showeditdialog(editSample){
             this.editDialogVisible=true
            //console.log(examinatioN_LIST_ID)
            const{data:res}=await this.$http.get('patient/examination/', { EXAMINATION_LIST_ID: editSample.examinatioN_LIST_ID})
            // 打印
            //console.log(res.data)
            //console.log(this.editChecklistForm)
            this.editChecklistForm = editSample
            //console.log(res)
            //console.log(this.editChecklistForm)
        },


        // 修改信息并提交
        editChecklist(){
            // 提交请求之前表单预验证
            this.$refs.editChecklistFormRef.validate(async valid=>{
                //consloe.log(valid)
                // 校验失败
               // if(!valid)return
                // 发起修改检查单信息请求
                const{data:res}=await this.$http.put(
                    'patient/examinationPage/',
                    // 修改的信息
                    {
                        examinatioN_NAME:this.editChecklistForm.examinatioN_NAME,
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
                const {data :res}=await this.$http.delete('patient/examination',
                {prescriptioN_ID}
                )
                this.$$message.success('删除用户成功')
                this.getChecklist()
        },

        
        // 监听修改用户对话框的直接关闭事件
        editDialogClosed(){
            this.$refs.editChecklistFormRef.resetFields()
        },

    },

    created(){
        this.getChecklist()
    },
    // 分页函数
    computed:{
        checklist_current:function(){
            return this.checklist.slice((this.queryInfo.PAGE_NUM-1)*this.queryInfo.PAGE_SIZE,Math.min(this.queryInfo.PAGE_NUM*this.queryInfo.PAGE_SIZE,this.checklist.length));
        }
    },

    // 病人信息数据
    data() {
      return {
        //获取用户列表的参数对象
        queryInfo:{
            PATIENT_NAME:'',
            // 当前的页数
            PAGE_NUM:1,
            // 当前每页显示多少条数据
            PAGE_SIZE:2
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
            examinatioN_NAME:[
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