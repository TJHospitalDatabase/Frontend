<!-- 增加住院信息 -->
<template>
    <el-form :model="addForm" 
    :rules="addRules" 
    ref="addFormRef" 
    label-width="100px" class="demo-ruleForm" style="margin-top:20px;">
        <el-form-item label="病人编号" prop="id">
            <el-input v-model="ruleForm.patientID"></el-input>
        </el-form-item>
        <el-form-item label="病人姓名" prop="name">
            <el-input v-model="ruleForm.patientName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
            <el-input v-model="ruleForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="主治医师" prop="doctor">
            <el-input v-model="ruleForm.doctorName"></el-input>
        </el-form-item>
        <el-form-item label="负责护士" prop="nurse">
            <el-input v-model="ruleForm.nurseName"></el-input>
        </el-form-item>
        <el-form-item label="房间号" prop="room">
            <el-input v-model="ruleForm.roomID"></el-input>
        </el-form-item>
        <el-form-item label="住院时间" required>
            <el-col :span="11">
            <el-form-item prop="inData">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.inDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
            <el-form-item prop="outData">
                <el-date-picker placeholder="选择日期" v-model="ruleForm.outDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
            </el-col>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('addForm')">立即创建</el-button>
            <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>


    
</el-form>
</template>

<script>
  export default {
    data() {
      return {
        addForm: {
            id: '',
            name: '',
            phone: '',
            doctor:'',
            nurse:'',
            room:'',
            inData:'',
            outData:'',
        },
        addRules: {
          id: [
            { required: true, message: '请输入病人编号', trigger: 'blur' },
            { min: 5, max: 5, message: '长度为 5 个字符', trigger: 'blur' }
          ],
           name: [
            { required: true, message: '请输入病人姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入病人电话', trigger: 'blur' },
            { min: 11, max: 11, message: '长度为 11 个字符', trigger: 'blur' }
          ],
          doctor: [
            { required: true, message: '请输入主治医师姓名', trigger: 'blur' }
          ],
          nurse: [
            { required: true, message: '请输入负责护士姓名', trigger: 'blur' }
          ],
          room: [
            { required: true, message: '请输入病房', trigger: 'blur' },
            { min: 3, max: 3, message: '长度为 3 个字符', trigger: 'blur' }
          ],
          inData: [
            { type: 'date', required: true, message: '请选择入院日期', trigger: 'change' }
          ],
          outData: [
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
      },

      addPatient () {
        // 提交请求前，表单预验证
        this.$refs.addFormRef.validate(async valid => {
          // console.log(valid)
          // 表单预校验失败
          if (!valid) return
          const { data: res } = await this.$http.post('users', this.addForm)
          if (res.meta.status !== 201) {
            this.$message.error('添加失败！')
          }
          this.$message.success('添加成功！')
          this.getPatientList()
        })
      },



    }
  }
</script>