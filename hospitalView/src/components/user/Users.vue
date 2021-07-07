<template>
    <div>

        <!--面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" >
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>病人相关信息查询</el-breadcrumb-item>
        <el-breadcrumb-item>病人详细信息</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区 -->
        <el-card >

            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>  
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="adddialogVisible=true">添加用户
                    </el-button>
                </el-col>
            </el-row>

            <!-- 病人列表区域 -->
            <el-table :data="userlist" border style="width: 100%">

                <!-- 表头区域 -->
                <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="patientID" label="病人ID" width="150"></el-table-column>
                <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                <el-table-column prop="gender" label="性别" width="120"></el-table-column>
                <el-table-column prop="age" label="年龄" width="120"></el-table-column>
                <el-table-column prop="contact" label="联系方式" width="300"></el-table-column>
                <el-table-column prop="patientType" label="病人类型" width="120"></el-table-column>
                <!-- 项目检查单按钮区域 -->
                <el-table-column prop="check_list" label="项目检查单" width="150">
                        <el-link @click="showchecklist()">项目检查单<i class="el-icon-view el-icon--right"></i> </el-link>
                </el-table-column>

                <!-- 按钮区域 -->
                <el-table-column fixed="right" label="操作" width="100">
                        <!-- 编辑信息按钮 -->
                        <el-button @click="showEditDialog()" type="primary" icon="el-icon-edit" circle size="small"></el-button>          
                         <!-- 删除信息按钮 -->
                        <el-button @click="remove()" type="danger" icon="el-icon-delete" circle size="small" ></el-button>
                </el-table-column>
            </el-table>

            <!-- 分页设置区域 -->
               <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="queryInfo.pagesize"
                    layout="total, prev, pager, next, jumper"
                    :total="4">
                </el-pagination>

            <!--添加病人对话框 -->
                <el-dialog title="添加病人信息" :visible.sync="adddialogVisible" width="30%" @close="addDialogClosed">
                    <!-- 内容主体区域-->
                    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                        <el-form-item label="病人ID" prop="patientID">
                        <el-input v-model="addForm.patientID"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                        <el-form-item label="姓名" prop="name">
                        <el-input v-model="addForm.name"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                        <el-form-item label="性别" prop="gender">
                        <el-input v-model="addForm.gender"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                        <el-form-item label="年龄" prop="age">
                        <el-input v-model="addForm.age"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                        <el-form-item label="联系方式" prop="contact">
                        <el-input v-model="addForm.contact"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                        <el-form-item label="类型" prop="type">
                        <el-input v-model="addForm.type"></el-input>
                        </el-form-item>
                    </el-form>
                    <!--底部区域  -->
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="adddialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="adddialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>

            <!-- 修改病人信息对话框 -->
                <el-dialog title="修改病人信息" :visible.sync="editdialogVisible" width="30%">
                    <!-- 主体区域 -->
                    <el-form :model="editForm" :rules="editFormRules" ref="addFormRef" label-width="70px">
                        <el-form-item label="病人ID" prop="patientID">
                        <el-input v-model="editForm.patientID"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="editForm" :rules="editFormRules" ref="addFormRef" label-width="70px">
                        <el-form-item label="姓名" prop="name">
                        <el-input v-model="editForm.name"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="editForm" :rules="editFormRules" ref="addFormRef" label-width="70px">
                        <el-form-item label="性别" prop="gender">
                        <el-input v-model="editForm.gender"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="editForm" :rules="editFormRules" ref="addFormRef" label-width="70px">
                        <el-form-item label="年龄" prop="age">
                        <el-input v-model="editForm.age"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="editForm" :rules="editFormRules" ref="addFormRef" label-width="70px">
                        <el-form-item label="联系方式" prop="contact">
                        <el-input v-model="editForm.contact"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="editForm" :rules="editFormRules" ref="addFormRef" label-width="70px">
                        <el-form-item label="类型" prop="type">
                        <el-input v-model="editForm.type"></el-input>
                        </el-form-item>
                    </el-form>
                    <!-- 底部按钮区域 -->
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="editdialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="editdialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>

            <!--查看项目检查单对话框 -->
                <el-dialog title="项目检查单" :visible.sync="checklistdialogVisible" width="50%">
                    <!-- 搜索框区域 -->
                    <el-row :gutter="20">
                        <el-col :span="12">
                        <el-input placeholder="请输入检查单号" v-model="queryInfo.query" clearable>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>  
                        </el-col>
                    </el-row>
                    <!-- 检查单数据区域 -->                        
                    <el-table :data="checklist" border style="width: 100%">
                    <!-- 表头区域 -->
                        <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                        <el-table-column prop="date" label="开具日期" width="150"></el-table-column>
                        <el-table-column prop="checkname" label="项目检查名称" width="250"></el-table-column>
                        <el-table-column prop="diagnose" label="临床诊断" width="277"></el-table-column>                                      
                    </el-table>
                    <!--分页设置区域 -->
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage3"
                        :page-size="100"
                        layout="prev, pager, next, jumper"
                        :total="1000">
                    </el-pagination>
                    <!-- 底部按钮区域 -->
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="checklistdialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="checklistdialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
    methods: {
    //  展示编辑用户的对话框
    showEditDialog(){
        this.editdialogVisible=true
    },
    // 展示删除用户的对话框
   remove() {
        this.$confirm('此操作将永久删除该病人, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
    },
    // 查看项目检查单的对话框
    showchecklist(){
        this.checklistdialogVisible=true
    },
    //监听添加用户对话框的关闭事件
    addDialogClosed(){
        this.$refs.addFormRef.resetFields()
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
        // 控制添加用户对话框的显示与隐藏
        adddialogVisible:false,
        // 控制修改用户对话框的显示与隐藏
        editdialogVisible:false,
        // 控制项目检查单对话框的显示与隐藏
        checklistdialogVisible:false,
        //添加用户的表单数据 
        addForm:{},
        // 添加表单的验证规则对象
        addFormRules: {
        },
        //修改用户的表单数据 
        editForm:{},
        // 修改表单的验证规则对象
        editFormRules: {
        },
        // 项目检查单的表单数据

        // 用户列表
        userlist: [{
          patientID: '007',
          name: '哆啦A梦',
          gender: '男',
          age: '3',
          contact: '10086',
          patientType: '住院'
        }, {
          patientID: '007',
          name: '哆啦A梦',
          gender: '男',
          age: '3',
          contact: '10086',
          patientType: '住院'
        }, {
          patientID: '007',
          name: '哆啦A梦',
          gender: '男',
          age: '3',
          contact: '10086',
          patientType: '住院'
        }, {
          patientID: '007',
          name: '哆啦A梦',
          gender: '男',
          age: '3',
          contact: '10086',
          patientType: '住院'
        }],

        //项目检查单表
        checklist:[
            {date:"2021/6/22",
             checkname:"常规血检验",
             diagnose:"呼吸道炎症"
            },
            {date:"2021/5/21",
            checkname:"常规血检验",
             diagnose:"呼吸道炎症"
            },
            {date:"2021/2/21",
             checkname:"常规血检验",
             diagnose:"呼吸道炎症"
            },
        ]
      }
    }
}
</script>

<style lang="less" scoped>
</style>