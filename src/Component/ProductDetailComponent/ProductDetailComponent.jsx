// import { Col, Image, Rate, Row } from 'antd'
// import React, { useState } from 'react';
// import ImageProduct from '../../assets/images/test.webp'
// import ImageSmall from '../../assets/images/testsmall.webp'
// import {StarFilled , MinusOutlined, PlusOutlined } from '@ant-design/icons';

// import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from './style';
// import ButtonComponent from '../ButtonComponent/ButtonComponent';
// import * as ProductService from '../../service/ProductService'
// import { useQuery } from '@tanstack/react-query';
// import Loading from '../LoadingComponent/Loading';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {addOrderProduct } from '../../app/slide/orderSlide'
// import { convertPrice } from '../../utils';

// const ProductDetailComponent = ({idProduct}) => {
//     const navigate = useNavigate()
//     const location = useLocation()
//     const dispatch = useDispatch()
//     const user = useSelector((state)=> state.user)
//     const [ numProduct, setNumProduct] = useState(1)
//     const onChange = (value) => {
//         setNumProduct(Number(value))
//     }
//     const fetchGetDetailsProduct = async (context) =>{
//         const id = context?.queryKey && context?.queryKey[1]
//         if(id){
//             const res = await ProductService.getDetailsProduct(id)
//             return res.data
//         }
//     }

//    const handleChangeCount = (type) =>{
//     if(type ==='increase'){
//         setNumProduct(numProduct +1)
//     }else{
//         setNumProduct(numProduct - 1)
//     }
//    }

//    const {isLoading, data: productDetails } = useQuery(['product-details', idProduct], fetchGetDetailsProduct, {enabled: !!idProduct})

//    const handleAddOrderProduct =()=>{
//     if(!user?.id){
//         navigate('/sign-in', {state: location?.pathname})
//     }else{
//         dispatch(addOrderProduct({
//             orderItem: {
//                 name: productDetails?.name,
//                 amount: numProduct,
//                 image: productDetails?.image,
//                 price: productDetails?.price,
//                 product: productDetails?._id,
//                 discount: productDetails?.discount,
//                 countInstock: productDetails?.countInStock
//             }
//         }))
//     }
//    }
    
//   return (
//     <Loading isLoading={isLoading}>
//     <Row style={{padding: '16px', background: '#fff', borderRadius: '4px'}} >
//         <Col span={10} style={{borderRight: '1px solid #e5e5e5', paddingRight: '8px'}}>
//             <Image src={productDetails?.image} alt='image product' preview={false} />
//             <Row style={{paddingTop: '10px', justifyContent: 'space-between'}} >
//                 <WrapperStyleColImage span={4} >
//                     <WrapperStyleImageSmall src={ImageSmall} alt='img small' preview={false} />
//                 </WrapperStyleColImage>

//                 <WrapperStyleColImage span={4} >
//                     <WrapperStyleImageSmall src={ImageSmall} alt='img small' preview={false} />
//                 </WrapperStyleColImage>

//                 <WrapperStyleColImage span={4} >
//                     <WrapperStyleImageSmall src={ImageSmall} alt='img small' preview={false} />
//                 </WrapperStyleColImage>

//                 <WrapperStyleColImage span={4} >
//                     <WrapperStyleImageSmall src={ImageSmall} alt='img small' preview={false} />
//                 </WrapperStyleColImage>

//                 <WrapperStyleColImage span={4} >
//                     <WrapperStyleImageSmall src={ImageSmall} alt='img small' preview={false} />
//                 </WrapperStyleColImage>
//             </Row>
//         </Col>
//         <Col span={14} style={{paddingLeft: '10px'}}>
//             <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
//             <div>
//             <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating}></Rate>
//             <WrapperStyleTextSell> | Đã bán 1000+ </WrapperStyleTextSell>
//             </div>
//             <WrapperPriceProduct>
//                 <WrapperPriceTextProduct>{convertPrice(productDetails?.price)}đ</WrapperPriceTextProduct>
//             </WrapperPriceProduct>

//             <WrapperAddressProduct>
//                 <span> Giao đến </span>
//                 <span className='address'> {user?.address}</span> - 
//                 <span className='change-address'> Đổi địa chỉ</span>
//             </WrapperAddressProduct>

//             <div style={{margin: '10px 0 20px', padding:'10px 0', borderTop: '1px solid #e5e5e5', borderBottom:'1px solid #e5e5e5'}} >
//                 <div style={{marginBottom: '10px'}}>Số lượng </div>
//                 <WrapperQualityProduct>
//                     <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={()=>handleChangeCount('decrease')}>
//                         <MinusOutlined style={{color: '#000', fontSize: '20px'}} />
//                     </button>

//                     <WrapperInputNumber  onChange={onChange}  defaultValue={1}  value={numProduct} size='small' />
//                     <button style={{border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={()=>handleChangeCount('increase')}>
//                         <PlusOutlined style={{color: '#000', fontSize: '20px'}} />
//                     </button>
//                 </WrapperQualityProduct>
//             </div>
//             <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
//                 <ButtonComponent
                    
//                     size={40}
//                     styleButton={{
//                         background: 'rgb(255, 57, 69)',
//                         height: '48px',
//                         width: '220px',
//                         border: 'none',
//                         borderRadius: '4px'
//                     }}
//                     onClick={handleAddOrderProduct}
//                     textButton={'Chọn mua'}
//                     styleTextButton ={{color:'#fff', fontSize:'15px', fontWeight: '700'}} >
                       
