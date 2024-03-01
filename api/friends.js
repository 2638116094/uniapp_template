import request from '@/common/request.js';

export const newFriends = (data) => {
	return request({
		url:`/api/newFriends`,
		method: 'GET',
		data
	})
}

// export const 