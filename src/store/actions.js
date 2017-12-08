import types from './mutation-types'
import $ from 'jquery';
import Vue from 'vue'

const ACTIONS = {
	snyUserData ({ commit, state }, userData) {
		commit(types.SNY_USERDATA, {
	      userData
	    });
	},

	snyMsgListData ({ commit, state }, msgList) {
		commit(types.SNYMSGLISTDATA, {
	    	msgList
	    });
	},

	getUserData ({ commit, state }, userData) {
		$.ajax({
            type : "get",
            url : '/users',
            data : {

            },
            dataType: "json",
            success:function(res){
                if(res && res.code == 0) {
					commit(types.GET_USERDATA, {
				    	userData: res.result.users
				    });
                }
            }
        });
	},

	setUserToken ({ commit, state }, token) {
		commit(types.SETUSERTOKEN, {
	      token
	    });
	}
}

export default ACTIONS;