//                 </ButtonComponent>
//                 <ButtonComponent
//                     size={40}
//                     styleButton={{
//                         background: '#fff',
//                         height: '48px',
//                         width: '220px',
//                         border: '1px solid rgb(13,92, 182) ',
//                         borderRadius: '4px'
//                     }}
//                     textButton={'Mua trả sau'}
//                     styleTextButton ={{color:'rgb(13,92, 182)', fontSize:'15px', fontWeight: '700'}} >
                       
//                 </ButtonComponent>
//             </div>
//         </Col>
//     </Row>
//     </Loading>
//   )
// }

// export default ProductDetailComponent

import { Col, Image, Rate, Row } from 'antd'
import React from 'react'
import { WrapperStyleImageSmall, WrapperStyleColImage, WrapperStyleNameProduct, WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct, WrapperAddressProduct, WrapperQualityProduct, WrapperInputNumber, WrapperBtnQualityProduct, WrapperStyleDescriptionProduct, WrapperPriceProductDiscounted, WrapperPriceProductDiscount } from './style'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../service/ProductService'
import { useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponent/Loading'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct,resetOrder } from '../../app/slide/orderSlide'
import { convertPrice, initFacebookSDK } from '../../utils'
import { useEffect } from 'react'
import * as message from '../Message/Message'
// import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent'
// import CommentComponent from '../CommentComponent/CommentComponent'
import { useMemo } from 'react'
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent'
import CommentComponent from '../CommentComponent/CommentComponent'

const ProductDetailComponent = ({idProduct}) => {
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const [errorLimitOrder,setErrorLimitOrder] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const onChange = (value) => { 
        setNumProduct(Number(value))
    }

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if(id) {
            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }

    useEffect(() => {
        initFacebookSDK()
    }, [])

    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id) 
        if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false)
        } else if(productDetails?.countInStock === 0){
            setErrorLimitOrder(true)
        }
    },[numProduct])

    useEffect(() => {
        if(order.isSucessOrder) {
            message.success('Đã thêm vào giỏ hàng')
        }
        return () => {
            dispatch(resetOrder())
        }
    }, [order.isSucessOrder])

    const handleChangeCount = (type, limited) => {
        if(type === 'increase') {
            if(!limited) {
                setNumProduct(numProduct + 1)
            }
        }else {
            if(!limited) {
                setNumProduct(numProduct - 1)
            }
        }
    }

    const { isLoading, data: productDetails } = useQuery(['product-details', idProduct], fetchGetDetailsProduct, { enabled : !!idProduct})
    const handleAddOrderProduct = () => {
        if(!user?.id) {
            navigate('/sign-in', {state: location?.pathname})
        }else {
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInstock: productDetails?.countInStock
                    }
                }))
                message.success('Đã thêm vào giỏ hàng')
            } else {
                setErrorLimitOrder(true)
            }
        }
    }

    return (
        <Loading isLoading={isLoading}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px', height:'100%' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <Image src={productDetails?.image} alt="image prodcut" preview={false} />
                    
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                    <div>
                        <Rate style={{fontSize: '13px;'}}  allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                        <WrapperStyleTextSell> | Đã bán {productDetails?.selled} sản phẩm | Còn lại {productDetails?.countInStock} sản phẩm</WrapperStyleTextSell>
                    </div>
                    {productDetails?.discount !== 0 ? 
                    <>
                     <WrapperPriceProduct>
                     <WrapperPriceProductDiscounted>{convertPrice(productDetails?.price - (productDetails?.price*productDetails?.discount/100))}</WrapperPriceProductDiscounted>
                   
                   
                    <WrapperPriceProductDiscount>{convertPrice(productDetails?.price)}</WrapperPriceProductDiscount>
                    </WrapperPriceProduct>
                    </>
                    :
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>{convertPrice(productDetails?.price)}</WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    }
                    
                    <WrapperStyleDescriptionProduct>{productDetails?.description}</WrapperStyleDescriptionProduct>
                   
                    
                    <WrapperAddressProduct>
                        <span>Giao đến </span>
                        <span className='address'>{user?.address}</span> -
                        <span className='change-address'>Đổi địa chỉ</span>
                    </WrapperAddressProduct>
                    <LikeButtonComponent
                     dataHref={ process.env.REACT_APP_IS_LOCAL 
                                ? "https://developers.facebook.com/docs/plugins/" 
                                : window.location.href
                            } 
                    />
                   
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng</div>
                        <WrapperQualityProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease',numProduct === 1)}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber onChange={onChange} defaultValue={1} max={productDetails?.countInStock} min={1} value={numProduct} size="small" />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase',  numProduct === productDetails?.countInStock)}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQualityProduct>
                    </div>
                    <div style={{ display: 'flex', aliggItems: 'center', gap: '12px' }}>
                        <div>
                            <ButtonComponent
                                size={40}
                                styleButton={{
                                    background: 'rgb(255, 57, 69)',
                                    height: '48px',
                                    width: '220px',
                                    border: 'none',
                                    borderRadius: '4px'
                                }}
                                onClick={handleAddOrderProduct}
                                textButton={'Chọn mua'}
                                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent>
                            {errorLimitOrder && <div style={{color: 'red'}}>Sản phẩm đã hết hàng</div>}
                        </div>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: '#fff',
                                height: '48px',
                                width: '220px',
                                border: '1px solid rgb(13, 92, 182)',
                                borderRadius: '4px'
                            }}
                            textButton={'Mua trả sau'}
                            styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                        ></ButtonComponent>
                    </div>
                </Col>
                
                <CommentComponent 
                     dataHref={
                        process.env.REACT_APP_IS_LOCAL 
                        ? "https://developers.facebook.com/docs/plugins/comments#configurator"
                         : window.location.href
                        
                    } 
                    width="1100"  
                />
            </Row >
            
        </Loading>
    )
}

export default ProductDetailComponent