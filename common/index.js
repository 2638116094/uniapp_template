export const toastWithCallback = (message, callBack, duration = 1000) => {
	uni.$u.toast(message);
	setTimeout(callBack, duration);
}

export const uploadForm = (file) => {
	return new Promise(async (resolve, reject) => {
		// const data = await init
	})
}