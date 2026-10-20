<script lang="ts">
	import { page } from '$app/state';
	import './Navbar.css';

	const items = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Wallets', href: '/wallets' },
		{ label: 'Transactions', href: '/transactions' },
		{ label: 'Budgets', href: '/budgets' },
		{ label: 'Loans', href: '/loans' },
		{ label: 'Notes', href: '/notes' },
		{ label: 'Todo Cards', href: '/todo-cards' },
		{ label: 'Link Cards', href: '/link-cards' },
		{ label: 'Meter Readings', href: '/meter-readings' }
	] as const;

	let open = $state(false);

	const isActive = (href: (typeof items)[number]['href']) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<header class="mot-nav">
	<div class="mot-nav__items">
		<a class="mot-nav__brand" href="/">MOT</a>

		<form class="mot-nav__logout" action="/logout" method="post">
			<button type="submit">Logout</button>
		</form>

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
			{#each items as item (item.href)}
				<a
					class="mot-nav__link"
					href={item.href}
					aria-current={isActive(item.href) ? 'page' : undefined}
					onclick={() => (open = false)}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>
</header>
