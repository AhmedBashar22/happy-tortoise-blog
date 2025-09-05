import { Article } from '@/payload-types'
import ArticleCover from './ArticleCover'

const ArticleList = ({ articles }: { articles: Article[] }) => {
  return (
    <ul className="flex flex-col gap-4 w-full">
      {articles.map((article) => (
        <li key={article.id}>
          <div className="hidden lg:block">
            <ArticleCover article={article} />
          </div>
          <div className="block lg:hidden">
            <ArticleCover article={article} variant="box" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ArticleList
