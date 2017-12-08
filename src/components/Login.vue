<template>
    <div class="login-wrap">
        <div class="login-inner">
            <el-form ref="login-form" :model="loginForm" label-position="left" label-width="40px" size="mini">
                <h2 class="login-title">登陆</h2>
                <el-form-item label="姓名">
                    <!-- <el-input v-model="loginForm.name" placeholder="真实姓名"></el-input> -->
                    <el-select v-model="loginForm.name" placeholder="请选择">
                        <el-option
                          v-for="(item, index) in getUserData"
                          :key="index"
                          :label="item.name"
                          :value="item.name">
                        </el-option>
                      </el-select>
                </el-form-item>
                <!-- <el-form-item label="密码">
                    <el-input v-model="loginForm.name" type="password" placeholder="密码"></el-input>
                </el-form-item> -->
                <el-row>
                    <el-col :span="24" class="ac">
                        <el-button type="primary" @click="onSubmit" size="mini">登陆</el-button>
                        <!-- <el-button type="plain" size="mini"><router-link to="/sinup">注册</router-link></el-button> -->
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';

export default {
    name: 'Login',
    data () {
        return {
            loginForm: {
                name: ''
            },
            users: []
        }
    },
    computed: {
		...mapGetters(['getUserData'])
	},
    methods: {
        onSubmit() {
            var _this = this;

            $.ajax({
	            type : "post",
	            url : '/login',
	            data : {
                    userName: _this.loginForm.name
	            },
	            dataType: "json",
	            success:function(res){
	                if(res && res.code == 0) {
                        _this.$message({
            				showClose: true,
            				message: '登陆成功!',
            				type: 'success'
            			});
                        _this.$router.push({path: '/window'});
                        _this.$store.dispatch('setUserToken', res.result.token);
	                }else{
                        _this.$message({
            				showClose: true,
            				message: res.msg,
            				type: 'error'
            			});
                    }
	            }
	        });
        }
    },

    mounted() {
        this.$store.dispatch('getUserData');
    }
}
</script>

<style lang='scss'>
@import '../scss/mixins/all-mixin';

.login-wrap{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 450px;
    // border: 1px solid #a281a0;
    // @include translate(-50%, -50%);
    margin: -225px 0 0 -150px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
    box-shadow: 0px 0 40px 5px rgba(0, 0, 0, .4);

    .login-inner{
        position: absolute;
        left: 50%;
        top: 50%;
        @include translate(-50%, -50%);
        width: 200px;
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
}
</style>
