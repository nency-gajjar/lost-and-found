<template>
  <div>
		<div :class="['leading-tight', varient]">
    	<slot />
  	</div>
		<div v-if="varient === 'gray'">
			<span
				class="
					w-20
					border-t-4 border-solid border-orange-200
					inline-block
					mb-3
				"
			></span>
		</div>
		<div v-if="varient === 'accent'">
			<span
				class="
					w-20
					border-t-4 border-solid border-gray-300
					inline-block
					mb-1
				"
			></span>
		</div>
	</div>	
</template>

<script>
export default {
	props: {
		// accent, gray, subheader, details, h4, h5, h6
    varient: { type: String, default: "", required: false },
  },
}
</script>

<style lang="scss" scoped>
.details {
	@apply py-3 text-2xl font-bold	text-center text-white
}
.gray {
	@apply my-2 text-xl font-bold text-gray-700
}
.accent {
	@apply text-lg  font-medium text-left text-accent-100
}
.subheader {
	@apply text-base text-left font-bold text-gray-700
}
// .h2 {
// 	@apply text-4xl font-medium text-gray-800
// }
// .h3 {
// 	@apply text-3xl font-medium text-gray-800
// }
.h4 {
	@apply text-2xl font-medium font-semibold text-gray-700
}
.h5 {
	@apply text-xl font-medium py-4 text-gray-800
}
.h6 {
	@apply text-base font-medium text-gray-800
}
</style>