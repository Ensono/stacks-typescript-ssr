import { BlogLanding, Layout } from 'components'
import contentful from 'contentful'
import NextError from 'next/error'
import React from 'react'
import { PostType } from 'interfaces/blog.interface'
import { getAllPostsForHome } from '../../lib/cms-middleware'
import { getAllPostsForHome as gapfh } from '../../lib/amplience-api';

type BlogProps = {
    preview?: boolean
    allPosts: contentful.Entry<PostType>[]
}

const Blog = ({allPosts}: BlogProps) => {

    if (!allPosts) {
        return <NextError statusCode={404}/>
    }
    return (
        <Layout>
            <br/>
            <br/>
            {<BlogLanding posts={allPosts}/>}
        </Layout>
    )
}

export const getStaticProps = async () => {
    const allPosts = await getAllPostsForHome(false)
    return {
        props: {allPosts},
    }
}

export default Blog
