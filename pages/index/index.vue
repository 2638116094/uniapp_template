<template>
	<view class="wrap">
      <u-swipe-action>
        <u-swipe-action-item :options="options2">
          <view class="swipe-action u-border-top u-border-bottom">
            <view class="swipe-action__content">
              <text class="swipe-action__content__text">两个按钮并列</text>
            </view>
          </view>
        </u-swipe-action-item>
      </u-swipe-action>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                options2: [{
                    text: '收藏',
                    style: {
                        backgroundColor: '#3c9cff'
                    }
                }, {
                    text: '删除',
                    style: {
                        backgroundColor: '#f56c6c'
                    }
                }],
			};
		},
	};
</script>

<style lang="scss">
	.wrap {
		width: 100vw;
		height: 100vh;
	}
    .u-page {
        padding: 0;
    }

    .u-demo-block__title {
        padding: 10px 0 2px 15px;
    }

    .swipe-action {
        &__content {
             padding: 25rpx 0;
    
            &__text {
                 font-size: 15px;
                 color: $u-main-color;
                 padding-left: 30rpx;
             }
        }
    }
</style>
