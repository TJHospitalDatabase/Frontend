<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
    <el-header>
        <div>
            <span>医院管理系统</span>
        </div>
        <el-button type="info" >退出
        </el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
        <!-- 侧边栏 -->
    <el-aside width="200px">
        <!-- 侧边栏菜单区 -->
        <el-menu
        background-color="#d9edf5"
        text-color="rgb(61, 54, 44)"
        active-text-color="#ffd04b"
        :router="true">
        <!-- 一级菜单 -->
        <el-submenu index="patient">
            <!-- 一级菜单模板区 -->
            <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-user-solid"></i>
                <!-- 文本 -->
                <span>病人相关信息查询</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item index="patient_imformation"
            @click="saveNavState(patient_imformation)">
                <!-- 二级菜单模板区 -->
                <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-view"></i>
                <!-- 文本 -->
                <span>病人详细信息</span>
            </template>
            </el-menu-item>


             <!-- 二级菜单 -->
            <el-menu-item index="checklist_result"
            @click="saveNavState(checklist_result)">
                <!-- 二级菜单模板区 -->
                <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-receiving"></i>
                <!-- 文本 -->
                <span>项目检查结果单</span>
            </template>
            </el-menu-item>
        </el-submenu>
        </el-menu>
    </el-aside>
    <!-- 右侧内容主体 -->
    <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
    </el-main>
    </el-container>
    </el-container>
</template>


<script>
export default {
}
</script>

<style lang="less" scoped>
.home-container{
    height:100%;
}
.el-header{
    background-color: #c0e6f5;
    display:flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: rgb(61, 54, 44);
    font-size: 20px;
    >div{
        display: flex;
        align-items: center;
        span{
            margin-left: 15;
        }
    }
}
.el-aside{
    background-color: #d9edf5;
}

.el-main{
    background-color: rgb(255, 255, 255);
}
</style>
