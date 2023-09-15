import { formatDate } from '@/lib/utils'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

const isProduction = process.env.NODE_ENV === 'production'
export default function Page(props) {
    const posts = allPosts
        .filter(
            (post) =>
                (typeof props.searchParams?.draft === 'string' &&
                    !isProduction) ||
                post.published,
        )
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    return (
        <div className="container mx-auto max-w-4xl px-4 py-6 lg:px-0 lg:py-10">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                <div className="flex-1 space-y-4">
                    <h1 className="inline-block text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
                        Blog
                    </h1>
                    <p className="text-xl text-slate-600">
                        We write about things.
                    </p>
                </div>
            </div>
            <hr className="my-8 border-slate-200" />
            {posts?.length ? (
                <div className="grid gap-10 sm:grid-cols-2">
                    {posts.map((post, index) => (
                        <article
                            /* eslint-disable-next-line no-underscore-dangle */
                            key={post._id}
                            className="group relative flex flex-col space-y-2"
                        >
                            {post.image && (
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    height={250}
                                    width={500}
                                    className="h-[200px] rounded-md border border-slate-200 bg-slate-200 object-cover transition-colors group-hover:border-slate-900"
                                    priority={index <= 1}
                                />
                            )}
                            <h2 className="text-2xl font-extrabold">
                                {post.title}
                            </h2>
                            {post.description && (
                                <p className="text-sm text-slate-600">
                                    {post.description}
                                </p>
                            )}
                            {post.date && (
                                <p className="text-sm text-slate-600">
                                    {formatDate(post.date)}
                                </p>
                            )}
                            <Link
                                href={'/blog/'+post.slugAsParams}
                                className="absolute inset-0"
                                target={post.link ? '_blank' : '_self'}
                            >
                                <span className="sr-only">View Article</span>
                            </Link>
                        </article>
                    ))}
                </div>
            ) : (
                <p>No posts published.</p>
            )}
        </div>
    )
}
