<template>

<!-- 为避免冲突！以下代码如需改动请联系杨晶，请勿不告知改动！ --> 


<!-- 通过科室查询病房信息 -->
<el-container>
    <!-- 主体部分 -->
    <el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <!-- 数据表单 -->
            <el-main>
                <el-page-header @back="goBack" content="通过科室查询病房信息">
                </el-page-header>
                <div class="block" style="margin-top:30px;">
                <span class="demonstration" style="margin-right:10px;">请选择科室</span>
                <el-cascader
                    placeholder="可输入搜索"
                    :options="options"
                    filterable></el-cascader>
                </div>


                <el-table :data="roomList">
                    <el-table-column prop="room" label="房间号">
                    </el-table-column>
                    <el-table-column prop="deptName" label="所属科室">
                    </el-table-column>
                    <el-table-column prop="nurse" label="负责护士">
                    </el-table-column>
                    <el-table-column prop="allBed" label="总床位数">
                    </el-table-column>
                    <el-table-column prop="remainBed" label="剩余床位数">
                    </el-table-column>
                    <el-table-column prop="dailyCost" label="日均费用">
                    </el-table-column>
                </el-table>
            </el-main>
    </el-container>
 </el-container> 
</template>


<style lang="less" scoped>
.header {
background-color: #9ac7fa;
line-height: 60px;
text-align: right; 
font-size: 13px;
}

.btns{
    display: flex;
    justify-content: flex-end;
}

.side {
color: rgb(204, 10, 10);
width: 10%;
}
.search_form{
    width:100%;
    margin-top: 30px;
}
</style>


<script>
  export default {
    data() {
      return {
        roomList:[],
        patientNameSearch:{
            name:''
        },
        searchRules: {
                name: [
                    { required: true, message: '请输入科室名称', trigger: 'blur' }
                ]
        },
        options: [
        {
          value: 'zhinan',
          label: '外科',
          children: [{
            value: 'shejiyuanze',
            label: '普通外科',
          }, {
            value: 'daohang',
            label: '神经外科',
          }]
        },
        {
          value: 'zujian',
          label: '内科',
          children: [{
            value: 'basic',
            label: '少儿内科',
          }, {
            value: 'form',
            label: '神经内科',
          }, {
            value: 'data',
            label: '呼吸内科',
          }, {
            value: 'notice',
            label: '消化内科',
          }, {
            value: 'navigation',
            label: '内分泌科',
          }, {
            value: 'others',
            label: '心血管内科'
          }]
        },
        {
          value: 'ziyuan',
          label: '五官科',
          children: [{
            value: 'axure',
            label: '耳鼻喉科'
          }, {
            value: 'sketch',
            label: '眼科'
          }, {
            value: 'jiaohu',
            label: '口腔科'
          }]
        }],
      };
    },

     created () {
    this.getRoomList()
  },  

    methods:{
      async getRoomList () {
      const { data: res } = await this.$http.get('/room')
      console.log(res.data)
      this.roomList=res.data
    },
        reset(){
            //console.log(this);
            this.$refs.search14Ref.resetFields();
            return this.$message.success('你成功重置了信息！');
        },
        search(){
            //this.$router.push("/home");
        },
        goBack() {
        this.$router.push("/home");
      }
    }
  };
</script>