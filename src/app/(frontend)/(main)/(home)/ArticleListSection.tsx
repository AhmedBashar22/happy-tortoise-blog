import { getPayload } from 'payload'
import config from '@payload-config'
import ArticleList from '@/components/ArticleList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ArticleListSection = async () => {
  const payload = await getPayload({ config })
  const { docs: articles } = await payload.find({
    limit: 20,
    collection: 'articles',
    where: { isFeatured: { equals: false }, _status: { equals: 'published' } },
    sort: ['-updatedAt', '-createdAt'],
  })

  return (
    <section className="flex flex-col items-center gap-4">
      <h2>Articles</h2>
      <div className="w-full items-center flex flex-col gap-5">
        {articles.length === 0 && 'No articles yet.'}
        {articles.length > 0 && <ArticleList articles={articles} />}
        {articles.length > 0 && (
          <Button variant="outline" asChild>
            <Link href="/articles">View more</Link>
          </Button>
        )}
      </div>
    </section>
  )
}

export default ArticleListSection
