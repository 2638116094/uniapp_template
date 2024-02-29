// 挂载到 uni 上的属性名
export const alias = '$t';
import { AddFriendQrCodePrefix } from '@/constant'
export default {
	toat(options, navigate) {
		return '2324'
	},
	scanQrCodeReqult(result) {
		uni.$u.toast(`${result}未识别到有效内容`);
		// if(result?.includes(AddFriendQrCodePrefix)) {
		// 	const userID = result.replace(AddFriendQrCodePrefix, "");
		// 	uni.navigateTo({
		// 		url: `/pages/common/userCard/index`
		// 	});
		// } else if(result?.includes(AddFriendQrCodePrefix)) {
		// 	const groupID = result.replace(AddFriendQrCodePrefix, "");
		// 	uni.navigateTo({
		// 		url:`/pages/common/groupCard/index`
		// 	});
		// } else {
		// 	uni.$u.toat('未识别到有效内容');
		// }
	}
}