import React from 'react';

import { StyleNameProduct, WapperContainer, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReporText } from './style';
import {StarFilled  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';


const PostsComponent = (props) => {
  const {title, image, description, preview , id} = props
  const navigate = useNavigate()
  const handleDetailsPosts =(id) =>{
    navigate(`/posts-detail/${id}`)
  }
  return (
    // <WapperContainer>
        <WrapperCardStyle
          hoverable
          // headStyle={{width: '200px', height: '200px'}}
          style={{ width: 340 , padding: 20}}
          bodyStyle={{padding: ' 15px 0', margin: '0px'}}
          cover={<img alt="example" src={image} />}
          onClick={()=>  handleDetailsPosts(id)}
    >
       <StyleNameProduct>{title}</StyleNameProduct>
       <WrapperReporText>
           <span>{preview}</span>
            
        </WrapperReporText>
        
       
    </WrapperCardStyle>
    // </WapperContainer>
  )
}

export default PostsComponent
