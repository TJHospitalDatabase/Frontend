<template>
<!-- 药品库管理 -->
  <el-container style="height: 800px; border: 1px solid #eee">    
    <el-container>
      <el-main>
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          stripe>
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

