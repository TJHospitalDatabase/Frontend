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
                    <el-input placeholder="请输入病人姓名"  v-model="r_queryInfo.PATIENT_NAME" clearable @clear="getCheckresultlist">
                    <el-button slot="append" icon="el-icon-search" @click="getCheckresultlist"></el-button>
                    </el-input>  
                </el-col>
            </el-row>
            <!-- 检查单表格区域 -->
            <el-table :data="checkresultlist_current" border style="width: 100%" stripe>

                <!-- 表头区域 -->
                <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="examinatioN_LIST_ID" label="检查结果单ID" width="150"></el-table-column>
                <el-table-column prop="examinatioN_NAME" label="项目名称" width="150"></el-table-column>
                <el-table-column prop="doctoR_NAME" label="医生名称" width="120"></el-table-column>
                <el-table-column prop="patienT_ID" label="病人ID" width="150"></el-table-column>
                <el-table-column prop="patienT_NAME" label="病人名称" width="120"></el-table-column>
                <el-table-column prop="examinatioN_DATE" label="检查日期" width="150"></el-table-column>
                <el-table-column prop="depT_NAME" label="科室名称" width="160"></el-table-column>

                <!-- 项目检查单按钮区域 -->
                <el-table-column  label="项目检查结果" width="203">
                        <el-link @click="checkresultlistdialogVisible=true">结果查看<i class="el-icon-view el-icon--right"></i> </el-link>
                </el-table-column>

            </el-table>

              <!--分页设置区域 -->
                <el-pagination
                    :current-page.sync="r_queryInfo.PAGE_NUM"
                    :page-size="r_queryInfo.PAGE_SIZE"
                    layout="total,prev, pager, next, jumper"
                    :total="r_total">
                </el-pagination>

            <!-- 样本结果查看对话框 -->
             <el-dialog title="检查结果" :visible.sync="checkresultlistdialogVisible" width="50%">    
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
    methods:{
        // 获取项目检查结果单函数
        async getCheckresultlist(){
            const{data:res}=await this.$http.get('examination/DElistPage',
            {params:this.r_queryInfo}
            )
            
            // if(res.mata.status!==200)
            // return this.$message.error('获取项目检查结果单列表失败')
            // 打印res
            console.log(res.data)
            // 返回数据
            this.checkresultlist=res.data.data
            this.r_total=res.data.totaL_PAGE
        },

        // 获取样本结果单函数
        async getDatalist(){
            const{data:res}=await this.$http.get('examination/result/listPage',
            {params:this.s_queryInfo})
            // 验证
            // if(res.mata.status!==200)
            // return this.$message.error('获取样本结果单失败')

            // 返回数据
            this.datalist=res.data.data
            this.s_total=res.data.totaL_PAGE
            // 打印res
            console.log(res.data)
            console.log(res.data.data)
        },

    },
    created(){
        this.getCheckresultlist()
        this.getDatalist()
    },
    computed:{
        checkresultlist_current:function(){
            return this.checkresultlist.slice((this.r_queryInfo.PAGE_NUM-1)*this.r_queryInfo.PAGE_SIZE,Math.min(this.r_queryInfo.PAGE_NUM*this.r_queryInfo.PAGE_SIZE,this.checkresultlist.length));
        },
        datalist_current:function(){
            return this.datalist.slice((this.s_queryInfo.pagenum-1)*this.s_queryInfo.PAGE_SIZE,Math.min(this.s_queryInfo.PAGE_NUM*this.s_queryInfo.PAGE_SIZE,this.datalist.length));
        }
    },
    data(){
        return{
        //获取检查结果列表的参数对象
        r_queryInfo:{
            PATIENT_NAME:'',
            // 当前的页数
            PAGE_NUM:1,
            // 当前每页显示多少条数据
            PAGE_SIZE:2
        },
        // 获取样本结果列表的参数对象
         s_queryInfo:{
            EXAMINATION_LIST_ID:'',
            // 当前的页数
            PAGE_NUM:1,
            // 当前每页显示多少条数据
            PAGE_SIZE:2
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