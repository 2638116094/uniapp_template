import { businessGetUserInfo, getAppConfigFromSvr } from '@/api/login.js'

export const businessAllowType = {
	Allow: 1,
	NotAllow: 2,
};

const defaultConfig = {
	allowSendMsgNotFriend: businessAllowType.Allow,
	needInvitationCodeRegister: false,
};

const state = {
	appConfig: {},
	selfInfo: {},
	authData: {} || uni.getStorageSync('authData')
};
const mutations = {
	SET_APP_CONFIG(state, config) {
		state.appConfig = {
			...config
		};
	},
	SET_AUTH_DATA(state, data) {
		uni.setStorageSync('authData', data);
		state.authData = data;
	},
	SET_SELF_INFO(state, info) {
		state.selfInfo = info
		console.log('selfInfo',info);
	}
};
const actions = {
	async getAppConfig({commit}) {
		try {
			const data = await getAppConfigFromSvr();
			conmit('SET_APP_CONFIG',  defaultConfig);
		} catch(e) {
			console.error(e)
		}
	},
	getSelfInfo({ commit }) {
		return new Promise(async (resolve, reject) => {
			try {
				const  {data}  = await  businessGetUserInfo();
				const businessData = data.users[0] ?? {};
				commit('SET_SELF_INFO', businessData);
				resolve(businessData);
			} catch(e) {
				reject(e);
			}
		})
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}