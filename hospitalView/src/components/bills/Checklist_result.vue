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
                    <el-input placeholder="请输入搜索内容" v-model="searchgoal" clearable 
                    @clear="getCheckresultlist">
                    <el-button slot="append" icon="el-icon-search" @click="frontSearch"></el-button>

                    <!-- <el-input placeholder="请输入搜索内容"  v-model="r_queryInfo.PATIENT_NAME" clearable @clear="getCheckresultlist">
                    <el-button slot="append" icon="el-icon-search" @click="getCheckresultlist"></el-button> -->
                    </el-input>  
                </el-col>
            </el-row>
            <!-- 检查单表格区域 -->
            <el-table :data="checkresultlist_current" border style="width: 100%" stripe>

                <!-- 表头区域 -->
                <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="examinatioN_LIST_ID" label="检查项目ID" width="120"></el-table-column>
                <el-table-column prop="examinatioN_NAME" label="检查项目名称" width="150"></el-table-column>
                 <el-table-column prop="examinatioN_DATE" label="检查日期" width="120"></el-table-column>
                <el-table-column prop="doctoR_NAME" label="医生姓名" width="120"></el-table-column>
                <el-table-column prop="patienT_ID" label="病人ID" width="100"></el-table-column>
                <el-table-column prop="patienT_NAME" label="病人姓名" width="120"></el-table-column> 
                 <el-table-column prop="diagnosis" label="临床诊断" width="120"></el-table-column>
                <el-table-column prop="depT_NAME" label="科室" width="120"></el-table-column>

                <!-- 项目检查单按钮区域 -->
                <el-table-column  label="项目检查结果" width="150">
                     <template slot-scope="scope">
                        <el-link @click="getDatalist(scope.row.examinatioN_LIST_ID)">结果查看<i class="el-icon-view el-icon--right"></i> </el-link>
                     </template>
                </el-table-column>

            </el-table>

              <!--分页设置区域 -->
                <el-pagination
                    :current-page.sync="r_queryInfo.PAGE_NUM"
                    :page-size="r_queryInfo.PAGE_SIZE"
                    layout="total,prev, pager, next, jumper"
                    :total="checkresultlist.length">
                </el-pagination>

            <!-- 样本结果查看对话框 -->
             <el-dialog title="检查结果" :visible.sync="checkresultlistdialogVisible" width="50%" center>
   
                <!-- 检查单数据区域 -->                        
                <el-table :data="datalist_current" border style="width: 100%">
                <!-- 表头区域 -->
                    <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="resulT_NAME" label="样本种类" width="150"></el-table-column>
                    <el-table-column prop="resulT_NUM" label="检查结果" width="260"></el-table-column>
                    <el-table-column prop="resulT_RANGE" label="参考范围" width="255"></el-table-column>                                      
                </el-table>

                <!--分页设置区域 -->
                <el-pagination
                    :current-page.sync="s_queryInfo.PAGE_NUM"
                    :page-size="s_queryInfo.PAGE_SIZE"
                    layout="total, prev, pager, next, jumper"
                    :total=" datalist.length">
                </el-pagination>

                <!-- 底部按钮区域 -->
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="checkresultlistdialogVisible= false">确 定</el-button>
                </span>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
export default {
    methods:{
        // 搜索
        frontSearch(){
        const searchgoal=this.searchgoal
        if(searchgoal){
            this.checkresultlist=this.checkresultlist.filter(data=>{
                return Object.keys(data).some(key=>{
                    return String(data[key]).toLowerCase().indexOf(searchgoal)>-1
                })
            })
        }
            console.log(this.checkresultlist)
        },


        // 获得检查项目
        async getCheckresultlist(){
            const{data:res}=await this.$http.get('patient/examination',
            {params:""}
            )
            //过滤数据
            this.checkresultlist=res.data
            if (res.err_code != "0000") 
            {this.$message.error('获得检查项目失败！')}
            // 打印res
            // 返回数据
            this.checkresultlist=this.checkresultlist.filter(val=>{
                return val.state==true
            })
        },

        // 获取样本结果单函数
        async getDatalist(id){
            this.checkresultlistdialogVisible=true
            const{data:res}=await this.$http.get('examination/result/listPage',
            {
                params:{EXAMINATION_LIST_ID:id}                             
            })
            // 验证
            if (res.err_code != "0000") 
            {this.$message.error('获取样本结果单失败！')}
            this.datalist=res.data.data
            // 打印res
            console.log(res.data)
        },
    },

    created(){
        this.getCheckresultlist()
    },

    computed:{
        checkresultlist_current:function(){
            return this.checkresultlist.slice((this.r_queryInfo.PAGE_NUM-1)*this.r_queryInfo.PAGE_SIZE,Math.min(this.r_queryInfo.PAGE_NUM*this.r_queryInfo.PAGE_SIZE,this.checkresultlist.length));
        },
        datalist_current:function(){
            return this.datalist.slice((this.s_queryInfo.PAGE_NUM-1)*this.s_queryInfo.PAGE_SIZE,Math.min(this.s_queryInfo.PAGE_NUM*this.s_queryInfo.PAGE_SIZE,this.datalist.length));
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
        checkresultlist:[],
        // 样本结果数据
        datalist:[], 
              
        searchgoal:"",
    }
    }
}
</script>

<style lang="less" scoped>
    
</style>