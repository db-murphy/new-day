import { set } from 'vue';
import types from './mutation-types';
import getter from './getters';
import Utils from '../utils/helper';

export default {
	[types.SNY_USERDATA] (state, { userData }) {
		state.usersData = userData;
	},

	[types.GET_USERDATA] (state, { userData }) {
		state.usersData = userData;
	},

	[types.SETUSERTOKEN] (state, { token }) {
		state.token = token;
	},

	[types.SNYMSGLISTDATA] (state, { msgList }) {
		state.msgList = msgList;
	}
}
