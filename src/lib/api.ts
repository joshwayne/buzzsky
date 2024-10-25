import { AtpAgent } from '@atproto/api';
import type { LinkStats } from '$lib/types';

export class BlueskyService {
	private agent: AtpAgent;

	constructor() {
		this.agent = new AtpAgent({
			service: 'https://bsky.social'
		});
	}

	async login(identifier: string, password: string) {
		await this.agent.login({
			identifier,
			password
		});
	}

	async getFollowingFeed(limit = 100) {
		const { data } = await this.agent.getTimeline({
			limit,
			algorithm: 'reverse-chronological'
		});

		return data.feed;
	}

	async aggregateLinks(timeframeDays = 1): Promise<LinkStats[]> {
		const feed = await this.getFollowingFeed();
		const cutoffDate = new Date();
		cutoffDate.setDate(cutoffDate.getDate() - timeframeDays);

		const linkMap = new Map<string, LinkStats>();

		for (const post of feed) {
			const postDate = new Date(post.post.indexedAt);
			if (postDate < cutoffDate) continue;

			// Check for external embed
			const externalEmbed = post.post.record.embed?.external;
			if (!externalEmbed?.uri) continue;

			const existingStats = linkMap.get(externalEmbed.uri) || {
				url: externalEmbed.uri,
				title: externalEmbed.title || 'Untitled',
				description: externalEmbed.description || '',
				shareCount: 0,
				posts: []
			};

			// Count original post
			existingStats.shareCount++;
			existingStats.posts.push(post.post);

			// Add repost count
			if (post.post.repostCount) {
				existingStats.shareCount += post.post.repostCount;
			}

			// Add quote count
			if (post.post.quoteCount) {
				existingStats.shareCount += post.post.quoteCount;
			}

			linkMap.set(externalEmbed.uri, existingStats);
		}

		return Array.from(linkMap.values()).sort((a, b) => b.shareCount - a.shareCount);
	}
}
