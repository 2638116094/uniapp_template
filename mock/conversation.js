const Mock = require('better-mock');
const { baseUrl } = require('@/common/config.js');

Mock.mock(`${baseUrl}/api/getConversationListData`,{
	'code': 2000,
	'message': 'success',
	'data|10': [
		{
			'conversationID':'@id',
			'isPinned|1':[0,1],
			'faceUrl':"@image()",
			'showName': '@cname',
			"latestMsgSendTime": Mock.Random.date()
		}
	]
})