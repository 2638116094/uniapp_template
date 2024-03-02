import Vue from 'vue';
import Vuex from 'vuex';
import contact from './modules/contact.js';
import getters from './getters.js';
import user from './modules/user.js';
import conversation from './modules/coversation.js';
Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		contact,
		user,
		conversation,
	},
	getters,
});
export default store;