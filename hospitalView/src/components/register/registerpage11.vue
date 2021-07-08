<template>

<el-form ref="form" :model="form" label-width="80px">
  <h3>
    
    请在下方录入病人信息
  </h3>
  <el-form-item label="姓名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-select v-model="form.region" placeholder="请选择性别">
      <el-option label="男" value="man"></el-option>
      <el-option label="女" value="woman"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="年龄">
    <el-input v-model="form.age"></el-input>
  </el-form-item>
  <el-form-item label="联系方式">
    <el-input v-model="form.contact"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
  </el-form-item>
</el-form>
</template>

<script>
export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          age: '',
          contact: '',
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>

</style>