<template>
<el-container>
  <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right">
     <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>门诊管理</el-breadcrumb-item>
     <el-breadcrumb-item>病人信息录入</el-breadcrumb-item>
    </el-breadcrumb>

<div>
    <el-card style="float:left; width:45%;">
    <el-form ref="ruleForm" :rules="rules" :model="forme" id="forme" label-width="80px">
      <h3>
        请在下方录入病人信息
      </h3>
      <el-form-item label="姓名" prop="PATIENT_NAME" >
        <el-input v-model="forme.PATIENT_NAME" ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="GENDER" >
        <el-select v-model="forme.GENDER" placeholder="请选择性别" >
          <el-option label="男" value="M"></el-option>
          <el-option label="女" value="FM"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="年龄" prop="AGE">
        <el-input v-model.number="forme.AGE"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="PHONE">
        <el-input v-model="forme.PHONE"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    </el-card>

    <img src="../../assets/paper.png" style="float:right; width:40%; margin:50px; margin-right:100px;" />

</div>

  </el-main>
</el-container>
</template>


<script src="http://unpkg.com/axios/dist/axios.min.js"></script>
<script src="//unpkg.com/vue@next"></script>
<script src="//unpkg.com/element-plus/lib/index.full.js"></script>
<script>

const axios = require('axios');
export default {
    data() {
      return {
        forme: {
          PATIENT_NAME: '',
          GENDER: '',
          AGE: '',
          PHONE: '',
        },
        rules: {
          PATIENT_NAME: [
            { required: true, message: '请输入病人姓名', trigger: 'blur' },
            { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
          ],
          GENDER: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          AGE: [
            { required: true, message: '请输入病人年龄', trigger: 'blur' },
            // { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' },
          ],
          PHONE: [
            { required: true, message: '请输入病人联系方式', trigger: 'blur' },
            { min: 1, max: 11, message: '长度不超过11 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      onSubmit(){      
          this.$refs.ruleForm.validate(async valid => {
            // console.log(valid)
            // 表单预校验失败
            if (valid) 
            {
            this.forme.AGE=this.forme.AGE-0;
            if(this.forme.AGE<130)
            {
            const { data: res } = await this.$http.put('outPatient',
                {
                  PATIENT_NAME: this.forme.PATIENT_NAME,
                  GENDER: this.forme.GENDER,
                  AGE: this.forme.AGE,
                  PHONE: this.forme.PHONE}
                )
              if(res.err_code=="0000")
              {alert("提交成功")}
            }
            else
            alert("提交失败，请确保年龄输入正确")
          }
          else {
             alert("提交失败，请确保输入合法")
          }
         })
      },
      
      resetForm() {
        // this.$refs.ruleForm.resetFields();
      }    
      }
}
</script>

<style>

</style>