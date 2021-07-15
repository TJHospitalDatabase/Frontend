<template>
    

        <el-card style="height:95%">
        <!--        卡片-->
            <!--            搜索与添加-->
            <el-row :gutter="1100">
                <el-col :span="12">
                    <!--                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特定内容的活动-->
                    <el-input clearable @clear="getActivityList" placeholder="请输入住院单id" v-model="search">
                        <el-button slot="append" icon="el-icon-search" @click="frontSearch"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showAddActivity">添加住院单</el-button>
                </el-col>
            </el-row>
            <el-table :data="hospitalCurData" border stripe>
                <el-table-column type="index" label="序号" width=100></el-table-column>
                <el-table-column label="住院单id" prop="recipT_ID" width=160></el-table-column>
                <el-table-column label="病人id" prop="patienT_ID" width=160></el-table-column>
                <el-table-column label="医生id" prop="doctoR_ID" width=160></el-table-column>
                <el-table-column label="床位id" prop="beD_ID" width=160></el-table-column>
                <el-table-column label="入院时间" prop="admissioN_DATE" width=180></el-table-column>
                <el-table-column label="开具时间" prop="sigN_DATE" width=180></el-table-column>
                <el-table-column label="临床诊断" prop="diagnosis" width=270></el-table-column>
            </el-table>

            <!--        添加活动对话框-->
            <el-dialog title="添加住院单" :visible.sync="addDialogVisible"
                       width="630px" top="60px" center>
                <!--            内容主体区域 放置一个表单-->
                <!--绑定到addForm中，绑定验证规则对象addFormRules 表单校验项的引用为addFormRef-->
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="150px"
                         style="height:380px">
                    <el-form-item label="病人id:" prop="patienT_ID">
                        <!--v-model双向绑定-->
                        <el-input style="width: 82%;" v-model="addForm.patienT_ID"></el-input>
                    </el-form-item>
                    <el-form-item label="医生id:" prop="doctoR_ID">
                        <!--v-model双向绑定-->
                        <el-input style="width: 82%;" v-model="addForm.doctoR_ID"></el-input>
                    </el-form-item>
                    <el-form-item label="临床诊断:" prop="diagnosis">
                        <el-input style="width: 82%;" type="textarea"
                                  :autosize="{ minRows: 3, maxRows: 4}" v-model="addForm.diagnosis"></el-input>
                    </el-form-item>
                    <el-form-item label="入院时间:" prop="admissioN_DATE">
                         <el-input style="width: 82%;" v-model="addForm.admissioN_DATE"></el-input>
                    </el-form-item>
                </el-form>
                <!--            底部区域-->
                <span slot="footer" class="dialog-footer">
                <el-button style="margin-right:20px" @click="cancelAdd">取 消</el-button>
                <el-button style="margin-left:20px" type="primary" @click="addActivity">确 定</el-button>
            </span>
            </el-dialog>
			<br>
            <!--            分页区域-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[ 2, 5, 10]"
                    :page-size.sync="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="activityList.length">
            </el-pagination>
    </el-card>
</template>

