import { createBucketClient } from '@cosmicjs/sdk';
import type { NewsroomStory } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
});

type CosmicClient = ReturnType<typeof createBucketClient>;

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean')
    return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export async function fetchAllNewsroomStories(
  client: CosmicClient,
  previewToken?: string | null
): Promise<NewsroomStory[]> {
  try {
    const query = client.objects
      .find({ type: 'newsroom' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1);

    const response = previewToken ? await query.status('any') : await query;
    const stories = (response.objects || []) as NewsroomStory[];

    return [...stories].sort((a, b) => {
      const dateA = new Date(
        a.metadata?.published_at || a.created_at
      ).getTime();
      const dateB = new Date(
        b.metadata?.published_at || b.created_at
      ).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch newsroom stories');
  }
}

export async function fetchNewsroomStoryBySlug(
  client: CosmicClient,
  slug: string,
  previewToken?: string | null
): Promise<NewsroomStory | null> {
  try {
    const query = client.objects
      .findOne({ type: 'newsroom', slug })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1);

    const response = previewToken ? await query.status('any') : await query;
    return (response.object as NewsroomStory) || null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch newsroom story');
  }
}