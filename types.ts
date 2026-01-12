export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface SiteSettings extends CosmicObject {
  type: 'site-settings';
  metadata: {
    name?: string;
    tagline?: string;
    about_text?: string;
    philosophy?: string;
    contact_email?: string;
    social_links?: SocialLink[];
    bg_color_start?: string;
    bg_color_end?: string;
    accent_color?: string;
  };
}

export interface ProjectCategory {
  key: string;
  value: string;
}

export interface ProjectImage {
  url: string;
  imgix_url: string;
}

export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    title?: string;
    subtitle?: string;
    description?: string;
    featured_image?: ProjectImage;
    project_url?: string;
    year?: string;
    category?: ProjectCategory;
    display_order?: number;
  };
}

export type ProjectCategoryKey = 'design' | 'development' | 'branding' | 'experience' | 'film';