<template>
<!-- 药品库管理 -->
  <el-container style="height: 800px; border: 1px solid #eee">
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
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          stripe="true">
          <el-table-column
            label="药品类别码"
            width="180">
            <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.drugClassID"></el-input>
              <span v-show="!scope.row.show">{{scope.row.drugClassID}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="药品名称"
            width="180">
            <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.drugName"></el-input>
              <span v-show="!scope.row.show">{{scope.row.drugName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="药品库存"
            width="180">
            <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.inventory"></el-input>
              <span v-show="!scope.row.show">{{scope.row.inventory}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="价格">
            <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.price"></el-input>
              <span v-show="!scope.row.show">{{scope.row.price}}</span>
            </template>
          </el-table-column>
          
          <el-table-column
            align="right">
            <template slot="header" >
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                type="primary"
                plain
                size="mini"
                @click="dialogTableVisible = true">详情</el-button>
              <el-button
                size="mini"
                v-show="!scope.row.show"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                v-show="scope.row.show"
                @click="complishEdit(scope.$index, scope.row)">完成</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>

      <el-dialog title="药品详情" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="drugClassID" label="药品类别码" width="100"></el-table-column>
          <el-table-column property="drugName" label="药品名称" width="100"></el-table-column>
          <el-table-column property="drugID" label="药品编码" width="100"></el-table-column>
          <el-table-column property="productionDate" label="生产日期" width="100"></el-table-column>
          <el-table-column property="validUntil" label="有效期至" width="100"></el-table-column>
          <el-table-column property="manufactor" label="生产企业" width="100"></el-table-column>
          <el-table-column property="shelvesID" label="货架号"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="dialogTableVisible = false">确 定</el-button>
        </div>
      </el-dialog>

    </el-container>
  </el-container>


</template>


<script>
  export default {
    data() {
      return {
        tableData: [{
          drugClassID: '000001',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        }, {
          drugClassID: '000001',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        }, {
          drugClassID: '000001',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        }, {
          drugClassID: '000001',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        }, {
          drugClassID: '000001',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        }, {
          drugClassID: '000001',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        }, {
          drugClassID: '000001',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        },{
          drugClassID: '000001',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        },{
          drugClassID: '000001',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        },{
          drugClassID: '000001',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        }],
        search:'',
        gridData:[{

        }],
        dialogTableVisible: false,
      }
    },
    methods: {
      handleEdit(index, row) {
        row.show=true;
      },
      complishEdit(index, row) {
        row.show=false;
      },
      
    }
  }
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

