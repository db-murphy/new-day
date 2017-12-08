<template>
    <div class="sign-wrap">
        <div class="login-inner">
            <el-form ref="login-form" :model="signForm" label-position="right" label-width="60px" size="mini">
                <h2 class="login-title">注册</h2>
                <el-form-item label="真实姓名">
                    <el-input v-model="signForm.name" placeholder="真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="signForm.password" type="password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="signForm.password" type="password" placeholder="确认密码"></el-input>
                </el-form-item>
                <el-form-item label="邀请码">
                    <el-input v-model="signForm.inviteCode" type="text" placeholder="邀请码"></el-input>
                </el-form-item>
                <!-- <p class="password-tips ac">温馨提示:密码未加密，请不要将输入</p> -->
                <el-row class="mt30">
                    <el-col :span="24" class="ac">
                        <el-button type="primary" class="sign-btn" @click="_ok" size="mini">确认</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sinup',
    data () {
        return {
            signForm: {
                name: '',
                password: '',
                inviteCode: ''
            }
        }
    },
    methods: {
        _ok() {
            this.$message({
				showClose: true,
				message: '注册成功, 请登陆!',
				type: 'success'
			});
            this.$router.push({path: '/login'});
        }
    }
}
</script>

<style lang='scss'>
@import '../scss/mixins/all-mixin';

.sign-wrap{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 450px;
    margin: -225px 0 0 -150px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
    box-shadow: 0px 0 40px 5px rgba(0, 0, 0, .4);

    .login-inner{
        position: absolute;
        left: 50%;
        top: 50%;
        @include translate(-50%, -50%);
        width: 220px;
    }

    .login-title{
        text-align: center;
        color: #424242;
        line-height: 1;
        font-weight: 300;
        padding-bottom: 80px;
        font-size: 30px;
    }

    .el-form-item__label{
        font-size: 12px;
    }

    .el-input__inner{
        font-size: 12px;
    }

    .sign-btn{
        width: 120px;
    }

    .password-tips{
        font-size: 12px;
        color: #5a5e66;
    }
}
</style>
