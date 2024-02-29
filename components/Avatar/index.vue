<template>
	<u-avatar 
		@onError="errorHadle"
		:src="getAvatarUrl"
		@longpress="longpress"
		 :text="avatarText"
		 bgColor="#0089FF"
		 :defaultUrl="getDefaultUrl"
		 :shape="shape"
		 :size="size"
		 mode="aspectFill"
		 font-size="14"
		@click="click"></u-avatar>
</template>

<script>
	import defaultGroupIcon from "static/images/contact_my_group.png";
	import defaultNotifyIcon from 'static/images/default_notify_icon.png';
	export default {
		name: 'Avatar',
		props: {
			src:String,
			shape: {
				type: String,
				default: "square",
			},
			size: {
				type: String,
				default: '40',
			},
			isGroup: {
				type: Boolean,
				default: false,
			},
			isNotify: {
				type: Boolean,
				default: false,
			},
			desc: String,
		},
		data() {
			return {
				avatarText: undefined,
			}
		},
		computed: {
			getAvatarUrl() {
				if(this.isNotify) {
					return defaultNotifyIcon;
				}
				if(this.src) {
					return this.src;
				}
				if(this.isGroup) {
					return defaultGroupIcon;
				}
				this.avatarText = this.desc ? this.desc.slice(0,1): '';
				return "";
			},
			getDefaultUrl() {
				return this.isGroup ? defaultGroupIcon:undefined;
			},
		},
		methods: {
			errorHadle() {
				this.avatarText = this.desc ? this.desc.slice(0,1) : "";
			},
			redirectShow() {
				if(this.avatarText) {
					this.avatarText = undefined;
				}
			},
			click() {
				this.$emit('detail',this.name);
			},
			longpress() {
				console.log('【 longpress 】,log')
				this.$emit("longpress",this.name);
			}
		},
		watch: {
			src() {
				this.redirectShow();
			},
			desc() {
				this.redirectShow();
			}
		}
	}
</script>

<style></style>