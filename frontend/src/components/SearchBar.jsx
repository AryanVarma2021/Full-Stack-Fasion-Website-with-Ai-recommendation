import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {  

    const {search, setSearch,setFilterProducts, setLoading,loading,  filterProducts,  showSearch,navigate, SetRecommendedItems,recommendedItems,  setShowSearch} = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(false)
    const [image1,  setImage1] = useState()

    useEffect(() => {
        console.log("Loading state updated:", loading);
    }, [loading,setLoading]);
    
    


    useEffect(()=>{
        console.log("image added");
        
    }, [setImage1, image1])
    

    useEffect(()=>{
        if(location.pathname.includes('collection') ){
            setVisible(true);
        }
        else {
            setVisible(false)
        }
        

    }, [location])


    const fetRecommendation = async () => {
       
       
        if (!image1) return; // Ensure 'image1' is a valid file or Cloudinary URL
    
        try {
            setLoading(true);
            console.log("first : ", loading);
            
            // Fetch image and convert it to blob
            const response = await fetch(image1);  
            const blob = await response.blob();
            const file = new File([blob], 'downloaded_image.jpg', { type: blob.type });
    
            // Prepare form data to send the image
            const formData = new FormData();
            formData.append('file', image1);
    
            // Call the recommendation API
            const apiResponse = await axios.post('http://localhost:5000/recommend', formData);
            console.log('Response data:', apiResponse.data.recommended_images);
    
            // Map the recommendations data from the response
            const recommendationsToSave = apiResponse.data.recommended_images
            .filter((item)=> item.data?.data?.masterCategory.typeName === "Apparel")
            .map(item => ({
                image1: item.image,
                name: item.data.data.productDisplayName,
                description: item.data.data.brandUserProfile.bio || "No description available",
                price: item.data.data.price,
                category: item.data.data.gender,
                seller: item.data.data.brandName,
                subCategory: item.data.data.subCategory.typeName
            }));

            setFilterProducts([])
    
            // Save recommendations to the backend and store the returned product IDs
            recommendationsToSave.map(async (r) => {
                try {
                    const saveResponse = await axios.post("http://localhost:4000/api/product/addrecommend", r);
    
                    // Log the saved product with its MongoDB ID
                    console.log('Saved product ID:', saveResponse);
    
                    // Update the state with new recommended items, including the MongoDB ID
                    setFilterProducts(prevItems => [
                        ...prevItems, 
                        { ...r, _id: saveResponse.data.id,  image : saveResponse.data.d.image[0] } // Add the saved MongoDB ID
                    ]);
    
                } catch (err) {
                    console.error('Error saving recommendation:', err);
                }

                //navigate('/recommend-items')
            });
    
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            console.log(loading);
            
            
           
        }
    };
    


    async function  handleSubmit(e) {
        setLoading(true);
        console.log(loading);
        
        if(!image1) {
            alert("Upload image first")
            return;
        }

        

        try {
            
            fetRecommendation();
            
        } catch (error) {
            console.log(error.message);
            
            
        }
        finally {
            setLoading(false);

        }


       

        



        

    }

  return showSearch && visible ?  (
    <div className='border-t border-b bg-gray-50 text-center '>
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2     ">
            <input value={search} onChange={(e)=> setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
            <img className='w-4' src={assets.search_icon} alt="" />
            
        </div>
        
        <img src={assets.cross_icon} onClick={()=>(setShowSearch(false))} className='inline w-3 cursor-pointer' alt="" />
        <div className="inline-flex m-5  ">
        <label htmlFor="image1">
        <span>Upload Image</span>
            <img className='inline w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file"  id="image1" hidden />
            
          </label>
        </div>

        <button onClick={handleSubmit} className='bg-black text-white py-2 px-3 text-sm'>Search</button>
        {/* <button onClick={()=> console.log(filterProducts)
        }>Get items</button> */}

        

    </div>
  ) : null
}

export default SearchBar