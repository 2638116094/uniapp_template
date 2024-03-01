const Mock = require('better-mock/dist/mock.mp.js');
const { baseUrl }  = require('../common/config.js');
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
