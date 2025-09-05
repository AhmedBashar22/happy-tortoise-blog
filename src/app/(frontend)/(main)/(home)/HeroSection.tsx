import Image from 'next/image'
import hero from '@/assets/img/hero.png'
import NewsletterSubscriptionForm from './NewsletterSubscriptionForm'
import GrungeDivider from '@/components/GrungeDivider'

const HeroSection = () => {
  return (
    <section className="relative min-h-max flex flex-col gap-4">
      <div className="w-full h-full flex justify-center lg:justify-start items-center p-5">
        <div className="flex flex-col items-center lg:w-[32rem] text-center bg-[oklch(24.305%_0.02144_127.837/50%)] p-8 lg:px-16 lg:py-12 rounded-lg gap-6 border border-border backdrop-blur-sm backdrop-brightness-50 backdrop-saturate-[75%]">
          <h2 className="text-2xl lg:text-4xl font-bold">Join our newsletter!</h2>
          <p className="lg:text-xl font-semibold brightness-[85%]">
            Keep up-to-date on the newest articles that teach you how to keep your green friend
            happy!
          </p>
          <NewsletterSubscriptionForm />
        </div>
      </div>
      <Image
        className="absolute top-0 left-0 -z-10 object-cover w-full h-full"
        src={hero}
        alt="Tortoise eating strawberry"
      />
      <div className="-scale-y-100 h-1 lg:h-16">
        <GrungeDivider color="var(--background)" />
      </div>
    </section>
  )
}

export default HeroSection
