<script lang="ts">
	import type { LinkStats } from '$lib/types';

	export let links: LinkStats[] = [];
	export let loading = false;
</script>

<div class="space-y-6">
	{#each links as link}
		<div class="rounded border p-4">
			<h2 class="mb-2 text-xl font-semibold">
				<a href={link.url} target="_blank" rel="noopener noreferrer">
					{link.title}
				</a>
			</h2>
			<div class="-mt-1 mb-2 text-sm text-gray-500">{link.url}</div>
			<p class="mb-2 text-gray-600">{link.description}</p>
			<div class="text-sm text-gray-500">
				Shared {link.shareCount} times in the last 7 days
			</div>
		</div>
	{/each}

	{#if links.length === 0 && !loading}
		<p class="text-gray-600">No shared links found in the past 7 days.</p>
	{/if}
</div>
