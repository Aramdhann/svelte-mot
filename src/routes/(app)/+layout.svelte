<script lang="ts">
	import Navbar from '#lib/components/Navbar.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<div class="flex min-h-svh flex-col">
	<Navbar user={data.user} />
	{@render children()}
</div>
