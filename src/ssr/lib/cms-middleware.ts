import * as contentful from './contentful-api';
import * as amplience from './amplience-api';

const CMS_CHOICES = {
    contentful,
    amplience
}

const CMS_CHOICE = process.env.NEXT_PUBLIC_AMPLIENCE_HUB_NAME ? 'amplience' : 'contentful';

export const {
    getLanguages,
    getPreviewPostBySlug,
    getAllPostsWithSlug,
    getAllPostsForHome,
    getPost
} = CMS_CHOICES[CMS_CHOICE];
