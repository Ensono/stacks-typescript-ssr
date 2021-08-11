import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { Image, ContentClient } from 'dc-delivery-sdk-js';
import algoliasearch from "algoliasearch";
import ReactMarkdown from 'react-markdown';

const AmplienceClient = new ContentClient({
    hubName: process.env.NEXT_PUBLIC_AMPLIENCE_HUB_NAME,
});

const AlgoliaClient = algoliasearch(
    process.env.NEXT_PUBLIC_AMPLIENCE_ALGOLIA_APPLICATION_ID,
    process.env.NEXT_PUBLIC_AMPLIENCE_ALGOLIA_SEARCH_API_KEY
);

const AmplienceRenderImage = (amplienceImageObject) => new Image(amplienceImageObject, {}).url().build();

const AlgoliaSearchIndex  = AlgoliaClient.initIndex(process.env.NEXT_PUBLIC_AMPLIENCE_ALGOLIA_INDEX_NAME);

function parseAuthor(authors) {
    const author = authors[0];
    return {
        name: author.name,
        picture: {
            url: AmplienceRenderImage(author.avatar.image)
        }
    }
}

function parseEntry({ authors, content, image, date, description, urlSlug, title }) {
    return {
        author: parseAuthor(authors), // due to amplience data type being an array and not singular
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        content: ReactDOMServer.renderToString(React.createElement(ReactMarkdown, {}, content[0].text)),
        coverImage: {
            url: AmplienceRenderImage(image.image)
        },
        date,
        excerpt: description,
        slug: urlSlug,
        title
    }
}

function parsePostEntries(entries) {
    return entries.map(parseEntry);
}

export async function getLanguages() {

}

export async function getPreviewPostBySlug(slug) {
    const { hits } = await AlgoliaSearchIndex.search('', {
        filters:`urlSlug:${slug}`
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return parseEntry(hits[0]);
}

export async function getAllPostsWithSlug() {
    const { hits } = await AlgoliaSearchIndex.search('', {});
    return hits.map(hit => ({ slug: hit.urlSlug }));
}

export async function getAllPostsForHome(preview) {
    const { hits } = await AlgoliaSearchIndex.search('');
    return parsePostEntries(hits);
}

export async function getPost(slug, locale) {
    const { hits } = await AlgoliaSearchIndex.search('', {
        filters:`urlSlug:${slug}`
    });
    return {
        post: parseEntry(hits[0])
    }
}
