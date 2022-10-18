<template>
	<div class="wrapper">
		<div class="
        card
        w-full
        mx-6
        lg:mx-0
        md:w-8/12
        lg:w-7/12
        xl:w-6/12
        bg-white
        border border-[#E1E3E6]
        rounded-lg
      " style="box-shadow: rgba(54, 28, 93, 0.04) -10px 18px 32px">
			<ValidationObserver v-slot="{ validate }" ref="observer">
				<form @submit.prevent="validate().then(onSubmit)">
					<div class="card p-6 space-y-4">
						<div class="form-title">
							<h1 class="
                  w-full
                  my-2
                  text-xl
                  font-bold
                  leading-tight
                  text-gray-700
                ">
								Select Item Delivery
							</h1>
							<div class="flex justify-start">
								<span class="
                    w-20
                    border-t-4 border-solid border-orange-200
                    inline-block
                    mb-3
                  "></span>
							</div>
						</div>
						<div class="flex flex-wrap">
							<div class="w-full">
								<ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
									<li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
										<a class="
										cursor-pointer
                        text-xs
                        font-bold
                        px-5
                        py-3
                        shadow-lg
                        rounded
                        block
                        leading-normal
                      " v-on:click="toggleTabs(1)" v-bind:class="{
                        'text-orange-600 bg-white': openTab !== 1,
                        'text-white bg-accent-100 hover:bg-accent-200': openTab === 1,
                      }">
											<i class="fas fa-space-shuttle text-base mr-1"></i> Hold
											for Pickup
										</a>
									</li>
									<li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
										<a class="
										cursor-pointer
                        text-xs
                        font-bold
                        px-5
                        py-3
                        shadow-lg
                        rounded
                        block
                        leading-normal
												
                      " v-on:click="toggleTabs(2)" v-bind:class="{
                        'text-orange-600 bg-white': openTab !== 2,
                        'text-white bg-accent-100 hover:bg-accent-200': openTab === 2,
                      }">
											<i class="fas fa-cog text-base mr-1"></i> Ship it to Me
										</a>
									</li>
								</ul>
								<!-- <div class="
                    relative
                    flex flex-col
                    min-w-0
                    break-words
                    bg-white
                    w-full
                    mb-6
                    shadow-lg
                    rounded
                  ">
									<div class="px-4 py-5 flex-auto">
										<div class="tab-content tab-space">
											<div v-bind:class="{
											  hidden: openTab !== 1,
											  block: openTab === 1,
											}">
												<p>
													Collaboratively administrate empowered markets via
													plug-and-play networks. Dynamically procrastinate B2C
													users after installed base benefits.
													<br />
													<br />
													Dramatically visualize customer directed convergence
													without revolutionary ROI.
												</p>
											</div>
											<div v-bind:class="{
											  hidden: openTab !== 2,
											  block: openTab === 2,
											}">
												<p>
													Completely synergize resource taxing relationships via
													premier niche markets. Professionally cultivate
													one-to-one customer service with robust ideas.
													<br />
													<br />
													Dynamically innovate resource-leveling customer
													service for state of the art customer service.
												</p>
											</div>
											<div v-bind:class="{
											  hidden: openTab !== 3,
											  block: openTab === 3,
											}">
												<p>
													Efficiently unleash cross-media information without
													cross-media value. Quickly maximize timely
													deliverables for real-time schemas.
													<br />
													<br />
													Dramatically maintain clicks-and-mortar solutions
													without functional solutions.
												</p>
											</div>
										</div>
									</div>
								</div> -->
							</div>
						</div>
						<span v-bind:class="{
						  hidden: openTab !== 1,
						  block: openTab === 1,
						}">

							<ValidationProvider v-slot="{ errors }" rules="max:100|venueName" class="block mb-4">
								<BaseInput v-model="pickupPersonName" type="text" label="Pickup Person Name"
									:class="errors.length > 0 && 'error'" />
								<p v-if="errors.length" class="vee-validation-error mt-2 text-sm text-red-600">
									{{ errors[0] }}
								</p>
							</ValidationProvider>
							<div class="block mb-4">
								<BaseInput v-model="additionalPersonName" type="text" label="Additional Person Name" />
							</div>
							<ValidationProvider v-slot="{ errors }" rules="required" class="block mb-4">
								<BaseInput v-model="expectedPickupDate" type="date" label="Expected Pickup Date"
									:class="errors.length > 0 && 'error'" />
								<p v-if="errors.length" class="vee-validation-error mt-2 text-sm text-red-600">
									{{ errors[0] }}
								</p>
							</ValidationProvider>
						</span>
						<div class="flex justify-end">
							<button :class="{ 'button--loading': isLoading }" type="submit" class="
                  !py-3
                  font-medium
                  text-md
                  leading-5
                  uppercase
                  py-2
                  px-12
                  rounded-md
                  button
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-offset-primary-60
                  transition-all
                  font-display
                  disabled:cursor-not-allowed
                  bg-accent-100
                  text-white
                  focus:ring-accent-100
                  shadow-accent
                  hover:bg-accent-200
                ">
								<span class="button__text"> Submit </span>
							</button>
						</div>
					</div>
				</form>
			</ValidationObserver>
		</div>
	</div>
