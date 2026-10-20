<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let submitting = $state(false);
</script>

<main class="flex min-h-screen flex-1 items-center justify-center px-4">
	<form
		method="post"
		action="?/signUpEmail"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				submitting = false;
				await update();
			};
		}}
		class="w-full max-w-sm space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
	>
		<h1 class="text-2xl font-semibold tracking-tight">Register</h1>

		{#if form?.message}
			<p class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{form.message}</p>
		{/if}

		<label class="block text-sm font-medium text-slate-700">
			Name
			<input
				name="name"
				required
				autocomplete="name"
				class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
			/>
		</label>

		<label class="block text-sm font-medium text-slate-700">
			Email
			<input
				type="email"
				name="email"
				required
				autocomplete="email"
				class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
			/>
		</label>

		<label class="block text-sm font-medium text-slate-700">
			Password
			<input
				type="password"
				name="password"
				required
				minlength="8"
				autocomplete="new-password"
				class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
			/>
		</label>

		<button
			type="submit"
			disabled={submitting}
			class="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
		>
			{submitting ? 'Creating account…' : 'Register'}
		</button>

		<p class="text-center text-sm text-slate-500">
			Already have an account?
			<a href="/login" class="font-medium text-slate-900 underline underline-offset-2">Login</a>
		</p>
	</form>
</main>
