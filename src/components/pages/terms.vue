<template>
	<!-- block or page -->
  <section class="p-terms">
		<div class="main-wrapper">
			<div class="p-terms__header">
				<div class="p-terms__header-back" v-if="breakpoint" @click="$router.go(-1)"></div>
				<h1>Terms and Conditions</h1>
			</div>
			<div class="p-terms__body">
				<p>But why are Terms and Conditions agreements important? These agreements may not seem important for your store, as most regular (offline) stores don’t hand them out to customers as they walk through the door!</p>
				<p>Nonetheless, having this agreement for your e-commerce store is crucial for a number of reasons:</p>
				<p>They protect you from liability and clarify the purchasing process. They can be used to cancel accounts that do not comply with your terms</p>
				<p>They protect your store’s intellectual property and set out rules as to how it can be used. They set out the way in which any disputes will be handled. They also allow you to use payment gateways with credit card operators (who require you to have this agreement and a Privacy Policy before they will let you use their services).</p>
				<p>Contents of the Terms and Conditions</p>
				<p>The most important sections for an ecommerce store to cover in its Terms and Conditions agreement are:</p>
				<p>The limitation of liability clauses relating to your products. Intellectual property terms relating to your store brand. Clear information about your products, any warranties that you provide, payment terms, and conditions and timelines for delivery of goods. One of the most important things to make sure you do with your Terms and Conditions is to make them fair and clear.</p>
				<p>Limit your liability</p>
				<p>It’s particularly important to highlight any indemnity terms or terms where you exclude or limit your liability. Take particular care making sure that those terms are not ambiguous in any way.</p>
				<p v-if="!breakpoint" @click="$router.go(-1)">back</p>
			</div>
		</div>
  </section>
</template>

<script>
	import { breakpoint } from '../../functions.js'

	export default {
		computed: {
			breakpoint
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/settings/_module-settings.scss";

	.p-terms {
		&__header {
			border-bottom: 1px solid $opacityGray;
			margin-bottom: 2.2rem;
			display: flex;

			@include breakpoint(desktop) {
				border-bottom: none;
				display: block;
				padding-top: 5.8rem;
				padding-left: 65rem;
				margin-bottom: 5.4rem;
			}

			&-back {
				margin-top: 0.9rem;
				text-align: center;
				margin-left: 1.2rem;
				width: 2rem;
				height: 3rem;
				position: relative;

				&::before {
					content: "";
					display: block;
					width: 0.2rem;
					height: 1.4rem;
					background: $gray;
					transform: rotate(45deg);
					position: absolute;
					left: 0.3rem;
				}

				&::after {
					content: "";
					display: block;
					width: 0.2rem;
					height: 1.4rem;
					background: $gray;
					transform: rotate(-45deg);
					position: absolute;
					left: 0.3rem;
					top: 1rem;
				}
			}

			& h1 {
				@include fontSizeRem(24, 40);
				font-family: 'HelveticaNeue-Thin', sans-serif;
				color: $gray;
				margin-left: 0.1rem;
				margin-top: 1rem;
				
				@include breakpoint(desktop) {
					font-family: 'HelveticaNeue', sans-serif;
				}
			}
		}

		&__body {
			padding-left: 3.5rem;
			padding-right: 3.2rem;

			@include breakpoint(desktop) {
				padding-left: 65rem;
				padding-right: 62rem;
			}

			& p {
				@include fontSizeRem(14, 20);
				@include lineHeightRem(16, 25);
				color: $gray;
				margin-bottom: 1.6rem;

				@include breakpoint(desktop) {
					color: $lightGray;
					margin-bottom: 2.3rem;
				}

				&:last-of-type {
					margin-top: 4.8rem;
					color: $gray;
					cursor: pointer;
				}
			}
		}
	}
</style>


