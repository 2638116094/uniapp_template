import store from "@/store";
import dayjs from "dayjs";

export const toastWithCallback = (message, callBack, duration = 1000) => {
	uni.$u.toast(message);
	setTimeout(callBack, duration);
}

export const uploadForm = (file) => {
	return new Promise(async (resolve, reject) => {
		// const data = await init
	})
}

export const parseMessageByType = (pmsg, isNotify = false) => {
	const isSelf = (id) => id === store.getters.storeCurrentUserID;
	return "[类型测试]"
}

export const formatConversionTime = (timestemp) => {
	const fromNowStr = dayjs(timestemp).fromNow();
	console.log('fromNow',fromNowStr);
	if(fromNowStr.includes('秒')) {
		return '刚刚';
	}
	if(!fromNowStr.includes("秒") && !fromNowStr.includes('分钟')) {
		return dayjs(timestemp).calendar();
	}
	return fromNowStr;
}	