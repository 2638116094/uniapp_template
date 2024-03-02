const Mock = require('better-mock/dist/mock.mp.js');
const { baseUrl }  = require('../common/config.js');
const handleResult = [-1,0,1,2];
Mock.mock(`${baseUrl}/api/test`,'get', {
    'code': 2000,
    "msg": "success",
    "data|10": [
    	{
    		'id|+1':1,
    		'name': '@name'
    	}
    ]
})

Mock.mock(`${baseUrl}/api/newFriends`, 'get', {
	'code': 2000,
	'msg': 'success',
	'data|1-8': [
		{
			'userID|+1':1,
			'nickname':'@name',
			'reqMsg|1-8':'@string',
			'handleResult|1': handleResult
		}
	]
})

Mock.mock(`${baseUrl}/api/getFriends`, {
	'code': 2000,
	'msg': 'success',
	'data|10': [
		{
			'userID': '@id'
		}
	]
})