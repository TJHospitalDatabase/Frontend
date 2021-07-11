<template>
<!-- 处方单开具 -->
    <div>
        <!--        面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">单目管理</el-breadcrumb-item>
            <el-breadcrumb-item>处方单管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>
        <!--        卡片-->
        <el-card class="box-card">
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
            <el-table :data="activityList">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="处方单名称" prop="name"></el-table-column>
                <el-table-column label="处方单位置" prop="place"></el-table-column>
                <el-table-column label="处方单状态" prop="status"></el-table-column>
                <el-table-column label="显示详情">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="showDialog(scope.row.activityId)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--                        修改按钮-->
                        <el-button type="primary" @click="showEditDialog(scope.row.activityId)"
                                   icon="el-icon-edit"></el-button>
                        <!--                        删除按钮-->
                        <el-button type="primary" @click="removeById(scope.row.activityId)"
                                   icon="el-icon-delete"></el-button>

                    </template>
                </el-table-column>
            </el-table>

            <!--        添加活动对话框-->
            <el-dialog title="添加处方单" :visible.sync="addDialogVisible"
                       width="630px" top="60px" center>
                <!--            内容主体区域 放置一个表单-->
                <!--绑定到addForm中，绑定验证规则对象addFormRules 表单校验项的引用为addFormRef-->
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="150px"
                         style="height:385px">
                    <!-- prop属性指定验证规则-->
                    <el-form-item label="处方单名称:" prop="name">
                        <!--v-model双向绑定-->
                        <el-input style="width: 82%;" v-model="addForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="处方单介绍:" prop="description">
                        <el-input style="width: 82%;" type="textarea"
                                  :autosize="{ minRows: 3, maxRows: 4}" v-model="addForm.description"></el-input>
                    </el-form-item>
                    <el-form-item label="费用总计:" prop="budget">
                        <el-input style="width: 82%;" v-model="addForm.budget"></el-input>
                    </el-form-item>
                    <el-form-item label="开具科室：" prop="place">
                        <el-select v-model="addForm.place" placeholder="请选择开具科室" style="width: 360px">
                            <el-option label="科室a" value="科室a"></el-option>
                            <el-option label="科室b" value="科室b"></el-option>
                            <el-option label="科室c" value="科室c"></el-option>
                            <el-option label="科室d" value="科室d"></el-option>
                            <el-option label="科室e" value="科室e"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开具时间:" prop="eventTime">
                        <el-date-picker type="date" placeholder="选择日期" v-model="addForm.eventTime"
                                        style="width: 360px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="是否公开:" prop="isPublic">
                        <el-switch v-model="addForm.isPublic"></el-switch>
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
                    :current-page="pageNumber"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
            </el-pagination>
        </el-card>
    </div>
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

                query: '',
                //当前的页码
                pageNumber: 1,
                //每页显示的条数
                pageSize: 5,
                //总条数,用于分页的显示
                totalCount: 0,

                //添加,修改,展示活动对话框的显示与隐藏
                addDialogVisible: false,
                editDialogVisible: false,
                showDialogVisible: false,

                //添加活动表单数据
                addForm: {
                    name: "",
                    description: "",
                    budget: "",
                    place: "",
                    eventTime: "",
                    isPublic: true
                },
                showForm: {},
                editForm: {},
                //添加活动的校验规则
                addFormRules: {
                    name: [
                        {required: true, message: '请输入处方单名称', trigger: 'blur'},
                        {min: 2, max: 10, message: '处方单名称必须在2-10字符之间', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请输入处方单描述', trigger: 'blur'}
                    ],
                    budget: [
                        {required: true, message: '请输入费用总计', trigger: 'blur'},
                        {validator: checkBudget, trigger: "blur"}
                    ],
                    place: [
                        {required: true, message: '请输入开具科室', trigger: 'blur'},
                    ],
                    eventTime: [
                        {required: true, message: '请输入开具时间', trigger: 'blur'},
                    ]
                }
            };
        },
        methods: {
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

                this.addForm.name = "";
                this.addForm.description = "";
                this.addForm.budget = "";
                this.addForm.place = "";
                this.addForm.eventTime = '';
                this.addForm.isPublic = true;
            },
            addActivity()
            {
                this.$refs.addFormRef.validate(
                    async valid =>
                    {
                        if (!valid) return;
                        let result = await this.$http.post(this.$api.PrincipalAddOneActivityUrl,
                            {
                                activityId: 0,
                                name: this.addForm.name,
                                eventTime: this.addForm.eventTime,
                                budget: parseFloat(this.addForm.budget),
                                place: this.addForm.place,
                                description: this.addForm.description,
                                isPublic: this.addForm.isPublic
                            });

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


