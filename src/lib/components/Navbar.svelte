<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import type { User } from 'better-auth';
	import './Navbar.css';

	const items = [
		{ label: 'Dashboard', id: '/(app)' },
		{ label: 'Wallets', id: '/(app)/wallets' },
		{ label: 'Transactions', id: '/(app)/transactions' },
		{ label: 'Budgets', id: '/(app)/budgets' },
		{ label: 'Loans', id: '/(app)/loans' },
		{ label: 'Notes', id: '/(app)/notes' },
		{ label: 'Todo Cards', id: '/(app)/todo-cards' },
		{ label: 'Link Cards', id: '/(app)/link-cards' },
		{ label: 'Meter Readings', id: '/(app)/meter-readings' }
	] as const;

	let { user }: { user: User | null } = $props();

	let open = $state(false);
	let userOpen = $state(false);
	let confirmOpen = $state(false);

	const isActive = (id: (typeof items)[number]['id']) => {
		const href = resolve(id);
		return href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
	};

	function onWindowClick(event: MouseEvent) {
		if (userOpen && event.target instanceof Element && !event.target.closest('.mot-nav__user')) {
			userOpen = false;
		}
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			userOpen = false;
			confirmOpen = false;
			open = false;
		}
	}
</script>

<svelte:window onclick={onWindowClick} onkeydown={onKeydown} />

<header class="mot-nav">
	<div class="mot-nav__items">
		<a class="mot-nav__brand" href={resolve('/(app)')}>Mot</a>

		<form class="mot-nav__logout" id="mot-logout" action="/logout" method="post">
			<button type="button" onclick={() => (confirmOpen = true)}>Logout</button>
		</form>

		<div class="mot-nav__user">
			<button
				class="mot-nav__icon"
				type="button"
				aria-label="Account"
				aria-expanded={userOpen}
				onclick={() => (userOpen = !userOpen)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
					/>
				</svg>
			</button>
			{#if userOpen}
				<div class="mot-nav__popover">
					<p class="mot-nav__user-name">{user?.name || 'Account'}</p>
					<p class="mot-nav__user-email">{user?.email}</p>
				</div>
			{/if}
		</div>

		<button
			class="mot-nav__toggle"
			aria-expanded={open}
			aria-label="Toggle menu"
			onclick={() => (open = !open)}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>

		<nav class="mot-nav__menu" class:open aria-label="Main">
			{#each items as item (item.id)}
				<a
					class="mot-nav__link"
					href={resolve(item.id)}
					aria-current={isActive(item.id) ? 'page' : undefined}
					onclick={() => (open = false)}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>
</header>

{#if confirmOpen}
	<div class="mot-modal" role="dialog" aria-modal="true" aria-labelledby="mot-logout-title">
		<div class="mot-modal__backdrop" onclick={() => (confirmOpen = false)} aria-hidden="true"></div>
		<div class="mot-modal__card">
			<h2 id="mot-logout-title" class="mot-modal__title">Logout</h2>
			<p class="mot-modal__text">Are you sure you want to logout of your account?</p>
			<div class="mot-modal__actions">
				<button type="button" class="mot-modal__cancel" onclick={() => (confirmOpen = false)}>
					Cancel
				</button>
				<button type="submit" form="mot-logout" class="mot-modal__confirm">Logout</button>
			</div>
		</div>
	</div>
{/if}
