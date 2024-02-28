import Vue from 'vue';
import Vuex from 'vuex';
import contact from './modules/contact.js';
import getters from './getters.js';
Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		contact
	},
	getters,
});
export default store;