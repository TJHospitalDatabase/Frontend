<!-- 增加住院信息 -->
<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top:20px;">
        <el-form-item label="病人编号" prop="patientID">
            <el-input v-model="ruleForm.patientID"></el-input>
        </el-form-item>
        <el-form-item label="病人姓名" prop="patientName">
            <el-input v-model="ruleForm.patientName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phoneNumber">
            <el-input v-model="ruleForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="主治医师" prop="doctorName">
            <el-input v-model="ruleForm.doctorName"></el-input>
        </el-form-item>
        <el-form-item label="负责护士" prop="nurseName">
            <el-input v-model="ruleForm.nurseName"></el-input>
        </el-form-item>
        <el-form-item label="房间号" prop="roomID">
            <el-input v-model="ruleForm.roomID"></el-input>
        </el-form-item>
        <el-form-item label="住院时间" required>
            <el-col :span="11">
            <el-form-item prop="inDate">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.inDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
            <el-form-item prop="outDate">
                <el-date-picker placeholder="选择日期" v-model="ruleForm.outDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
            </el-col>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>


    
</el-form>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
            patientID: '',
            patientName: '',
            phoneNumber: '',
            doctorName:'',
            nurseName:'',
            roomID:'',
            inDate:'',
            outDate:'',
        },
        rules: {
          patientID: [
            { required: true, message: '请输入病人编号', trigger: 'blur' },
            { min: 5, max: 5, message: '长度为 5 个字符', trigger: 'blur' }
          ],
           patientName: [
            { required: true, message: '请输入病人姓名', trigger: 'blur' }
          ],
          phoneNumber: [
            { required: true, message: '请输入病人电话', trigger: 'blur' },
            { min: 11, max: 11, message: '长度为 11 个字符', trigger: 'blur' }
          ],
          doctorName: [
            { required: true, message: '请输入主治医师姓名', trigger: 'blur' }
          ],
          nurseName: [
            { required: true, message: '请输入负责护士姓名', trigger: 'blur' }
          ],
          roomID: [
            { required: true, message: '请输入病房', trigger: 'blur' },
            { min: 3, max: 3, message: '长度为 3 个字符', trigger: 'blur' }
          ],
          inDate: [
            { type: 'date', required: true, message: '请选择入院日期', trigger: 'change' }
          ],
          outDate: [
            { type: 'date', required: true, message: '请选择预计出院时间', trigger: 'change' }
          ],

        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>