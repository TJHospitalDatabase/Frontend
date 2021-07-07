<template>
    <div>
        <!--面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>病人相关信息查询</el-breadcrumb-item>
        <el-breadcrumb-item>项目检查结果单</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <!-- 搜索区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>  
                </el-col>
            </el-row>
            <!-- 检查单表格区域 -->
            <el-table :data="checkresultlist" border style="width: 100%">

                <!-- 表头区域 -->
                <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="checkdate" label="检查日期" width="200"></el-table-column>
                <el-table-column prop="checkname" label="项目名称" width="200"></el-table-column>
                <el-table-column prop="departmentName" label="科室名称" width="200"></el-table-column>
                <el-table-column prop="samplingDate" label="采样日期" width="200"></el-table-column>
                <el-table-column prop="reportDate" label="报告日期" width="200"></el-table-column>             
                <!-- 项目检查单按钮区域 -->
                <el-table-column prop="checkresult_list" label="项目检查结果" width="203">
                        <el-link @click="checkresultlistdialogVisible=true">结果查看<i class="el-icon-view el-icon--right"></i> </el-link>
                </el-table-column>

            </el-table>

            <!-- 检查结果查看对话框 -->
             <el-dialog title="检查结果" :visible.sync="checkresultlistdialogVisible" width="50%">    
                <!-- 检查单数据区域 -->                        
                <el-table :data="datalist" border style="width: 100%">
                <!-- 表头区域 -->
                    <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="sample" label="样本种类" width="150"></el-table-column>
                    <el-table-column prop="checkResult" label="检查结果" width="300"></el-table-column>
                    <el-table-column prop="referenceRange" label="参看范围" width="300"></el-table-column>                                      
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
                <el-button @click="checkresultlistdialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="checkresultlistdialogVisible= false">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
    method:{
        // 展示检查结果的对话框
        
    },
    data(){
        return{
        //获取检查结果列表的参数对象
        queryInfo:{
            query:'',
            // 当前的页数
            pagenum:1,
            // 当前每页显示多少条数据
            pagesize:4
        },
        // 控制检查结果对话框的显示与隐藏
        checkresultlistdialogVisible:false,
        // 项目检查结果单数据
        checkresultlist:[
            {checkdate:"2021/6/22",
             checkname:"常规血检验",
             departmentName:"全科",
             samplingDate:"2021/6/22",
             reportDate:"2021/6/22"
            },
        ],
        // 检查结果数据
        datalist:[
            {sample:"白细胞",
             checkResult:"1000到2000",
             referenceRange:"2000到3000"
            },
        ],
    }
    }
}
</script>

<style lang="less" scoped>
    
</style>