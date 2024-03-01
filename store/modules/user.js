const state = {
	appConfig: {}
};
const mutations = {
	SET_APP_CONFIG(state, config) {
		state.appConfig = {
			...config
		};
	}
};
const actions = {
	async getAppConfig({commit}) {
		try {
			// const data = await 
		} catch(e) {
			console.error(e)
		}
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}