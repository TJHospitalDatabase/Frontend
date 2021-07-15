<template>
<div class="background">
	<div class="login-register">
		<div class="contain">
			<div class="big-box" :class="{active:isLogin}"> 
				<div class="big-contain" v-if="!isLogin">
					<div class="btitle">账户登录</div>
					<div class="bform">
						<input type="user_id" placeholder="用户名" v-model="form.user_id" maxlength="7">
						<span class="errTips" v-if="existed">* 用户名不存在 *</span>
						<input type="password" placeholder="密码" v-model="form.userpwd" maxlength="16">
						<span class="errTips" v-if="passwordError">* 密码填写错误 *</span>
					</div>
					<button class="bbutton" @click="login">登录</button>
				</div>
				<div class="big-contain" v-else>
					<div class="btitle">创建账户</div>
					<div class="bform">
						<input type="text" placeholder="用户名" v-model="form.user_id" maxlength="7">
						<span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
						<input type="username" placeholder="账号" v-model="form.username" maxlength="7">
						<input type="email" placeholder="邮箱" v-model="form.useremail">
						<input type="password" placeholder="密码" v-model="form.userpwd" maxlength="16">
					</div>
					<div class="bselect">
					<el-select v-model="form.value" clearable placeholder="角色选择" style="width:350px">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
					</div>		
					<button class="bbutton" @click="register">注册</button>
				</div>
			</div>
			<div class="small-box" :class="{active:isLogin}">
				<div class="small-contain" v-if="!isLogin">
					<div class="stitle">你好!</div>
					<p class="scontent">开始注册，进入医院管理系统</p>
					<button class="sbutton" @click="changeType">注册</button>
				</div>
				<div class="small-contain" v-else>
					<div class="stitle">医院管理系统</div>
					<p class="scontent">点击下方，登录你的账户</p>
					<button class="sbutton" @click="changeType">登录</button>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
import axios from 'axios'
	export default{
		name:'login-register',
		data(){
			return {
				isLogin:false,
				emailError: false,
				passwordError: false,
				existed: false,
				form:{
					user_id:'',
					username:'',
					useremail:'',
					userpwd:'',
					value:''
				},
				options: [
		{
		  value: 3,
          label: '挂号部'
						},{
          value: 6,
          label: '门诊部'
        }, {
          value: 32,
          label: '住院部',
        }, {
          value: 8,
          label: '药品管理部'
        }, {
          value: 16,
          label: '检查管理部'
        }],
        value: ''
			}
		},
		methods:{
			changeType() {
				this.isLogin = !this.isLogin
				this.form.user_id = ''
				this.form.username = ''
				this.form.useremail = ''
				this.form.userpwd = ''
				this.form.value = ''
			},
			login() {
				const self = this;
				if (self.form.user_id != "" && self.form.userpwd != "") {
                    axios.get('/logIn', {params:{user_id: self.form.user_id,
                        password: self.form.userpwd,
						role:self.form.value}          
                    })
					.then(function(res) {
                        console.log(res.data);
						switch(res.data.err_code){
							case "0000": 
							{
                                alert("登录成功！");
								window.sessionStorage.setItem("token",res.data.data.role);
								self.$router.push({path:'/welcome', query:{id:res.data.data.useR_ID,name:self.form.user_id,dept_name:res.data.data.depT_NAME}});
								break;
							}								
							default:
							{
								alert("登录失败！");
                                self.emailError = true;						
								self.passwordError = true;
								break;
							}							
						}
					})
					.catch( err => {
						console.log(err);
					})
				} else{
					alert("填写不能为空！");
				}
			},
			register(){
				const self = this;
				if(self.form.username != "" && self.form.useremail != "" && self.form.userpwd != ""&& self.form.value != ""&&self.form.user_id != ""){
                    axios.post('/signUp', {params:{password:self.form.userpwd,
                        user_id:self.form.user_id,
						email:self.form.useremail,
						role:self.form.value}  })
					.then(function(res){
						switch(res.data.err_code){
							case "0000":
								alert("注册成功！");
								self.login();
								break;
							default:
								alert("用户名重复，注册失败！");
								self.existed = true;
								break;
						}
					})
					.catch( err => {
						console.log(err);
					})
				} else {
					alert("填写不能为空！");
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.login-register{
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}
	.contain{
		width: 60%;
		height: 60%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 0 0 3px #f0f0f0,
					0 0 6px #f0f0f0;
	}
	.big-box{
		width: 70%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 30%;
		transform: translateX(0%);
		transition: all 1s;
	}
	.big-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.btitle{
		font-size: 1.5em;
		font-weight: bold;
		color: rgb(95, 162, 216);
	}
	.bform{
		width: 100%;
		height: 40%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.bselect{
		position:relative;
		top:-27px;
		left:2px;
	}
	.bform .errTips{
		display: block;
		width: 50%;
		text-align: left;
		color: red;
		font-size: 0.7em;
		margin-left: 1em;
	}
	.bform input{
		width: 50%;
		height: 30px;
		border: none;
		outline: none;
		border-radius: 10px;
		padding-left: 2em;
		background-color: #f0f0f0;
	}
	.bbutton{
		width: 20%;
		height: 40px;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color: rgb(0, 153, 255);
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	.small-box{
		width: 30%;
		height: 100%;
		background: linear-gradient(135deg,rgb(0, 179, 250),rgb(0, 132, 255));
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(0%);
		transition: all 1s;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}
	.small-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.stitle{
		font-size: 2em;
		font-weight: bold;
		color: #fff;
	}
	.scontent{
		font-size: 0.8em;
		color: #fff;
		text-align: center;
		padding: 2em 4em;
		line-height: 1.7em;
	}
	.sbutton{
		width: 60%;
		height: 40px;
		border-radius: 24px;
		border: 1px solid #fff;
		outline: none;
		background-color: transparent;
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	
	.big-box.active{
		left: 0;
		transition: all 0.5s;
	}
	.small-box.active{
		left: 100%;
		border-top-left-radius: 1;
		border-bottom-left-radius: 0;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		transform: translateX(-100%);
		transition: all 1s;
	}
    .background{
        background-image: url(../assets/hospital.jpeg);
        height: 100%;
		width: 100%;
		background-size: 100% 100%;
        background-repeat: no-repeat;
    }
	  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
	height:50%;
  }
  .el-icon-arrow-down {
    font-size: 20px;
  }
</style>
