<template>
	<u-picker 
	:defaultIndex="defaultIndex"
	:columns="columns"
	keyName="label"
	@cancel="cancel"
	@config="confirm"
	:show="show"/>
</template>

<script>
	import { areaCode } from './areaCode';
	export default {
		data() {
			return {
				show:false,
				defaultIndex: [0]
			}
		},
		computed: {
			columns() {
				const list = areaCode.map((i) => {
					return { label: `${i.label} +${i.value}`, value: i.value };
				});
				return [list];
			}
		},
		methods: {
			init() {
				this.show=true;
			},
			cancel() {
				this.show=false
			},
			confirm({value}) {
				this.$emit("chooseArea", item.value);
				this.show=false;
			}
		}
	}
</script>