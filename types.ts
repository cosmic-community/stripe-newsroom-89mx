export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface NewsroomMetadata {
  seo_description?: string;
  seo_title?: string;
  featured_image?: {
    url: string;
    imgix_url: string;
  };
  published_at?: string;
  content?: string;
}

export interface NewsroomStory extends CosmicObject {
  type: 'newsroom';
  metadata: NewsroomMetadata;
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

export function isNewsroomStory(obj: CosmicObject): obj is NewsroomStory {
  return obj.type === 'newsroom';
}