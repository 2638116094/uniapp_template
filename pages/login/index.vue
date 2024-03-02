<template>
	<view class="page_container">
		<view class="login">
			<view class="logo">
				<image style="width: 130rpx; height: 130rpx;" src="../../static/logo.png" />
				<view class="title" @click="toConfig">
					欢迎使用OpenIM
				</view>
			</view>
			<u-form class="loginForm"
			labelPosition="top"
			:rules="rules"
			:labelStyle="{
				fontSize: '28rpx',
				marginTop: '20rpx',
				width: 'max-content'
			}"
			ref="loginForm"
			:model="loginInfo">
				<u-form-item label="手机号" prop="phoneNumber">
					<u-input v-model="loginInfo.phoneNumber"
					clearable
					border="surround"
					placeholder="请输入手机号码">
						<view @click="showPicker" class="phoneNumber_areacode" slot="prefix">
							<text class="areacode_content">+{{loginInfo.areaCode}}</text>
							<u-icon class="arrow_dow" name="arrow-down"></u-icon>
						</view>
					</u-input>
				</u-form-item>
				<u-form-item label="密码" prop="password">
					<u-input v-model="loginInfo.password"
					border="surround"
					placeholder="请输入密码"
					clearable
					:password="!eying">
						<u-icon slot="suffix"
						@click="updateEye"
						:name="eying?'eye-off':'eye'"></u-icon>
					</u-input>
				</u-form-item>
			</u-form>
			<view class="login-btn">
				<u-button :loading="loading"
				type="primary"
				:disabled="!canLogin"
				@click="startLogin">登录</u-button>
			</view>
			<view class="action_bar">
				<text style="margin-bottom: 16rpx;" @click="copy">{{version}}</text>
				<view>还没有账号?<text class="register">立即注册</text></view>
			</view>
		</view>
		<AreaPicker ref="AreaPicker"  @chooseArea="chooseArea"/>
	</view>
</template>

<script>
	import AreaPicker from '@/components/AreaPicker/index.vue';
	import { version } from '@/common/config.js';
	import { businessLogin } from '@/api/login.js'
	export default {
		components: {
			AreaPicker
		},
		data() {
			return {
				version: "",
				loginInfo: {
					phoneNumber: 17651901745,
					password: 'mxj123456',
					areaCode: "86",
					verificationCode: undefined
				},
				checked: [true],
				eying: false,
				loading: false,
				count: 0,
				isPwdLogin: true,
			};
		},
		computed: {
			canLogin() {
				return ( this.checked[0] && this.loginInfo.phoneNumber && this.loginInfo.password);
			},
			rules() {
				return {
					password: this.isPwdLogin? [{
						type: "string",
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}]:[]
				}
			}
		},
		onLoad() {
			this.version= version;
		},
		onReady() {
			// this.showPicker();
		},
		methods: {
			async startLogin() {
				// uni.
				let {data} = await businessLogin();
				const { token } = data; 
				this.saveLoginProfile(data);
				this.$store.commit('user/SET_AUTH_DATA', data);
				this.$store.dispatch('user/getSelfInfo');
				
				this.$store.dispatch('contact/getFriendLists')
				uni.switchTab({
					url:'/pages/conversation/conversationList/index'
				})
			},
			chooseArea() {
				
			},
			saveLoginProfile(data) {
				const { token, chatToken, userID } = data;
				uni.setStorageSync('IMUserID', userID);
				uni.setStorageSync('IMToken', token);
				uni.setStorageSync('BusinessToken', chatToken);
			},
			showPicker() {
				this.$refs.AreaPicker.init();
			},
			updateEye() {
				this.eying = !this.eying;
			},
			copy() {
				uni.setClipboardData({
					showToast:false,
					data:this.version,
					success() {
						uni.showToast({
							icon:'none',
							title:'复制成功'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.page_container {
	height: 100%;
	text-align: center;
	.login {
		width: 100%;
		height: 100%;
		flex-direction: column;
		@include vCenterBox;
		.logo {
			margin-top: 250rpx;
			color: #0c1c33;
			image {
				border-radius: 50%;
			}
			.title {
				font-size: 38rpx;
				font-weight: bold;
				margin-top: 50rpx;
			}
		}
		.loginForm {
			width: 80vw;
			line-height: 40rpx;
			margin-top: 40rpx;
			box-sizing: border-box;
			/deep/.u-input {
				// background-color: red;	
				padding: 20rpx !important;
				border: 1rpx solid #eaeaea;
			}
			.phoneNumber_areacode {
				display: flex;
				margin-right: 20rpx;
				
			}
		}
		.login-btn {
			margin-top: 6vh;
			width: 80vw;
		}
		.action_bar {
			margin-top: 80rpx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			text-align: center;
			margin-bottom: 96rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: $u-primary;
			text {
				color: #000;
			}
			.register {
				color: #000;
			}
			.tap_line {
				
			}
		}
	}
	
}
</style>
