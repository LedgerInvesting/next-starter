import { notFound } from 'next/navigation'
import { allAuthors, allPosts } from 'contentlayer/generated'
import { Mdx } from '@/components/mdx'
import '@/styles/mdx.css'
import { formatDate, getSelfURL } from '@/lib/utils'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import LinkedInLogo from '@/images/social/linkedin'
import { Container } from '@/components/container'
import { TableOfContent } from '@/components/table-of-content'

interface PostPageProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params) {
  const slug = params?.slug?.join('/')
  const post = allPosts.find((p) => p.slugAsParams === slug)

  if (!post) {
    return null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }
  const url = getSelfURL()

  let ogUrl
  if (url) {
    ogUrl = new URL(`${url}/og`)
    ogUrl.searchParams.set('heading', post.title)
    ogUrl.searchParams.set('type', 'Blog Post')
    ogUrl.searchParams.set('mode', 'dark')
  }

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `${url}/blog/${post.slug}`,
      images: [
        {
          url: ogUrl
            ? ogUrl.toString()
            : `/og?heading=${post.title}&mode=dark&type=Blog'`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  }
}

export async function generateStaticParams(): Promise<
  PostPageProps['params'][]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`),
  )

  return (
    <article>
      <div className="relative max-h-[200px] py-20 lg:max-h-[400px]">
        <div className="relative z-20 mx-auto grid max-w-7xl px-6 py-6 lg:px-8 lg:py-1">
          {post.date && (
            <time dateTime={post.date} className="block text-sm text-slate-600">
              Published on {formatDate(post.date)}
            </time>
          )}
          <h1 className="mt-2 inline-block text-4xl font-extrabold leading-tight text-slate-900 lg:text-5xl">
            {post.title}
          </h1>
          {authors?.length ? (
            <div className="mt-4 flex space-x-4">
              {authors.map((author) => {
                if (!author) return null
                const authorLink = author.twitter || author.linkedin
                return (
                  <div
                    key={author._id}
                    className="relative flex items-center space-x-2 text-sm"
                  >
                    <Image
                      src={author.avatar}
                      alt={author.slug}
                      width={42}
                      height={42}
                      className="rounded-full"
                    />
                    <div className="flex-1 text-left leading-tight">
                      <p className="font-medium text-slate-900">
                        {author.first_name}
                      </p>
                      {author.linkedin && (
                        <Link href={author.linkedin} target="_blank">
                          <LinkedInLogo className="ml-[2px] mt-2 h-4 text-slate-400 hover:text-slate-500" />
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
      <div></div>
      <div className="relative z-20 mx-auto max-w-7xl grid-cols-5 gap-4 px-6 py-6 lg:grid lg:px-8 lg:py-10">
        <div className="col-span-1 hidden lg:sticky lg:top-[6rem] lg:block lg:h-[calc(100vh-4.75rem)] lg:flex-none lg:overflow-y-auto">
          <TableOfContent
            headings={post.headings}
            backLinkHref="/blog"
            backLinkText="Back to Blog"
          />
        </div>
        <div className="col-span-3">
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              width={720}
              height={405}
              className="my-8 rounded-md border border-slate-200 bg-slate-200 transition-colors group-hover:border-slate-900"
              priority
            />
          )}
          <Mdx code={post.body.code} />
          <hr className="my-4 border-slate-200" />
          <div className="flex justify-center py-6 lg:py-10">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              {/* <Icons.chevronLeft className="mr-2 h-4 w-4" /> */}
              See all posts
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
