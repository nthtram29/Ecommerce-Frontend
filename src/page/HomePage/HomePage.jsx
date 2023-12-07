import React, { useEffect, useRef, useState } from 'react'
import {  WrapperBox, WrapperBoxEnd, WrapperButtonMore, WrapperProducts, WrapperTittle} from './style';
import SliderComponent from '../../Component/SliderComponent/SliderComponent';
import slide1 from '../../assets/images/2.png';
import slide2 from '../../assets/images/1.png';
import slide3 from '../../assets/images/3.png';
import slide4 from '../../assets/images/4.png';

import CardComponent from '../../Component/CardComponent/CardComponent';
import * as ProductService from '../../service/ProductService'
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Loading from '../../Component/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';
import ProductHot from '../../Component/ProductHot/ProductHot';
import NavbarComponent from '../../Component/NavbarComponent/NavbarComponent';

import {  ContactsOutlined, GiftOutlined, RocketOutlined, LikeOutlined, StarFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Helmet from '../../Component/Helmet/Helmet';

const HomePage = () => {
    const searchProduct = useSelector((state) =>  state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 1000) 
    const [limit, setLimit] = useState(10)

    

    const fetchProductAll = async (context) =>{
      const limit = context?.queryKey && context?.queryKey[1]
      const res = await ProductService.getAllProduct( limit)
        return res
    }
    const fetchProductSearchAll = async (context) =>{
      
      const limit = context?.queryKey && context?.queryKey[1]
      const search = context?.queryKey && context?.queryKey[2]

      const res = await ProductService.getProductSearch(search, limit)
        return res
      
    }
  

  const {isLoading, data: products, isPreviousData} = useQuery(['products', limit], fetchProductAll, {retry: 3, retryDelay: 1000, keepPreviousData: true})
  const {isLoadingSearch, data: productSearch, isPreviousDataSearch} = useQuery(['productSearch', limit, searchDebounce], fetchProductSearchAll , {retry: 3, retryDelay: 1000, keepPreviousData: true})
 
  
  return (
    <>
    <Helmet title={"Trang chủ"}/>
       <NavbarComponent />
       <div className='body' style={{background: `rgb(255,253,255)`, background: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 98%, rgba(247,244,244,1) 99%, rgba(217,201,201,1) 100%)`}}>
       {/* <SliderComponent  arrImages={[slide1, slide2, slide3, slide4]}/> */}
       <div id='container' style={{width: '1100px', margin: '0 auto',  height: '100%', paddingTop: '6px'}}>
          
       <SliderComponent  arrImages={[slide1, slide2, slide3, slide4]}/>
            
            <Row style={{margin: '20px 0'}}>
              <Col span={6}> 
                  <WrapperBox>
                  <ContactsOutlined style={{fontSize: 'xx-large'}}/>
                  <h4>ƯU ĐÃI THÀNH VIÊN</h4>
                  <p>Thành viên khi đăng ký sẽ nhận được nhiều ưu đãi hấp dẫn</p>
                  </WrapperBox>
              </Col>
              <Col span={6}> 
                  <WrapperBox>
                  <GiftOutlined style={{fontSize: 'xx-large'}}/>
                  <h4>QUÀ TẶNG MIỄN PHÍ</h4>
                  <p>Bạn sẽ nhận được nhiều quà tặng hấp dẫn miễn phí cho đơn hàng bất kỳ</p>
                  </WrapperBox>
                  </Col>
                  
              <Col span={6}> 
                  <WrapperBox>
                  <RocketOutlined style={{fontSize: 'xx-large'}}/>
                  <h4>NHẬN HÀNG TRONG NGÀY (HCM) </h4>
                  <p>Đơn hàng của bạn sẽ được giao trong vòng 24h sau khi đặt hàng</p>
                  </WrapperBox>
              </Col>
              <Col span={6}> 
                  <WrapperBoxEnd>
                  <LikeOutlined  style={{fontSize: 'xx-large'}}/>
                  <h4>ĐÁNH GIÁ TỪ GOOGLE </h4>
                  <p>5/5 <span><StarFilled style={{color: '#fadb14'}}/></span> theo đánh giá từ khách hàng đã mua hàng của Di&Di trên Google</p>
                  </WrapperBoxEnd>
              </Col>
            </Row>
            
              {searchProduct && (
                <div>
                 <WrapperTittle>KẾT QUẢ TÌM KIẾM</WrapperTittle>
                 <Loading isLoading={isLoading}>
                       <WrapperProducts>
                         {productSearch?.data?.map((product)=>{
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
                 textButton={isPreviousDataSearch ? 'Load more' : 'Xem thêm'} 
                 type='outline' 
                 disabled={productSearch?.total === productSearch?.data?.length || productSearch?.totalPage === 1}
                 styleButton={{border: '1px solid rgb(77, 77, 77)', color: `${productSearch?.total === productSearch?.data?.length ? '#fff' : 'rgb(77, 77, 77)'}` , width: '240px', height:'38px', borderRadius: '4px'}}
                 onClick={()=> setLimit((prev)=> prev + 5)}
                 ></WrapperButtonMore>
               </div>
               </Loading>
               </div>
              )}
           
            
            
            <div>

              <WrapperTittle>SẢN PHẨM BÁN CHẠY NHẤT</WrapperTittle>
              <ProductHot />
            </div>
              <WrapperTittle>SẢN PHẨM CỦA CỬA HÀNG</WrapperTittle>
              <Loading isLoading={isLoading }>
                  <WrapperProducts>
                    {products?.data?.map((product)=>{
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
            disabled={products?.total === products?.data?.length || products?.totalPage === 1}
            styleButton={{border: '1px solid rgb(77, 77, 77)', color: `${products?.total === products?.data?.length ? '#fff' : 'rgb(77, 77, 77)'}` , width: '240px', height:'38px', borderRadius: '4px'}}
            onClick={()=> setLimit((prev)=> prev + 5)}
            ></WrapperButtonMore>
          </div>
          </Loading>
    </div>
    </div>
    
    </>
  )
}

export default HomePage