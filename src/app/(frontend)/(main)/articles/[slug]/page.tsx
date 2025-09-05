import { getPayload } from 'payload'
import config from '@payload-config'
import { Category, Media, User } from '@/payload-types'
import { notFound } from 'next/navigation'
import ThumbnailDisplay from '@/components/ThumbnailDisplay'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Calendar, User as UserIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cache } from 'react'

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs: articles } = await payload.find({
    collection: 'articles',
    where: { _status: { equals: 'published' } },
  })

  return articles.map((article) => ({ slug: article.slug }))
}

const getArticle = cache(async (slug: string) => {
  const payload = await getPayload({ config })
  return (
    await payload.find({
      collection: 'articles',
      where: { slug: { equals: slug }, _status: { equals: 'published' } },
    })
  ).docs.at(0)
})

const ArticlePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params

  const article = await getArticle(slug)

  if (!article) notFound()

  const thumbnail = article.thumbnail as Media
  const author = article.author as User

  return (
    <>
      <div className="w-screen h-64 lg:h-96">
        <ThumbnailDisplay
          alt={thumbnail.alt}
          src={thumbnail.url ?? ''}
          height={thumbnail.height ?? undefined}
          width={thumbnail.width ?? undefined}
        />
      </div>
      <div
        id="article-content"
        className="mx-8 lg:mx-64 mt-12 pb-16 flex flex-col gap-6 lg:gap-8 items-center"
      >
        <div className="flex flex-col gap-4 w-full border-b-2 border-border pb-4 items-center">
          {article.isFeatured && <Badge>Featured</Badge>}
          <h1 className="text-center">{article.title}</h1>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full">
            <div className="gap-2 flex items-baseline">
              <Calendar size={20} />
              <p>{new Date(article.updatedAt ?? article.createdAt).toDateString()}</p>
            </div>
            <div className="gap-2 flex items-baseline">
              <UserIcon size={20} />
              <p>{author.penName ?? author.username}</p>
            </div>
            <div className="flex gap-2 justify-center">
              {(article.categories as Category[] | undefined | null)?.map((category) => (
                <Badge variant="secondary" key={category.id}>
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <RichText data={article.content} className="flex flex-col gap-4" />
        </div>
        {article.tags && article.tags.length > 0 && (
          <div className="flex gap-2 w-full">
            <p>Tags:</p>
            <div className="flex gap-1">
              {article.tags.map((tag) => (
                <Badge variant="outline" key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ArticlePage
