import React, { useMemo } from 'react';

import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceDiscount, WrapperPriceText, WrapperPriceTextDiscount, WrapperReporText } from './style';
import {StarFilled  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';


const CardComponent = (props) => {
  const {countInStock,description, image, name, price, rating, type, discount, selled, id } = props
  const navigate = useNavigate()
  const handleDetailsProduct =(id) =>{
    navigate(`/product-detail/${id}`)
  }
  const priceDiscountMemo = useMemo(() => {
    const result = price - (discount * price / 100);
    return result
  },[])
  return (
    <>
        <WrapperCardStyle
        hoverable
        headStyle={{width: '200px', height: '200px'}}
        style={{ width: 200 }}
        bodyStyle={{padding: '10px'}}
        cover={<img alt="example" src={image} />}
        onClick={()=>  handleDetailsProduct(id)}
    >
       <StyleNameProduct>{name}</StyleNameProduct>
       <WrapperReporText>
        <span style={{marginRight: '4px'}}>
           <span>{rating}</span>
            <StarFilled  style={{fontSize: '12px', color: '#fadb14'}}/>
            </span>
        <span>| Đã bán {selled || 0} + </span>
        </WrapperReporText>
        {/* <WrapperPriceText> 
           {convertPrice(price)} 
           <WrapperDiscountText> - {discount || 0}%</WrapperDiscountText>
           </WrapperPriceText> */}
        
           {discount !== 0 ? 
            <>
            <div style={{display: 'flex', alignItems: 'center'}}>
           <WrapperPriceTextDiscount> 
           {convertPrice(price)} 
           </WrapperPriceTextDiscount>
           <WrapperDiscountText> - {discount}%</WrapperDiscountText>
           </div>
           <WrapperPriceText>  {convertPrice(price - (price * discount / 100))}</WrapperPriceText>
           </>
           : <WrapperPriceText> 
           {convertPrice(price)} 
           
           </WrapperPriceText>}
        
        

       
       
    </WrapperCardStyle>
    </>
  )
}

export default CardComponent
