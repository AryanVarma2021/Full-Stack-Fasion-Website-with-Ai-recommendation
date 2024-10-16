import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'

const About = () => {
  return (
    <div>

      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className="my-10 flex flex-col sm:flex-row gap-16">
        <img src={assets.about_img} className='w-full max-w-[450px]' alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 ">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi recusandae qui ea? Optio nisi perferendis nemo velit iure harum, sequi eveniet omnis sapiente hic eaque aut delectus veniam at quae.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum impedit reiciendis dolor repudiandae, dicta in eius architecto ut iste, nemo eveniet doloribus quia! Earum libero necessitatibus deserunt praesentium, ipsum quaerat.</p>
            <b className=''>Our Mission</b>
        </div>
      </div>
    </div>
  )
}

export default About