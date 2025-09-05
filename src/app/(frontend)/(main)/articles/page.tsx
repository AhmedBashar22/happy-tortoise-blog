import { getPayload, Where } from 'payload'
import config from '@payload-config'
import ArticleList from '@/components/ArticleList'
import Pagination from './Pagination'
import Searchbar from './Searchbar'
import Filters from './Filters'

const ArticlesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string | string[]; search?: string }>
}) => {
  const resolvedParams = await searchParams

  const { category, page, search } = resolvedParams

  const where: Where = {
    _status: {
      equals: 'published',
    },
  }

  if (category) {
    where['categories.name'] = {
      in: typeof category === 'string' ? [category] : category,
    }
  }

  if (search) {
    where.or = [
      {
        title: {
          like: search,
        },
      },
      {
        'author.username': {
          like: search,
        },
      },
      {
        slug: {
          like: search,
        },
      },
      {
        snippet: {
          like: search,
        },
      },
      {
        tags: {
          like: search,
        },
      },
      {
        content: {
          like: search,
        },
      },
      {},
    ]
  }

  const payload = await getPayload({ config })
  const { docs: articles, totalPages } = await payload.find({
    collection: 'articles',
    page: parseInt(page ?? '1'),
    limit: 8,
    where,
  })
  const { docs: categories } = await payload.find({ collection: 'categories' })

  return (
    <div className="mx-12 lg:mx-64 my-8 lg:my-16 flex flex-col items-center gap-4 lg:gap-6">
      <h2>Articles</h2>
      <div className="w-full flex gap-1">
        <Searchbar searchParams={resolvedParams} />
        <Filters searchParams={resolvedParams} categories={categories} />
      </div>
      {articles.length === 0 && <p>No articles found.</p>}
      {articles.length > 0 && (
        <>
          <ArticleList articles={articles} />
          <Pagination
            page={parseInt(page ?? '1')}
            lastPage={totalPages}
            searchParams={resolvedParams}
          />
        </>
      )}
    </div>
  )
}

export default ArticlesPage
