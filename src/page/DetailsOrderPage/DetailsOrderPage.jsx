import React, { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import * as OrderService from '../../service/OrderService'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../Component/LoadingComponent/Loading'
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperItemPrice, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent } from './style'
import { convertPrice } from '../../utils'
import { orderContant } from '../../contant'
import Helmet from '../../Component/Helmet/Helmet'

const DetailsOrderPage = () => {
  const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const { state } = location
    const { id } = params
  
    const fetchDetailsOrder = async () => {
      const res = await OrderService.getDetailsOrder(id, state?.token)
      return res.data
    }
  
    const queryOrder = useQuery({ queryKey: ['orders-details'], queryFn: fetchDetailsOrder }, {
      enabled: id
    })
    const { isLoading, data } = queryOrder
  
    const priceMemo = useMemo(() => {
      const result = data?.orderItems?.reduce((total, cur) => {
        return total + ((cur.price * cur.amount))
      },0)
      return result
    },[data])

  return (
    <>
    <Helmet title={"Chi tiết đơn hàng"} />
    <Loading isLoading={isLoading}>

     <div style={{width: '100%', height: '100%', background: `rgb(255,253,255)`, background: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 98%, rgba(247,244,244,1) 99%, rgba(217,201,201,1) 100%)`}}>
      <div style={{ width: '1100px', margin: '0 auto', height: '100%'}}>
        <div style={{fontWeight: '500', margin: '0', padding: '20px 0'}}>
        <span style={{cursor: 'pointer'}} onClick={()=> {navigate('/my-order')}}>Đơn hàng của tôi / </span>  Chi tiết đơn hàng </div>
        <WrapperHeaderUser>
          <WrapperInfoUser>
            <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
            <WrapperContentInfo>
              <div className='name-info'><span>Tên: </span>{data?.shippingAddress?.fullName}</div>
              <div className='address-info'><span>Địa chỉ: </span> {`${data?.shippingAddress?.address}`}</div>
              <div className='phone-info'><span>Điện thoại: </span> {data?.shippingAddress?.phone}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức giao hàng</WrapperLabel>
            <WrapperContentInfo>
              <div className='delivery-info'><span className='name-delivery'>FAST </span>Giao hàng tiết kiệm</div>
              <div className='delivery-fee'><span>Phí giao hàng: </span> {convertPrice(data?.shippingPrice)}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel>Hình thức thanh toán</WrapperLabel>
            <WrapperContentInfo>
              <div className='payment-info'>{orderContant.payment[data?.paymentMethod]}</div>
              <div className='status-payment'>{data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
        </WrapperHeaderUser>
        <WrapperStyleContent>
          <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
           
            <div style={{width: '670px'}}>Sản phẩm</div>
            <WrapperItemLabel>Giá</WrapperItemLabel>
            <WrapperItemLabel>Số lượng</WrapperItemLabel>
            <WrapperItemLabel>Giảm giá</WrapperItemLabel>
          </div>
          {data?.orderItems?.map((order) => {
            return (
              <WrapperProduct>
                <WrapperNameProduct>
                  <img src={order?.image} 
                    style={{
                      width: '70px', 
                      height: '70px', 
                      objectFit: 'cover',
                      border: '1px solid rgb(238, 238, 238)',
                      padding: '2px'
                    }}
                  />
                  <div style={{
                    width: 260,
                    overflow: 'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap',
                    marginLeft: '10px',
                    height: '70px',
                  }}>{order?.name}</div>
                </WrapperNameProduct>
                <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                <WrapperItem>{order?.amount}</WrapperItem>
                <WrapperItem>{order?.discount ? convertPrice(priceMemo * order?.discount / 100) : '0 VND'}</WrapperItem>
                
                
              </WrapperProduct>
            )
          })}
          <WrapperAllPrice>
            <div>Tạm tính</div>
            <div>Giảm giá</div>
            <div>Phí vận chuyển</div>
            <div>Tổng cộng</div>
            
          </WrapperAllPrice>
          <WrapperAllPrice>
          <WrapperItemPrice>{convertPrice(priceMemo)}</WrapperItemPrice>
          <WrapperItemPrice>{ 0  || convertPrice(data?.discountPrice)}</WrapperItemPrice>
            <WrapperItemPrice>{convertPrice(data?.shippingPrice)}</WrapperItemPrice>
            <WrapperItemPrice>{convertPrice(data?.totalPrice)}</WrapperItemPrice>
            
          </WrapperAllPrice>
          
      </WrapperStyleContent>
      </div>
    </div>
   </Loading>
   </>
  )
}

export default DetailsOrderPage