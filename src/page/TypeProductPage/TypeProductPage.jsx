import React, { useEffect, useState } from 'react'
import NavbarComponent from '../../Component/NavbarComponent/NavbarComponent'
import CardComponent from '../../Component/CardComponent/CardComponent'
import {  Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../service/ProductService'
import Loading from '../../Component/LoadingComponent/Loading'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
import { Link } from "react-router-dom";
import Helmet from '../../Component/Helmet/Helmet'

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const {state} = useLocation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [paingate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    })

    const fetchProductType = async (type, page, limit) =>{
        setLoading(true)
        const res = await ProductService.getProductType(type, page, limit)
        if(res?.status === 'OK'){
            setLoading(false)
            setProducts(res?.data)
            setPanigate({...paingate, total: res?.totalPage})
        }else{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(state){
            fetchProductType(state, paingate.page, paingate.limit)
           
        }
    }, [state, paingate.page, paingate.limit])
    const onChange = (current, pageSize ) => {
        setPanigate({...paingate, page: current - 1, limit: pageSize})
    }
  return (
    <>
    <Helmet title={`${state}`} />
    <Loading isLoading={loading}>
        <NavbarComponent />
    <div style={{width: '100%', background: `rgb(255,253,255)`, background: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 98%, rgba(247,244,244,1) 99%, rgba(217,201,201,1) 100%)`, height: '100%'}}>
    <div style={{width: '1100px',margin: '0 auto', height: '100%'}}>
        <div style={{ fontWeight: '500', padding: '20px 0px 0', margin:' 0 0 20px'}}>
            
            <Link to='/' style={{cursor: 'pointer', color: '#4d4d4d'}}>Trang chủ / </Link> 
            <span> {state} </span>
            </div>
        <h2 style={{textDecoration: 'underline', textAlign: 'center', padding: '20px 20px 0', margin:' 0 0 20px'}}>SẢN PHẨM ĐỀ XUẤT</h2>
            <WrapperProducts >
                {products?.filter((pro)=>{
                    if(searchDebounce === ''){
                        return pro
                    }else if(pro?.name?.toLowerCase()?.includes(searchDebounce?.toLocaleLowerCase())){
                        return pro
                    }
                })?.map((product)=>{
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
            <Pagination defaultCurrent={paingate.page +1 } total={paingate?.total} onChange={onChange} style={{textAlign: 'center', marginTop: '10px'}} />
            
        </div>
        </div>
    </Loading>
    </>
  )
}

export default TypeProductPage