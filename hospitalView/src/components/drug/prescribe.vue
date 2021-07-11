<template>
<!-- 开药查询 -->
  <el-container style="height: 942px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>导航二</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>导航三</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-main>
        <el-container 
        style="height: 450px; 
          width: 750px; 
          border: 1px solid #eee;
          border-radius: 5px;
          margin: 85px 250px">
          <el-form :model="queryForm" 
          ref="ruleForm" 
          label-width="100px" 
          class="demo-ruleForm"
          style="margin: 120px 150px"
          >
            <el-form-item label="病人ID">
              <el-input v-model="queryForm.patientID" ></el-input>
            </el-form-item>
            <el-form-item label="病人姓名">
              <el-input v-model="queryForm.patientName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="dialogTableVisible = true">查询</el-button>
            </el-form-item>
          </el-form>
        </el-container>

        <el-dialog title="开药单" :visible.sync="dialogTableVisible">
          <el-dialog
            width="30%"
            title="药品信息"
            :visible.sync="innerVisible"
            append-to-body>
            <el-table :data="drugData2">
              <el-table-column property="drugID" label="药品编码" width="150"></el-table-column>
              <el-table-column property="drugName" label="药品名称" width="150"></el-table-column>
              <el-table-column property="shelvesID" label="货架" ></el-table-column>
            </el-table>
          </el-dialog>

          <el-container direction="vertical">
            <div style="margin-left:30px">
              <div>ID：{{queryForm.patientID}}</div>              
              <p>姓名：{{queryForm.patientName}}</p>
              <p>性别：男</p>
              <p>诊断信息：</p>
              <br/>
              <br/>
            </div>
            
            <el-table :data="drugData">
              <el-table-column property="drugClassID" label="药品编码" width="150"></el-table-column>
              <el-table-column property="drugName" label="药品名称" width="150"></el-table-column>
              <el-table-column property="drugNum" label="药品盒数" width="150"></el-table-column>
              <el-table-column property="price" label="价格" ></el-table-column>
            </el-table>

            <div class="dialog-footer" style="margin-top:30px align-items:center">
              
              <el-button type="primary" size="medium" @click="innerVisible = true">开药</el-button>
            </div>
          </el-container>
          
        </el-dialog>
  
      </el-main>
    </el-container>
    
    
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
  export default {
    data() {
      return {
        queryForm:{
          patientID:'',
          patientName:''
        },
        dialogTableVisible:false,
        innerVisible:false,
        drugData:[
          {
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
          }
        ],
        drugData2:[
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
        ]
      }
    }
  };
</script>