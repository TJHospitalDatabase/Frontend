<template>
<!-- 查询病床信息 -->
<el-container>
    <!-- 主体部分 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <!-- 数据表单 -->
            <el-main>
              <!--面包屑导航区-->
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>住院管理</el-breadcrumb-item>
            <el-breadcrumb-item>病床信息查询</el-breadcrumb-item>
            </el-breadcrumb>
            <el-card>
            <el-input v-model="searchGoal"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入搜索信息" ></el-input>
            <el-button icon="el-icon-search" circle @click="frontSearch" style="margin-left:20px;"></el-button>
              <el-button type="primary" plain  @click="dialog = true" 
              style="margin-top:20px; margin-bottom:20px; margin-left:20px;"
              >高级筛选</el-button>

              <el-drawer
                  title="可选搜索依赖项"
                  :before-close="handleClose"
                  :visible.sync="dialog"
                  direction="ltr"
                  custom-class="demo-drawer"
                  ref="drawer"
                  >
                  <div class="demo-drawer__content">
                     <el-form ref="searchRef" :model="queryRoom"  :rules="searchRoomFormRules" label-width="0px" class="search_form">
                <!-- 搜索框 -->
                    <!-- <el-form-item prop="nursE_NAME">
                      负责护士：
                    <el-input v-model="queryRoom.nursE_NAME"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入负责护士姓名" ></el-input>
                    </el-form-item > -->

                    <el-form-item prop="depT_NAME">
                      所属科室：
                    <el-input v-model="queryRoom.depT_NAME"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入科室名称" ></el-input>
                    </el-form-item>

                    <el-form-item prop="uB">
                      价格上限：
                    <el-input v-model="queryRoom.uB"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入最高价格" ></el-input>
                    </el-form-item>

                    <el-form-item prop="lB">
                      价格下限：
                    <el-input v-model="queryRoom.lB"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入最低价格" ></el-input>
                    </el-form-item> 
                </el-form>
                    <div class="demo-drawer__footer" style="margin-left:20px;">
                      <el-button @click="cancelForm">取 消</el-button>
                      <el-button type="primary" @click="search"  :loading="loading">提 交</el-button>
                    </div>
                  </div>
              </el-drawer>   

                <el-table :data="roomList.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe border>
                    <el-table-column prop="beD_ID" label="床号">
                    </el-table-column>
                    <el-table-column prop="depT_NAME" label="所属科室">
                    </el-table-column>
                    <el-table-column prop="nursE_NAME" label="负责护士">
                    </el-table-column>
                    <el-table-column prop="price" label="日均费用" >
                    </el-table-column>
                    <el-table-column prop="iS_USED" label="是否使用" :formatter="stateFormat">
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          icon="el-icon-edit"
                          size="mini"
                          circle
                          @click="showEditDialog(scope.row)"
                        ></el-button>
                        </template>
                      </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <div class="block" style="margin-top:15px;">
                    <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                    :current-page="currentPage" 
                    :page-sizes="[2,5,10,20]" 
                    :page-size="pageSize" 
                    layout="total, sizes, prev, pager, next, jumper" 
                    :total="roomList.length">
                    </el-pagination>
                </div>
            </el-card>
            </el-main>

          <!-- 修改病床信息的对话框 -->
          <el-dialog
            title="修改病床信息"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editDialogClosed"
            :rules="editRoomFormRules"
          >
          <el-form
            :model="editForm"
            ref="editFormRef"
            label-width="70px"
            :rules="editRoomFormRules"
          >
            <el-form-item label="病床号" prop="beD_ID">
              <el-input v-model="editForm.beD_ID" disabled></el-input>
            </el-form-item>
            <el-form-item label="负责护士" prop="nursE_NAME">
              <el-input v-model="editForm.nursE_NAME" @input="change($event)"></el-input>
            </el-form-item>
            <el-form-item label="日均费用" prop="price">
              <el-input v-model.number="editForm.price" @input="change($event)"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editRoom">确 定</el-button>
          </span>
        </el-dialog>
          
    </el-container>
 </el-container> 
</template>


