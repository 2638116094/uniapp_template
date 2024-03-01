const Mock = require('better-mock/dist/mock.mp.js');
const { baseUrl }  = require('../common/config.js');

Mock.mock(`${baseUrl}/api/client_config`,{
	'code': 2000,
	'msg': 'success',
	'data': {}
})