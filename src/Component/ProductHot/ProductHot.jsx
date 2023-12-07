import React, { useState } from 'react'

import CardComponent from '../../Component/CardComponent/CardComponent'
import Loading from '../LoadingComponent/Loading';


import * as ProductService from '../../service/ProductService'

// import { WrapperButtonMore, WrapperProducts } from '../../page/HomePage/style'
import { WrapperButtonMore, WrapperProducts } from './style'
import { useQuery } from '@tanstack/react-query';

const ProductHot = () => {
   
    const [limit, setLimit] = useState(10)
    // const [paingate, setPanigate] = useState({
    //     page: 0,
    //     limit: 10,
    //     total: 1
    // })

    const fetchProductAllHot = async (context) =>{
        const limit = context?.queryKey && context?.queryKey[1]
        const res = await ProductService.getProductHot(limit)
          return res
        
      }

      const {isLoading, data: productHot, isPreviousData} = useQuery(['productHot', limit], fetchProductAllHot, {retry: 3, retryDelay: 1000, keepPreviousData: true})
    
  return (
    
    
    <div style={{width: '1100px',margin: '0 auto', height: '100%'}}>
       <Loading isLoading={isLoading}>
            <WrapperProducts >
                {productHot?.data?.map((product)=>{
                    return(
                        <CardComponent 
                            key={product._id}
                            countInStock={product.countInStock}
                            description={product.description}
                            image={product.image}
                            name={product.name}
                            price ={product.price}
                            rating={product.rating}
                            type={product.type}
                            discount={product.discount}
                            selled={product.selled}
                            id={product._id}
                        />  
                    )
                })}
            </WrapperProducts>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
            <WrapperButtonMore 
                textButton={isPreviousData ? 'Load more' : 'Xem thêm'} 
                type='outline' 
                disabled={productHot?.total === productHot?.data?.length || productHot?.totalPage === 1}
                styleButton={{border: '1px solid rgb(77, 77, 77)', color: `${productHot?.total === productHot?.data?.length ? '#fff' : 'rgb(77, 77, 77)'}` , width: '240px', height:'38px', borderRadius: '4px'}}
                onClick={()=> setLimit((prev)=> prev + 5)}
                ></WrapperButtonMore>
            </div>

            </Loading>
        </div>
    
    
  )
}

export default ProductHot;