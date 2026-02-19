import Navbar        from '../components/Navbar'
import HeroSection   from '../components/HeroSection'
import MarqueeStrip  from '../components/MarqueeStrip'
import FeaturesSection from '../components/FeaturesSection'
import StatsSection  from '../components/StatsSection'
import HowItWorks    from '../components/HowItWorks'
import CTASection    from '../components/CTASection'
import Footer        from '../components/Footer'

export default function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <FeaturesSection />
      <StatsSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </>
  )
}
