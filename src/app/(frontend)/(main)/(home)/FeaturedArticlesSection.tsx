import { getPayload } from 'payload'
import config from '@payload-config'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import ArticleCover from '@/components/ArticleCover'

const FeaturesArticlesSection = async () => {
  const payload = await getPayload({ config })
  const { docs: articles } = await payload.find({
    limit: 20,
    collection: 'articles',
    where: { isFeatured: { equals: true }, _status: { equals: 'published' } },
    sort: ['-updatedAt', '-createdAt'],
  })

  if (articles.length === 0) return undefined

  return (
    <section className="flex flex-col items-center gap-4">
      <h2>Featured Articles</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {articles.map((article) => (
            <CarouselItem key={article.id}>
              <ArticleCover article={article} variant="box" usesDownsizedImage={false} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="not-lg:left-0 not-lg:-translate-x-[125%]" />
        <CarouselNext className="not-lg:right-0 not-lg:translate-x-[125%]" />
      </Carousel>
    </section>
  )
}

export default FeaturesArticlesSection
