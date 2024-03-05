<template>
	<page-meta :root-font-size="$store.getters.storeRootFontSize"></page-meta>
	<view class="chating_container" :style="{backgroundColor: '#f8f8f8'}">
		<chating-header @click="packageClick" ref="chatingHeadRef"/>
	</view>
</template>

<script>
	import ChatingHeader from './components/ChatingHeader.vue';
	import { mapActions }  from 'vuex';
	export default {
		components: {
			ChatingHeader
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
