<template>
<!-- 药品库管理 -->
  <el-container style="height: 95%; border: 1px solid #eee">   
      <el-main style="height:100%">
        <el-table
          :data="drugClassCurData"
          style="width: 100%"
          stripe
          height='100%'>
          <el-table-column
            label="药品类别码"
            width="180"
            prop="drugClassID">
          </el-table-column>
          <el-table-column
            label="药品名称"
            width="180"
            prop="drugName">
          </el-table-column>
          <el-table-column
            label="药品库存"
            width="180"
            prop="inventory">
          </el-table-column>
          <el-table-column
            label="价格"
            width="130">
            <template slot-scope="scope">
              <el-input  placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.price"></el-input>
              <span v-show="!scope.row.show">{{scope.row.price}}</span>
            </template>
          </el-table-column>
          <el-table-column>
          </el-table-column>
          
          <el-table-column
            align="right"
            width="350">
            <template slot="header" slot-scope="scope" >
              <el-input
                v-model="searchDrugClassID"
                size="mini"
                placeholder="输入药品类别码搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                type="primary"
                plain
                size="mini"
                @click="queryForDrug(scope.$index, scope.row)"
                v-show="!scope.row.show">详情</el-button>
              <el-button
                size="mini"
                v-show="!scope.row.show"
                @click="handleEditPrice(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                v-show="scope.row.show"
                @click="complishEditPrice(scope.$index, scope.row)">完成</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog title="药品详情" 
        :visible.sync="drugVisible" width=75%
        :before-close="handleDrugClose">
          <el-table :data="drugCurData">
            <el-table-column property="drugClassID" label="药品类别码" width="120"></el-table-column>
            <el-table-column property="drugName" label="药品名称" width="120"></el-table-column>
            <el-table-column property="drugID" label="药品编码" width="120"></el-table-column>
            <el-table-column property="productionDate" label="生产日期" width="120"></el-table-column>
            <el-table-column property="validUntil" label="有效期至" width="120"></el-table-column>
            <el-table-column property="manufactor" label="生产企业" width="120"></el-table-column>
            <el-table-column property="shelvesID" label="货架号"></el-table-column>
            <el-table-column
            align="right"
            width='250'>
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="searchDrugID"
                size="mini"
                placeholder="输入药品编码搜索"/>
            </template>
            <template slot-scope="scope">
              <el-popconfirm
                :title="'确认删除'+scope.row.drugName+'('+scope.row.drugID+')?'"
                @confirm="deleteDrug(scope.$index, scope.row)">
                <el-button
                  type="danger"
                  plain
                  size="mini"                  
                  slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
          </el-table>
          <el-pagination
            :current-page.sync="curDrugPage"
            :page-size="drugPageSize"
            layout="total, prev, pager, next, jumper"
            :total="drugSearchData.length">
          </el-pagination>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="small" @click="deleteAllDrug">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="过期药品详情" 
        :visible.sync="drugPastVisible" width=60%>
          <el-table :data="drugPastCurData">
            <el-table-column property="drugClassID" label="药品类别码" width="120"></el-table-column>
            <el-table-column property="drugName" label="药品名称" width="120"></el-table-column>
            <el-table-column property="drugID" label="药品编码" width="120"></el-table-column>
            <el-table-column property="productionDate" label="生产日期" width="120"></el-table-column>
            <el-table-column property="validUntil" label="有效期至" width="120"></el-table-column>
            <el-table-column property="manufactor" label="生产企业" width="120"></el-table-column>
            <el-table-column property="shelvesID" label="货架号"></el-table-column>
            <el-table-column
            align="right"
            width='250'>
          </el-table-column>
          </el-table>
          <el-pagination
            :current-page.sync="curDrugPastPage"
            :page-size="drugPastPageSize"
            layout="total, prev, pager, next, jumper"
            :total="drugPast.length">
          </el-pagination>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="small" @click="deleteAllPastDrug">删除所有过期药品</el-button>
          </div>
        </el-dialog>
        
      </el-main>

      <el-footer style="margin-top:0.5%">
        <el-container width="100%">
          <div class="block">
            <el-pagination
              :current-page.sync="curPage"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="drugClassSearchData.length">
            </el-pagination>
          </div>
          <div  class='right'>
            <el-button type="danger" size="small" @click="pastDrug">过期药品统计</el-button>
          </div>
          
        </el-container>
      </el-footer>

      
  </el-container>


