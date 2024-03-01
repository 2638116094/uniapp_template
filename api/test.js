import request from '@/common/request.js';
export const getData = data => {
	return request({
		url:'/api/test',
		method: 'GET',
		data
	})
}