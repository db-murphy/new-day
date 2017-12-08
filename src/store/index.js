import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

// rootState
const state = {
	usersData: [],
	token: '',
	msgList: {}
};

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
	modules: {},
	strict: false
})
