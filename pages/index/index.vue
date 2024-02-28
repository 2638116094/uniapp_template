<template>
  <view class="index">
	  <view class="index-button" @click="openContact">contact</view>
	  <!-- <text class="title">首页</text> -->
	<!-- <p class="index-button" @click="openConversation">打开 TUIKit 会话</p>
	<p class="index-button" @click="openContact">打开 TUIKit 联系人</p> -->
  </view>
</template>
<script>
export default {
methods: {
  // 打开 TUIKit 会话列表
  openConversation() {
    uni.navigateTo({
		url: '/pages/contact/index/index'
	  // url: "/TUIKit/components/TUIConversation/index",
	});
  },
  // 打开 TUIKit 联系人
  openContact() {
    uni.navigateTo({
		url: '/pages/contact/index/index'
  	  // url: "/TUIKit/components/TUIContact/index",
  	});
  },
 },
};
</script>
<style lang="scss" scoped>
.index {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
	  font-size: 35rpx;
	  margin-top: 40rpx;
	  font-weight: bold;
  }
  &-button {
    width: 180px;
	padding: 10px 40px;
	color: #fff;
	background-color: #006eff;
	font-size: 16px;
	margin-top: 65px;
	border-radius: 30px;
	text-align: center;
  }
}
</style>