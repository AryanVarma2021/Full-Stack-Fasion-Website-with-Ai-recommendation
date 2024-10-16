import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        

    }
  return (
    <div className='text-center '>
        <p className='text-2xl font-medium text-gray-800'>Subscribe Now and get 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos nostrum asperiores iure dolorem laudantium, ipsa ullam eaque, tenetur officia nemo quo cum earum eius vel excepturi animi, magni repudiandae velit.</p>

        <form onSubmit={onSubmitHandler}  className='flex gap-3 mx-auto my-6 border pl-3 w-full sm:w-1/2 items-center'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your Email' required />
            <button type='submit' className='bg-black text-white text-sm px-10 py-4' >SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox