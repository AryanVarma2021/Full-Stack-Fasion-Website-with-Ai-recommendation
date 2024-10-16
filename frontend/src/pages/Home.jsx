import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSection from '../components/BestSection'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSection/>
      <OurPolicy/>
      <NewsLetterBox/>
      

    </div>
  )
}

export default Home