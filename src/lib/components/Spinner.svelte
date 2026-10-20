<script lang="ts">
	type Props = {
		size?: number;
		color?: string;
		borderColor?: string;
	};

	let { size = 50, color = '#000', borderColor = 'transparent' }: Props = $props();

	const width = $derived(`width: ${size}px`);
	const height = $derived(`height: ${size}px`);
	const border = $derived(`border: ${size / 8}px solid`);
	const colors = $derived(`border-color: ${color} ${borderColor} ${borderColor} ${borderColor}`);
</script>

<div class="mot-spinner" style={[width, height].join(';')}>
	{#each [0, 1, 2] as i (i)}
		<div style={[width, height, border, colors].join(';')}></div>
	{/each}
</div>

<style>
	.mot-spinner {
		display: inline-block;
		position: relative;
	}

	.mot-spinner div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		border-radius: 50%;
		animation: mot-spinner-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	}

	.mot-spinner div:nth-child(1) {
		animation-delay: -0.45s;
	}

	.mot-spinner div:nth-child(2) {
		animation-delay: -0.3s;
	}

	.mot-spinner div:nth-child(3) {
		animation-delay: -0.15s;
	}

	@keyframes mot-spinner-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
