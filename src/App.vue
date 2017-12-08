<template>
    <div id="app">
        <transition
            enter-active-class="animated"
            enter-to-class="fadeInUp"
            leave-active-class="animated"
            leave-to-class="fadeOutDown">
            <router-view/>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'app',
    mounted() {
        var _this = this;

        window.socketObj = require('socket.io-client')('http://localhost:3800');

        // 建立socket连接
        window.socketObj.on('connect', function(a, b, c){
            // window.socketObj.emit('my', {dd: 123});
        });

        // 来自系统通知
        window.socketObj.on('notify', function(data){
            switch (data.type) {
                case 'sysm':
                    // 系统通知
                    _this.$notify.info({
                      title: '系统提醒:',
                      message: data.msg
                    });
                    break;
                case 'userMsg':
                    // 用户消息
                    _this.$notify.info({
                      title: '来自'+ data.name +'的消息:',
                      message: data.msg
                    });
                    break;
                default:
            }
        });

        window.socketObj.on('allUsers', function(data) {
            console.log('收到所有用户信息');
            console.log(data);
            _this.$store.dispatch('snyUserData', data.users);
        });

        window.socketObj.on('sendMsgList', function(data) {
            console.log('收到消息列表');
            console.log(data);
            _this.$store.dispatch('snyMsgListData', data);
        });

        window.socketObj.on('disconnect', function(){

        });
    }
}
</script>

<style lang='scss'>
@import './scss/mixins/all-mixin';
@import './scss/base/reset';
@import './scss/base/lib';
@import './scss/base/anima';
@import './scss/components/all-com';

body, html{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #282c34;
}

#app{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: url(./assets/bg.jpg);
    background-size: cover;
}
</style>
