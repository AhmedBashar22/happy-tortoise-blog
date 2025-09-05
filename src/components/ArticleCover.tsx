import { Article, Category, Media, User } from '@/payload-types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import ThumbnailDisplay from './ThumbnailDisplay'
import { Calendar, User as UserIcon } from 'lucide-react'
import { Badge } from './ui/badge'

export type ArticleCoverVariant = 'list' | 'box'

const ListArticleCover = ({
  article,
  usesDownsizedImage = true,
}: {
  article: Article
  usesDownsizedImage?: boolean
}) => {
  const thumbnail = article.thumbnail as Media
  const author = article.author as User

  return (
    <Card className="flex flex-row gap-4 px-6">
      <div className="relative w-96 rounded-lg overflow-clip">
        <ThumbnailDisplay
          alt={thumbnail.alt}
          src={
            (usesDownsizedImage ? thumbnail.sizes?.thumbnail?.url : undefined) ??
            thumbnail.url ??
            ''
          }
          width={768}
          height={432}
        />
        {article.isFeatured && <Badge className="absolute right-4 bottom-4 z-30">Featured</Badge>}
      </div>
      <div className="flex flex-col gap-6 w-full">
        <CardHeader>
          <CardTitle className="text-lg">{article.title}</CardTitle>
          <div className="flex gap-4 justify-between">
            <div className="flex gap-2 items-baseline">
              <Calendar size={16} />
              <p>{new Date(article.updatedAt ?? article.createdAt).toDateString()}</p>
            </div>
            <div className="flex gap-2 items-baseline">
              <UserIcon size={16} />
              <p>{author.penName ?? author.username}</p>
            </div>
            <div className="flex gap-2">
              {(article.categories as Category[] | undefined | null)?.map((category) => (
                <Badge variant="secondary" key={category.id}>
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-full">
          {article.snippet.split('\n').map((line, n, arr) => (
            <p key={n} className={`${n + 1 === arr.length ? 'text-ellipsis' : ''}`}>
              {line}
            </p>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-start">
          <p>
            Click to&nbsp;<strong>Read More</strong>
          </p>
          {article.tags && article.tags.length > 0 && (
            <div className="flex gap-1">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardFooter>
      </div>
    </Card>
  )
}

const BoxArticleCover = ({
  article,
  usesDownsizedImage = true,
}: {
  article: Article
  usesDownsizedImage?: boolean
}) => {
  const thumbnail = article.thumbnail as Media
  const author = article.author as User

  return (
    <Card>
      <CardHeader>
        <div className="relative mb-4 rounded-lg overflow-clip">
          <ThumbnailDisplay
            alt={thumbnail.alt}
            src={
              (usesDownsizedImage ? thumbnail.sizes?.thumbnail?.url : undefined) ??
              thumbnail.url ??
              ''
            }
            width={768}
            height={432}
          />
          {article.isFeatured && <Badge className="absolute right-4 bottom-4 z-30">Featured</Badge>}
        </div>
        <CardTitle className="mb-2">{article.title}</CardTitle>
        <div className="flex flex-col lg:flex-row gap-1 lg:gap-4 justify-between lg:items-center">
          <div className="flex gap-2 items-baseline">
            <Calendar size={16} />
            <p>{new Date(article.updatedAt ?? article.createdAt).toDateString()}</p>
          </div>
          <div className="flex gap-2 items-baseline">
            <UserIcon size={16} />
            <p>{author.penName ?? author.username}</p>
          </div>
          <div className="flex gap-2">
            {(article.categories as Category[] | undefined | null)?.map((category) => (
              <Badge variant="secondary" key={category.id}>
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="not-lg:text-sm">
        {article.snippet.split('\n').map((line, n) => (
          <p key={n}>{line}</p>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
        <p>
          Click to&nbsp;<strong>Read More</strong>
        </p>
        {article.tags && article.tags.length > 0 && (
          <div className="flex gap-1">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

const ArticleCover = ({
  variant = 'list',
  article,
  usesDownsizedImage = true,
}: {
  variant?: ArticleCoverVariant
  article: Article
  usesDownsizedImage?: boolean
}) => {
  if (variant === 'box')
    return (
      <Link className="hover:brightness-125 transition" href={`/articles/${article.slug}`}>
        <article>
          <BoxArticleCover article={article} usesDownsizedImage={usesDownsizedImage} />
        </article>
      </Link>
    )
  return (
    <Link className="hover:brightness-125 transition" href={`/articles/${article.slug}`}>
      <article>
        <ListArticleCover article={article} usesDownsizedImage={usesDownsizedImage} />
      </article>
    </Link>
  )
}

export default ArticleCover
