import request from '@/common/request.js'
export const getAppConfigFromSvr = (data) => {
	return request({
		url: '/api/client_config',
		method: 'GET',
		data
	})
}

export const businessLogin = (data) => {
	return request({
		url:'/account/login',
		method: 'POST',
		data
	})
}

export const businessGetUserInfo = (userID) => {
	return request({
		url: '/user/find/full',
		method: 'POST',
		data: {
			userID
		}
	})
}
