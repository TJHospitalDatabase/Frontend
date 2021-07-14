<template>
    <el-container>
    <!-- 主体部分 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">
        <el-main>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >单目管理</el-breadcrumb-item>
            <el-breadcrumb-item>处方单开具</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>
        <!--        卡片-->
            <!--            搜索与添加-->
            <el-row :gutter="1000">
                <el-col :span="12">
                    <!--                    搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特定内容的活动-->
                    <el-input clearable @clear="getActivityList" placeholder="请输入内容" v-model="query">
                        <el-button slot="append" icon="el-icon-search" @click="getActivityList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showAddActivity">添加处方单</el-button>
                </el-col>
            </el-row>
            <!--            活动列表 只展示一些活动信息,详细信息可在详情查看-->
            <el-table :data="prescriptionCurData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" border stripe>
                <el-table-column type="index"  label="序号" width=100></el-table-column>
                <el-table-column label="处方单id" prop="prescriptioN_ID" width=240></el-table-column>
                <el-table-column label="病人id" prop="patienT_ID" width=240></el-table-column>
                <el-table-column label="医生id" prop="doctoR_ID" width=240></el-table-column>
                <el-table-column label="开具时间" prop="sigN_DATE" width=280></el-table-column>
                <el-table-column label="临床诊断" prop="diagnosis" width=380></el-table-column>
            </el-table>
</el-main>
            <!--        添加活动对话框-->
            <el-dialog title="添加处方单" :visible.sync="addDialogVisible"
                       width="630px" top="60px" center>
                <!--            内容主体区域 放置一个表单-->
                <!--绑定到addForm中，绑定验证规则对象addFormRules 表单校验项的引用为addFormRef-->
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="150px"
                         style="height:270px">
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
                    :current-page="currentPage"
                    :page-sizes="[ 2, 5, 10]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="activityList.length">
            </el-pagination>
    </el-container>
    </el-container>
</template>

<script>
    export default {
        data()
        {
            let checkBudget = (rule, value, cb) =>
            {
                const regBudget = /^\d{1,8}\.?\d{0,2}$/;
                if (regBudget.test(value))
                {
                    //合法开销
                    return cb();
                }
                cb(new Error("费用总计必须是数字,且小于一千万!"));
            };
            return {
                //获取活动列表参数对象
                //查询到的当页活动
                activityList: [],
                showList:[],
                query:'',
                 //当前的页码
                pageNumber: 1,
                //每页显示的条数
                currentPage:1,
                pageSize: 5,

                systemDate:'',

                //添加,修改,展示活动对话框的显示与隐藏
                addDialogVisible: false,
                editDialogVisible: false,
                showDialogVisible: false,

                //添加活动表单数据
                addForm: {
                    patienT_ID: "",
                    doctoR_ID: "",
                    sigN_DATE: "",
                    diagnosis: "",
                    state: "",
                },
                showForm: {},
                //添加活动的校验规则
                addFormRules: {
                    patienT_ID: [
                        {required: true, message: '请输入病人id', trigger: 'blur'},
                        {min: 2, max: 10, message: '病人姓名必须在2-10字符之间', trigger: 'blur'}
                    ],
                    diagnosis: [
                        {required: true, message: '请输入处方单说明', trigger: 'blur'}
                    ],
                    doctoR_ID: [
                        {required: true, message: '请输入医生id', trigger: 'blur'},
                        {min: 2, max: 10, message: '医生姓名必须在2-10字符之间', trigger: 'blur'}
                    ],
                }
            };
        },
         //一开始就显示活动列表
        created()
        {
           this.getActivityList();
            let nowDate = new Date();
                        let date = {
                        year: nowDate.getFullYear(),
                        month: nowDate.getMonth() + 1,
                        date: nowDate.getDate(),
                        }
                        console.log(date);
                        let systemDate = date.year + '-' + 0 + date.month + '-' + 0 + date.date;
        },
        computed:{
        prescriptionCurData:function(){
        return this.activityList.slice((this.currentPage-1)*this.pageSize,Math.min(this.currentPage*this.pageSize,this.activityList.length));
        }
        },
        methods: {
            async getActivityList()
            {
                let result = await this.$http.get("http://101.132.106.237:5050/prescription",
                    {
                        prescriptioN_ID:""
                    });

                this.activityList = result.data.data;

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
                this.pageNumber = newPage;
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

                this.addForm.prescriptioN_ID="";
                this.addForm.patienT_ID = "";
                this.addForm.doctoR_ID = "";
                this.addForm.diagnosis = "";

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
                        let result = await this.$http.put("http://101.132.106.237:5050/prescription",
                            {data:
                            {
                                patienT_ID: this.addForm.patienT_ID,
                                doctoR_ID: this.addForm.doctoR_ID,
                                sigN_DATE: systemDate,
                                diagnosis: this.addForm.diagnosis,
                                state: false}                            
                            });
                        console.log(systemDate);
                        //隐藏添加活动对话框
                        this.addDialogVisible = false;
                        this.getActivityList();
                        this.$message.info("添加处方单成功!");
                    }
                );
            },
            //添加活动框里面的取消添加活动按钮触发的事件
            cancelAdd()
            {
                //隐藏添加活动对话框
                this.addDialogVisible = false;
                this.$message.info("取消添加处方单!");
            },
        }      
    }
</script>

<style scoped>
</style>


