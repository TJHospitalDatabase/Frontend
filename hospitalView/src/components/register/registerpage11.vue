
<template>

<el-form ref="form" :model="forme" label-width="80px">
  <h3>
    
    请在下方录入病人信息
  </h3>
  <el-form-item label="姓名">
    <el-input v-model="forme.PATIENT_NAME"></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-select v-model="forme.GENDER" placeholder="请选择性别">
      <el-option label="男" value="M"></el-option>
      <el-option label="女" value="FM"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="年龄">
    <el-input v-model="forme.AGE"></el-input>
  </el-form-item>
  <el-form-item label="联系方式">
    <el-input v-model="forme.PHONE"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </el-form-item>
</el-form>
</template>


<script src="http://unpkg.com/axios/dist/axios.min.js"></script>
<script>

const axios = require('axios');
export default {
    data() {
      return {
        forme: {
          PATIENT_NAME: "",
          GENDER: "",
          AGE: "",
          PHONE: "",
        }
      }
    },
    methods: {
      async onSubmit(){
          this.forme.AGE=this.forme.AGE-0;
          const { data: res } = await this.$http.put('outPatient',
                {
                  PATIENT_NAME: this.forme.PATIENT_NAME,
                  GENDER: this.forme.GENDER,
                  AGE: this.forme.AGE,
                  PHONE: this.forme.PHONE}
                )
          console.log(res.data[0])

                // age : this.forme.age,
                // gender: this.forme.gender,
                // name: this.forme.name,
                // phone: this.forme.phone}

            // console.log(res.data)
            // // 将data属性重命名为res
            // this.patientData=res.data
            // // console.log(this.patientData)
            }

    }
}
</script>

<style>

</style>