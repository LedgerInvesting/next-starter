import {
    defineDocumentType,
    makeSource,
    ComputedFields,
} from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import GithubSlugger from 'github-slugger'

// write pnpm add rehype remark package
// write pnpm add @types/rehype-autolink-headings @types/rehype-pretty-code @types/rehype-slug @types/remark-frontmatter @types/remark-gfm @types/remark-mdx

const computedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
    headings: {
        type: 'json',
        resolve: async (doc) => {
            const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g
            const slugger = new GithubSlugger()
            const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
                ({ groups }) => {
                    const flag = groups?.flag
                    const content = groups?.content
                    return {
                        level: flag.length,
                        text: content,
                        slug: content ? slugger.slug(content) : undefined,
                    }
                },
            )
            return headings
        },
    },
} satisfies ComputedFields

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `posts/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
        },
        readtime: {
            type: 'string',
        },
        date: {
            type: 'date',
            required: true,
        },
        published: {
            type: 'boolean',
            default: false,
        },
        image: {
            type: 'string',
            required: true,
        },
        link: {
            type: 'string',
        },
        authors: {
            // Reference types are not embedded.
            // Until this is fixed, we can use a simple list.
            // type: "reference",
            // of: Author,
            type: 'list',
            of: { type: 'string' },
            required: true,
        },
    },
    computedFields,
}))

export const Author = defineDocumentType(() => ({
    name: 'Author',
    filePathPattern: `authors/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        slug: {
            type: 'string',
            required: true,
        },
        first_name: {
            type: 'string',
            required: true,
        },
        last_name: {
            type: 'string',
            required: true,
        },
        role: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        avatar: {
            type: 'string',
            required: true,
        },
        twitter: {
            type: 'string',
        },
        linkedin: {
            type: 'string',
        },
        medium: {
            type: 'string',
        },
    },
    computedFields,
}))

export const Page = defineDocumentType(() => ({
    name: 'Page',
    filePathPattern: `pages/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
        },
        category: {
            type: 'string',
            required: true,
        },
        updated_at: {
            type: 'string',
        },
        toc: {
            type: 'boolean',
            required: false,
            default: false,
        },
    },
    computedFields,
}))

export default makeSource({
    contentDirPath: './content',
    documentTypes: [Page, Post, Author,],
    mdx: {
        // @ts-ignore
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdx],
        rehypePlugins: [
            rehypeSlug,
            [
                // @ts-ignore
                rehypePrettyCode,
                {
                    theme: 'github-dark',
                    onVisitLine(node) {
                        // Prevent lines from collapsing in `display: grid` mode, and allow empty
                        // lines to be copy/pasted
                        if (node.children.length === 0) {
                            node.children = [{ type: 'text', value: ' ' }]
                        }
                    },
                    onVisitHighlightedLine(node) {
                        node.properties.className.push('line--highlighted')
                    },
                    onVisitHighlightedWord(node) {
                        node.properties.className = ['word--highlighted']
                    },
                },
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['subheading-anchor'],
                        ariaLabel: 'Link to section',
                    },
                },
            ],
        ],
    },
})
