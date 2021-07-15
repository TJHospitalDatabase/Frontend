<template>
    <!-- 主体部分 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <!-- 数据表单 -->
    <el-main>
        <!--面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" >
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>单目管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目检查单</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区 -->
        <el-card >

            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <!-- 后端搜索 -->
                    <!-- <el-input placeholder="请输入项目检查单编号" v-model="this.queryInfo.EXAMINATION_LIST_ID" clearable 
                    @clear="getChecklist">
                    <el-button slot="append" icon="el-icon-search" @click="getChecklist"></el-button> -->

                    <!-- 前端搜索 -->
                    <el-input placeholder="请输入搜索内容" v-model="searchgoal" clearable 
                    @clear="getChecklist"
                    @keyup.enter.native="frontSearch">
                    <el-button slot="append" icon="el-icon-search" @click="frontSearch"></el-button>

                    </el-input>  
                </el-col>
            </el-row>
            
            <!-- 项目检查单列表区域 -->
            <el-table :data="checklist_current" style="width: 100%" stripe border >

                <!-- 表头区域 -->
                <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="examinatioN_LIST_ID" label="检查项目ID" ></el-table-column>
                <el-table-column prop="examinatioN_NAME" label="检查项目名称" ></el-table-column>
                <el-table-column prop="examinatioN_DATE" label="检查日期" width="200" ></el-table-column>  
                <el-table-column prop="doctoR_NAME" label="医生姓名" ></el-table-column>
                <el-table-column prop="patienT_ID" label="病人ID" ></el-table-column>
                <el-table-column prop="patienT_NAME" label="病人姓名" ></el-table-column>                  
                <el-table-column prop="diagnosis" label="临床诊断" ></el-table-column>
                <el-table-column prop="depT_NAME" label="科室" ></el-table-column>    

                <!-- 修改按钮区域 -->
                <el-table-column  label="执行状态" width="100" >
                   <template slot-scope="scope">
                       <!-- 修改 -->
                        <el-switch v-model="scope.row.state"  active-color="#13ce66" inactive-color="#ff4949" @change="editdialog(scope.row)
                        ">

                       </el-switch>
                    <!-- <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="showeditdialog(scope.row)" ></el-button> -->
                   </template>
                </el-table-column> 
            </el-table>             
            <!-- 分页效果  -->
            <div style="position:absolute;top:83%;">
            <el-pagination
            :current-page.sync="queryInfo.PAGE_NUM"
            :page-size="queryInfo.PAGE_SIZE"
            layout="total,prev, pager, next,jumper"
            :total="checklist.length">
            </el-pagination>
            </div>

            <!-- 查看结果对话框 -->
                <el-dialog title="检查结果" :visible.sync="emptyFormVisible" width="50%" >
                <!-- 添加样本数据按钮 -->
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addsampleVisible=true"></el-button>
                <!-- 检查单数据区域 -->                        
                <el-table :data="datalist_current" border style="width: 100%">
                <!-- 表头区域 -->
                    <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="resulT_NAME" label="样本种类" width="150"></el-table-column>
                    <el-table-column prop="resulT_NUM" label="检查结果" width="260"></el-table-column>
                    <el-table-column prop="resulT_RANGE" label="参考范围" width="265"></el-table-column>                                      
                </el-table>
                <!--分页设置区域 -->
                <el-pagination
                    :current-page.sync="s_queryInfo.PAGE_NUM"
                    :page-size="s_queryInfo.PAGE_SIZE"
                    layout="total, prev, pager, next, jumper"
                    :total="datalist.length">
                </el-pagination>
                <!-- 底部按钮区域 -->
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="emptyFormVisible= false">确 定</el-button>
                </span>
                </el-dialog>


            <!-- 添加结果对话框 -->
            <el-dialog title="结果添加" :visible.sync="addsampleVisible" width="50%" @closed="addsampleclosed">

                <!-- 添加表单区域 -->
                <el-form ref="addSampleRef" :model="addsampleform" :rules="addSampleRules" label-width="80px">
                <el-form-item label="样本种类" prop="resulT_NAME">
                <el-input v-model="addsampleform.resulT_NAME"></el-input>
                </el-form-item>
                 <el-form-item label="检查结果" prop="resulT_NUM">
                <el-input v-model="addsampleform.resulT_NUM"></el-input>
                </el-form-item>
                 <el-form-item label="参考范围" prop="resulT_RANGE">
                <el-input v-model="addsampleform.resulT_RANGE"></el-input>
                </el-form-item>
                </el-form>

                <!-- 底部按钮区域 -->
                <span slot="footer" class="dialog-footer">
                <el-button @click="addsampleVisible = false">取 消</el-button>
                <el-button type="primary" @click="addsample">确 定</el-button>
                </span>
            </el-dialog>

        </el-card>

<!-- ref是表单的引用 -->
<!-- prop校验规则 -->
<!-- model绑定数据 -->
        </el-main>
    </el-container>
    
</template>



