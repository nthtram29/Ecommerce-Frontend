import React from 'react'
import { useLocation } from 'react-router-dom'
import Loading from '../../Component/LoadingComponent/Loading'
import { Lable, WrapperContainer, WrapperInfo, WrapperItemOrder, WrapperItemOrderInfo, WrapperValue } from './style'
import { convertPrice } from '../../utils'
import { orderContant } from '../../contant'
import { useSelector } from 'react-redux'
import Helmet from '../../Component/Helmet/Helmet'

const OrderSuccess = () => {
    const order = useSelector((state) => state.order)
    const location = useLocation()
    const {state} = location
  return (
    <>
    <Helmet title={"Đặt hàng thành công"}/>
    <div style={{background: `rgb(255,253,255)`, background: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 98%, rgba(247,244,244,1) 99%, rgba(217,201,201,1) 100%)`, with: '100%', height: '100%'}}>
    <Loading isLoading={false}>
      <div style={{height: '100%', width: '1100px', margin: '0 auto'}}>
        <h3 style={{fontWeight: '500', margin: '0', padding: '20px 0'}}>Đơn hàng đặt thành công</h3>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <WrapperContainer>
            <WrapperInfo>
              <div>
                <Lable>Phương thức giao hàng: </Lable>
                  <WrapperValue>
                    <span style={{color: '#ea8500', fontWeight: 'bold'}}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                  </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Lable>Phương thức thanh toán: </Lable>
              
                <WrapperValue>
                  {orderContant.payment[state?.payment]}
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperItemOrderInfo>
              <div style={{textDecoration: 'underline', fontSize: '15px', fontWeight: 'bold'}}> Sản phẩm:</div>
              {state.orders?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.name}>
                    <div style={{width: '500px', display: 'flex', alignItems: 'center', gap: 4}}> 
                      <img src={order.image} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
                      <div style={{
                        width: 260,
                        overflow: 'hidden',
                        textOverflow:'ellipsis',
                        whiteSpace:'nowrap'
                      }}>{order?.name}</div>
                    </div>
                    <div style={{flex: 1, display: 'flex', justifyContent: 'space-around' , alignItems: 'center'}}>
                      <span>
                        <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                      </span>
                      <span>
                        <span style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                      </span>
                    </div>
                  </WrapperItemOrder>
                )
              })}
            </WrapperItemOrderInfo>
            <div style={{ display:'flex', justifyContent: 'space-around', padding: '10px 0' }}>
              <span style={{ fontSize: '16px', color: 'red' }}>Giảm giá: {convertPrice(state?.priceDiscountMemo)}</span>
            
              <span style={{ fontSize: '16px', color: 'red' }}>Phí giao hàng: {convertPrice(state?.diliveryPriceMemo)}</span>
            
              <span style={{ fontSize: '16px', color: 'red' }}>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</span>
            </div>
          </WrapperContainer>
        </div>
      </div>
    </Loading>
  </div>
  </>
  )
}

export default OrderSuccess