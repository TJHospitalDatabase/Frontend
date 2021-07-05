<template>

    <!--    页面布局-->
    <el-container class="home-container">
        <!--        头部区域-->
        <el-header>
            <div class="out-button">
                <el-dropdown>
                    <el-badge is-dot class="item" :hidden="showDot">
                        <el-avatar :src="imgUrl"><span class="el-dropdown-link" style="margin-right: 16px">
                         </span></el-avatar>
                    </el-badge>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="navigation-text" id="username-div">{{username}}</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native="changePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native="systemInformation">
                            <el-badge value="new" class="item" :hidden="showDot">系统消息</el-badge>
                        </el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native="systemNotice">
                            <el-badge value="new" class="item" :hidden="showDot">系统公告</el-badge>
                        </el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native="goIndex">回到首页</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" id="exit-div" divided @click.native="logout">退出
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <!--        页面主体-->
        <el-container>
            <!--            侧边栏-->
            <el-aside width="155px">
                <el-menu router
                         background-color="rgb(249,249,249)" text-color="rgb(43,43,43)" active-text-color="#409EFF">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-menu"></i>单目管理</template>
                        <el-menu-item-group>
                            <el-menu-item  @click.native="gotoprescription">处方单管理</el-menu-item>
                            <el-menu-item  @click.native="gotoexamine">检查单管理</el-menu-item>
                            <el-menu-item  @click.native="gotohospital">住院单管理</el-menu-item>
                            <!--<el-submenu index="1-1">
                         <template slot="title">处方单管理</template>
                         <el-menu-item index="1-1-1" @click.native="gotoprescription_1">处方单查询</el-menu-item>
                         <el-menu-item index="1-1-2">处方单添加</el-menu-item>
                         </el-submenu>
                         <el-submenu index="1-2">
                         <template slot="title">检查单管理</template>
                         <el-menu-item index="1-2-1" @click.native="gotoexamine">检查单查询</el-menu-item>
                         <el-menu-item index="1-2-2">检查单添加</el-menu-item>
                         </el-submenu>
                         <el-submenu index="1-3">
                         <template slot="title">住院单管理</template>
                         <el-menu-item index="1-3-1" @click.native="gotohospital">住院单查询</el-menu-item>
                         <el-menu-item index="1-3-2">住院单添加</el-menu-item>
                         </el-submenu>-->
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--            右侧内容主体-->
            <el-main style="padding-left: 15px">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data()
        {
            return {
                showDot: false,
                username: window.sessionStorage.getItem('name'),
                imgUrl: window.sessionStorage.getItem('imgUrl'),

            }
        },
        mounted()
        {
            this.$nextTick(() =>
            {
                setInterval(this.CurentTime, 1000);
            })
        },
        methods: {
            CurentTime()
            {
                let loginTime = window.sessionStorage.getItem('loginTime');
                if (loginTime!=null && new Date().getTime() - loginTime > 7200000)//2*60*60*1000 两小时
                {
                    this.$message.success("太久未登录,强制退出!");
                    this.logout();
                }
            },
            //退出按钮
            logout()
            {
                window.sessionStorage.clear();
                this.$router.push("/index")
            },
            changePassword()
            {
                this.$router.push("/principalChangePassword")
            },
            systemInformation()
            {
                this.showDot = true;
                this.$router.push("/principalSystemInformation")
            },
            systemNotice()
            {
                this.showDot = true;
                this.$router.push("/principalSystemNotice")
            },
            goIndex()
            {
                this.$router.push("/index")
            },
            gotoprescription()
            {
                this.$router.push("/prescription")
            },
            gotoexamine()
            {
                this.$router.push("/examine")
            },
            gotohospital()
            {
                this.$router.push("/hospital")
            },
            handleCommand(command)
            {
                this.showDot = true;
            }
        }
    };
</script>

<style scoped>
    #clock {
        color: white;
        margin-right: 30px;
    }

    #username-div {
        font-size: 20px;
        font-weight: bold;
        font-family: 楷体;
    }

    #exit-div {
        text-align: center;
        font-weight: bold;
    }

    .home-container {
        height: 100%;
    }

    .el-header {
        background-color: rgb(34, 96, 189);
        display: flex;
        justify-content: space-between;
        margin-left: 0;
        padding-left: 0;

    }

    .el-aside {
        /*background-color: gray;*/
        background-color: rgb(239, 239, 239);
    }

    .el-main {
        /*background-color: lightgoldenrodyellow;*/
        background-color: rgb(255, 255, 255);
    }

    .out-button {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

</style>
