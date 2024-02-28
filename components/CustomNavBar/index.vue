<template>
	<u-navbar class="custom_nav_bar"  @leftClick="leftClick" @rightClick="rightClick" :placeholder="true">
		<template slot="left">
			<slot name="left">
				<view class="u-nav-slot">
					<image
					src="@/static/images/common_left_arrow.png"
					 class="back_icon"
					 style="width: 12px;height: 20px;"/>
				</view>
			</slot>
		</template>
		<template slot="center">
			<slot name="center">{{title}}</slot>
		</template>
		<template slot="right">
			<slot name="right" class="u-nav-slot"></slot>
		</template>
	</u-navbar>
</template>

<script>
	export default {
		name: "",
		props: {
			title: {
				type: String,
			},
			more: {
				type: Boolean,
				default: false,
			},
			route: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {};
		},
		methods: {
			leftClick() {
				console.log('111')
				if(this.route) {
					uni.navigateBack();
				}
				this.$emit('leftClick');
			},
			rightClick() {
				this.$emit('rightClick');
			}
		}
	}
</script>

<style lang="scss" scoped>
.custom_nav_bar {
	.u-navbar__content__left {
		padding: 0;
		
	}
	.u-nav-slot {
		// padding-left: 15rpx;
	}
}
</style>