import request from '@/common/request.js';
export const getConversationListData = (data) => {
	return request({
		url: '/api/getConversationListData',
		method: 'GET',
		data
	})
}