<script>
  export default {
    data() {
       // 自定义手机号规则
      var checkDept = (rule, value, callback) => {
        const nameReg = /(.+(?=[科]$))/
        if (nameReg.test(value)) {
          return callback()
        }
        // 返回一个错误提示
        callback(new Error('请输入正确的科室名称'))
      }

      return {      
        table: false,
        dialog: false,
        loading: false,
        searchGoal:'',

        currentPage: 1, // 当前页码（默认值）
        total: 20, // 总条数（默认值）
        pageSize: 10, // 每页的数据条数（默认值）

        formLabelWidth: '80px',
        timer: null,

        roomList:[],
        queryRoom:{
          beD_ID:'',
          nursE_NAME:'',
          depT_NAME:'',
          uB:'2000',
          lB:'',
        },

        editDialogVisible: false,
        editForm: {},

        //表单输入验证
        searchRoomFormRules:{
          nursE_NAME:[
            { min: 2, max: 4, message: '请输入合法姓名', trigger: 'blur'},
            { type:'string', message: '请输入合法姓名', trigger: 'blur'},
          ],
          depT_NAME:[
            { min: 2, max: 6, message: '请输入合法的科室名称', trigger: 'blur'},
            { type:'string', message: '请输入合法的科室名称', trigger: 'blur'},
            { validator: checkDept, trigger: 'blur' }
          ],
          // uB:[
          //   { type:'number', message: '请输入数字', trigger: 'blur'},
          // ],
          // lB:[
          //   { type:'number', message: '请输入数字', trigger: 'blur'},
          // ]
        },

        editRoomFormRules:{
          nursE_NAME:[
            { required: true, message: '请输入负责护士姓名', trigger: 'blur' },
            { min: 2, max: 4, message: '请输入合法姓名', trigger: 'blur'},
            { type:'string', message: '请输入合法姓名', trigger: 'blur'},
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' },
            { type:'number', message: '请输入数字', trigger: 'blur'},
          ],
        },
      };
    },

    created () {
      this.getRoomList()
    },  

    methods:{
      stateFormat(row, column) {
    if (row.iS_USED === true) {
      return '是'
    } else  {
      return '空床位'
    } 
  },
       // 模糊搜索
      async frontSearch () {
         this.queryRoom.uB=this.queryRoom.uB-0
          this.queryRoom.lB=this.queryRoom.lB-0
          const { data: res } =await this.$http.post('room', this.queryRoom)
          //console.log(res.data)
          this.roomList=res.data
          
        const searchGoal = this.searchGoal
        if (searchGoal) {
          // filter() 方法过滤
          this.roomList = this.roomList.filter(data => {
              return Object.keys(data).some(key => {
              // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置
              return String(data[key]).toLowerCase().indexOf(searchGoal) > -1
            })
          })
        }
        console.log('模糊搜索的结果如下')
        console.log(this.roomList)
      },

        async getRoomList () {
          this.queryRoom.uB=this.queryRoom.uB-0
          this.queryRoom.lB=this.queryRoom.lB-0
          const { data: res } =await this.$http.post('room', this.queryRoom)
          console.log('后端get到的病床结果如下')
          console.log(res.data)
          this.roomList=res.data
        },

        search(){
          console.log('请求数据的依赖参数queryRoom内容如下')
          console.log(this.queryRoom)
          this.$refs.searchRef.validate( valid => {
            if (!valid){ 
              this.$message.warning('请填写正确的信息！')
              return}
            this.getRoomList()
            this.$refs.drawer.closeDrawer()
           })              
        },

        // 编辑病床信息
        async showEditDialog (editSampleR) {
          //const { data: res } = await this.$http.post('patientinhospital', {beD_ID:editId})
          this.editForm = editSampleR

          console.log('要编辑的病床的原信息为：')
          console.log(this.editForm)

          this.editDialogVisible = true
        },

        // 提交修改信息
        editRoom () {
          this.editForm.price = this.editForm.price - 0

          console.log('填写的put修改请求参数为（床号，护士姓名，价格）：')
          console.log(this.editForm.beD_ID,this.editForm.nursE_NAME,this.editForm.price)      
          
          this.$refs.editFormRef.validate(async valid => {
            if (!valid) {
              this.$message.warning('请填写正确的信息！')
              return}

           const { data: res } = await this.$http.put('room', {
              BED_ID:this.editForm.beD_ID,
              NURSE_NAME:this.editForm.nursE_NAME,
              PRICE:this.editForm.price 
            })

            this.editDialogVisible = false         
            this.$message.success('更新病床信息成功！')
            
            console.log('后端对此put请求的返回结果：')
            console.log(res)
            this.getRoomList()
         })      

        },

        change(e){
          this.$forceUpdate()
        },
        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
            this.currentPage = 1;
            this.pageSize = val;
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
            this.currentPage = val;
        },
        //监听修改对话框的关闭事件
        editDialogClosed () {
          this.editForm.price = this.editForm.price-0
          this.$refs.editFormRef.resetFields()
        },
        handleClose(done) {
          if (this.loading) {
            return;
          }
          this.$confirm('确定要提交搜索信息吗？')
            .then(_ => {
              this.loading = true;
              this.timer = setTimeout(() => {
                done();
                // 动画关闭需要一定的时间
                setTimeout(() => {
                  this.loading = false;
                }, 0);
              }, 0);
            this.search();
            })
            .catch(_ => {});
        },

        cancelForm() {
          this.loading = false;
          this.dialog = false;
          clearTimeout(this.timer);
        },
        goBack() {
        this.$router.push("/home");
        },
    }
  };
</script>

<style lang="less" scoped>
  .search_form{
      width:100%;
      margin-top: 30px;
      margin-left: 30px;
  }
  .el-input{
    width:50%;
  }
</style>