</template>
  
<script>
export default {
	data: () => ({
		openTab: 1,
		pickupPersonName: '',
		additionalPersonName: '',
		expectedPickupDate: new Date().toISOString().slice(0, 10),
		isLoading: false,
	}),
	methods: {
		toggleTabs: function (tabNumber) {
			this.openTab = tabNumber;
		},
		async onSubmit() {
			const isValid = await this.$refs.observer.validate();
			console.log('===isValid', isValid);
			if (!isValid) {
				this.isLoading = false
			} else {
				this.isLoading = true
			}
		}
	},
};
</script>
  
<style lang="scss">
.wrapper {
	@apply min-h-screen flex justify-center py-10 mx-auto;
}

.editor-container {
	min-width: 200px;
	min-height: 200px;
}

.editor-tools {
	@apply flex flex-wrap w-full justify-between;
	margin-bottom: 20px;
}

.editor-tools .icons {
	@apply flex items-center;
}

.editor-tools .save-upload .button__text {
	@apply flex items-center;
}

.editor-tools .save-upload .button__text svg {
	margin-right: 10px;
	width: 18px;
}

.custom-editor {
	@apply flex justify-center;
	border: 1px solid #808080;
	background-color: #ffffff;
}

.editor-tools .icons {
	div {
		cursor: pointer;
		border: 1px solid #808080;
		border-radius: 14px;
		margin-right: 7px;

		&:hover {
			background: #dfdfdf;
		}

		padding: 2px 10px;
		background-color: #f3f3f3;
		margin-bottom: 5px;
		color: #ff9800;

		svg {
			width: 18px;
		}
	}
}

.top-margin-05 {
	margin-top: 0.5rem !important;
}

.top-margin-alert {
	margin-top: 2.5rem !important;
}

.previewCard h1,
h2,
h3,
h4,
h5,
h6 {
	font-size: revert;
	font-weight: revert;
}

canvas {
	width: 0 !important;
	object-fit: contain;
}

.canvas-container {
	width: 100% !important;
}

.canvas-container {
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 500px !important;
	min-height: 384px;
}

.upper-canvas {
	margin: 0px 0px;
	min-width: 500px !important;
	min-height: 384px;
}

.lower-canvas {
	min-width: 500px !important;
	min-height: 384px;
	position: static !important;
}

.vs__dropdown-toggle {
	@apply h-12 rounded-lg;
}

.error {
	&>div {
		@apply text-red-500;
	}

	.vs__dropdown-toggle {
		@apply border-red-500 border-2 ring-4 ring-red-500 ring-opacity-10 transition-none;
	}
}

.top-margin-3 {
	margin-top: 3px !important;
}

@media only screen and (max-width: 650px) {

	.canvas-container,
	.upper-canvas,
	.lower-canvas {
		min-width: 0 !important;
		min-height: 0 !important;
		width: 500px !important;
		height: 384px !important;
	}
}

@media only screen and (max-width: 510px) {

	.canvas-container,
	.upper-canvas,
	.lower-canvas {
		min-width: 0 !important;
		min-height: 0 !important;
		width: 350px !important;
		height: 350px !important;
	}
}

@media only screen and (max-width: 410px) {

	.canvas-container,
	.upper-canvas,
	.lower-canvas {
		min-width: 0 !important;
		min-height: 0 !important;
		width: 300px !important;
		height: 300px !important;
	}
}

.fade-enter {
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 500ms ease-out;
}

.fade-leave-to {
	opacity: 0;
}

.vue-tel-input {
	border-radius: 0.5rem;
	overflow: hidden;
}

.vs__actions svg {
	display: none;
}

.vs__actions {
	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23737373' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
	background-position: right 0.5rem center;
	background-repeat: no-repeat;
	background-size: 1.5em 1.5em;
	width: 26px;
}

.button {
	position: relative;
	border: none;
	outline: none;
	cursor: pointer;
}

.button__text {
	color: #ffffff;
	transition: all 0.2s;
}

.button--loading .button__text {
	visibility: hidden;
	opacity: 0;
}

.button--loading::after {
	content: "";
	position: absolute;
	width: 16px;
	height: 16px;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	border: 4px solid transparent;
	border-top-color: #ffffff;
	border-radius: 50%;
	animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
	from {
		transform: rotate(0turn);
	}

	to {
		transform: rotate(1turn);
	}
}

.loader {
	border-top-color: orange;
	-webkit-animation: spinner 1.5s linear infinite;
	animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
	0% {
		-webkit-transform: rotate(0deg);
	}

	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spinner {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>