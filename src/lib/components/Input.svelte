<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import './Input.css';

	type Props = {
		label?: string;
		name: string;
		type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
		value?: string;
		placeholder?: string;
		autocomplete?: HTMLInputAttributes['autocomplete'];
		required?: boolean;
		minlength?: number;
		maxlength?: number;
		disabled?: boolean;
	};

	let { label, name, type = 'text', ...rest }: Props & Record<string, unknown> = $props();
</script>

{#if label}
	<label class="mot-input">
		<span class="mot-input__label">{label}</span>
		<input class="mot-input__field" {name} {type} {...rest} />
	</label>
{:else}
	<input class="mot-input__field" {name} {type} {...rest} />
{/if}
