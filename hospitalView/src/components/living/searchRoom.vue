<template>
<!-- 查询病房信息 -->
<el-container>
    <!-- 主体部分 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <!-- 数据表单 -->
            <el-main>
                <el-page-header @back="goBack" content="查询病房信息">
                </el-page-header>

            <el-input v-model="queryRoom.rooM_ID"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入房号" ></el-input>
            <el-button type="primary" @click="search()" style="margin-left:20px;">提 交</el-button>
            <el-button type="primary"  @click="dialog = true" 
              style="margin-top:20px; margin-bottom:20px; margin-left:20px;"
              >高级搜索</el-button>

              <el-drawer
                  title="可选搜索依赖项"
                  :before-close="handleClose"
                  :visible.sync="dialog"
                  direction="ltr"
                  custom-class="demo-drawer"
                  ref="drawer"
                  >
                  <div class="demo-drawer__content">
                     <el-form ref="searchRef" :model="queryRoom"  label-width="0px" class="search_form">
                <!-- 搜索框 -->
                    <el-form-item >
                      负责护士：
                    <el-input v-model="queryRoom.nursE_NAME"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入负责护士姓名" ></el-input>
                    </el-form-item >

                    <el-form-item >
                      所属科室：
                    <el-input v-model="queryRoom.depT_NAME"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入科室名称" ></el-input>
                    </el-form-item>

                    <el-form-item >
                      价格上限：
                    <el-input v-model="queryRoom.uB"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入最高价格" ></el-input>
                    </el-form-item>

                    <el-form-item >
                      价格下限：
                    <el-input v-model="queryRoom.lB"   prefix-icon="el-icon-zoom-in" style="width:70%;" 
                        placeholder="请输入最低价格" ></el-input>
                    </el-form-item> 
                </el-form>
                    <div class="demo-drawer__footer" style="margin-left:20px;">
                      <el-button @click="cancelForm">取 消</el-button>
                      <el-button type="primary" @click="$refs.drawer.closeDrawer()"  :loading="loading">提 交</el-button>
                    </div>
                  </div>
                </el-drawer>   

                <el-table :data="roomList">
                    <el-table-column prop="rooM_ID" label="房间号">
                    </el-table-column>
                    <el-table-column prop="depT_NAME" label="所属科室">
                    </el-table-column>
                    <el-table-column prop="nursE_NAME" label="负责护士">
                    </el-table-column>
                    <el-table-column prop="capacity" label="总床位数">
                    </el-table-column>
                    <el-table-column prop="remaiN_CAPACITY" label="剩余床位数">
                    </el-table-column>
                    <el-table-column prop="price" label="日均费用" >
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
            </el-main>

          <!-- 修改病房信息的对话框 -->
          <el-dialog
            title="修改病人信息"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editDialogClosed"
          >
          <el-form
            :model="editForm"
            ref="editFormRef"
            label-width="70px"
          >
            <el-form-item label="病房号">
              <el-input v-model="editForm.rooM_ID" disabled></el-input>
            </el-form-item>
            <el-form-item label="负责护士">
              <el-input v-model="editForm.nursE_NAME"></el-input>
            </el-form-item>
            <el-form-item label="日均费用">
              <el-input v-model="editForm.price"></el-input>
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
      return {
      table: false,
      dialog: false,
      loading: false,

      formLabelWidth: '80px',
      timer: null,
  
        roomList:[],
        queryRoom:{
          rooM_ID:'',
          nursE_NAME:'',
          depT_NAME:'',
          uB:'',
          lB:'',
        },

        editDialogVisible: false,
        editForm: { },
      };
    },


    created () {
      this.getRoomList()
    },  

    methods:{
        async getRoomList () {
          this.queryRoom.uB=this.queryRoom.uB-0
          this.queryRoom.lB=this.queryRoom.uB-0
          const { data: res } =await this.$http.post('room', this.queryRoom)
          //console.log(res.data)
          this.roomList=res.data
        },

        search(){
            console.log(this.queryRoom)
            this.getRoomList()
        },

        // 编辑病房信息
        async showEditDialog (editSampleR) {
          //const { data: res } = await this.$http.post('patientinhospital', {rooM_ID:editId})
          this.editForm = editSampleR
          //this.editForm.price = this.editForm.price-0
          //console.log(editSampleR)
          console.log(this.editForm)
          this.editDialogVisible = true
        },

        // 提交修改信息
        async editRoom () {
          this.editForm.price = this.editForm.price - 0
          const { data: res } = await this.$http.put('patientinhospital', this.editForm)
          this.editDialogVisible = false
          this.$message.success('更新病房信息成功！')
          //this.getRoomList()
          console.log(res)
        },



        // 监听修改对话框的关闭事件
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
