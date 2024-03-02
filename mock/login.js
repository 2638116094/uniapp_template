const Mock = require('better-mock/dist/mock.mp.js');
const { baseUrl }  = require('../common/config.js');

Mock.mock(`${baseUrl}/api/client_config`,{
	'code': 2000,
	'msg': 'success',
	'data': {}
})

Mock.mock(`${baseUrl}/account/login`,'post',{
	'code': 2000,
	'msg': 'success',
	'data': {
		'token': '@guid',
		'userID':'@id',
		'chatToken': '@guid',
		
	}
})

Mock.mock(`${baseUrl}/user/find/full`, 'post', {
	'code': 2000,
	'msg': 'success',
	'data|10': {
		'users': {
			'faceUrl':"@image('200x100', '#4A7BF7', 'Hello')",
			'nickname': '@cname'
		} 
	}
})