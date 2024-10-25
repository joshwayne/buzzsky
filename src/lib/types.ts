interface BlueskyPost {
	uri: string;
	record: {
		text: string;
		embed?: {
			external?: {
				uri: string;
				title?: string;
				description?: string;
			};
		};
	};
	likeCount: number;
	repostCount: number;
	quoteCount: number;
	indexedAt: string;
}

interface LinkStats {
	url: string;
	title: string;
	description: string;
	shareCount: number;
	posts: BlueskyPost[];
}

export type { BlueskyPost, LinkStats };