<script>
    export default {
        data()
        {
            return {
                //获取活动列表参数对象
                //查询到的当页活动
                activityList: [],
       
                search:'',            
                //当前的页码
                pageNumber: 1,
                //每页显示的条数
                currentPage:1,
                pageSize: 5,

                //添加,修改,展示活动对话框的显示与隐藏
                addDialogVisible: false,
                editDialogVisible: false,
                showDialogVisible: false,

                //添加活动表单数据
                addForm: {
                    patienT_ID:"",
                    doctoR_ID: "",
                    beD_ID:"",
                    diagnosis: "",
                    admissioN_DATE: ""
                },
                showForm: {},
                //添加活动的校验规则
                addFormRules: {
                    patienT_ID: [
                        {required: true, message: '请输入病人id', trigger: 'blur'},
                        {min: 2, max: 10, message: '病人id必须在2-10字符之间', trigger: 'blur'}
                    ],
                    doctoR_ID: [
                        {required: true, message: '请输入医生id', trigger: 'blur'},
                        {min: 2, max: 10, message: '医生id必须在2-10字符之间', trigger: 'blur'}
                    ],
                    diagnosis: [
                        {required: true, message: '请输入临床诊断', trigger: 'blur'}
                    ],
                    admissioN_DATE: [
                        {required: true, message: '请输入入院时间', trigger: 'blur'}
                    ]
                }
            };
        },
         //一开始就显示活动列表
        created()
        {
           this.getActivityList();
        },
        computed:{
        hospitalSearchData(){
        return (this.activityList.filter(data => !this.search || 
          data.recipT_ID.toLowerCase().includes(this.search.toLowerCase())))
        },
        hospitalCurData:function(){
        return this.hospitalSearchData.slice((this.currentPage - 1) * this.pageSize,
        Math.min(this.currentPage * this.pageSize, this.hospitalSearchData.length));
        }
        },
        methods: {
            async getActivityList()
            {
                let result = await this.$http.get("http://101.132.106.237:5050/recipt",
                    {
                        recipT_ID:""
                    });

                this.activityList = result.data.data;
            },
            frontSearch(){
            const search=this.search
            if(search){
            this.activityList=this.activityList.filter(data=>{
                return Object.keys(data).some(key=>{
                    return String(data[key]).toLowerCase().indexOf(search)>-1
                })
            })
            }
            console.log(this.activityList)
            },
            frontSearch(){
            const query=this.query
            if(query){
            this.activityList=this.activityList.filter(data=>{
                return Object.keys(data).some(key=>{
                    return String(data[key]).toLowerCase().indexOf(query)>-1
                })
            })
            }
            console.log(this.activityList)
            },
            //监听pageSize改变的事件
            handleSizeChange(newSize)
            {
                this.pageSize = newSize;
                this.getActivityList();
            },
            //监听pageNum改变的事件
            handleCurrentChange(newPage)
            {
                this.currentPage = newPage;
                this.getActivityList();
            },
            //添加活动
            showAddActivity()
            {
                this.addDialogVisible = true;
                //清空表单的校验项
                this.$nextTick(() =>
                {
                    this.$refs.addFormRef.resetFields();
                });

                this.addForm.patienT_ID = "";
                this.addForm.doctoR_ID="";
                this.addForm.diagnosis = "";
                this.addForm.admissioN_DATE = "";
            },
            addActivity()
            {
                this.$refs.addFormRef.validate(
                    async valid =>
                    {
                        if (!valid) return;
                        let nowDate = new Date();
                        let date = {
                        year: nowDate.getFullYear(),
                        month: nowDate.getMonth() + 1,
                        date: nowDate.getDate(),
                        }
                        console.log(date);
                        let systemDate = date.year + '-' + 0 + date.month + '-' + date.date;
                        console.log(systemDate);
                        let bedResult= await this.$http.get("http://101.132.106.237:5050/giveBed");
                        let bed_ID=bedResult.data.data;
                        console.log(bed_ID);
                        let result = await this.$http.put("http://101.132.106.237:5050/recipt",
                            {
                                patient_ID: this.addForm.patienT_ID,
                                doctor_ID:this.addForm.doctoR_ID,                               
                                admissioN_DATE: this.addForm.admissioN_DATE,
                                sigN_DATE: systemDate,
                                bed_ID:bed_ID,
                                diagnosis: this.addForm.diagnosis,
                            });

                        //隐藏添加活动对话框
                        this.addDialogVisible = false;
                        this.getActivityList();
                        if (result.err_code !== "0000") return this.$message.error('增加失败！')           
                        else this.$message.info("添加检查单成功!");
                    }
                );
            },
            //添加活动框里面的取消添加活动按钮触发的事件
            cancelAdd()
            {
                //隐藏添加活动对话框
                this.addDialogVisible = false;
                this.$message.info("取消添加住院单!");
            },
        }      
    }
</script>

<style scoped>
</style>
