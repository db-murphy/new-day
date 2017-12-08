<template>
    <div class="window-wrap">
        <div class="enter">
            <div class="enter-inner p10">
                <h2 class="enter-title pb10">请在此输入你的早会内容:</h2>
                <el-input type="textarea" :rows="7" resize="none" v-model="enterData"></el-input>
                <div class="mt10">
                    <el-switch
                      v-model="jiaban"
                      active-color="#13ce66"
                      active-text="加班"
                      class="jiaban"
                      inactive-text="不加班"
                      inactive-color="#ccc">
                    </el-switch>
                </div>
            </div>
            <div class="bq-wrap">
                <h2 class="enter-title pb10">在线的小伙伴们:</h2>
                <ul>
                    <li v-for="(item, index) in getUserData" :key="index" v-if="item.isLogin">
                        <el-tooltip class="item" :value="showMsg" :manual="true" effect="dark" content="Top Left 提示文字" placement="top">
                            <div class="inner">
                                <div class="img-wrap">
                                    <img src="../assets/photo.jpg">
                                </div>
                                <p class="user-name">{{item.name}}</p>
                            </div>
                        </el-tooltip>
                    </li>
                </ul>
            </div>
        </div>
        <div class="output">
            <div class="output-inner">
                <div class="msg-scroll">
                    <el-row v-for="(item, key) in getMsgList" :key="key">
                        <el-col :span="24">
                            <div class="msg-item">
                                <img class="user-photo" src="../assets/photo.jpg">
                                <div>
                                    <p class="user-name">{{item.name}}{{item.jiaban|jiabanTrans}}</p>
                                    <pre class="user-msg">{{item.content|contentTrans}}</pre>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="btns-wrap">
                <div class="say-wrap">
                    <el-input v-model="sayto" placeholder="对大家说点什么" size="mini"></el-input>
                    <el-button type="primary" class="export-btn fr" @click="_send" icon="el-icon-printer" size="mini">发送</el-button>
                </div>
                <div class="smart-wrap">
                    <el-button type="primary" class="export-btn fr" @click="exportSubmit" icon="el-icon-printer" size="mini" :loading="exporting">导出早会列表</el-button>
                    <el-button type="primary" class="export-btn fr mr10" @click="_notify" size="mini" icon="el-icon-bell">提醒打卡</el-button>
                    <el-button type="primary" class="export-btn fr" @click="_quike" size="mini" icon="el-icon-bell">催一下</el-button>
                </div>
            </div>
            <!-- <el-button type="primary" class="sign-btn" @click="enterSubmit" size="mini">导出</el-button> -->
        </div>
        <el-dialog
          title="导出"
          :visible.sync="exportShow"
          width="60%"
          center>
          <div class="mb15">
              <p>早会列表:</p>
              <el-input
                  type="textarea"
                  :rows="6"
                  resize="none"
                  v-model="textareaExport">
                </el-input>
          </div>
          <div>
              <p>加班人员:</p>
              <el-input
                  type="textarea"
                  :rows="1"
                  resize="none"
                  v-model="jiabanListData">
                </el-input>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';

export default {
    name: 'Window',
    data () {
        return {
            enterData: '',
            showMsg: false,
            allUsers: [],
            socket: null,
            sayto: '',
            jiaban: false,
            exportShow: false,
            textareaExport: '',
            jiabanListData: '',
            exporting: false
        }
    },
    computed: {
		...mapGetters(['getUserData', 'getUserToken', 'getMsgList'])
	},
    filters: {
        contentTrans(val) {
            return val || '待输入...';
        },

        jiabanTrans(val) {
            return val?'(加班)' : '';
        }
    },
    methods: {
        exportSubmit() {
            var _this = this;

            this.exporting = true;
            this.textareaExport = '';
            this.jiabanListData = '';
            // this.exportShow = true;
            $.ajax({
	            type : "get",
	            url : '/getDataList',
	            data : {

	            },
	            dataType: "json",
	            success:function(res){
	                if(res && res.code == 0) {
                        for(var attr in res.result) {
                            _this.textareaExport += (res.result[attr].name + '\n' +res.result[attr].content+'\n\n');
                            if(res.result[attr].jiaban) {
                                _this.jiabanListData += (res.result[attr].name +'、');
                            }
                        }
	                }
                    _this.exporting = false;
                    _this.exportShow = true;
	            }
	        });
        },

        _notify() {
            window.socketObj.emit('daka', {token: this.getUserToken});
        },

        _quike() {
            window.socketObj.emit('quike', {token: this.getUserToken});
        },

        _synDataToLoal(arr) {
            this.allUsers.splice(0, this.allUsers.length);
            for(var i = 0; i < arr.length; i++) {
                this.allUsers.push(arr[i]);
            }

            this._enterDataInit(arr);
        },

        _enterDataInit(arr) {
            for(var i = 0; i < arr.length; i++) {
                if(arr[i].token == window.userToken) {
                    this.enterData = arr[i].content;
                }
            }
        },

        _sendEnterData() {
            window.socketObj.emit('sendEnterData', {content: this.enterData, token: this.getUserToken});
        },

        _send() {
            if(this.sayto == '') return;
            window.socketObj.emit('userSayMsg', {token: this.getUserToken, msg: this.sayto});
        },

        _jiabanSwitch() {
            window.socketObj.emit('jiaban', {token: this.getUserToken, jiaban: this.jiaban});
        }
    },
    mounted() {
        var _this = this;

        if(!this.getUserToken) {
            return _this.$router.replace('/login');
        }

        // 重新同步所有用户信息
        window.socketObj.emit('getAllUsers', {token: this.getUserToken});
    },
    watch: {
	   'enterData': '_sendEnterData',
       'jiaban': '_jiabanSwitch'
	}
}
</script>

