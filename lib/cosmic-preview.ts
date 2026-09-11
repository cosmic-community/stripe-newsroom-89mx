import { cookies } from 'next/headers';
import { createBucketClient } from '@cosmicjs/sdk';

type CosmicClient = ReturnType<typeof createBucketClient>;

interface GetCosmicResult {
  cosmic: CosmicClient;
  previewToken: string | null;
}

export async function getCosmic(): Promise<GetCosmicResult> {
  const cookieStore = await cookies();
  const previewToken = cookieStore.get('cosmic_preview')?.value ?? null;

  const cosmic = createBucketClient({
    bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
    readKey: process.env.COSMIC_READ_KEY as string,
    writeKey: process.env.COSMIC_WRITE_KEY as string,
    // Do not set apiEnvironment: when a previewToken is present the SDK
    // already resolves draft content, and forcing 'staging' would serve
    // unpublished content to normal visitors too.
    ...(previewToken ? { previewToken } : {}),
  });

  return { cosmic, previewToken };
}