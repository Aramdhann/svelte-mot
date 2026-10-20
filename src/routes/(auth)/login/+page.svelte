<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import Button from '#lib/components/Button.svelte';
	import Input from '#lib/components/Input.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let submitting = $state(false);
</script>

<main class="flex min-h-screen flex-1 items-center justify-center px-4">
	<form
		method="post"
		action="?/signInEmail"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				submitting = false;
				await update();
			};
		}}
		class="w-full max-w-sm space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
	>
		<h1 class="text-2xl font-semibold tracking-tight">Login</h1>

		{#if form?.message}
			<p class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{form.message}</p>
		{/if}

		<Input label="Email" name="email" type="email" required autocomplete="email" />

		<Input
			label="Password"
			name="password"
			type="password"
			required
			minlength={8}
			autocomplete="current-password"
		/>

		<Button type="submit" block loading={submitting} label="Login" />

		<p class="text-center text-sm text-slate-500">
			No account?
			<a
				href={resolve('/(auth)/register')}
				class="font-medium text-slate-900 underline underline-offset-2">Register</a
			>
		</p>
	</form>
</main>
