import React, { useEffect, useState } from 'react'
import { WrapperContent, WrapperLableText, WrapperMenu, WrapperPrice, WrapperTextValue } from './style'
import TypeProduts from '../TypeProducts/TypeProduts'
import * as ProductService from '../../service/ProductService'
import { WrapperTypeProduct } from '../../page/HomePage/style'
import Loading from '../LoadingComponent/Loading'
import { Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'

const NavbarComponent = () => {
    const [typeProducts, setTypeProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchAllTypeProduct = async () =>{
        const res = await ProductService.getAllTypeProduct()
        if(res?.status === 'OK'){
          setTypeProducts(res?.data)
        } 
      }

      useEffect(()=>{
        setLoading(true)
        fetchAllTypeProduct()
        setLoading(false)
      },[])
    
  return (
    <>
    
    <div style={{width: '1100px', margin: '0 auto'}}>
        
      <Row>
          <Col span={19}>
            <Loading isLoading={loading}>
                <WrapperTypeProduct>
                  {typeProducts.map((item)=>{
                      return(
                          <TypeProduts name = {item} key={item} />
                      )
                  })}
                </WrapperTypeProduct>
            </Loading>
            </Col>
                  
            <WrapperMenu span={3} onClick={() => navigate('/posts')}>
               Bài viết
            </WrapperMenu>
            <WrapperMenu span={2} onClick={() => navigate('/contact')}>
              Liên hệ
            </WrapperMenu>
       </Row>
       </div>
       
       
       </>
  )
}

export default NavbarComponent