<style lang='scss'>
@import '../scss/mixins/all-mixin';

.window-wrap{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 20px 20px 20px 500px;
    @include box-sizing(border-box);

    .enter-title{
        color: #424242;
        line-height: 1;
        font-weight: normal;
        font-size: 12px;
    }

    .enter{
        width: 450px;
        position: absolute;
        left: 10px;
        top: 20px;
        bottom: 20px;

        .enter-inner{
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0px 0 40px 5px rgba(0, 0, 0, .4);
        }

        .jiaban{
            .el-switch__label span{
                font-size: 12px;
            }
        }

        .bq-wrap{
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0px 0 40px 5px rgba(0, 0, 0, .4);
            margin-top: 20px;
            padding: 10px;

            ul{
                overflow: auto;
                // border-left: 1px solid #ccc;
                // max-height: 300px;

                li{
                    float: left;
                    width: 85px;
                    height: 70px;
                    @include box-sizing(border-box);
                    text-align: center;
                    // border-right: 1px solid #ccc;
                    cursor: pointer;
                    position: relative;
                    // border-top: 1px solid #ccc;

                    .img-wrap{
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        overflow: hidden;
                        text-align: center;
                        margin: 0 auto;
                    }

                    img{
                        width: 40px;
                        height: 40px;
                    }

                    .inner{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        @include translate(-50%, -50%);
                    }

                    .user-name{
                        line-height: 1;
                        font-size: 12px;
                        color: #9ea8c7;
                        padding-top: 6px;
                        width: 100%;
                        white-space: nowrap;

                        span{
                            font-size: 10px;
                        }
                    }
                }
            }
        }
    }

    .output{
        background-color: rgba(255, 255, 255, .96);
        border-radius: 5px;
        box-shadow: 0px 0 40px 5px rgba(0, 0, 0, .4);
        height: 100%;
        position: relative;

        .output-inner{
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 50px;
            padding-right: 5px;
            padding-top: 10px;
            // padding-bottom: 10px;
            @include box-sizing(border-box);
        }

        .msg-scroll{
            overflow: auto;
            height: 100%;
        }

        .msg-item{
            position: relative;
            padding: 20px;
            padding-left: 75px;
            @include box-sizing(border-box);
            min-height: 50px;
            padding-bottom: 0;
        }

        .user-photo{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid #ccc;
            position: absolute;
            left: 20px;
            top: 20px;
        }

        .user-msg{
            margin-top: 5px;
            background-color: #daf4fd;
            border-radius: 5px;
            @include box-sizing(border-box);
            padding: 10px;
            color: #000;
            display: inline-block;
            max-width: 400px;
            font-size: 12px;
            position: relative;

            &::before{
                content: '';
                position: absolute;
                width: 10px;
                height: 10px;
                left: -10px;
                background: url(../assets/qp.png) no-repeat 2px top;
                background-size: 10px auto;
            }
        }

        .user-name{
            font-size: 12px;
            color: #9ea8c7;
        }

        .btns-wrap{
            position: absolute;
            bottom: 0;
            // height: 50px;
            left:0;
            right: 0;
            padding: 10px;
            @include box-sizing(border-box);
            box-shadow: 0px 0 20px rgba(0, 0, 0, .4);
            padding-right: 350px;
        }

        .export-btn{
            background-color: #26b8f2;
            border-color: #26b8f2;
        }

        .smart-wrap{
            position: absolute;
            right: 10px;
            top: 50%;
            overflow: hidden;
            @include translate(0, -50%);
        }

        .say-wrap{
            padding-right: 85px;
            position: relative;

            .el-input{
                height: 100%;
            }

            .export-btn{
                position: absolute;
                right: 0;
                top: 50%;
                @include translate(0, -50%);
            }
        }
    }
}
</style>