<script>
export default {   
    methods: {
        // 获取项目检查单列表接口
       async getChecklist(){
           const{data:res}=await this.$http.get('patient/examination/',
           {
               params:{EXAMINATION_LIST_ID:this.queryInfo.EXAMINATION_LIST_ID}
               })
           console.log(res.err_code)
            if (res.err_code != "0000") 
            {this.$message.error('获取检查项目列表失败！')}
        // 返回数据
        this.checklist=res.data
        console.log(this.checklist)     
       },

        addsample () {
            console.log("test");
            console.log(this.editChecklistForm);
            // 提交请求前，表单预验证
            this.$refs.addSampleRef.validate(async valid => {
            // console.log(valid)
            // 表单预校验失败
            if (!valid) return
            const { data: res } = await this.$http.post('result/addResult', 
            {EXAMINATION_LIST_ID:this.editChecklistForm.examinatioN_LIST_ID,
            RESULT_NAME:this.addsampleform.resulT_NAME,
            RESULT_NUM:this.addsampleform.resulT_NUM,
            RESULT_RANGE:this.addsampleform.resulT_RANGE})
            console.log(this.addsampleform)
            if (res.data !=true ) {
            this.$message.error('添加样本结果失败！')
            }
            console.log(res.data)
            this.$message.success('添加样本结果成功！')
        // 隐藏添加用户对话框
            this.addsampleVisible = false
            this.getDatalist(this.editChecklistForm)
      })
    },

        // 模糊搜索
        frontSearch(){
            const searchgoal=this.searchgoal
            if(searchgoal){
                this.checklist=this.checklist.filter(data=>{
                    return Object.keys(data).some(key=>{
                        return String(data[key]).toLowerCase().indexOf(searchgoal)>-1
                    })
                })
            }
        },
       
        // 编辑项目检查状态
        async editdialog(editSample){
            if(editSample.state==false){return this.$message.error('更新项目执行情况失败！')}
            console.log(editSample.state)

            const{data:res}=await this.$http.get('patient/examinationPage', 
            {params:
            {EXAMINATION_LIST_ID: editSample.examinatioN_LIST_ID,
            STATE:editSample.state}})

            console.log(res.data)
            if (res.err_code != "0000") 
            {this.$message.error('更新项目执行情况失败！')}
            this.$message.success('更新项目执行情况成功！')
            this.editChecklistForm = editSample
            console.log(this.editChecklistForm)
            this.getDatalist(this.editChecklistForm)
            this.emptyFormVisible=true
        },
        
        // 获得项目检查结果
        async getDatalist(editSample){                      
            const{data:res}=await this.$http.get('examination/result/listPage',
            {
                params:{EXAMINATION_LIST_ID:editSample.examinatioN_LIST_ID}                          
            })
            // 验证

           if (res.err_code != "0000") 
            {this.$message.error('获得项目检查结果失败！')}
            this.datalist=res.data.data
            // 打印res
            console.log(res.data)
        },

        // 监听添加样本弹框的关闭事件
        addsampleclosed(){
            this.$refs.addSampleRef.resetFields()
        },

        // 回车搜索
        //  searchEnterFun (e){
        //     var keyCode = window.event ? e.keyCode : e.which;
        //     console.log("回车搜索", keyCode, e);
        //     if (keyCode == 13) {
        //     this.frontSearch()
  
 

    },

    created(){
        this.getChecklist()
    },

    // 分页函数
    computed:{
        checklist_current:function(){
            return this.checklist.slice((this.queryInfo.PAGE_NUM-1)*this.queryInfo.PAGE_SIZE,Math.min(this.queryInfo.PAGE_NUM*this.queryInfo.PAGE_SIZE,this.checklist.length));
        },
         datalist_current:function(){
            return this.datalist.slice((this.s_queryInfo.PAGE_NUM-1)*this.s_queryInfo.PAGE_SIZE,Math.min(this.s_queryInfo.PAGE_NUM*this.s_queryInfo.PAGE_SIZE,this.datalist.length));
        }
    },

    // 病人信息数据
    data() {
      return {
        //获取用户列表的参数对象
        queryInfo:{
            EXAMINATION_LIST_ID:'',
            // 当前的页数
            PAGE_NUM:1,
            // 当前每页显示多少条数据
            PAGE_SIZE:6
        },

        // 获取样本结果列表的参数对象
        s_queryInfo:{
            EXAMINATION_LIST_ID:'',
            // 当前的页数
            PAGE_NUM:1,
            // 当前每页显示多少条数据
            PAGE_SIZE:6
        },
        //总页面
        total:0,
        // 模糊搜索
        searchgoal:'',
        //用户列表
        checklist: [],
        datalist:[],
        // 空表的显示
        emptyFormVisible:false,

        state:"",

        // 查询到的用户信息
        editChecklistForm:{},

        // 添加结果
        addsampleform:{
            resulT_NAME:'',
            resulT_NUM:'',
            resulT_RANGE:''
        },
        addsampleVisible:false,

        // 添加表单验证
        addSampleRules:{
            resulT_NAME:[
                { required: true, message: '请输入样本名称', trigger: 'blur' }],
            resulT_NUM:[
                { required: true, message: '请输入检查结果', trigger: 'blur' },
            ],
        },
      }
    }
}
</script>

<style lang="less" scoped>
</style>
