<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
	let submitting = $state(false);

	const typeStyles: Record<string, string> = {
		cash: 'bg-amber-100 text-amber-800',
		bank: 'bg-emerald-100 text-emerald-800',
		ewallet: 'bg-sky-100 text-sky-800',
		other: 'bg-slate-100 text-slate-700'
	};
	const typeLabels: Record<string, string> = {
		cash: 'Cash',
		bank: 'Bank',
		ewallet: 'E-Wallet',
		other: 'Other'
	};
</script>

<main class="mx-auto w-full max-w-2xl px-4 py-8 lg:max-w-4xl">
	<h1 class="text-3xl font-semibold tracking-tight">Wallets</h1>

	<div class="mt-6 grid items-start gap-6 lg:grid-cols-2">
		<form
			method="post"
			action="?/create"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					submitting = false;
					await update();
				};
			}}
			class="space-y-4 rounded-xl border border-slate-200 bg-white p-6 lg:order-2 lg:mt-0"
		>
			<h2 class="text-lg font-semibold tracking-tight">Add wallet</h2>

			{#if form?.message}
				<p class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{form.message}</p>
			{/if}

			<label class="block text-sm font-medium text-slate-700">
				Name
				<input
					name="name"
					required
					maxlength="100"
					value={form?.values?.name ?? ''}
					placeholder="e.g. BCA, GoPay, Cash wallet"
					class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
				/>
			</label>

			<label class="block text-sm font-medium text-slate-700">
				Type
				<select
					name="type"
					class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
				>
					<option
						value="cash"
						selected={form?.values?.type !== 'bank' &&
							form?.values?.type !== 'ewallet' &&
							form?.values?.type !== 'other'}>Cash</option
					>
					<option value="bank" selected={form?.values?.type === 'bank'}>Bank</option>
					<option value="ewallet" selected={form?.values?.type === 'ewallet'}>E-Wallet</option>
					<option value="other" selected={form?.values?.type === 'other'}>Other</option>
				</select>
			</label>

			<button
				type="submit"
				disabled={submitting}
				class="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
			>
				Add wallet
			</button>
		</form>

		<ul class="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white lg:order-1">
			{#if data.wallets.length === 0}
				<li class="px-4 py-6 text-center text-sm text-slate-500">
					No wallets yet. Add your first one.
				</li>
			{:else}
				{#each data.wallets as wallet (wallet.id)}
					<li class="flex items-center justify-between px-4 py-3">
						<span class="text-sm font-medium text-slate-900">{wallet.name}</span>
						<span
							class="rounded-full px-2.5 py-0.5 text-xs font-medium capitalize {typeStyles[
								wallet.type
							] ?? typeStyles.other}"
						>
							{typeLabels[wallet.type] ?? wallet.type}
						</span>
					</li>
				{/each}
			{/if}
		</ul>
	</div>
</main>
