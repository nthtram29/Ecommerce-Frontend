import React from 'react'
import ProductDetailComponent from '../../Component/ProductDetailComponent/ProductDetailComponent'
import { useNavigate, useParams } from 'react-router-dom'
import NavbarComponent from '../../Component/NavbarComponent/NavbarComponent'
import Helmet from '../../Component/Helmet/Helmet'

const ProductDetailPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <>
    <Helmet title={"Chi tiết sản phẩm"}/>
    <NavbarComponent />
    <div style={{ height: '100%', background: `rgb(255,253,255)`, background: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 98%, rgba(247,244,244,1) 99%, rgba(217,201,201,1) 100%)`, width:'100%'}}>
       
    <div style={{ width: '1100px', margin: '0 auto', height:'100%'}}>
      <div style={{fontWeight: '500', margin: '0', padding: '20px 0'}}><span style={{cursor: 'pointer'}} onClick={()=> {navigate('/')}}>Trang chủ / </span>  Chi tiết sản phẩm</div>
      
        <ProductDetailComponent idProduct={id}/>
     
    </div>
    </div>
    </>
  )
}

export default ProductDetailPage