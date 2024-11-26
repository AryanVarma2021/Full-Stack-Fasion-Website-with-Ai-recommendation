// SellerAnalytics.js
import React, { useDebugValue, useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';

const SellerAnalytics = ({ token }) => {
    const [analyticsData, setanalyticsData] = useState(null);


useEffect(() => {
    const fetchAnalytics = async () => {
        try {
            console.log(backendUrl + '/api/seller/analytics/');
            const response = await axios.post(
                `${backendUrl}/api/seller/analytics/`,
                {},
                { headers: { token } }
            );
            console.log(response.data.data);
            
            setanalyticsData(response.data.data); 
        } catch (error) {
            console.error("Error fetching analytics data", error);
        }
    };

   
    fetchAnalytics();
}, []); 



const calculateTotalQuantity = (data) => {
    if (analyticsData) {
        let totalQuantity = 0;
        
        data.map((size)=>{
            totalQuantity += size.remainingQuantity;

        })
        return totalQuantity;
        
        

       
        

            
    } else {
        console.log("Analytics data is undefined");
    }
};


    
    

    if (!analyticsData) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Seller Analytics</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Sold</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Quantity</th>
                            
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Object.values(analyticsData.productSales).map(product => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.quantitySold}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.revenue.toFixed(2)}</td>
                                
                                <td className="px-6 py-4 whitespace-nowrap">{calculateTotalQuantity(product.remainingSizes)}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">Total Products Sold: {analyticsData.totalProductsSold}</h2>
                <h2 className="text-lg font-semibold">Total Revenue: {analyticsData.totalRevenue.toFixed(2)}</h2>
            </div>
        </div>

    );
};

export default SellerAnalytics;
