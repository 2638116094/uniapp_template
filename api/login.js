import request from '@/common/request.js'
export const getAppConfigFromSvr = (content) => {
	return request({
		url: '/api/client_config',
		method: 'GET',
		data
	})
}