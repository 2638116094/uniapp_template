let server_url='http://localhost:8080';//请求地址

function service(options = {}) {
       options.url = `${server_url}${options.url}`;
        //配置请求头
        options.header = {
        'content-type': 'application/x-www-form-urlencoded',
    };

    return new Promise((resolved, rejected) => {
		//成功
        options.success = (res) => {
			if(res.statusCode == 200 && res.data.code == 2000) {
				resolved(res.data);
			}
			// resolved(res);//错误
            // if (Number(res.data.code) == 200) {  //请求成功
            //     resolved(res.data.data);
            // } else {
            //     uni.showToast({
            //         icon: 'none',   
            //         duration: 3000,
            //         title: `${res.data.msg}`
            //     });
            //     rejected(res.data.msg);//错误
            // }
        }
		//错误
        options.fail = (err) => {
            rejected(err); //错误
        }
        uni.request(options);
    });

}

export default service;
