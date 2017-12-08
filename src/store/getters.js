const getUserData = (state) => {
  	return state.usersData;
}
const getUserToken = (state) => {
  	return state.token;
}

const getMsgList = (state) => {
  	return state.msgList;
}

export default {
	getUserData,
    getUserToken,
    getMsgList
}
