<template>
	<view class="chat_header">
		<view class="selft_info">
			<Avatar :src="storeSelfInfo.faceUrl" :desc="storeSelfInfo.nickname" size="46"/>
			<view class="self_info_desc">
				<view class="user_state">
					<text class="nickname">{{storeSelfInfo.nickname}}</text>
					<view class="tag" v-if="storeIsSyncing">
						<image class="loading"
						style="height: 24rpx;width: 24rpx;"
						src="@/static/images/loading.png"/>
						<text class="status">同步中</text>
					</view>
					<view class="tag" v-if="connectStart ==0">
						<image class="loading" style="height: 24rpx;width: 24rpx;" src="@/static/images/loading.png" />
						<text class="status">连接中</text>
					</view>
					<view class="err-tag" v-if="connectStart == -1">
						<image style="height: 24rpx;width: 24rpx;" src="@/static/images/loading.png" />
						<text class="status">连接失败</text>
					</view>
				</view>
			</view>
		</view>
		<view class="right_action">
			<view class="call_icon"></view>
			<view class="more_icon" @click="showMore">
				<image  src="@/static/images/common_circle_add.png" />
			</view>
			<u-overlay :show="moreMenuVisiable" @click="moreMenuVisiable=false" opacity="0">
				<view :style="{top: popMenuPossition.top,right:popMenuPossition.right}" 
					class="more_menu">
					<view class="menu_item" 
						v-for="item in moreMenus" 
						:key="item.idx" 
						@click="clickMenu(item)">
						<image :src="item.icon" mode=""/>
						<text>{{item.title}}</text>
					</view>
				</view>
			</u-overlay>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Avatar from '@/components/Avatar/index.vue';
	export default {
		components: {
			Avatar
		},
		computed: {
			...mapGetters(['storeSelfInfo','storeIsSyncing'])
		},
		mounted() {
			
		},
		data() {
			return {
				connectStart: -2,
				moreMenuVisiable: false,
				popMenuPossition: {
					top:0,
					right: 0,
				},
				moreMenus: [
					{
						idx:0,
						title: '扫一扫',
						icon: require('static/images/more_qr.png')
					},
					{
						idx: 1,
						title: '添加好友',
						icon: require('static/images/more_add_friend.png')
					},
					{
						idx:3,
						title: '创建群聊',
						icon: require('static/images/more_create_group.png')
					}
				]
			}
		},
		created() {
			// console.log(this.storeSelfInfo);
		},
		methods: {
			clickMenu({ idx }) {
				switch(idx) {
					case 0:
						// #ifdef APP-PLUS
						uni.scanCode({
							scanType:['qrCode'],
							success:({result}) => { }
						})
						// #endif
						
						// #ifndef APP-PLUS
						uni.$u.toast('暂不支持');
						// #endif
						
						break;
					case 1:
					case 2:
						uni.navigateTo({
							url:`/pages/common/searchUserOrGroup/index?isSearchGroup=${idx===2}`
						})
						break;
					case 3:
						uni.navigateTo({
							url:`/pages/common/createGroup/index`
						})
						break;
				}
			},
			async showMore() {
				const { right, bottom }  = await this.getEl(".more_icon");
				this.popMenuPossition.right = uni.getWindowInfo().windowWidth - right + 'px';
				this.popMenuPossition.top = bottom+'px';
				this.moreMenuVisiable = true;
			},
			getEl(el) {
				return new Promise((resolve) => {
					const query = uni.createSelectorQuery().in(this);
					query.select(el).boundingClientRect((data) => {
						resolve(data);
					}).exec();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
@keyframes loading {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
.chat_header {
	@include btwBox;
	padding: 36rpx 44rpx;
	margin-top: var(--status-bar-height);
	.selft_info{
		@include btwBox;
		&_desc {
			@include colBox(true);
			margin-left: 24rpx;
			color: $uni-text-color;
			.company {
				@include nomalEllipsis;
				font-size: 24rpx;
				margin-bottom: 10rpx;
				max-width: 300rpx;
			}
			.user_state {
				@include vCenterBox;
				.nickname {
					@include nomalEllipsis;
					font-size: 26rpx;
					max-width: 240rpx;
				}
				.err-tag {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 152rpx;
					height: 44rpx;
					background-color: #ffe1dd;
					border-radius: 12rpx;
					margin-left: 8rpx;
					.status {
						font-size: 24rpx;
						margin-left: 8rpx;
						font-weight: 400;
						color: #ff381f;
					}
				}
				.tag {
					display: flex;
					width: 152rpx;
					height: 44rpx;
					margin-left: 8rpx;
					align-items: center;
					border-radius: 12rpx;
					justify-content: center;
					background-color: #f2f8ff;
					.loading {
						animation: loading 1.5s infinite;
					}
					.status {
						font-size: 24rpx;
						margin-left: 8rpx;
						font-weight: 400;
						color: #0089ff;
					}
				}
				.online_state {
					@include vCenterBox;
					margin-left: 24rpx;
					font-size: 24rpx;
					.dot {
						width: 12rpx;
						height: 12rpx;
						border-radius: 50%;
						margin-right: 12rpx;
						background-color: #10cc64;
					}
				}
			}
		}
	}
	.right_action {
		display: flex;
		position: relative;
		.call_icon {
			margin-right: 24rpx;
			// width: 50rpx;
			// height: 50rpx;
			// right: 28rpx;
			// position: absolute;
			// background-color: red;
			// transform: translateX(25rpx);
			image {
				width: 56rpx;
				height: 56rpx;
			}
		}
		.more_icon {
			image {
				width: 56rpx;
				height: 56rpx;
			}
		}
		.more_menu {
			z-index: 99;
			position: absolute;
			width: max-content;
			border-radius: 12rpx;
			background-color: #fff;
			// background-color: red;
			box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.16);
			&::before {
				content: '';
				width: 50rpx;
				height: 25rpx;
				right: 4rpx;
				// transform: translateX(-28rpx);
				position: absolute;
				display: inline-block;
				// background-color: red;
			}
			.menu_item {
				display: flex;
				padding: 20rpx 24rpx;
				align-items: center;
				justify-content: flex-start;
				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 24rpx;
				}
				&:last-child {
					border: none;
				}
			}
		}
	}
}
</style>
