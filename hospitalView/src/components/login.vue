<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                 <img src="../assets/avatar.jpg" alt="">
            </div>
            <!-- 登录表单区域 -->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="0px" class="login_form">
            <!-- 用户名 -->
             <el-form-item prop="username">
             <el-input v-model="loginForm.username"   prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <!-- 密码 -->
             <el-form-item prop="password">
             <el-input type="password" prefix-icon="el-icon-edit" v-model="loginForm.password"></el-input>
             </el-form-item >
            <!-- 按钮 -->
            <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            loginForm:{
                username:'院长',
                password:'123456'
            },
             loginRules: {
                username: [
                    { min:3, max:10, message:"长度需要在3到10个字符之间" },
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { min:6, max:15, message:"长度需要在6到15个字符之间" },
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },

    methods:{
        resetLoginForm(){
            //console.log(this);
            this.$refs.loginFormRef.resetFields();this.$refs.loginFormRef.resetFields();
            return this.$message.success('你成功重置了登录信息！');
        },
        login(){
            /*
                登录请求：先判断valid是否为true
                如果为true才发起登录请求，再配置axios登陆请求
                请求地址在API接口文档中，轻轻参数也必须为后端提供好
                post返回的值是一个promise，为了简化promise操作，用await和async优化，这样就可以直接拿到服务器返回的数据

            */
            this.$refs.loginFormRef.validate(async valid=>{
                //console.log(valid);
                if(!valid) return;
                //重命名，将返回的data属性重命名为res
                const {data:res}=await this.$http.post('login',this.loginForm);
                //console.log(res);
                if(res.meta.status!=200) {
                    //return console.log('登录失败')
                    return this.$message.console.error('登录失败')
                }
                   
                this.$message.console.success('登录成功')
            });
            this.$router.push("/main_home");
        }
    }
};
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height:100%;
}
.login_box{
    width:450px;
    height:300px;
    background-color: aliceblue;
    border-radius: 3px;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);

    .avatar_box{
        height:130px;
        width:130px;
        border:1px solid #fff;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left:50%;
        transform :translate(-50%,-50%);
        background-color: #fff;
        img{
            height: 100%;
            width: 100%;
            border-radius: 50%;
        }
    }
}
.login_form{
    position: absolute;
    bottom: 0;
    width:100%;
    padding:0 20px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
</style>

