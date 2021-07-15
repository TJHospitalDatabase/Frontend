<template>
  <!-- 开药查询 -->
  <!-- 主体部分 -->
  <el-container style="height: 500px; height:100%; border: 1px solid #eee">
    <el-main> 
      <!--面包屑导航区 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药品管理</el-breadcrumb-item>
      <el-breadcrumb-item>开药查询</el-breadcrumb-item>
      </el-breadcrumb>

      <el-container 
      style="height: 450px; 
        width: 750px; 
        border: 1px solid #eee;
        border-radius: 5px;
        margin: 85px 250px">
        <el-form :model="queryForm" 
        :rules="rules"
        ref="queryFormRef" 
        label-width="100px" 
        class="demo-ruleForm"
        style="margin: 120px 150px"
        >


          <el-form-item label="病人ID" prop="patientID">
            <el-input v-model="queryForm.patientID" ></el-input>
          </el-form-item>
          <!-- <el-form-item label="病人姓名">
            <el-input v-model="queryForm.patientName"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="queryForPrescription">查询</el-button>
          </el-form-item>
        </el-form>
      </el-container>

      <el-dialog
        title="提示"
        :visible.sync="errorVisible"
        width="30%">
        <span>{{errorMes}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="errorVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog 
        title="开药单" 
        :visible.sync="prescriptionVisible"
        width=40%>
        <el-dialog
          width="30%"
          title="药品信息"
          :visible.sync="drugDetailVisible"
          :before-close="handleCloseConfirm"
          append-to-body>
          <el-table :data="drugDetail">
            <el-table-column property="drugID" label="药品编码" width="150"></el-table-column>
            <el-table-column property="drugName" label="药品名称" width="150"></el-table-column>
            <el-table-column property="shelvesID" label="货架" ></el-table-column>
          </el-table>

          <div slot="footer" class="dialog-footer">            
            <el-button type="primary" size="medium" @click="deleteDrug">确认开药并删除药品</el-button>
            <el-button  size="medium" @click="drugDetailVisible=false">取消操作</el-button>
          </div>
        </el-dialog>
        
        <div style="margin-left:30px; font-size: 16px" >
          <p>ID：{{prescription.patientID}}</p>              
          <p>姓名：{{prescription.patientName}}</p>
          <p>性别：{{prescription.gender}}</p>
          <p>年龄：{{prescription.age}}</p>
          <p>诊断信息：{{prescription.diagnose}}</p>
          <br/>
          <br/>
        </div>
        
        <el-table :data="prescription.drugData">
          <el-table-column property="drugClassID" label="药品编码" width="150"></el-table-column>
          <el-table-column property="drugName" label="药品名称" width="150"></el-table-column>
          <el-table-column property="drugNum" label="药品盒数" width="150"></el-table-column>
          <el-table-column property="price" label="价格" ></el-table-column>
        </el-table> 

        <div slot="footer" class="dialog-footer">          
          <el-button type="primary" size="medium" v-if="prescribeButton" @click="queryForDrugInfo">开药</el-button>
        </div>
          
      </el-dialog>
    </el-main>
  </el-container>
</template>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>



<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    data() {
      return {
        queryForm:{
          patientID:'',
          patientName:''
        },
        rules: {
          patientID: [
            { required: true, message: '请输入病人ID', trigger: 'blur' }
          ]
        },
        prescriptionVisible:false,
        drugDetailVisible:false,
        errorVisible: false,
        errorMes:'',
        prescription:{
          patientID:'',
          patientName:'',
          age:'',
          gender:'',
          diagnose:'',
          
          drugData:[{
              drugClassID: "00001",
              drugName: "一号药品",
              drugNum: "2",
              price: "58.5"
            },
            {
              drugClassID: "00002",
              drugName: "二号药品",
              drugNum: "3",
              price: "20.3"
            }]
        },
        drugDetail:[
          {
            drugID:"140014",
            drugName: "一号药品",
            shelvesID:"41-78"
          },
          {
            drugID:"140156",
            drugName: "一号药品",
            shelvesID:"41-79"
          },
          {
            drugID:"225655",
            drugName: "二号药品",
            shelvesID:"07-10"
          },
          {
            drugID:"223352",
            drugName: "二号药品",
            shelvesID:"07-11"
          },
          {
            drugID:"225654",
            drugName: "二号药品",
            shelvesID:"07-16"
          }
        ],
        prescribeButton:true,
      }
    },
    methods:{
      queryForPrescription:function(){
        this.$refs.queryFormRef.validate((valid) => {
          if (valid) {
            axios
              .get("/drug/patient",{
                params:{
                  patient_ID: this.queryForm.patientID
                }
              })
              .then((response)=>{              
                if(response.data.data.length){
                  this.prescription.patientID=response.data.data[0].patienT_ID;
                  this.prescription.patientName=response.data.data[0].patienT_NAME;
                  this.prescription.age=response.data.data[0].age;
                  this.prescription.gender=(response.data.data[0].gender=='M')?"男":"女";
                  this.prescription.diagnose=response.data.data[0].diagnosis;
                  this.prescription.drugData=[];
                  
                  axios
                    .get("drug/patient/drug",{
                      params:{
                        patient_ID: this.queryForm.patientID
                      }
                    })
                    .then((response)=>{
                      console.log("test2");
                      console.log(response);
                      if(response.data.err_code==0){
                        if(response.data.data.length){
                          for(let i = 0; i < response.data.data.length; ++i){
                            this.prescription.drugData.push({
                              drugClassID: response.data.data[i].druG_CLASS_ID,
                              drugName: response.data.data[i].druG_NAME,
                              drugNum: response.data.data[i].num,
                              price: response.data.data[i].price
                            })
                          }
                          this.prescribeButton=true;
                        }
                        else{                          
                          this.prescribeButton=false;
                        }                       
                        this.prescriptionVisible=true;
                        
                      }
                      else{
                        this.errorVisible=true;
                        this.errorMes=response.data.err_desc;
                      }
                    })
                    .catch((error)=>{
                      this.errorVisible=true;
                      this.errorMes=response.data.err_desc;
                    })
                }
                else{
                  this.errorMes="该病人不存在！";
                  this.errorVisible=true;
                }
              })
              .catch((error)=>{
                this.errorVisible=true;
                this.errorMes=response.data.err_desc;
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      drugDataHandle:function(){
        let result=[];
        for(let i = 0; i < this.prescription.drugData.length; ++i){
          result.push({
            DRUG_CLASS_ID: this.prescription.drugData[i].drugClassID,
            NUMBER: this.prescription.drugData[i].drugNum
          })
        }
        return result;
      },
      queryForDrugInfo:function() {
        axios
        .put("/drug/giveDrug",this.drugDataHandle())
        .then((response)=>{
          if(response.data.err_code==0){
            console.log('test1');
            this.drugDetailVisible=true;
            this.drugDetail=[];
            for(let i=0; i<response.data.data.length; ++i){
              this.drugDetail.push({
                drugID: response.data.data[i].druG_ID,
                drugName: response.data.data[i].druG_NAME,
                shelvesID: response.data.data[i].shelveS_ID
                })
            }
          }
          else{

          }
        })
        .catch((error)=>{
          
        })
      },
      deleteResultDrug(){
        let res=[];
        for(let i=0; i<this.drugDetail.length; ++i){
          res.push({
            DRUG_ID: this.drugDetail[i].drugID
          })
        }
        return res;
      },
      deleteDrug(){
        axios
          .delete("/drug/deleteDrug",{
            data:this.deleteResultDrug()
          })
          .then((response)=>{
            this.drugDetailVisible=false;
            if(response.data.data==true){
                this.$message({
                  showClose: true,
                  message: '已删除所开药品',
                  type: 'success'
                });
                this.prescriptionVisible=false;
              }
              else{
                this.$message({
                  showClose: true,
                  message: '所开药品删除失败',
                  type: 'error'
                });
              }
          })
      },
      handleCloseConfirm(done){
        this.$confirm('确认放弃开药操作？\n如已完成开完药请取消并点击"确认开药并删除药品"')
            .then(_ => {
              done();
            })
            .catch(_ => {            
            });
      }
    }

  };
</script>