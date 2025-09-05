import ArticleListSection from './ArticleListSection'
import FeaturesArticlesSection from './FeaturedArticlesSection'
import HeroSection from './HeroSection'

const Home = () => {
  return (
    <>
      <HeroSection />
      <div className="mx-12 lg:mx-64 mb-16 flex flex-col gap-16">
        <FeaturesArticlesSection />
        <ArticleListSection />
      </div>
    </>
  )
}

export default Home
