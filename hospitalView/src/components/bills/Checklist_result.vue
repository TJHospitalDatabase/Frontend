<template>
    <div>
        <!--面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/checklisthome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>病人相关信息查询</el-breadcrumb-item>
        <el-breadcrumb-item>项目检查结果单</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片区域 -->
        <el-card>
            <!-- 搜索区域 -->
            <el-row :gutter="20" >
                <el-col :span="8">
                    <el-input placeholder="请输入病人姓名"  v-model="r_queryInfo.r_query" clearable @clear="getCheckresultlist">
                    <el-button slot="append" icon="el-icon-search" @click="getCheckresultlist"></el-button>
                    </el-input>  
                </el-col>
            </el-row>
            <!-- 检查单表格区域 -->
            <el-table :data="checkresultlist_current" border style="width: 100%" stripe>

                <!-- 表头区域 -->
                <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="checkresultID" label="检查结果单ID" width="150"></el-table-column>
                <el-table-column prop="checkName" label="项目名称" width="150"></el-table-column>
                <el-table-column prop="doctorName" label="医生名称" width="120"></el-table-column>
                <el-table-column prop="patientID" label="病人ID" width="150"></el-table-column>
                <el-table-column prop="patientName" label="病人名称" width="120"></el-table-column>
                <el-table-column prop="checkdate" label="检查日期" width="150"></el-table-column>
                <el-table-column prop="departmentName" label="科室名称" width="160"></el-table-column>

                <!-- 项目检查单按钮区域 -->
                <el-table-column  label="项目检查结果" width="203">
                        <el-link @click="checkresultlistdialogVisible=true">结果查看<i class="el-icon-view el-icon--right"></i> </el-link>
                </el-table-column>

            </el-table>

              <!--分页设置区域 -->
                <el-pagination
                    :current-page.sync="r_queryInfo.r_pagenum"
                    :page-size="r_queryInfo.r_pagesize"
                    layout="total,prev, pager, next, jumper"
                    :total="r_total">
                </el-pagination>

            <!-- 样本结果查看对话框 -->
             <el-dialog title="检查结果" :visible.sync="checkresultlistdialogVisible" width="50%">    
                <!-- 检查单数据区域 -->                        
                <el-table :data="datalist_current" border style="width: 100%">
                <!-- 表头区域 -->
                    <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="sample" label="样本种类" width="150"></el-table-column>
                    <el-table-column prop="checkResult" label="检查结果" width="260"></el-table-column>
                    <el-table-column prop="referenceRange" label="参考范围" width="265"></el-table-column>                                      
                </el-table>

                <!--分页设置区域 -->
                <el-pagination
                    :current-page.sync="s_queryInfo.s_pagenum"
                    :page-size="s_queryInfo.s_pagesize"
                    layout="total, prev, pager, next, jumper"
                    :total="s_total">
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
        // 获取项目检查结果单函数
        async getCheckresultlist(){
            const{data:res}=await this.$http.get('r_checkresultlists',
            {params:this.r_queryInfo})
            
            if(res.mata.status!==200)
            return this.$message.error('获取项目检查结果单列表失败')

            // 返回数据
            this.checkresultlist=res.data.r_checkresultlists
            this.r_total=res.data.r_totalpage

            // 打印res
            console.log(res)
        } ,

        // 获取样本结果单函数
        async getDatalist(){
            const{data:res}=await this.$http.get('datalists',
            {params:this.s_queryInfo})
            // 验证
            if(res.mata.status!==200)
            return this.$message.error('获取样本结果单失败')

            // 返回数据
            this.datalist=res.data.datalists
            this.s_total=res.data.s_totalpage
            // 打印res
            console.log(res)
        },

    },
    created(){
        this.getCheckresultlist()
        this.getDatalist()
    },
    computed:{
        checkresultlist_current:function(){
            return this.checkresultlist.slice((this.r_queryInfo.r_pagenum-1)*this.r_queryInfo.r_pagesize,Math.min(this.r_queryInfo.r_pagenum*this.r_queryInfo.r_pagesize,this.checkresultlist.length));
        },
        datalist_current:function(){
            return this.datalist.slice((this.s_queryInfo.pagenum-1)*this.s_queryInfo.s_pagesize,Math.min(this.s_queryInfo.s_pagenum*this.s_queryInfo.s_pagesize,this.datalist.length));
        }
    },
    data(){
        return{
        //获取检查结果列表的参数对象
        r_queryInfo:{
            r_query:'',
            // 当前的页数
            r_pagenum:1,
            // 当前每页显示多少条数据
            r_pagesize:2
        },
        // 获取样本结果列表的参数对象
         s_queryInfo:{
            s_query:'',
            // 当前的页数
            s_pagenum:1,
            // 当前每页显示多少条数据
            s_pagesize:2
        },
        // 控制样本结果对话框的显示与隐藏
        checkresultlistdialogVisible:false,

        // 项目检查结果单数据
        r_total:0,
        checkresultlist:[],

        // 样本结果数据
        s_total:0,
        datalist:[],        
    }
    }
}
</script>

<style lang="less" scoped>
    
</style>