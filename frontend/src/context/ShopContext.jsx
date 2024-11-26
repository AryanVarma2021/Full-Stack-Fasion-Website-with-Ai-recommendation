import { createContext, useEffect, useState } from "react";


import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Query } from "mongoose";


export const ShopContext = createContext();


const ShopContextProvider = (props) => {

    const currency = 'Rs';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([])
    const [recommendedItems,SetRecommendedItems] = useState([])
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [filterProducts, setFilterProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [maxQuantity, setMaxQuantity] = useState(false);

    useEffect(() => {


        getProductsData()

    }, [])

    useEffect(() => {









        if (!token && localStorage.getItem("token")) {



            setToken(localStorage.getItem("token"));

        }


    }, [])






    const getProductsData = async () => {

        try {
            const response = await axios.get(backendUrl + "/api/product/list");

            if (response.data.success) {


                setProducts(response.data.products);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)


        }

    }


    const addToCart = async (itemsId, size) => {
        console.log("size : is this ", size);
        

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemsId]) {
            if (cartData[itemsId][size]) {
                cartData[itemsId][size] += 1;
            }
            else {
                cartData[itemsId][size] = 1;
            }
        }
        else {
            cartData[itemsId] = {};
            cartData[itemsId][size] = 1;
        }





        if (token) {
            console.log("Token exists", token);

            try {
                const response = await axios.post(backendUrl + "/api/cart/add", {
                    itemId: itemsId, size
                }, { headers: { token } })





            } catch (error) {
                console.log(error);
                toast.error(error.message)


            }
        }
        else {
            console.log("Token not found");

        }
        setCartItems(cartData);
        toast.success("Added to the Cart");
        return;


    }













    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        
        
        
        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                const response = await axios.post(backendUrl + "/api/cart/update", {
                    itemId,
                    size,
                    quantity
                },
                    { headers: { token } }
                )
                if(response.data.success) {
                    setMaxQuantity(false)
                    
                    toast.success(response.data.message)
                }
                else {
                    setMaxQuantity(true)
                    toast.error(response.data.message)
                }

            } catch (error) {
                toast.error(error.message)
                console.log(error);


            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    totalAmount += itemInfo.price * cartItems[items][item];

                } catch (error) {
                    console.log(error);


                }
            }

        }
        return totalAmount;
    }



    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {    //for every items
            for (const item in cartItems[items]) {     // for size , a person can add a cloth with multiple sizes
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }

                } catch (error) {
                    console.log(error);


                }
                finally {
                    console.log(cartItems[items][item]);

                }

            }
        }



        console.log(totalCount);



        return totalCount;
    }

    const value = {
        products,
        setProducts,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        setCartItems,
<<<<<<< HEAD
        maxQuantity
=======
        recommendedItems,
        SetRecommendedItems,
        filterProducts,
        setFilterProducts,
        loading,
        setLoading
>>>>>>> origin/recommendation-update


    }

    return (
        <ShopContext.Provider value={value}>

            {props.children}


        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
