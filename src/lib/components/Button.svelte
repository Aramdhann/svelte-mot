<script lang="ts">
	import type { Snippet } from 'svelte';
	import Spinner from './Spinner.svelte';
	import './Button.css';

	type Props = {
		variant?: 'primary' | 'outline' | 'danger';
		type?: 'button' | 'submit' | 'reset';
		block?: boolean;
		loading?: boolean;
		disabled?: boolean;
		label?: string;
		form?: string;
		children?: Snippet;
	};

	let {
		variant = 'primary',
		type = 'button',
		block = false,
		loading = false,
		disabled = false,
		label,
		form,
		children,
		...rest
	}: Props & Record<string, unknown> = $props();
</script>

<button
	class={['mot-button', `mot-button_${variant}`, block && 'mot-button_block']
		.filter(Boolean)
		.join(' ')}
	{type}
	{form}
	disabled={disabled || loading}
	{...rest}
>
	{#if loading}
		<Spinner size={16} color={variant === 'outline' ? '#0f172a' : '#fff'} />
	{/if}
	{#if label}
		<span>{label}</span>
	{/if}
	{@render children?.()}
</button>
