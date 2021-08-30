<template>
    <el-card>
        <!--搜索与添加-->
        <el-row :gutter="100">
            <el-col :span="8">
                <!--搜索取消时也会刷新搜索页面,搜索确定时,将携带query搜索特定内容的活动-->
                <el-input clearable @clear="getActivityList" placeholder="请输入处方单id" v-model="search">
                    <el-button slot="append" icon="el-icon-search" @click="getActivityList"></el-button>
                </el-input>
            </el-col>

            <el-col :span="4">
                <el-button type="primary" @click="showAddActivity" label="right">添加处方单</el-button>
            </el-col>
        </el-row>

        <!--活动列表 只展示一些活动信息,详细信息可在详情查看-->
        <el-table :data="prescriptionCurData" border stripe>
            <el-table-column type="index"  label="序号" width=100></el-table-column>
            <el-table-column label="处方单id" prop="prescriptioN_ID" width=240></el-table-column>
            <el-table-column label="病人id" prop="patienT_ID" width=240></el-table-column>
            <el-table-column label="医生id" prop="doctoR_ID" width=240></el-table-column>
            <el-table-column label="开具时间" prop="sigN_DATE" width=280></el-table-column>
            <el-table-column label="临床诊断" prop="diagnosis" width=380></el-table-column>
        </el-table>

        <!--添加活动对话框-->
        <el-dialog title="添加处方单" :visible.sync="addDialogVisible"
            width="630px" top="60px" center>
            <!--内容主体区域 放置一个表单-->
            <!--绑定到addForm中，绑定验证规则对象addFormRules 表单校验项的引用为addFormRef-->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="150px"
                style="height=340px">
                <el-form-item label="病人id:" prop="patienT_ID">
                    <!--v-model双向绑定-->
                    <el-input style="width: 82%;" v-model="addForm.patienT_ID"></el-input>
                </el-form-item>

                <el-form-item label="医生id:" prop="doctoR_ID">
                    <!--v-model双向绑定-->
                    <el-input style="width: 82%;" :disabled='false' v-model="addForm.doctoR_ID"></el-input>
                </el-form-item>
                
                <el-form-item label="临床诊断:" prop="diagnosis">
                    <el-input style="width: 82%;" type="textarea"
                        :autosize="{ minRows: 3, maxRows: 4}" v-model="addForm.diagnosis"></el-input>
                </el-form-item>

                <el-form-item
                    v-for="(domain, index) in addForm.domains"
                    :label="'药品' + (index+1)"
                    :key="domain.key"
                    :prop="domain.drug"
                    :rules="{
                    required: true, message: '药品不能为空', trigger: 'blur'
                    }"
                    :inline-message='true'
                >                           
                    <el-select v-model="domain.drug"  placeholder="请选择药品" style="width: 40%">
                        <el-option v-for="item in options"
                            :key="item.drugClassID"
                            :label="item.drugName"
                            :value="item.drugClassID">
                        </el-option>
                    </el-select>
                    <el-input v-model="domain.num" style="width: 30%" placeholder="药品数量"></el-input>
                    <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="addDomain">新增药品</el-button>
                </el-form-item>
            </el-form>

            <!--            底部区域-->
            <span slot="footer" class="dialog-footer">
                <el-button style="margin-right:20px" @click="cancelAdd">取 消</el-button>
                <el-button style="margin-left:20px" type="primary" @click="addActivity">确 定</el-button>
            </span>
        </el-dialog>
        <br>

        <!--分页区域-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[ 2, 5, 10]"
            :page-size.sync="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="prescriptionSearchData.length">
        </el-pagination> 
    </el-card>
</template>

<script>
    import axios from 'axios';
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
                options:[],
                //获取活动列表参数对象
                //查询到的当页活动
                activityList: [],
                search:'',
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
                    domains:[
                    ],
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
        },

        mounted(){
            axios
                .get("drugclass/all")
                .then((response)=>{
                    if(response.data.err_code==0){
                        this.options = [];
                        for(let i=0; i<response.data.data.length; ++i){
                            this.options.push({
                                drugClassID: response.data.data[i].druG_CLASS_ID,
                                drugName: response.data.data[i].druG_NAME
                            })
                        }
                    }
                })
                //console.log(this.options);
        },

        computed:{
            prescriptionSearchData(){
                return (this.activityList.filter(data => !this.search || 
                data.prescriptioN_ID.toLowerCase().includes(this.search.toLowerCase())))
            },
            prescriptionCurData:function(){
                return this.prescriptionSearchData.slice((this.currentPage - 1) * this.pageSize,
                Math.min(this.currentPage * this.pageSize, this.prescriptionSearchData.length));
            }
        },

        methods: {
            addDomain() {
                this.addForm.domains.push({
                num: '',
                key: Date.now()
                });
            },

            removeDomain(item) {
                let index = this.addForm.domains.indexOf(item);
                if (index !== -1) {
                    this.addForm.domains.splice(index, 1)
                }
            },

            async getActivityList()
            {
                let result = await this.$http.get("http://101.132.106.237:5050/prescription",
                    {
                        prescriptioN_ID:""
                    }
                );

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

                this.addForm.patienT_ID = "";
                this.addForm.doctoR_ID = this.$route.query.id;
                this.addForm.diagnosis = "";
            },

            queryForm(){
                let nowDate = new Date();
                let date = {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate(),
                }
                let systemDate = date.year + '-' + 0 + date.month + '-' + date.date;
                let res={};
                res.patienT_ID= this.addForm.patienT_ID;
                res.doctoR_ID= this.addForm.doctoR_ID;
                res.sigN_DATE= systemDate;
                res.diagnosis=this.addForm.diagnosis;

                let res1=[];
                for(let i=0; i < this.addForm.domains.length; ++i){
                    res1.push({
                        DRUG_CLASS_ID:this.addForm.domains[i].drug,
                        NUM:this.addForm.domains[i].num-0
                    })
                }
                res.ad=res1;
                
                return res
            },

            addActivity()
            {
                //console.log('this.addForm');

                //console.log(this.queryForm());
                this.$refs.addFormRef.validate(
                    async valid =>
                    {
                        if (!valid) return;
                         
                        
                        let result = await this.$http.put("http://101.132.106.237:5050/prescription",this.queryForm());
                        //隐藏添加活动对话框
                        this.addDialogVisible = false;
                        this.getActivityList();
                        if (result.data.err_code !=="0000"&&result.data.err_info!=="Operation is not valid due to the current state of the object.") 
                            return this.$message.error('增加失败！');        
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


