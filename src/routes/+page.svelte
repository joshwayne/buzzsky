<script lang="ts">
	import { onMount } from 'svelte';
	import { BlueskyService } from '$lib/api';
	import type { LinkStats } from '$lib/types';
	import LinkCard from '../components/LinkCard.svelte';

	let bluesky = new BlueskyService();
	let links: LinkStats[] = [];
	let loading = false;
	let error: string | null = null;

	onMount(async () => {
		await fetchLinks();
	});

	async function fetchLinks() {
		loading = true;
		error = null;

		try {
			await bluesky.login(
				import.meta.env.VITE_BLUESKY_IDENTIFIER,
				import.meta.env.VITE_BLUESKY_PASSWORD
			);
			links = await bluesky.aggregateLinks(7);
		} catch (e) {
			error = 'Failed to fetch links. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<main class="mx-auto max-w-4xl p-4">
	<h1 class="mb-6 text-2xl font-bold">Bluesky Link Aggregator</h1>

	{#if error}
		<div class="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
			{error}
		</div>
	{/if}

	<button
		on:click={fetchLinks}
		class="mb-6 rounded bg-blue-500 px-4 py-2 text-white"
		disabled={loading}
	>
		{loading ? 'Refreshing...' : 'Refresh Links'}
	</button>

	<LinkCard {links} {loading} />
</main>