</template>


<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        drugClassData: [{
          drugClassID: '000001',
          drugName: '二号药品',
          inventory: 151617,
          price:20,
          show:false
        }, {
          drugClassID: '000002',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        }, {
          drugClassID: '000003',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        }, {
          drugClassID: '000004',
          drugName: '二号药品',
          inventory: 151617,
          price:20,
          show:false
        }, {
          drugClassID: '000005',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        }, {
          drugClassID: '000006',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        }, {
          drugClassID: '000007',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        },{
          drugClassID: '000008',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        },{
          drugClassID: '000009',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        },{
          drugClassID: '000010',
          drugName: '一号药品',
          inventory: 151617,
          price:20,
          show:false
        }],
        pageSize: 9,
        curPage: 1,
        searchDrugClassID:'',
        tempPrice:0,

        drugData:[{
          drugClassID: '1',
          drugName: '好耶',
          drugID: '12345',
          productionDate: '2009-06-01',
          validUntil: '2021-06-01',
          manufactor: '过期企业',
          shelvesID: '42-623'          
        }],
        curDrugPage: 1,
        drugPageSize: 10,
        searchDrugID:'',
        deletedDrug:[
        ],
        drugVisible: false,

        drugPast:[],
        curDrugPastPage: 1,
        drugPastPageSize: 10,
        deletedPastDrug:[
        ],
        drugPastVisible: false,
      }
    },
    computed:{
      drugClassSearchData(){
        return (this.drugClassData.filter(data => !this.searchDrugClassID || 
          data.drugClassID.toLowerCase().includes(this.searchDrugClassID.toLowerCase())))
      },
      drugClassCurData:function(){
        return this.drugClassSearchData.slice((this.curPage - 1) * this.pageSize,
        Math.min(this.curPage * this.pageSize, this.drugClassSearchData.length));
      },
      drugSearchData(){
        return this.drugData.filter(data => !this.searchDrugID || 
          data.drugID.toLowerCase().includes(this.searchDrugID.toLowerCase()))
      },
      drugCurData:function(){
        return this.drugSearchData.slice((this.curDrugPage - 1) * this.drugPageSize,
        Math.min(this.curDrugPage * this.drugPageSize, this.drugSearchData.length));     
      },
      drugPastCurData:function(){
        return this.drugPast.slice((this.curDrugPastPage - 1) * this.drugPastPageSize,
        Math.min(this.curDrugPastPage * this.drugPastPageSize, this.drugPast.length));
      }
    },
    methods: {
      handleEditPrice(index, row) {
        row.show=true;
        this.tempPrice=row.price;
      },
      complishEditPrice(index, row) {
        row.show=false;        
        if(!(row.price==this.tempPrice)){
          axios
            .get("/drugclass",{
              params:{
                DRUG_CLASS_ID:row.drugClassID,
                PRICE:row.price-0
              }
            })
            .then((response)=>{
              console.log(response);
              if(response.data.data==true){
                this.$message({
                    showClose: true,
                    message: '价格修改成功！',
                    type: 'success'
                  });
              }
              else{
                row.price=this.tempPrice;
                this.$message({
                    showClose: true,
                    message: '价格修改失败！',
                    type: 'else'
                  });
              }
            })
        }
      },
      handleDrugClose(done) {
        if(!(this.deletedDrug.length==0)){
          this.$confirm('确认放弃所有的删除操作？')
            .then(_ => {
              this.deletedDrug=[];
              done();
            })
            .catch(_ => {            
            });
        }
        else{
          done();
        }
      },
      queryForDrug(index, row){
        this.drugVisible=true;
        console.log(row.drugClassID);
        axios
          .get("/drug/drugclass",{
            params:{
              drug_Class_ID:row.drugClassID
              }
          })
          .then((response)=>{
            if(response.data.err_code==0){
              this.drugData=[];
              for(let i = 0; i < response.data.data.length; ++i){
                this.drugData.push({
                  drugClassID: response.data.data[i].druG_CLASS_ID,
                  drugName: response.data.data[i].druG_NAME,
                  drugID: response.data.data[i].druG_ID,
                  productionDate: response.data.data[i].productioN_DATE,
                  validUntil: response.data.data[i].valiD_UNTIL,
                  manufactor: response.data.data[i].manufactor,
                  shelvesID: response.data.data[i].shelveS_ID
                })
              }
            }
          })

      },
      deleteDrug(index, row){
        this.deletedDrug.push({
          pos:index + (this.curDrugPage - 1) * this.drugPageSize,
          drugClassID: row.drugClassID,
          drugName: row.drugName,
          drugID: row.drugID,
          productionDate: row.productionDate,
          validUntil: row.validUntil,
          manufactor: row.manufactor,
          shelvesID: row.shelvesID
        })
        this.drugData.splice(index + (this.curDrugPage - 1) * this.drugPageSize,1)
        console.log('test');
      },
      deleteResultDrug(){
        let res=[];
        for(let i=0; i<this.deletedDrug.length; ++i){
          res.push({
            DRUG_ID: this.deletedDrug[i].drugID
          })
        }
        return res;
      },
      deleteAllDrug() {
        console.log(this.deleteResultDrug());
        this.drugVisible = false;
        if(!(this.deletedDrug.length==0)){
          axios
            .delete("/drug/deleteDrug",{
              data:this.deleteResultDrug()
            })
            .then((response)=>{
              if(response.data.data==true){
                this.$message({
                  showClose: true,
                  message: '药品删除成功！',
                  type: 'success'
                });
              }
              else{
                this.$message({
                  showClose: true,
                  message: '药品删除失败',
                  type: 'error'
                });
              }
            })            
          this.deletedDrug=[];
        }

      },
      pastDrug(){
        this.drugPastVisible=true;
        axios 
          .get("drug/pastDue")
          .then((response)=>{
            if(response.data.err_code==0){
              this.drugPast=[];
              this.deletedPastDrug=[];
              for(let i=0; i<response.data.data.length; ++i){
                this.drugPast.push({
                  drugClassID:response.data.data[i].druG_CLASS_ID,
                  drugName:response.data.data[i].druG_NAME,
                  drugID:response.data.data[i].druG_ID,
                  productionDate:response.data.data[i].productioN_DATE,
                  validUntil:response.data.data[i].valiD_UNTIL,
                  manufactor:response.data.data[i].manufactor,
                  shelvesID:response.data.data[i].shelveS_ID
                })
                this.deletedPastDrug.push({
                  DRUG_ID:response.data.data[i].druG_ID
                })
              }
            }
          })

      },
      deleteAllPastDrug() {
        this.drugPastVisible = false;
        if(!(this.deletedPastDrug.length==0)){
          axios
            .delete("/drug/deleteDrug",{
              data:this.deletedPastDrug
            })
            .then((response)=>{
              console.log(response);
              if(response.data.data==true){
                this.$message({
                  showClose: true,
                  message: '所有过期药品删除成功！',
                  type: 'success'
                });
              }
              else{
                this.$message({
                  showClose: true,
                  message: '过期药品删除失败',
                  type: 'error'
                });
              }
            })
            .catch((error)=>{
              console.log(error)
            })          
          this.deletedPastDrug=[];
        }

      },
    },
    mounted(){
      axios
        .get("drugclass/all")
        .then((response)=>{
          if(response.data.err_code==0){
            this.drugClassData = [];
            for(let i=0; i<response.data.data.length; ++i){
              this.drugClassData.push({
                drugClassID: response.data.data[i].druG_CLASS_ID,
                drugName: response.data.data[i].druG_NAME,
                inventory: response.data.data[i].inventory,
                price: response.data.data[i].price,
                show: false
              })
            }

          }
        })
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

  .right {
    padding: 1% 0;
    /* margin-left: 66%; */
    position: absolute;
    left: 89%;
}
</style>

